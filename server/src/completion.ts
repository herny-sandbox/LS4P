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

let ignoredTokens : number [] = [];

for(let i = 1; i < ProcessingParser.IDENTIFIER; i++)
	ignoredTokens.push(i);	


let lastPdeInfo : sketch.PdeContentInfo | undefined;
let lastParseNodeAtPos : ParseTree | null;
let lastScopeAtPos : symb.ScopedSymbol | undefined;
let lastContextType : psymb.PType | undefined;
let lastSymbols : symb.BaseSymbol [] = [];

export async function collectCandidates(pdeName: string, line: number, posInLine : number, context : lsp.CompletionTriggerKind): Promise<lsp.CompletionItem[]> 
{
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
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
	core.preferredRules = new Set([ ProcessingParser.IDENTIFIER ]);

	
	let contextType = pdeInfo.findNodeContextTypeDefinition(parseNode);

	// console.log(`Cursor at: ${parseNode.text}:${posInLine}`);
	// console.log("Type: "+contextType?.name??"unknown");
	if(contextType && contextType.typeKind == psymb.PTypeKind.Unknown)
		return [];

	let candidates = core.collectCandidates(tokenIndex);
	let completions : lsp.CompletionItem[] = []; 
	let symbols: symb.BaseSymbol[] = [];

	// if(candidates.tokens.has(ProcessingParser.IDENTIFIER))
	// {
		let members : lsp.CompletionItem[] = [];
		if(contextType)
		{
			// A very special built-in case
			if(contextType.typeKind == psymb.PTypeKind.Array)
				members = [{ label: "length", kind: lsp.CompletionItemKind.Field}];
			else if(contextType.typeKind == psymb.PTypeKind.Class || contextType.typeKind == psymb.PTypeKind.Interface)
			{
				let callContext = scopeAtPos.resolveSync(contextType.name, false);
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
	// }
	
	candidates.tokens.forEach((_, k) => {
		if( k == ProcessingParser.IDENTIFIER)
		{
		}
		else
		{
			let symbolicName : string | undefined = parser.currentParser.vocabulary.getSymbolicName(k);
			if(symbolicName)
				completions.push({ label: symbolicName.toLowerCase()});
		}
	});

	lastPdeInfo = pdeInfo;
	lastParseNodeAtPos = parseNode;
	lastScopeAtPos = scopeAtPos;
	lastContextType = contextType;
	lastSymbols = symbols;
	return completions;
}

async function suggestMembers(scopeAtPos: symb.ScopedSymbol, refType:psymb.PType|undefined, localOnly:boolean=false, symbols: symb.BaseSymbol[]) : Promise<lsp.CompletionItem[]>
{
	let completions : lsp.CompletionItem[] = [];

	let isAccessingByReference = false;
	let isAccessingByInstance = true;

	if(refType)
	{
		isAccessingByReference = refType.reference == symb.ReferenceKind.Reference;
		isAccessingByInstance = refType.reference == symb.ReferenceKind.Instance;
	}

	let vars = psymb.PUtils.getAllSymbolsSync(scopeAtPos, symb.VariableSymbol, undefined, localOnly);
	for(let child of vars )
	{
		if(isAccessingByReference && !child.modifiers.has(symb.Modifier.Static))
			continue;

		if(child instanceof symb.FieldSymbol)
			completions.push(createCompletionItem(child.name, lsp.CompletionItemKind.Field, symbols.length));
		else
			completions.push(createCompletionItem(child.name, lsp.CompletionItemKind.Variable, symbols.length))
		symbols.push(child);
	}
	let methods : symb.MethodSymbol [] = psymb.PUtils.getAllSymbolsSync(scopeAtPos, symb.MethodSymbol, undefined, localOnly);
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

function createMethodCompletionItem(method : symb.MethodSymbol, i?:number ) : lsp.CompletionItem
{
	let k = method.returnType ? lsp.CompletionItemKind.Method : lsp.CompletionItemKind.Constructor;
	let itf = lsp.InsertTextFormat.Snippet;
	let it : string = method.name;
	it += "(";
	let params = method.getNestedSymbolsOfTypeSync(symb.ParameterSymbol);
	for(let i=0; i < params.length; i++)
	{
		if(i>0)
			it += ", "
		it += "${"+(i+1)+":"+params[i].name+"}"	
	}
	it += ")";
	return { label: method.name, kind: k, insertTextFormat: itf, insertText: it, data: { refIndex: i } };
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
		if( symbol instanceof symb.MethodSymbol)
			detailText += psymb.PUtils.convertSymbolTypeToString(psymb.PUtils.typeToPType(symbol.returnType)) + " ";
		else if( symbol instanceof symb.VariableSymbol)
			detailText += psymb.PUtils.convertSymbolTypeToString(psymb.PUtils.typeToPType(symbol.type)) + " ";
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
	detailText += item.label;

	if(symbol instanceof symb.MethodSymbol)
	{
		detailText += "(";
		let params = symbol.getNestedSymbolsOfTypeSync(symb.ParameterSymbol);
		for(let i=0; i<params.length; i++)
		{
			if(i!=0)
				detailText += ", ";

			let param = params[i];
			if(param.type)	
				detailText += psymb.PUtils.convertSymbolTypeToString(psymb.PUtils.typeToPType(param.type));

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
	if(symbol)
		documentation += "\t\t" + symbol.qualifiedName(".", true, false);
	documentation += "\n";


	item.documentation = documentation;

	return item;
}