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
		if( checkRuleNodeBounds(ctx, line, pos)  )
		{
			if(ctx.children)
				return findIdentifierInRuleArray(ctx.children, line, pos);
		}
	}
	return null;
}

export function findParseTreeInRuleArray(contexts: ParseTree[], line: number, charPosInLine: number): ParseTree | null
{
	let result : ParseTree | null = null;
	for(let i : number = 0; i < contexts.length; i++ )
	{
		result = findParseTreeAtPosition(contexts[i], line, charPosInLine)
		if(result!=null)
			return result;
	}
	return null;
}

export function findParseTreeAtPosition(ctx: ParseTree, line: number, pos: number): ParseTree | null
{
	if (ctx instanceof TerminalNode)
	{
		// Dont't try to analize if it's not a identifier
		if(checkTerminalNodeBounds(ctx, line, pos))
			return ctx;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkRuleNodeBounds(ctx, line, pos)  )
		{
			let result = null;
			if(ctx.children)
				result = findParseTreeInRuleArray(ctx.children, line, pos);
			return result ? result : ctx;
		}
	}
	return null;
}

export function findLeafSymbolAtPositionFromSymbols(symbols: symb.BaseSymbol[], line: number, pos: number): symb.BaseSymbol | undefined 
{
	let result : symb.BaseSymbol | undefined;
	for( let i : number = 0; i < symbols.length; i++ )
	{
		let sym : symb.BaseSymbol = symbols[i];
		if(sym instanceof symb.ScopedSymbol)
		{
			result = findScopeAtPosition(sym, line, pos);
			if(result)
				break			
		}
		else if( checkParseNodeBounds(sym.context, line, pos) )
			return sym;
	}
	return result;
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
		if( checkRuleNodeBounds(ctx, line, pos) )
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

function checkParseNodeBounds(ctx : ParseTree, line : number, pos : number) : boolean
{
	if (ctx instanceof TerminalNode)
		return checkTerminalNodeBounds(ctx, line, pos);
	else if(ctx instanceof ParserRuleContext)
		return checkRuleNodeBounds(ctx, line, pos);
	return false;
}

function checkTerminalNodeBounds(ctx : TerminalNode, line : number, pos : number) : boolean
{
	const token: Token = ctx.symbol;
	var lenght : number = token.stopIndex - token.startIndex + 1;
	return line === token.line && (pos >= token.charPositionInLine) && (pos <= token.charPositionInLine+lenght);
}

function checkRuleNodeBounds(ctx : ParserRuleContext, line : number, pos : number) : boolean
{
	const start : Token = ctx.start;
	const stop : Token = ctx.stop ?? ctx.start;
	var tokenLength : number = stop.stopIndex - start.startIndex + 1;

	if (line < start.line || line > stop.line)
		return false;

	if(line === start.line && pos < start.charPositionInLine)
		return false;

	if(line === stop.line && pos > start.charPositionInLine+tokenLength)
		return false;

	return true;
}

export function calcRangeFromParseTree(ctx: ParseTree|undefined) : ls.Range
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



export function convertTypeTypeToSymbolType(typeContext : pp.TypeTypeContext) : psymb.PType
{
	let result : psymb.PType | undefined

	let classOrInterface : pp.ClassOrInterfaceTypeContext | undefined = typeContext.classOrInterfaceType();
	let primitive : pp.PrimitiveTypeContext | undefined =  typeContext.primitiveType();
	let arrayMultiSize : TerminalNode [] = typeContext.LBRACK();

	if(primitive)
		result = convertPrimitiveTypeToSymbolType(primitive);
	else if(classOrInterface)
		result = convertClassOrInterfaceIDToSymbolType(classOrInterface.classOrInterfaceIdentifier());

	if(arrayMultiSize.length > 0)
	{
		if(!result)
			result = psymb.PType.createUnknownType(); 
		
		let arraySize = arrayMultiSize.length;
		while(arraySize>0)
		{
			result = psymb.PType.createArrayType(result);
			arraySize--;
		}
	}
	if(!result)
		result = psymb.PType.createUnknownType(); 
	return result;
}

export function convertTypeListToSymbolTypeArray(typeContext : pp.TypeListContext) : psymb.PType []
{
	let result : psymb.PType[] = [];
	let typesCtx = typeContext.typeType();
	for(let i=0; i<typesCtx.length; i++)
	{
		let type = convertTypeTypeToSymbolType(typesCtx[i]);
		result.push(type);
	}
	return result;
}

export function convertClassOrInterfaceIDToSymbolType(identifiers : pp.ClassOrInterfaceIdentifierContext[]) : psymb.PType | undefined
{
	let resultSymbol = convertClassOrInterfaceIDtoCallContext(identifiers[0]);
	let idIndex = 1;
	while(idIndex < identifiers.length)
	{
		resultSymbol = convertClassOrInterfaceIDtoCallContext(identifiers[idIndex]).setOutter(resultSymbol);
		idIndex++;
	}
	return resultSymbol;
}

export function convertClassOrInterfaceIDtoCallContext(ctx : pp.ClassOrInterfaceIdentifierContext) : psymb.PType
{
		let identifier = ctx.IDENTIFIER();
		let typeArguments = ctx.typeArguments();
		let idName : string = identifier.text;

		let genericArguments : psymb.PType[] = [];
		if(typeArguments)
		{
			let typeArgumentList = typeArguments.typeArgument();
			for(let i=0; i < typeArgumentList.length; i++)
			{
				let typeType = typeArgumentList[i].typeType();
				if(typeType)
					genericArguments.push( convertTypeTypeToSymbolType(typeType) );
			}
		}
		return psymb.PType.createComponentType(idName).setGenericTypes(genericArguments);
}

export function buildFullClassName(identifs: TerminalNode[]) : string
{
	let result = identifs[0].text;
	for(let i=1; i < identifs.length; i++)
	{
		result += '.';
		result += identifs[i].text;
	}
	return result;
}

export function convertTypeArgumentsToSymbolTypes(args : pp.TypeArgumentContext[], result: psymb.PType[])
{
	for(let j=0; j<args.length; j++)
	{
		let baseType : psymb.PType | undefined;
		let typeCtx = args[j].typeType();
		if(typeCtx)
			baseType = convertTypeTypeToSymbolType(typeCtx);
		if(!baseType)
			baseType = psymb.PType.createUnknownType();

		result.push(baseType);
	}
} 



export function convertPrimitiveTypeToSymbolType(primitive : pp.PrimitiveTypeContext) : psymb.PType
{

	if(primitive.CHAR())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Char);
	if(primitive.BYTE())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Byte);
	if(primitive.SHORT())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Short);
	if(primitive.INT())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
	if(primitive.LONG())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Long);
	if(primitive.FLOAT())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Float);
	if(primitive.DOUBLE())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Double);
	if(primitive.colorPrimitiveType())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Color)
	//if(primitive.BOOLEAN())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
	//return psymb.PType.createUnknownType(primitive.text);
}

function getPdeName(anySymbol: any) : string | undefined
{
	return anySymbol.pdeName;
}

export function findPdeName(baseSymbol : symb.BaseSymbol) : string | undefined
{
	let result : string | undefined = getPdeName(baseSymbol);
	if( result ) 
		return result;
	if(!baseSymbol.parent)
		return;
	return findPdeName(baseSymbol.parent);
}

export function convertAliasType( type: psymb.PType, callContext : psymb.CallContext ) : psymb.PType
{
    if( !callContext.symbol )
    {
        console.error("Unable to resolve Generic Alias: "+type.name)
        return type;
    }
	let resolved = callContext.getResolvedGeneric(type.name);
	if(resolved)
		return resolved;
		
	let genericParams = psymb.PUtils.getAllDirectChildSymbolSync(callContext.symbol, psymb.PGenericParamSymbol);
	//let genericParams = callContext.symbol.getNestedSymbolsOfTypeSync(psymb.PGenericParamSymbol);
	for(let i=0; i < genericParams.length; i++)
	{
		if(genericParams[i].name == type.name)
		{
			if(callContext.type && i < callContext.type.genericTypes.length )
				return callContext.type.genericTypes[i];

			if( genericParams[i].extends && i < genericParams[i].extends.length )
				return genericParams[i].extends[0];
		}
	}
    if(callContext.outter)
		return convertAliasType(type, callContext.outter);
    console.error("Unable to resolve generic type: "+type.name);
	return type;
}