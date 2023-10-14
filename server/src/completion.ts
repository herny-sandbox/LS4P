import * as lsp from 'vscode-languageserver';
import * as sketch from './sketch'
import { ParserRuleContext, Token } from 'antlr4ts';
import * as parseUtils from './astutils'
import * as parser from './parser'
import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ProcessingParser } from './grammer/ProcessingParser';
import * as symb from 'antlr4-c3'
import * as psymb from './antlr-sym'


let itemKindNames = [
	"Unknown",
	"Text",
    "Method",
    "Function",
    "Constructor",
    "Field",
    "Variable",
    "Class",
    "Interface",
    "Module",
    "Property",
    "Unit",
    "Value",
    "Enum",
    "Keyword",
    "Snippet",
    "Color",
    "File",
    "Reference",
    "Folder",
    "EnumMember",
    "Constant",
    "Struct",
    "Event",
    "Operator",
    "TypeParameter",
]

let ignoredTokens : number [] = [
	ProcessingParser.SEMI,
	ProcessingParser.IF,
	ProcessingParser.DO,
	ProcessingParser.DOT,
	ProcessingParser.SWITCH,
	ProcessingParser.WHILE,
];
for(let i = ProcessingParser.DECIMAL_LITERAL; i <= ProcessingParser.MULTI_STRING_LIT; i++)
	ignoredTokens.push(i);	
for(let i = ProcessingParser.LPAREN; i < ProcessingParser.IDENTIFIER; i++)
	ignoredTokens.push(i);	


let preferingRules : number [] = 
[
	ProcessingParser.SUPER,
	ProcessingParser.THIS,
	ProcessingParser.IDENTIFIER, 
	ProcessingParser.RULE_primary, 
	ProcessingParser.RULE_methodCall,
	//ProcessingParser.RULE_expression, 
];
for(let i = ProcessingParser.IDENTIFIER; i <= ProcessingParser.RULE_hexColorLiteral; i++)
{
	if(preferingRules.indexOf(i) < 0)
		preferingRules.push(i);	
}

let lastPdeInfo : sketch.PdeContentInfo | undefined;
let lastParseNodeAtPos : ParseTree | null;
let lastScopeAtPos : symb.ScopedSymbol | undefined;
let lastContextType : psymb.IPType | undefined;
let lastSymbols : symb.BaseSymbol [] = [];

export async function collectCandidates(pdeInfo: sketch.PdeContentInfo, line: number, posInLine : number, context : lsp.CompletionTriggerKind): Promise<lsp.CompletionItem[]> 
{
	if( !pdeInfo.syntaxTokens)
		return [];

	// Finds for the symbol (block or scope) that contains our searched identifier
	let scopeAtPos : symb.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, posInLine);
	if(!scopeAtPos || !scopeAtPos.context)
		return [];
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ParseTree | null = parseUtils.findParseTreeAtPosition(scopeAtPos.context, line, posInLine);
	if(!parseNode)
		return [];

	let tokenIndex : number = 0;
	if(parseNode instanceof TerminalNode)
		tokenIndex = parseNode.symbol.tokenIndex;
	else if(parseNode instanceof ParserRuleContext)
		tokenIndex = parseNode.start.tokenIndex;
	//log.write("parse context found: "+token.text, log.severity.EVENT);

	let core = new symb.CodeCompletionCore(parser.currentParser);
	// Most tokens are provided in the form of snippets, so ignoring from completion candidates
	core.ignoredTokens = new Set(ignoredTokens);
	core.preferredRules = new Set(preferingRules);

	
	let contextType = pdeInfo.findNodeContextTypeDefinition(parseNode);

	// console.log(`Cursor at: ${parseNode.text}:${posInLine}`);
	// console.log("Type: "+contextType?.name??"unknown");
	if(contextType && contextType.typeKind == psymb.PTypeKind.Unknown)
		return [];

	let candidates = core.collectCandidates(tokenIndex);
	let completions : lsp.CompletionItem[] = []; 
	let symbols: symb.BaseSymbol[] = [];

	let requiresIdentifier : boolean = false;
	if( parseNode && parseNode instanceof TerminalNode && parseNode.symbol.type == ProcessingParser.DOT && contextType)
		requiresIdentifier = true;

	if(candidates.tokens.has(ProcessingParser.IDENTIFIER) || requiresIdentifier)
	{
		let members : lsp.CompletionItem[] = [];
		if(contextType)
		{
			// A very special built-in case
			if(contextType.typeKind == psymb.PTypeKind.Array)
				members = [{ label: "length", kind: lsp.CompletionItemKind.Field}];
			else
			{
				let callContext = psymb.PUtils.resolveComponentSyncFromPType(scopeAtPos, psymb.PClassSymbol, contextType );
				if(callContext && callContext instanceof symb.ScopedSymbol)
					members = await suggestMembers(callContext, contextType, true, symbols);
			}
		}
		else
		{
			members = await suggestMembers(scopeAtPos, undefined, false, symbols);
		}
		for(let child of members )
			completions.push(child);
	}
	for(let candidateRule of candidates.rules)
	{
		let ruleIndex = candidateRule[0];
		if(ruleIndex == ProcessingParser.RULE_primary && !contextType)
		{
			completions.push({ label: "this", kind: lsp.CompletionItemKind.Keyword });
			completions.push({ label: "super", kind: lsp.CompletionItemKind.Keyword });
		}
	}
	if(!contextType)
	{
		for(let candidateToken of candidates.tokens)
		{
			let tokenIndex = candidateToken[0];
			if(tokenIndex == ProcessingParser.IDENTIFIER)
				continue;

			
			let symbolicName : string | undefined = parser.currentParser.vocabulary.getSymbolicName(tokenIndex);
			if(symbolicName)
				completions.push({ label: symbolicName.toLowerCase()});
		}
	}
	lastPdeInfo = pdeInfo;
	lastParseNodeAtPos = parseNode;
	lastScopeAtPos = scopeAtPos;
	lastContextType = contextType;
	lastSymbols = symbols;
	return completions;
}

async function suggestMembers(scopeAtPos: symb.ScopedSymbol, refType:psymb.IPType|undefined, localOnly:boolean=false, symbols: symb.BaseSymbol[]) : Promise<lsp.CompletionItem[]>
{
	let completions : lsp.CompletionItem[] = [];

	let isAccessingByReference = false;
	let isAccessingByInstance = true;

	if(refType)
	{
		isAccessingByReference = refType.reference == symb.ReferenceKind.Reference;
		isAccessingByInstance = refType.reference == symb.ReferenceKind.Instance;
	}

	let vars = psymb.PUtils.getAllSymbolsSync(scopeAtPos, psymb.PVariableSymbol, undefined, localOnly);
	for(let child of vars )
	{
		if(isAccessingByReference && !child.modifiers.has(symb.Modifier.Static))
			continue;

		if(child instanceof psymb.PFieldSymbol)
			completions.push(createCompletionItem(child.name, lsp.CompletionItemKind.Field, symbols.length));
		else
			completions.push(createCompletionItem(child.name, lsp.CompletionItemKind.Variable, symbols.length))
		symbols.push(child);
	}
	let methods : psymb.PMethodSymbol [] = psymb.PUtils.getAllSymbolsSync(scopeAtPos, psymb.PMethodSymbol, undefined, localOnly);
	for(let child of methods )
	{
		if(isAccessingByReference && !child.modifiers.has(symb.Modifier.Static))
			continue;
		completions.push(createMethodCompletionItem(child, symbols.length));
		symbols.push(child);
	}
	let components : psymb.PComponentSymbol [] = psymb.PUtils.getAllSymbolsSync(scopeAtPos, psymb.PComponentSymbol, undefined, localOnly);
	for(let comp of components )
	{
		if(isAccessingByReference && !comp.modifiers.has(symb.Modifier.Static))
			continue;

		if(comp instanceof psymb.PInterfaceSymbol)
			completions.push(createCompletionItem(comp.name, lsp.CompletionItemKind.Interface, symbols.length));
		else if( comp instanceof psymb.PNamespaceSymbol )
			completions.push(createCompletionItem(comp.name, lsp.CompletionItemKind.Module, symbols.length));
		else
			completions.push(createCompletionItem(comp.name, lsp.CompletionItemKind.Class, symbols.length));
		symbols.push(comp);
	}
    return completions;
}
function createCompletionItem(l : string, k: lsp.CompletionItemKind, i?:number ) : lsp.CompletionItem
{
	return { label: l, kind: k, data: { refIndex: i } };
}

function createMethodCompletionItem(method : psymb.PMethodSymbol, i?:number ) : lsp.CompletionItem
{
	let k = method.returnType ? lsp.CompletionItemKind.Method : lsp.CompletionItemKind.Constructor;
	let itf = lsp.InsertTextFormat.Snippet;
	let methodName :string = psymb.PUtils.extractMethodName(method.name);
	let it : string = methodName;
	it += "(";
	let params = method.getNestedSymbolsOfTypeSync(psymb.PParameterSymbol);
	for(let i=0; i < params.length; i++)
	{
		if(i>0)
			it += ", "
		it += "${"+(i+1)+":"+params[i].name+"}"	
	}
	it += ")";
	return { label: methodName, kind: k, insertTextFormat: itf, insertText: it, data: { refIndex: i } };
}

export function fillCompletionItemDetails(item: lsp.CompletionItem) : lsp.CompletionItem
{
	if(!lastScopeAtPos || !lastParseNodeAtPos || !lastPdeInfo)
	{
		item.detail = 'Unknown symbol';
		item.documentation = "No details provided."
		return item;
	}

	let detailText = "";

	let symbol : symb.BaseSymbol | undefined;
	let itemSymbolIndex = item.data?.refIndex?? -1;

	// The parameters if its a method
	if( itemSymbolIndex >= 0 && itemSymbolIndex < lastSymbols.length )
		symbol = lastSymbols[itemSymbolIndex];

	// First the symbol kind
	if(item.kind)
	{
		detailText += "(";
		detailText += itemKindNames[item.kind];
		detailText += ") ";
	}

	// the return type
	if(symbol)
	{
		if( symbol instanceof psymb.PMethodSymbol)
			detailText += psymb.PUtils.convertSymbolTypeToString(symbol.returnType) + " ";
		else if( symbol instanceof psymb.PVariableSymbol)
			detailText += psymb.PUtils.convertSymbolTypeToString(symbol.type) + " ";
	}
	else if(lastContextType)
	{
		if(lastContextType.typeKind == psymb.PTypeKind.Array && item.label == "length")
			detailText += "int ";
	}

	// then the context owner if any
	if(lastContextType)
	{
		detailText += psymb.PUtils.convertSymbolTypeToString(lastContextType);
		detailText += "."
	}
	// then the label name
	if( symbol instanceof psymb.PMethodSymbol)
		detailText += psymb.PUtils.extractMethodName(item.label);
	else
		detailText += item.label;

	if(symbol instanceof psymb.PMethodSymbol)
	{
		detailText += "(";
		let params = symbol.getNestedSymbolsOfTypeSync(psymb.PParameterSymbol);
		for(let i=0; i<params.length; i++)
		{
			if(i!=0)
				detailText += ", ";

			let param = params[i];
			if(param.type)	
				detailText += psymb.PUtils.convertSymbolTypeToString(param.type);

			if(param.name && param.name.length!=0)
				detailText += " " + param.name;
		}
		detailText += ")";
	}

	// use `item.label`
	item.detail = detailText;

	// ======================================================
	// ======================================================
	// ======================================================
	// DOCUMENTATION

	let documentation = "Declared at: \n";
	if(symbol && symbol.parent)
		documentation += "\t\t" + symbol.parent.qualifiedName(".", true, false);
	documentation += "\n";


	item.documentation = documentation;

	return item;
}