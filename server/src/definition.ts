import * as sketch from './sketch'
import * as parseUtils from './astutils'
import { Definition, LocationLink, Location, Range } from 'vscode-languageserver'
import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import * as ast from 'antlr4ts/tree'
import * as symbols from 'antlr4-c3'
import { DocumentUri } from 'vscode-languageserver-textdocument'
import * as symb from './symbols'
import * as pp from './grammer/ProcessingParser';

export async function scheduleLookUpDefinition(pdeName: string, line: number, pos: number): Promise<Definition | null>
{
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return null;

	let definition : symbols.BaseSymbol | undefined;
	//let definition : symbols.BaseSymbol | undefined = await lookUpSymbolDefinition(pdeInfo.symbols, line, pos);
	// Finds for the symbol (block or scope) that contains our searched identifier
	let symbolContainer : symbols.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!symbolContainer || !symbolContainer.context)
		return null;
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ParseTree | null = parseUtils.findIdentifierAtPosition(symbolContainer.context, line, pos);
	if(!parseNode || !(parseNode instanceof ast.TerminalNode))
		return null;
	
	// We now filter out if the terminal node matches the symbolContainer
	// (means is also a declaration of some kind since we only record declarations)
	if(symbolContainer.context === parseNode.parent)
		definition = symbolContainer;
	else
		definition = pdeInfo.refs?.findNodeSymbolDefinition(parseNode);

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


export function resolveSymbolDeclaration(ctx : TerminalNode, callContainer : symbols.BaseSymbol) : symbols.BaseSymbol | undefined
{
	// We try to resolve when the identifiers refers to a specific expression container
	// className.anotherObject.focusedMethod( ... )
	let contextSymbol : symbols.BaseSymbol | null | undefined = resolveContainer(ctx.parent, callContainer);
	if(contextSymbol===undefined)
	{
		console.error(`Unable to find the right context for ${ctx.text}`);
		return;
	}
	// if null means there is no specific context or object container for this identifier
	if(contextSymbol===null)
		contextSymbol = callContainer;

	if(ctx.parent instanceof pp.MethodCallContext)
		return resolveMethodCall(ctx.text, ctx.parent.expressionList(), contextSymbol, callContainer);
	else
	{
		let shouldCheckOnlyLocals : boolean = (contextSymbol != callContainer);
		return contextSymbol.resolveSync(ctx.text,shouldCheckOnlyLocals);
	}
}

export function resolveMethodCall(id : string, expressionList : pp.ExpressionListContext | undefined, contextSymbol : symbols.BaseSymbol, callContainer : symbols.BaseSymbol) : symbols.BaseSymbol | undefined
{
	let finalCandidates : symbols.BaseSymbol [] = [];
	
	// first we search for any candidate that matches the symbol name
	let candidates : symbols.BaseSymbol [] = [];
	let shouldCheckOnlyLocals : boolean = (contextSymbol != callContainer);
	resolveByName(id, contextSymbol, candidates, shouldCheckOnlyLocals);

	for(let candidate of candidates)
	{
		if(!(candidate instanceof symbols.MethodSymbol) )
			continue;

		if(expressionList)
		{
			let params = candidate.getNestedSymbolsOfTypeSync(symbols.ParameterSymbol);
			if(!compareMethodParameters(params, expressionList, callContainer))
				continue;

		}
		// if(candidate instanceof symbols.VariableSymbol && isMethodCall)
		// 	continue;

		finalCandidates.push(candidate);
	}
	return finalCandidates.length == 1 ? finalCandidates[0] : undefined;
}

function resolveByName(name: string, context : symbols.BaseSymbol, results : symbols.BaseSymbol [],  localOnly : boolean = false)
{
	let anyMatch : symbols.BaseSymbol | undefined;
	if(context instanceof symbols.SymbolTable)
	{
		let result = context.resolveSync(name, false);
		if(result !== undefined)
			results.push(result);
	}
	else
	{
		if(context instanceof symbols.ClassSymbol)
		{
			for(let i:number=0; i < context.extends.length; i++)
				resolveByName(name, context.extends[i], results, true);
		}
		anyMatch = context.resolveSync(name, true);
		if(anyMatch !== undefined)
		{
			let child : symbols.BaseSymbol | undefined = anyMatch;
			while(child !== undefined)
			{
				if(child.name === name)
					results.push(child);
				child = child.nextSibling;
			}
		}
	
		// Nothing found locally. Let the parent continue.
		if (!localOnly) {
			if (context.parent) {
				return resolveByName(name, context.parent, results, false);
			}
		}
	}

	return undefined;

}

function compareMethodParameters(symbolParams : symbols.ParameterSymbol [], contextParams : pp.ExpressionListContext, symbolContext : symbols.BaseSymbol) : boolean
{
	let paramList : pp.ExpressionContext [] | undefined = contextParams.expression();
	for(let i : number = 0; i < symbolParams.length; i++)
	{
		if(i < paramList.length )
		{
			if( !checkParameterSymbolExpression(symbolParams[i].type, paramList[i], symbolContext) )
				return false;
		}
		else if(!symbolParams[i].value)
			return false;
		
	}
	return true;
}

function checkParameterSymbolExpression(symbolType : symbols.Type | undefined, paramExpression : pp.ExpressionContext, symbolContext : symbols.BaseSymbol) : boolean
{
	if(symbolType===undefined)
		return false;

	let prim : pp.PrimaryContext | undefined = paramExpression.primary();
	let methodCall : pp.MethodCallContext | undefined = paramExpression.methodCall();
	let typeCast : pp.TypeTypeContext |undefined = paramExpression.typeType()
	if( prim )
	{
		let literal : pp.LiteralContext | undefined = prim.literal();
		if(prim.THIS())
		{
			let objSymbol : symbols.ClassSymbol | symbols.InterfaceSymbol | undefined = symb.findFirstClassOrInterfaceUp(symbolContext);
			if(objSymbol===undefined)
				return false;
			return checkIsClassOrInterface(symbolType.name, objSymbol);
		}
		else if(prim.IDENTIFIER())
		{
			let variab : symbols.VariableSymbol | undefined = symb.resolveVariableDeclaration(prim.text, symbolContext);
			return (variab !== undefined) && (variab.type!==undefined)
			 && variab.type.name == symbolType.name;
		}
		else if(literal)
		{
			if(literal.integerLiteral())
				return "int" == symbolType.name;
			else if(literal.floatLiteral())
				return "float" == symbolType.name;
			else if(literal.CHAR_LITERAL())
				return "char" == symbolType.name;
			else if(literal.stringLiteral())
				return "float" == symbolType.name;
			else if(literal.BOOL_LITERAL())
				return "bool" == symbolType.name;
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
	{
		let classOrInterface : pp.ClassOrInterfaceTypeContext | undefined = typeCast.classOrInterfaceType();
		let primitiveType : pp.PrimitiveTypeContext | undefined = typeCast.primitiveType();
		if(classOrInterface)
		{
			let objSymbol = symbolContext.resolveSync(classOrInterface.IDENTIFIER()[0].text, false);
			if(objSymbol instanceof symbols.ClassSymbol || objSymbol instanceof symbols.InterfaceSymbol)
				return checkIsClassOrInterface(symbolType.name, objSymbol);
			return false;
		}
		else if(primitiveType)
			return primitiveType.text === symbolType.name;
	}
	return true;
}

function checkIsClassOrInterface(symbolTypeName : string, classOrInterface : symbols.ClassSymbol | symbols.InterfaceSymbol) : boolean
{
	if( classOrInterface.name === symbolTypeName )
		return true;
	for( let ext of classOrInterface.extends )
	{
		if(checkIsClassOrInterface(symbolTypeName, ext))
			return true;
	}
	if(classOrInterface instanceof symbols.ClassSymbol)
	{
		for( let impl of classOrInterface.implements )
		{
			if(checkIsClassOrInterface(symbolTypeName, impl))
				return true;
		}
	}
	return false;
}

export function resolveContainer(ctx: ParseTree | undefined, symbolContainer : symbols.BaseSymbol) : symbols.BaseSymbol | null | undefined
{
	if(!ctx)
		return symbolContainer;

	if(ctx instanceof pp.MethodCallContext)
	{
		let result : symbols.BaseSymbol | null | undefined = resolveContainer(ctx.parent, symbolContainer);
		if(result===undefined)
		{
			console.error(`Unable to find the right context for ${ctx.text}`);
			return;
		}
		if(result!==null)
			symbolContainer = result;
	}
	else if(ctx instanceof pp.CreatedNameContext)
	{
		if(ctx.primitiveType() || !(ctx.parent instanceof pp.CreatorContext) )
			return symbolContainer;

		let classCreator : pp.ClassCreatorRestContext | undefined = ctx.parent.classCreatorRest();
		let arrayCreator : pp.ArrayCreatorRestContext | undefined = ctx.parent.arrayCreatorRest();
		if( classCreator )
		{
			if(!classCreator.classBody())
				symbolContainer = symb.resolveSymbolType(ctx.IDENTIFIER()[0].text, symbolContainer);
		}
		else if( arrayCreator )
		{
			//result = symbolContainer;
		}
	}
	else if(ctx instanceof pp.ExpressionContext)
	{
		let expressions : pp.ExpressionContext [] = ctx.expression();
		if( expressions && expressions.length == 1 )
		{
			let expression : pp.ExpressionContext = expressions[0];
			let result = resolveExpressionSymbol(expression, symbolContainer);
			if(result)
				symbolContainer = result;
		}
	}
	else if(ctx instanceof TerminalNode)
	{
		
	}
	return symbolContainer;
}

export function resolveExpressionSymbol(ctx: pp.ExpressionContext, symbolContainer : symbols.BaseSymbol) : symbols.BaseSymbol | undefined
{
	let prim : pp.PrimaryContext | undefined = ctx.primary();
	let methodCall : pp.MethodCallContext | undefined = ctx.methodCall();
	let expression : pp.ExpressionContext[] = ctx.expression();
	let identif : TerminalNode | undefined = ctx.IDENTIFIER();
	if( prim )
		return resolvePrimarySymbol(prim, symbolContainer);
	else if(identif)
	{
		//if(methodCall)
	}
	else if(methodCall)
	{
		// const line = ctx.start.line;
		// const pos = ctx.start.charPositionInLine;
		// let currentScope : symbols.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, line, pos+1);
		// if(currentScope && currentScope.context)
		// {
		// 	let contextSymbol : symbols.BaseSymbol | undefined = currentScope;
		// 	let methodDef : symbols.BaseSymbol | undefined;
		// 	if(expression && expression.length==1)
		// 		contextSymbol = resolveExpressionSymbol(expression[0], currentScope);
			//if(contextSymbol!==undefined)
				//methodDef = resolveMethodCall(methodID.text, methodCall, this.contextSymbol?this.contextSymbol:currentScope, currentScope);
			//this.registerDefinition(methodID, methodDef);

		//}
	}
	return;
}

export function resolvePrimarySymbol(prim: pp.PrimaryContext, symbolContainer : symbols.BaseSymbol) : symbols.BaseSymbol | undefined
{

	if(prim.THIS())
		return symb.findFirstClassOrInterfaceUp(symbolContainer);

	else if(prim.IDENTIFIER())
		return symb.resolveSymbolType(prim.text, symbolContainer);

	return;
}


function checkMethodCallContext(ctx : ParseTree | undefined) : boolean
{
	return ctx instanceof pp.MethodCallContext ||
			ctx instanceof pp.CreatedNameContext;
}

function calcDefinitionRange(ctx : ParseTree | undefined) : Range | null
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


