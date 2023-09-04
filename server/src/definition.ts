import * as sketch from './sketch'
import * as parseUtils from './astutils'
import { Definition, LocationLink, Location, Range } from 'vscode-languageserver'
import * as ast from 'antlr4ts/tree'
import * as symbols from 'antlr4-c3'
import { DocumentUri } from 'vscode-languageserver-textdocument'
import * as symb from './symbols'
import * as pp from './grammer/ProcessingParser';
import * as psymb from "./antlr-sym"

export async function scheduleLookUpDefinition(pdeName: string, line: number, pos: number): Promise<Definition | null>
{
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return null;

	let definition : symbols.BaseSymbol | undefined;
	//let definition : symbols.BaseSymbol | undefined = await lookUpSymbolDefinition(pdeInfo.symbols, line, pos);
	// Finds for the symbol (block or scope) that contains our searched identifier
	let symbolContainer : symbols.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!symbolContainer || !symbolContainer.context)
		return null;
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ast.TerminalNode | null = parseUtils.findIdentifierAtPosition(symbolContainer.context, line, pos);
	if(!parseNode)
		return null;
	
	// We now filter out if the terminal node matches the symbolContainer
	// (means is also a declaration of some kind since we only record declarations)
	if(symbolContainer.context === parseNode.parent)
		definition = symbolContainer;
	else if(pdeInfo.refs)
		definition = pdeInfo.refs.findNodeSymbolDefinition(parseNode);

	if(!definition)
	{
		console.error(`Unable to find the symbol definition at ${pdeName}. (${(line)}:${pos})`);
		return null;
	}
	let definitionPdeName : string | undefined = symb.findPdeName(definition);
	if(!definitionPdeName)
		return null;

	let targetUri: DocumentUri = sketch.getUriFromPdeName(definitionPdeName);
	let targetRange: Range | null = calcDefinitionRange(definition.context);

	return targetRange ? Location.create(targetUri, targetRange ) : null;
}

function calcDefinitionRange(ctx : ast.ParseTree | undefined) : Range | null
{
	if(!ctx)
		return null;

	if( ctx instanceof pp.MethodDeclarationContext)
		return parseUtils.calcRangeFromParseTree(ctx.IDENTIFIER());
	else if(ctx instanceof pp.ConstructorDeclarationContext)
		return parseUtils.calcRangeFromParseTree(ctx.IDENTIFIER());
	else if(ctx instanceof pp.ClassDeclarationContext)
		return parseUtils.calcRangeFromParseTree(ctx.IDENTIFIER());
	else
		return parseUtils.calcRangeFromParseTree(ctx);
}


