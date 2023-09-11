import * as sketch from './sketch'
import * as parseUtils from './astutils'
import * as log from './scripts/syslogs'
import * as symbols from 'antlr4-c3'
import * as definitions from './definition'
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { Location, Range } from 'vscode-languageserver'
import * as pp from './grammer/ProcessingParser'
import { ParserRuleContext } from 'antlr4ts'


export async function scheduleLookUpReference(pdeName : string, line : number, pos : number): Promise<Location[] | null>
{
	let resultant: Location[] = [];
	
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return null;

	let scopeAtPos : symbols.BaseSymbol | undefined = parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!scopeAtPos || !scopeAtPos.context)
		return null;
	
	let parseNode : TerminalNode | null = parseUtils.findIdentifierAtPosition(scopeAtPos.context, line, pos);
	if(!parseNode)
		return null;
	
	let focusedDecl : symbols.BaseSymbol | undefined;

	if(scopeAtPos.context === parseNode.parent)
		focusedDecl = scopeAtPos;
	else
		focusedDecl = pdeInfo.findNodeSymbolDefinition(parseNode);

	if(!focusedDecl)
		return null;

	for (let pdeInfo of sketch.getAllPdeInfos()) 
	{
		let pdeUri : string = sketch.getUriFromPdeName(pdeInfo.name);
		let result : Range[] | undefined = pdeInfo.getUsageReferencesFor(focusedDecl)
		if(result)
		{
			for(let candidate of result)
				resultant.push(Location.create(pdeUri, candidate));
		}
	}

	return resultant;
}

export class ReferencesVisitor extends AbstractParseTreeVisitor<Range[]> implements ProcessingParserVisitor<Range[]>
{
	private searched : string | null = null;
	private resultsFound : Range[] = [];

	constructor() { super(); }
	protected defaultResult(): Range[] { return this.resultsFound; }

	public searchFor(word : string, ctx : ParserRuleContext) : Range[]
	{
		this.searched = word;
		this.resultsFound = [];
		this.visit(ctx);
		return this.defaultResult();
	}

	visitTerminal(node: TerminalNode): Range[] 
	{
		if( node.text === this.searched )
			this.resultsFound.push(this.getRange(node));

		return this.defaultResult();
	}

	public getRange(ctx : TerminalNode) : Range
	{
		let line : number = ctx.symbol.line;
		let pos : number = ctx.symbol.charPositionInLine;
		let length : number = ctx.symbol.stopIndex - ctx.symbol.startIndex + 1;
		return Range.create( line-1, pos, line-1, pos+length);
	}
}
