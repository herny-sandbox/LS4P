import * as sketch from './sketch'
import * as parseUtils from './astutils'
import * as symbols from 'antlr4-c3'
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { Location, Range } from 'vscode-languageserver'
import { ParserRuleContext } from 'antlr4ts'


export async function scheduleLookUpReference(pdeInfo : sketch.PdeContentInfo, line : number, pos : number): Promise<Location[] | null>
{
	let resultant: Location[] = [];
	
	if( !pdeInfo.syntaxTokens)
		return null;

	let scopeAtPos : symbols.BaseSymbol | undefined = parseUtils.findLeafSymbolAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!scopeAtPos || !scopeAtPos.context)
		return null;
	
	let parseNode : TerminalNode | null = parseUtils.findIdentifierAtPosition(scopeAtPos.context, line, pos);
	if(!parseNode)
		return null;
	
	let focusedDeclFullName : string | undefined;

	if(scopeAtPos.context === parseNode.parent)
		focusedDeclFullName = scopeAtPos.qualifiedName('.', true, false);
	else
		focusedDeclFullName = pdeInfo.findNodeSymbolDefinitionName(parseNode);

	if(!focusedDeclFullName)
		return null;

	for (let pdeInfo of sketch.getAllPdeInfos()) 
	{
		let pdeUri : string = sketch.getUriFromPdeName(pdeInfo.name);
		let result : Range[] | undefined = pdeInfo.getUsageReferencesForQualifiedName(focusedDeclFullName)
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
