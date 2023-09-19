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



export function convertTypeTypeToSymbolType(typeContext : pp.TypeTypeContext, scope: symb.ScopedSymbol) : psymb.PType
{
	let result : psymb.PType | undefined

	let classOrInterface : pp.ClassOrInterfaceTypeContext | undefined = typeContext.classOrInterfaceType();
	let primitive : pp.PrimitiveTypeContext | undefined =  typeContext.primitiveType();
	let arrayMultiSize : TerminalNode [] = typeContext.LBRACK();

	if(primitive)
		result = evaluatePrimitiveTypeToSymbolType(primitive);
	else if(classOrInterface)
		result = evaluateClassOrInterfaceTypeToSymbolType(classOrInterface, scope);

	if(arrayMultiSize.length > 0)
	{
		if(!result)
			result = psymb.PUtils.createTypeUnknown("<unknown>"); 
		
		let arraySize = arrayMultiSize.length;
		while(arraySize>0)
		{
			result = psymb.PUtils.createArrayType(result);
			arraySize--;
		}
	}
	if(!result)
		result = psymb.PUtils.createTypeUnknown("<unknown>"); 
	return result;
}

export function convertTypeListToSymbolTypeList(typeContext : pp.TypeListContext, scope: symb.ScopedSymbol) : psymb.PType []
{
	let result : psymb.PType[] = [];
	let typesCtx = typeContext.typeType();
	for(let i=0; i<typesCtx.length; i++)
	{
		let type = convertTypeTypeToSymbolType(typesCtx[i], scope, );
		result.push(type);
	}
	return result;
}

export function evaluateClassOrInterfaceTypeToSymbolType(classOrInterface : pp.ClassOrInterfaceTypeContext, scope: symb.ScopedSymbol) : psymb.PType | undefined
{
	let identifs = classOrInterface.IDENTIFIER();
	let genericArguments = classOrInterface.typeArguments();

	let typeName = buildFullClassName( identifs );
	let baseTypes : psymb.PType[] = [];

	if(genericArguments.length > 0)
		buildTypeArgumentsToSymbolTypes(genericArguments[0].typeArgument(), baseTypes, scope);


	return psymb.PUtils.createClassType( typeName, baseTypes );
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

export function buildTypeArgumentsToSymbolTypes(args : pp.TypeArgumentContext[], result: psymb.PType[], scope: symb.ScopedSymbol)
{
	for(let j=0; j<args.length; j++)
	{
		let baseType : psymb.PType | undefined;
		let typeCtx = args[j].typeType();
		if(typeCtx)
			baseType = convertTypeTypeToSymbolType(typeCtx, scope);
		if(!baseType)
			baseType = psymb.PUtils.createTypeUnknown();

		result.push(baseType);
	}
} 



export function evaluatePrimitiveTypeToSymbolType(primitive : pp.PrimitiveTypeContext) : psymb.PType
{
	if(primitive.BOOLEAN())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
	if(primitive.CHAR())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Char);
	if(primitive.BYTE())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Byte);
	if(primitive.SHORT())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Short);
	if(primitive.INT())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Int);
	if(primitive.LONG())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Long);
	if(primitive.FLOAT())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Float);
	if(primitive.DOUBLE())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Double);
	if(primitive.colorPrimitiveType())
		return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Color)

	return psymb.PUtils.createTypeUnknown(primitive.text);
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
	// let paramSymbol = psymb.PUtils.resolveSymbolSync(currentScope, psymb.PFormalParamSymbol, type.name);
	// if(paramSymbol && paramSymbol.extends.length > 0)
	// 	return paramSymbol.extends[0];

    if( !callContext.callerSymbol || !callContext.callerType  )
    {
        console.error("Unable to resolve Generic Alias: "+type.name)
        return type;
    }
    if(callContext.callerSymbol instanceof symb.ScopedSymbol)
    {
        let genericParams = callContext.callerSymbol.getNestedSymbolsOfTypeSync(psymb.PFormalParamSymbol);
        for(let i=0; i < genericParams.length; i++)
        {
            if(genericParams[i].name == type.name)
            {
                if( callContext.callerType.baseTypes.length >= i )
                    return callContext.callerType.baseTypes[i];
            }
        }
    }
    
    // for( let baseType of callContext.callerType.baseTypes )
    // {
    //     if(baseType.name == type.name)
    //         return baseType.baseTypes[0];
    // }
    console.error("Unable to resolve generic type: "+type.name);
	return type;
}