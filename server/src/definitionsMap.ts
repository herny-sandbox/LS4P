import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, TerminalNode } from 'antlr4ts/tree'
import { PComponentSymbol } from './antlr-sym/src/PComponentSymbol';
import { PdeContentInfo } from "./sketch";
import { Token } from 'antlr4ts'
import { Range } from 'vscode-languageserver'
import * as symb from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import * as parseUtils from './astutils'
import * as psymb from "./antlr-sym"

let integralTypes = [ 
	psymb.PPrimitiveKind.Boolean,
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short,
	psymb.PPrimitiveKind.Color
 ];
 let incrementableTypes = [
	psymb.PPrimitiveKind.Char,
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short,
	psymb.PPrimitiveKind.Float,
	psymb.PPrimitiveKind.Double,
 ]

export class UsageVisitor extends AbstractParseTreeVisitor<psymb.PType | undefined> implements ProcessingParserVisitor<psymb.PType | undefined>
{
	private mainClass : psymb.PClassSymbol;
	private pdeInfo: PdeContentInfo;
	private symbolTable : psymb.PSymbolTable;

	constructor(symbolTable : psymb.PSymbolTable, mainClass : psymb.PClassSymbol, pdeInfo: PdeContentInfo) 
	{ 
		super();
		this.symbolTable = symbolTable;
		this.pdeInfo = pdeInfo;
		this.mainClass = mainClass; 
	}
	protected defaultResult(): psymb.PType | undefined { return this.mainClass; }

	visitClassDeclaration(ctx: pp.ClassDeclarationContext) : psymb.PType | undefined
	{
		let classIdentifier = ctx.IDENTIFIER();
		let classBody = ctx.classBody();
		let typeParams = ctx.typeParameters();
		let extendsCtx = ctx.typeType();
		let implemCtx =ctx.typeList();

		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);

		if(extendsCtx)
			this.registerUsageForTypeType(extendsCtx, currentScope);
		if(implemCtx)
		{
			let typesCtx = implemCtx.typeType();
			for(let i=0; i<typesCtx.length; i++)
				this.registerUsageForTypeType(typesCtx[i], currentScope);
		}
		if(typeParams)
		{
			let params = typeParams.typeParameter();
			for(let param of params)
			{
				let bound = param.typeBound();

				if(bound)
				{
					let boundTypesCtx = bound.typeType();
					
					for(let boundTypeCtx of boundTypesCtx)
						this.registerUsageForTypeType(boundTypeCtx, currentScope);
				}
			}
		}
		this.visit(classBody);
		return;
	}
	visitEnhancedForControl(ctx: pp.EnhancedForControlContext) : psymb.PType | undefined
	{
		let iteratorType = this.visitExpression(ctx.expression());
		let typeType = ctx.typeType();
		this.registerUsageForDeclarationType(typeType);
		this.visitChildren(ctx.variableDeclaratorId());
		return;
	}
	visitForControl(ctx: pp.ForControlContext): psymb.PType | undefined
	{
		let enhanced = ctx.enhancedForControl();
		if(enhanced)
			this.visitEnhancedForControl(enhanced);
		else
		{
			let forInit = ctx.forInit();
			let comparerExpression = ctx.expression();
			let updateExpression = ctx.expressionList();
			if(forInit)
				this.visitChildren(forInit);
			if(comparerExpression)
			{
				let currentScope = this.findScopeAtToken(comparerExpression.start);
				let expressionResult = this.visitAndRegisterExpression(comparerExpression, currentScope);
				if(expressionResult && !psymb.PUtils.comparePrimitiveKind(expressionResult, psymb.PPrimitiveKind.Boolean, currentScope) )
					this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${expressionResult.name})`, comparerExpression)
				else if(!expressionResult)
					this.pdeInfo.notifyCompileError(`Unable to evaluate expression (${comparerExpression.text})`, comparerExpression)
			}
			if(updateExpression)
				this.visitChildren(updateExpression);
		}
		return;
	}

	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext) : psymb.PType | undefined 
	{
		this.registerUsageForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}
	
	visitFormalParameter(ctx: pp.FormalParameterContext) : psymb.PType | undefined
	{
		this.registerUsageForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclaratorId());
	}

	visitFieldDeclaration(ctx: pp.FieldDeclarationContext) : psymb.PType | undefined
	{
		this.registerUsageForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}

	visitMethodDeclaration(ctx: pp.MethodDeclarationContext) : psymb.PType | undefined
	{
		let returnTypeOrVoid : pp.TypeTypeOrVoidContext = ctx.typeTypeOrVoid();
		let returnTypeCtx = returnTypeOrVoid.typeType();
		if(returnTypeCtx)
			this.registerUsageForDeclarationType(returnTypeCtx);

		this.visitTerminal(ctx.IDENTIFIER());
		this.visitChildren(ctx.formalParameters());
		this.visitChildren(ctx.methodBody());
		return;
	};

	visitExpression(ctx: pp.ExpressionContext) : psymb.PType | undefined
	{
		return this.visitAndRegisterExpression(ctx, this.findScopeAtToken(ctx.start));
	}

	visitAndRegisterExpression(ctx: pp.ExpressionContext, currentScope: symb.ScopedSymbol) : psymb.PType | undefined
	{
		let methodCall : pp.MethodCallContext | undefined = ctx.methodCall();
		let expressions : pp.ExpressionContext[] = ctx.expression();
		let primary : pp.PrimaryContext | undefined = ctx.primary();
		let identif : TerminalNode | undefined = ctx.IDENTIFIER();
		let creator : pp.CreatorContext | undefined = ctx.creator();
		let typeTypeCtx : pp.TypeTypeContext | undefined = ctx.typeType();
		let expression : pp.ExpressionContext | undefined;

		if(expressions.length>0)
			expression = expressions[0];
		
		let paren = ctx.LPAREN();
		let dot = ctx.DOT();
		let instanceOf = ctx.INSTANCEOF();

		if(primary) 														// : primary
			return this.visitAndRegisterPrimary(primary, currentScope);

		else if(expressions.length == 1 && ctx.DOT() && identif)
			return this.visitAndRegisterVariable(expression, ctx.DOT(), identif, currentScope);
		
		else if(expressions.length == 2 && ctx.LBRACK() ) 					// | expression '[' expression ']'
		{
			let symbType = this.visitAndRegisterExpression(expressions[0], currentScope);
			this.visitAndRegisterExpression(expressions[1], currentScope);

			if(!symbType)
			{
				this.pdeInfo.notifyCompileError("Unable to evaluate expression: "+expressions[0].text, expressions[0]);
				symbType = psymb.PUtils.createTypeUnknown();
			}

			symbType = psymb.PUtils.cloneType(symbType);
			symbType.reference = symb.ReferenceKind.Instance;
			if(symbType && symbType.typeKind == psymb.PTypeKind.Array && symbType.baseTypes.length > 0)
				symbType = symbType.baseTypes[0];
			return symbType;
		}
		else if(methodCall)													// | methodCall
			return this.visitAndRegisterMethodCall(expression, dot, methodCall, currentScope);

		else if( ctx.NEW() && creator )										// | NEW creator
			return this.visitAndRegisterCreator(creator, currentScope);

		else if( paren && typeTypeCtx && expression )
		{
			let result = this.visitAndRegisterExpression(expression, currentScope);
			this.registerUsageForTypeType(typeTypeCtx, currentScope);
			let castType = parseUtils.convertTypeTypeToSymbolType(typeTypeCtx, currentScope);

			return castType;
		}
		else if( expression && instanceOf && typeTypeCtx)
		{
			let expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.registerUsageForDeclarationType(typeTypeCtx);
			return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
		}
		else if(expressions)
		{
			let results : psymb.PType[] = [];
			for(let i=0; i < expressions.length; i++)
			{
				let result = this.visitAndRegisterExpression(expressions[i], currentScope);
				if(!result)
					result = psymb.PUtils.createTypeUnknown();
				results.push(result);
			}

			if(results.length==3 )
			{
				if( ctx.QUESTION() )										// expression '?' expression ':' expression
					return results[1];
			}
			else if(results.length==2)
			{
				let gt = ctx.GT();
				let lt = ctx.LT();

				if(ctx.ASSIGN())											// expression = expression
					return results[0];

				else if(gt.length == 1 || lt.length==1)											// expression ('<'|'>') expression
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);

				else if(ctx.EQUAL() )										// expression '==' expression	
				{
					if(!psymb.PUtils.checkComparableTypes(results[0], results[1], currentScope))
						this.pdeInfo.notifyCompileError(`Incompatible types in expression (${results[0].name}) == (${results[1].name})`, ctx);

					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.NOTEQUAL())										// expression '!=' expression	
				{
					if(!psymb.PUtils.checkComparableTypes(results[0], results[1], currentScope))
						this.pdeInfo.notifyCompileError(`Incompatible types in expression (${results[0].name}) != (${results[1].name})`, ctx);

					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.LE() || ctx.GE() )								// expression ('<='|'>=') expression
				{
					if( results[0].typeKind != results[1].typeKind )				
						this.pdeInfo.notifyCompileError(`Incompatible types in expression: possible lossy conversion (${results[0].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.AND() )											// expression '&&' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean, currentScope) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[0].name})`, expressions[0])
					if( !psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean, currentScope) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.OR() )											// expression '||' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean, currentScope) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[0].name})`, expressions[0])
					if( !psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean, currentScope) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.ADD() )											// expression '+' expression
				{
					if( this.IsTypeStringType(results[0], currentScope) || this.IsTypeStringType(results[1], currentScope) )
						return psymb.PUtils.createStringType();
					return results[0];
				}
				else if(ctx.SUB() )											// expression '-' expression
				{
					return results[0];
				}
				else if(ctx.MUL() )											// expression '*' expression
				{
					return results[0];
				}
				else if(ctx.DIV() )											// expression '/' expression
				{
					return results[0];
				}
				else if(ctx.BITAND())										// expression '&' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.BITOR())										// expression '|' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.CARET())										// expression '^' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.MOD())											// expression '%' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(lt.length==2 || gt.length==2)						// expression ('<<' | '>>') expression
					return results[0];
				else if(ctx.ADD_ASSIGN())									// expression '+=' expression
					return results[0];
				else if(ctx.ADD_ASSIGN())									// expression '+=' expression
					return results[0];
				else if(ctx.SUB_ASSIGN())									// expression '-=' expression
					return results[0];
				else if(ctx.MUL_ASSIGN())									// expression '*=' expression
					return results[0];
				else if(ctx.DIV_ASSIGN())									// expression '/=' expression
					return results[0];
				else if(ctx.AND_ASSIGN())									// expression '&=' expression
					return results[0];
				else if(ctx.OR_ASSIGN())									// expression '|=' expression
					return results[0];
				else if(ctx.XOR_ASSIGN())									// expression '^=' expression
					return results[0];
				else if(ctx.MOD_ASSIGN())									// expression '%=' expression
					return results[0];
				else if(ctx.LSHIFT_ASSIGN())									// expression '<<=' expression
					return results[0];
				else if(ctx.RSHIFT_ASSIGN())									// expression '>>=' expression
					return results[0];
				else if(ctx.URSHIFT_ASSIGN())									// expression '>>>=' expression
					return results[0];
			}
			if(results.length==1)
			{
				if(ctx.BANG())												// '!' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type. Expression should be of boolean type (${results[0].name})`, expressions[0]);
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.TILDE())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression: possible lossy conversion (${results[0].name})`, expressions[0]);
					return results[0]
				}
				else if(ctx.INC())											// '++' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], incrementableTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible type using operator ++ (${results[0].name})`, expressions[0]);
					return results[0];
				}
				else if(ctx.DEC())											// '--' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], incrementableTypes, currentScope) )
						this.pdeInfo.notifyCompileError(`Incompatible types using operator -- (${results[0].name})`, expressions[0]);
					return results[0];
				}
				else if(ctx.ADD())											// '+' expression
				{
					return results[0];
				}
				else if(ctx.SUB())											// '-' expression
				{
					return results[0];
				}
			}
		}
		else
			this.visitChildren(ctx);
	}

	visitAndRegisterCreator(creator: pp.CreatorContext, currentScope: symb.ScopedSymbol) : psymb.PType | undefined
	{
		let result : psymb.PType | undefined;
		let createdName : pp.CreatedNameContext | undefined = creator.createdName();
		let typeArguments = createdName.typeArgumentsOrDiamond();
		let identifiers = createdName.IDENTIFIER();
		let classCreator : pp.ClassCreatorRestContext | undefined = creator.classCreatorRest();
		let arrayCreator : pp.ArrayCreatorRestContext | undefined = creator.arrayCreatorRest();
		if( classCreator )
		{
			let paramExpressionList : pp.ExpressionListContext = classCreator.arguments().expressionList();

			let fullClassPath =  parseUtils.buildFullClassName( identifiers );
			let className = psymb.PUtils.getClassName(fullClassPath);
			let methodID = identifiers[identifiers.length-1];

			this.registerUsageForIdentifiers(identifiers, currentScope);

			let genericParams : psymb.PType [] = []; 
			//let paramsList : pp.ExpressionListContext | undefined;
			let args : pp.TypeArgumentContext [] = typeArguments[0]?.typeArguments()?.typeArgument() ?? [];

			parseUtils.buildTypeArgumentsToSymbolTypes(args , genericParams, currentScope);

			let classType = psymb.PUtils.createClassType(fullClassPath, genericParams);
			this.visitMethodCallRaw(classType, methodID, className, paramExpressionList, currentScope);
			result = classType;
		}
		else if( arrayCreator )
		{
			//result = symbolContainer;
		}
		return result;
	}

	// visitTerminal(node: TerminalNode) : symb.Type | undefined
	// {
	// 	if(node.symbol.type == pp.ProcessingParser.IDENTIFIER)
	// 	{
	// 		let focusedDecl : symb.BaseSymbol | undefined = this.pdeInfo.findNodeSymbolDefinition(node);
	// 		if(focusedDecl===undefined)
	// 			this.pdeInfo.registerDefinition(node, focusedDecl);
	// 		return;
	// 	}
	// }

	visitAndRegisterMethodCall(expression: pp.ExpressionContext|undefined, dot:TerminalNode|undefined, methodCall: pp.MethodCallContext, currentScope: symb.ScopedSymbol) : psymb.PType | undefined
	{
		let methodID =  methodCall.IDENTIFIER();
		let thisCall = methodCall.THIS();
		let superCall = methodCall.SUPER();
	
		let callScope: symb.IScopedSymbol = currentScope;
		let expressionType : psymb.PType | undefined;
		let caster = methodCall.functionWithPrimitiveTypeName();
		let paramExpressionList = methodCall.expressionList();

		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dot, expressionType);
			this.pdeInfo.registerContextType(methodID, expressionType);

			if(expressionType)
				callScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, expressionType);
		}

		if(caster)
		{
			let booleanCast = caster.BOOLEAN();
			let byteCast = caster.BYTE();
			let charCast = caster.CHAR();
			let floatCast = caster.FLOAT();
			let intCast = caster.INT();
			let colorCast = caster.COLOR();
			let expressionToCast = caster.expressionList();

			if(expressionToCast)
				this.visitAndRegisterExpressionList(expressionToCast, currentScope);
			if(booleanCast)
				return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
			else if(byteCast)
				return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Byte);
			else if(charCast)
				return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Char);
			else if(floatCast)
				return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Float);
			else if(intCast)
				return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Int);
			else // colorCast
				return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Color);
		}
		else if(methodID)
		{
			return this.visitMethodCallRaw(expressionType, methodID, methodID.text, paramExpressionList, currentScope);
		}
		else if(thisCall)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope);
			if(result)
				this.visitMethodCallRaw(result, thisCall, result.name, paramExpressionList, currentScope);
		}
		else if(superCall)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope);
			if(result && result instanceof psymb.PClassSymbol)
			{
				// Calling the constructor from the super class
				if(result.extends)
				{
					let className = psymb.PUtils.getClassName(result.extends.name);
					this.visitMethodCallRaw(result.extends, superCall, className, paramExpressionList, currentScope);
				}
				return;
			}

		}
	}

	visitMethodCallRaw(callerType: psymb.PType|undefined, methodID:TerminalNode, methodName:string, paramExpressionList:pp.ExpressionListContext|undefined, currentScope:symb.ScopedSymbol ) : psymb.PType 
	{
		let callScope = currentScope;
		if(callerType)
			callScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, callerType);
		
		let localOnly = callScope !== currentScope;

		let callContext : psymb.CallContext = new psymb.CallContext();
		callContext.callerType = callerType;
		callContext.callerSymbol = callScope;

		let expressionParams = this.visitAndRegisterExpressionList(paramExpressionList, currentScope);

		let candidates = psymb.PUtils.getAllSymbolsSync(callScope, symb.MethodSymbol, methodName, localOnly);
		let match : symb.MethodSymbol | undefined;

		if(candidates.length == 1)
			match = candidates[0];
		else if(candidates.length > 1)
		{
			match = this.checkCandidatesMatch(callContext, candidates, expressionParams, currentScope, true);
			if(!match)
				match = this.checkCandidatesMatch(callContext, candidates, expressionParams, currentScope, false);
		}
		else if(candidates.length == 0 && callScope.name == methodName ) // Is a constructor? could be not explicity defined
			return;
		
		this.pdeInfo.registerDefinition(methodID, match);
		if(!match)
			return;

		if(!match.returnType || match.returnType.name == "void")
			return;
		let returnType = psymb.PUtils.typeToPType(match.returnType);
		if(returnType.typeKind == psymb.PTypeKind.Generic)
			return parseUtils.convertAliasType(returnType, callContext);
		else
			return returnType;
	}

	visitAndRegisterExpressionList(expressionList: pp.ExpressionListContext|undefined, currentScope: symb.ScopedSymbol) : psymb.PType []
	{
		let results : psymb.PType [] = [];
		if(expressionList)
		{
			let expressions : pp.ExpressionContext [] | undefined = expressionList.expression();
			if(expressions)
			{
				for(let i : number = 0; i < expressions.length; i++)
				{
					let expressionType = this.visitAndRegisterExpression(expressions[i], currentScope);
					if(!expressionType)
						expressionType = psymb.PUtils.createTypeUnknown("unknown");
					results.push(expressionType);
				}
				
			}

		}
		return results;
	}

	visitAndRegisterPrimary(primary: pp.PrimaryContext, currentScope: symb.ScopedSymbol) : psymb.PType | undefined
	{
		let thisCtx = primary.THIS();
		let identif = primary.IDENTIFIER();
		let literal = primary.literal();
		let expression = primary.expression();
		let superExpr = primary.SUPER();
		let typeTypeOrVoid = primary.typeTypeOrVoid();
		let classToken = primary.CLASS();

		if(expression)
			return this.visitAndRegisterExpression(expression, currentScope);

		else if(thisCtx)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope)
			this.pdeInfo.registerDefinition(thisCtx, result);
			return result;
		}
		if(superExpr)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope);
			if(result && result instanceof psymb.PClassSymbol)
			{
				let extSymb;
				if(result.extends)
					extSymb = psymb.PUtils.resolveComponentSync(currentScope, psymb.PClassSymbol, result.extends.name)

				this.pdeInfo.registerDefinition(superExpr, result);
				return result;
			}
				
		}
		else if(literal)
			return this.visitAndRegisterLiteral(literal, currentScope);

		else if(identif)
			return this.visitAndRegisterVariable(undefined, undefined, identif, currentScope);
		else if(typeTypeOrVoid && classToken)
		{
			let typeType = typeTypeOrVoid.typeType();
			if(typeType)
			{
				let baseTypes : psymb.PType [] = [];
				baseTypes.push( parseUtils.convertTypeTypeToSymbolType(typeType, currentScope) );
				return psymb.PUtils.createClassType("java.lang.Class", baseTypes);
			}
				
		}
	}

	visitAndRegisterLiteral(literal: pp.LiteralContext, currentScope: symb.ScopedSymbol) : psymb.PType | undefined
	{
		if(literal.integerLiteral())
			return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Int);
		else if(literal.floatLiteral())
			return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Float);
		else if(literal.CHAR_LITERAL())
			return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Char);
		else if(literal.stringLiteral())
			return psymb.PUtils.createStringType()
		else if(literal.BOOL_LITERAL())
			return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
		else if(literal.NULL_LITERAL())
			return psymb.PUtils.createNullType();
		else if(literal.hexColorLiteral())
			return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Color);
	}

	visitAndRegisterVariable(expression: pp.ExpressionContext|undefined, dot: TerminalNode|undefined, identifier: TerminalNode, currentScope: symb.ScopedSymbol) : psymb.PType | undefined
	{
		let varScope = currentScope;
		let varName = identifier.text;
		let expressionType : psymb.PType | undefined;
		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dot, expressionType);
			this.pdeInfo.registerContextType(identifier, expressionType);
			if(expressionType)
			{
				// A very special built-in case
				if(expressionType.typeKind == psymb.PTypeKind.Array && varName == 'length')
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Int);
				
				varScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, expressionType);
			}
		}
		let localOnly = varScope != currentScope;

		let varSymbol : symb.VariableSymbol | undefined = psymb.PUtils.resolveSymbolSync(varScope, symb.VariableSymbol, varName, localOnly );
		if(varSymbol)
		{
			let varType : psymb.PType = psymb.PUtils.typeToPType(varSymbol.type);
			this.pdeInfo.registerDefinition(identifier, varSymbol);
			if(varSymbol.type)
				return psymb.PUtils.cloneTypeAsInstance(psymb.PUtils.typeToPType(varSymbol.type));
			else
				return psymb.PUtils.createTypeUnknown();
		}
		else if(varScope instanceof psymb.PEnumSymbol)
		{
			let compSymbol : psymb.PEnumMemberSymbol | undefined = psymb.PUtils.resolveSymbolSync(varScope, psymb.PEnumMemberSymbol, varName, localOnly );
			this.pdeInfo.registerDefinition(identifier, compSymbol);
		}
		else
		{
			let compSymbol : psymb.PComponentSymbol | undefined = psymb.PUtils.resolveComponentSync(varScope, psymb.PComponentSymbol, varName );
			this.pdeInfo.registerDefinition(identifier, compSymbol);

			if(compSymbol instanceof psymb.PNamespaceSymbol)
				return psymb.PUtils.createNamespaceType(compSymbol.qualifiedName(psymb.PNamespaceSymbol.delimiter, true, false));
			if(compSymbol instanceof psymb.PClassSymbol )
				return compSymbol;
			else if(compSymbol instanceof psymb.PInterfaceSymbol )
				return compSymbol;
			else if(compSymbol instanceof psymb.PEnumSymbol )
				return compSymbol;
		}
	}

	checkCandidatesMatch(callContext : psymb.CallContext, candidates: symb.MethodSymbol[], expressionList: psymb.PType[], callContainer: symb.ScopedSymbol, perfectMatch:boolean=false) 
	{
		let finalCandidates: symb.MethodSymbol[] = []
		for (let candidate of candidates) 
		{
			let lastIsVarg = psymb.PUtils.hasMethodLastVargs(candidate);
			let requiredParams = psymb.PUtils.getAllDirectChildSymbolSync(candidate, symb.ParameterSymbol, undefined);
			//let requiredParams = candidate.child(symb.ParameterSymbol);
			if (!this.compareMethodParameters(callContext, requiredParams, lastIsVarg, expressionList, callContainer, perfectMatch))
				continue;

			finalCandidates.push(candidate)
		}
		if(finalCandidates.length==0)
			return undefined;

		return finalCandidates[0];
	}

	compareMethodParameters(callContext : psymb.CallContext, requiredParams : symb.ParameterSymbol [], lastIsVarg:boolean, userParams : psymb.PType[], symbolContext : symb.ScopedSymbol, perfectMatch:boolean=false) : boolean
	{
		let lastParam : psymb.PType | undefined;
		if(lastIsVarg && requiredParams.length > 0 )
		{
			let lastType = psymb.PUtils.typeToPType(requiredParams[requiredParams.length-1].type);
			if(lastType && lastType.typeKind == psymb.PTypeKind.Array && lastType.baseTypes.length > 0)
				lastParam = psymb.PUtils.typeToPType(lastType.baseTypes[0]);
		}
		for(let i : number = 0; i < requiredParams.length || i < userParams.length; i++)
		{
			let requiredParam : psymb.PType | undefined;
			let argParam : symb.Type | undefined; 

			if(i < requiredParams.length )
				argParam = requiredParams[i].type;

			if( lastIsVarg && (i >= (requiredParams.length-1)) )
				requiredParam = lastParam;
			else
				requiredParam = psymb.PUtils.typeToPType(argParam);

			let isVArg : boolean = (i >= (requiredParams.length-1)) && lastIsVarg;
			let appliedParam : psymb.PType | undefined = i < userParams.length ? userParams[i] : undefined;
			if( !appliedParam && isVArg )
				break;
			if( !requiredParam || !appliedParam )
				return false;

			if( perfectMatch && requiredParam.typeKind == psymb.PTypeKind.Class && psymb.PUtils.isDefaultObjectPath(requiredParam.name) )
				return true;

			if(requiredParam.typeKind == psymb.PTypeKind.Generic)
				requiredParam = parseUtils.convertAliasType(requiredParam, callContext);

			if( !this.compareReferenceAgainstInstance(requiredParam, appliedParam, symbolContext, perfectMatch))
				return false;
		}
		return userParams.length <= requiredParams.length || lastIsVarg;
	}

	compareReferenceAgainstInstance(referenceType : psymb.PType | undefined, instanceType : psymb.PType | undefined, symbolContext : symb.ScopedSymbol, perfectMatch:boolean=false) : boolean
	{
		if(referenceType===undefined || instanceType === undefined)
			return false;

		if(psymb.PUtils.checkComparableTypes(referenceType, instanceType, symbolContext))
			return true;

		if(referenceType.typeKind == psymb.PTypeKind.Class || referenceType.typeKind == psymb.PTypeKind.Interface )
			return this.compareClassTypes(referenceType, instanceType, symbolContext, perfectMatch);
		else
			return this.comparePrimitiveNames(instanceType.name, referenceType.name, perfectMatch);
	}

	comparePrimitiveNames(expressionTypeName: string, requiredName:string, perfectMatch:boolean=false) : boolean
	{
		if( expressionTypeName == requiredName )
			return true;
		if(perfectMatch)
			return false;

		if(requiredName==="int")
			return expressionTypeName == "char";
		if(requiredName==="float")
			return expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName==="double")
			return expressionTypeName == "float" || expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName=="boolean")
			return expressionTypeName == "int" || expressionTypeName == "char";
		
		return false;
	}

	compareClassTypes(symbolType : psymb.PType, expressionType : psymb.PType, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		let requiredName = this.symbolTable.ensureIsFullPath(symbolType.name);
		let expressionName = this.symbolTable.ensureIsFullPath(expressionType.name);

		// If the types doesn't match and we are seeking for a perfect match then just fail
		if(perfectMatch )
		{
			if(requiredName != expressionName)
				return false;
			return true;
		}
		else
		{
			let isComparingDefaultObj = psymb.PUtils.isDefaultObjectPath(requiredName) || psymb.PUtils.isDefaultObjectPath(expressionName); 
			let isComparingArray = symbolType.typeKind == psymb.PTypeKind.Array || expressionType.typeKind == psymb.PTypeKind.Array;
			if(isComparingDefaultObj && isComparingArray)
				return true;

			if(requiredName == expressionName)
				return true;

			//if perfectMatch is not required then we still need to check with the class inheritance
			if(symbolContext instanceof symb.ScopedSymbol)
			{

				let expressionSymbol = psymb.PUtils.resolveSymbolFromTypeSync(symbolContext, expressionType)
				if(expressionSymbol instanceof psymb.PClassSymbol)
				{
					if(expressionSymbol.extends && this.compareClassTypes(symbolType, expressionSymbol.extends, symbolContext, perfectMatch ))
						return true;
					for(let impl of expressionSymbol.implements )
					{
						if( this.compareClassTypes(symbolType, impl, symbolContext, perfectMatch) )
							return true;
					}
					
				}
				if(expressionSymbol instanceof psymb.PInterfaceSymbol)
				{
					for(let ext of expressionSymbol.extends )
					{
						if( this.compareClassTypes(symbolType, ext, symbolContext, perfectMatch) )
							return true;
					}
				}
			}
			return false;
		}

	}

	checkClassInheritanceType(symbolType : psymb.PType, classSymbol:psymb.PClassSymbol, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		let result : boolean = false;
		if(classSymbol.name===symbolType.name)
			return true;

		if(classSymbol.extends)
			result = this.compareClassTypes(symbolType, classSymbol.extends, symbolContext, perfectMatch );
		if(result)
			return true;

		return false;
	}

	public findFirstClassOrInterfaceUp(scopedSymbol : symb.BaseSymbol) : psymb.PClassSymbol | psymb.PInterfaceSymbol | undefined
	{
		if( scopedSymbol instanceof psymb.PClassSymbol || scopedSymbol instanceof psymb.PInterfaceSymbol )
			return scopedSymbol;
		else if(scopedSymbol.parent)
			return this.findFirstClassOrInterfaceUp(scopedSymbol.parent);
		return;
	}

	public resolveSymbolType(name:string, scope : symb.BaseSymbol) : symb.BaseSymbol | undefined
	{
		let res : symb.BaseSymbol | undefined = scope.resolveSync(name);
		if(res instanceof symb.VariableSymbol && res.type)
		{
			if( res.type.reference == symb.ReferenceKind.Reference )
				res = scope.resolveSync(res.type.name);
		}
		return res;
	}

	public getRange(ctx : TerminalNode) : Range
	{
		let line : number = ctx.symbol.line;
		let pos : number = ctx.symbol.charPositionInLine;
		let length : number = ctx.symbol.stopIndex - ctx.symbol.startIndex + 1;
		return Range.create( line-1, pos, line-1, pos+length);
	}

	private registerUsageForDeclarationType(typeCtx : pp.TypeTypeContext)
	{
		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(typeCtx.start);
		this.registerUsageForTypeType(typeCtx, currentScope);
	}

	private findScopeAtToken(token: Token) : symb.ScopedSymbol
	{
		const line = token.line;
		const pos = token.charPositionInLine;
		let currentScope : symb.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.pdeInfo.symbols, line, pos+1);
		if(!currentScope)
			currentScope = this.mainClass;
		return currentScope;
	}

	private IsTypeStringType(type: psymb.PType, currentScope : symb.ScopedSymbol)
	{
		if(type.typeKind != psymb.PTypeKind.Class )
			return false;
		let classPath = this.symbolTable.ensureIsFullPath(type.name);
		return psymb.PUtils.isDefaultStringPath(classPath);
	}
	
	private registerUsageForIdentifier(identifier : TerminalNode, currentScope : symb.ScopedSymbol)
	{
		let callContext = psymb.PUtils.resolveComponentSync(currentScope, PComponentSymbol, identifier.text );
		this.pdeInfo.registerDefinition(identifier, callContext );
	}

	private registerUsageForIdentifiers(identifiers : TerminalNode[], currentScope : symb.ScopedSymbol)
	{
		let callContext = psymb.PUtils.resolveComponentSync(currentScope, PComponentSymbol, identifiers[0].text );
		this.pdeInfo.registerDefinition(identifiers[0], callContext );
		let idIndex = 1;
		while(idIndex < identifiers.length)
		{
			if(callContext)
				callContext = psymb.PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, identifiers[idIndex].text );
			this.pdeInfo.registerDefinition(identifiers[idIndex], callContext );
			idIndex++;
		}
	}

	private registerUsageForTypeType(typeCtx : pp.TypeTypeContext, currentScope : symb.ScopedSymbol)
	{
		let classOrInterface = typeCtx.classOrInterfaceType();
		if(classOrInterface)
		{
			let identifiers = classOrInterface.IDENTIFIER();
			this.registerUsageForIdentifiers(identifiers, currentScope);

			let typeArgumentsCtx = classOrInterface.typeArguments();
			for(let i=0; i < typeArgumentsCtx.length; i++)
			{
				let args = typeArgumentsCtx[0].typeArgument();
				if(args.length==0 )
					continue;
				let typeType = args[0].typeType();
				if(typeType)
					this.registerUsageForTypeType(typeType, currentScope);
			}
		}
	}


	validateExpressionAsPrimitiveType(type: psymb.PType, typesToCheck:psymb.PPrimitiveKind[], scope:symb.ScopedSymbol) : boolean
	{
		for( let i=0; i < typesToCheck.length; i++)
		{
			if( psymb.PUtils.comparePrimitiveKind(type, typesToCheck[i], scope) )
				return true;
		}
		return false;
	}


}