import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext, Token } from 'antlr4ts';
import * as log from './scripts/syslogs'
import * as symb from 'antlr4-c3';
import * as psymb from "./antlr-sym"
import * as ls from 'vscode-languageserver';
import * as pp from './grammer/ProcessingParser';

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

export function findIdentifierInRuleArray(contexts: ParseTree[], line: number, charPosInLine: number): TerminalNode | null
{
	let result : TerminalNode | null = null;
	for(let i : number = 0; i < contexts.length; i++ )
	{
		result = findIdentifierAtPosition(contexts[i], line, charPosInLine)
		if(result!=null)
			return result;
	}
	return null;
}

export function findIdentifierAtPosition(ctx: ParseTree, line: number, pos: number): TerminalNode | null
{

	if (ctx instanceof TerminalNode)
	{
		// Dont't try to analize if it's not a identifier
		if(ctx.symbol.type != pp.ProcessingParser.IDENTIFIER)
			return null;
		if(checkTerminalNodeBounds(ctx, line, pos))
			return ctx;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkTreeNodeBounds(ctx, line, pos)  )
		{
			if(ctx.children)
				return findIdentifierInRuleArray(ctx.children, line, pos);
		}
	}

	return null;
}

export function findScopeAtPositionFromSymbols(symbols: symb.BaseSymbol[], line: number, pos: number): symb.ScopedSymbol | undefined 
{
	let result : symb.ScopedSymbol | undefined;
	for( let i : number = 0; i < symbols.length; i++ )
	{
		let sym : symb.BaseSymbol = symbols[i];
		if(sym instanceof symb.ScopedSymbol)
		{
			result = findScopeAtPosition(sym, line, pos);
			if(result)
				break			
		}
	}
	return result;
}

export function findScopeAtPosition(sym: symb.ScopedSymbol, line: number, pos: number): symb.ScopedSymbol | undefined 
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
			if(sym instanceof symb.ScopedSymbol)
			{
				let scoped : symb.ScopedSymbol = sym;
				let result : symb.ScopedSymbol | undefined =  findScopeAtPositionFromSymbols(scoped.children, line, pos);
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
		if(node[1] instanceof pp.ClassDeclarationContext && node[0].text == `class`){
			classNames[numberOfClasses] = tokenArr[index+1][0].text
			numberOfClasses += 1
		}
		if(node[1] instanceof pp.MethodDeclarationContext){
			// MethodDeclarationContext -> MemberDeclarationContext -> ClassBodyDeclarationContext -> ClassBodyContext -> ClassDeclarationContext -> 
			// 2nd Child [Terminal Node: Class name]
			memberAndClass[MCCount] = [node[1]._parent!._parent!._parent!._parent!.getChild(1).text,node[0].text]
			MCCount += 1
			memberNames[numberOfMembers] = node[0].text
			numberOfMembers += 1
		}
		if(node[1] instanceof pp.VariableDeclaratorIdContext){
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


export function evaluateExpressionType(expCtx: pp.ExpressionContext, symbolContext: symb.BaseSymbol)  : symb.Type | undefined
{
	let primary : pp.PrimaryContext | undefined = expCtx.primary();
	let methodCall : pp.MethodCallContext | undefined = expCtx.methodCall();
	let typeCast : pp.TypeTypeContext |undefined = expCtx.typeType()
	if( primary )
	{
		let literal : pp.LiteralContext | undefined = primary.literal();
		if(primary.THIS())
			return psymb.PUtils.getParentClass(symbolContext);

		else if(primary.IDENTIFIER())
			return psymb.PUtils.resolveVariableDeclaration(primary.text, symbolContext)?.type;

		else if(literal)
		{
			if(literal.integerLiteral())
				return psymb.PUtils.createPrimitiveType(symb.TypeKind.Integer);
			else if(literal.floatLiteral())
				return psymb.PUtils.createPrimitiveType(symb.TypeKind.Float);
			else if(literal.CHAR_LITERAL())
				return psymb.PUtils.createPrimitiveType(symb.TypeKind.Char);
			else if(literal.stringLiteral())
				return psymb.PUtils.createPrimitiveType(symb.TypeKind.String);
			else if(literal.BOOL_LITERAL())
				return psymb.PUtils.createPrimitiveType(symb.TypeKind.Boolean);
		}
	}
	if(methodCall)
	{
		// let identifier = methodCall.IDENTIFIER();
		// if(identifier)
		// {
		// 	let symbolMethod : symbols.MethodSymbol | undefined = await resolveSymbolDeclaration(identifier, symbolContext);
		// 	if((symbolMethod !== undefined) && (symbolMethod.returnType!==undefined) )
		// 	{

		// 	}
		// }
	}
	if(typeCast)
		return evaluateTypeTypeToSymbolType(typeCast);
}

export function evaluateTypeTypeToSymbolType(typeContext : pp.TypeTypeContext) : symb.Type | undefined
{
	let result : symb.Type | undefined

	let classOrInterface : pp.ClassOrInterfaceTypeContext | undefined = typeContext.classOrInterfaceType();
	let primitive : pp.PrimitiveTypeContext | undefined =  typeContext.primitiveType();

	if(primitive)
		return evaluatePrimitiveTypeToSymbolType(primitive);
	else if(classOrInterface)
		return evaluateClassOrInterfaceTypeToSymbolType(classOrInterface);
	return result;
}

export function evaluateClassOrInterfaceTypeToSymbolType(classOrInterface : pp.ClassOrInterfaceTypeContext) : symb.Type | undefined
{
	let identifs = classOrInterface.IDENTIFIER();
	let genericArguments = classOrInterface.typeArguments();
	if(identifs.length == 0)
		return;

	//let objSymbol = symbolContext.resolveSync(classOrInterface.IDENTIFIER()[0].text, false);

	let baseTypes : symb.Type[] = [];
	buildTypeArgumentsToSymbolTypes(genericArguments, baseTypes);
	return psymb.PUtils.createClassType(identifs[0].text, baseTypes );
}

export function buildTypeArgumentsToSymbolTypes(typeArguments : pp.TypeArgumentsContext[], result: symb.Type[])
{
	for(let i=0; i<typeArguments.length; i++)
	{
		let args = typeArguments[i].typeArgument();
		for(let j=0; j<args.length; j++)
		{
			let typeCtx = args[j].typeType();
			if(typeCtx)
			{
				let baseType = evaluateTypeTypeToSymbolType(typeCtx);
				if(baseType)
					result.push(baseType);
			}
		}
	}
} 

export function evaluatePrimitiveTypeToSymbolType(primitive : pp.PrimitiveTypeContext) : symb.Type
{
	if(primitive.BOOLEAN())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Boolean);
	if(primitive.CHAR())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Char);
	if(primitive.BYTE())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Char);
	if(primitive.SHORT())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Integer);
	if(primitive.INT())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Integer);
	if(primitive.LONG())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Integer);
	if(primitive.FLOAT())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Float);
	if(primitive.DOUBLE())
		return psymb.PUtils.createPrimitiveType(symb.TypeKind.Float);
	if(primitive.colorPrimitiveType())
		return psymb.PUtils.createClassType("color")

	return psymb.PUtils.createUnknownType(primitive.text);
}