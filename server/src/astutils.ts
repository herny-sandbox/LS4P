import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext, Token } from 'antlr4ts';
import { ClassDeclarationContext, VariableDeclaratorIdContext, MethodDeclarationContext } from 'java-ast/dist/parser/JavaParser';
import * as log from './scripts/syslogs'
import * as pp from './grammer/ProcessingParser';
import { ProcessingLexer } from './grammer/ProcessingLexer';
import * as symbols from 'antlr4-c3';
import * as ls from 'vscode-languageserver';

export let memberNames: string[] = []
export let numberOfMembers = 0
export let fieldNames: string[] = []
export let numberOfFields = 0
export let classNames: string[] = []
export let numberOfClasses = 0
export let fieldAndClass: [string,string][] = []
export let FCCount = 0
export let memberAndClass: [string,string][] = []
export let MCCount = 0

export function findIdentifierInRuleArray(contexts: ParseTree[], line: number, charPosInLine: number): ParseTree | null
{
	let result : ParseTree | null = null;
	for(let i : number = 0; i < contexts.length; i++ )
	{
		result = findIdentifierAtPosition(contexts[i], line, charPosInLine)
		if(result!=null)
			return result;
	}
	return null;
}

export function findIdentifierAtPosition(ctx: ParseTree, line: number, pos: number): ParseTree | null
{

	if (ctx instanceof TerminalNode)
	{
		if(checkTerminalNodeBounds(ctx, line, pos))
			return ctx;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkTreeNodeBounds(ctx, line, pos)  )
		{
			if(ctx.children)
				return findIdentifierInRuleArray(ctx.children, line, pos);
			else
				return ctx;
		}
	}

	return null;
}

export function findScopeAtPositionFromSymbols(symbols: symbols.BaseSymbol[], line: number, pos: number): symbols.BaseSymbol | undefined 
{
	let result : symbols.BaseSymbol | undefined;
	for( let i : number = 0; i < symbols.length; i++ )
	{
		let sym : symbols.BaseSymbol = symbols[i];
		result = findScopeAtPosition(sym, line, pos);
		if(result)
			break
	}
	return result;
}

export function findScopeAtPosition(sym: symbols.BaseSymbol, line: number, pos: number): symbols.BaseSymbol | undefined 
{
	let ctx : ParseTree | undefined = sym.context;
	if(!ctx)
		return;

	if (ctx instanceof TerminalNode)
	{
		if(checkTerminalNodeBounds(ctx, line, pos))
			return sym;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkTreeNodeBounds(ctx, line, pos) )
		{
			if(sym instanceof symbols.ScopedSymbol)
			{
				let scoped : symbols.ScopedSymbol = sym;
				let result : symbols.BaseSymbol | undefined =  findScopeAtPositionFromSymbols(scoped.children, line, pos);
				return result ? result : scoped;
			}
			else
				return sym;
		}
	}

	return;
}

function checkTerminalNodeBounds(ctx : TerminalNode, line : number, pos : number) : boolean
{
	const token: Token = ctx.symbol;
	var lenght : number = token.stopIndex - token.startIndex + 1;
	return line === token.line && (pos >= token.charPositionInLine) && (pos <= token.charPositionInLine+lenght);
}

function checkTreeNodeBounds(ctx : ParserRuleContext, line : number, pos : number) : boolean
{
	const start : Token = ctx.start;
	const stop : Token = ctx.stop ?? ctx.start;
	var tokenLength : number = stop.stopIndex - start.startIndex + 1;

	if (line < start.line || line > stop.line)
		return false;

	if(line === start.line && pos < start.charPositionInLine)
		return false;

	if(line === stop.line && pos > stop.charPositionInLine+tokenLength)
		return false;

	return true;
}

export function calcRangeFromParseTree(ctx: ParseTree) : ls.Range
{
	if (ctx instanceof TerminalNode)
	{
		const token: Token = ctx.symbol;
		var length : number = token.stopIndex - token.startIndex + 1;
		return ls.Range.create(token.line-1, token.charPositionInLine, token.line-1, token.charPositionInLine+length)
	}
	else if (ctx instanceof ParserRuleContext)
	{
		const start : Token = ctx.start;
		const stop : Token = ctx.stop ?? ctx.start;
		var stopLength : number = stop.stopIndex - stop.startIndex + 1;
		return ls.Range.create(start.line-1, start.charPositionInLine, stop.line-1, stop.charPositionInLine+stopLength);
	}
	return ls.Range.create(0, 0, 0, 1);
}  

export function constructClassParams(tokenArr: [ParseTree, ParseTree][]){
	tokenArr.forEach(function(node, index){
		// Contains all local class declarations, local memberVariable and memberFunction declaration
		if(node[1] instanceof ClassDeclarationContext && node[0].text == `class`){
			classNames[numberOfClasses] = tokenArr[index+1][0].text
			numberOfClasses += 1
		}
		if(node[1] instanceof MethodDeclarationContext){
			// MethodDeclarationContext -> MemberDeclarationContext -> ClassBodyDeclarationContext -> ClassBodyContext -> ClassDeclarationContext -> 
			// 2nd Child [Terminal Node: Class name]
			memberAndClass[MCCount] = [node[1]._parent!._parent!._parent!._parent!.getChild(1).text,node[0].text]
			MCCount += 1
			memberNames[numberOfMembers] = node[0].text
			numberOfMembers += 1
		}
		if(node[1] instanceof VariableDeclaratorIdContext){
			// VariableDeclaratorIdContext -> VariableDeclaratorContext -> VariableDeclaratorsContext -> FieldDeclarationContext -> MemberDeclarationContext ->
			// ClassBodyDeclarationContext -> ClassBodyContext -> ClassDeclarationContext -> 2nd Child [Terminal Node : Class Name]
			// Any of the parent can be `undefined` while traversing up.
			fieldAndClass[FCCount] = [node[1]._parent!._parent!._parent!._parent!._parent!._parent!._parent!.getChild(1).text,node[0].text]
			FCCount += 1
			fieldNames[numberOfFields] = node[0].text
			numberOfFields += 1
		}
	})
	log.writeLog(`Local Class completion Invoked`)
}

export function clearClassName(){
	classNames = []
	numberOfClasses = 0
}

export function clearMemberName(){
	memberNames = []
	numberOfMembers = 0
}

export function clearFieldName(){
	fieldNames = []
	numberOfFields = 0
}

export function clearFieldAndClass(){
	fieldAndClass = []
	FCCount = 0
}

export function clearMemberAndClass(){
	memberAndClass = []
	MCCount = 0
}

export function flushRecords(){
	clearClassName()
	clearFieldName()
	clearMemberName()
	clearFieldAndClass()
	clearMemberAndClass()
}


