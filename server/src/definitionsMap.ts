import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts'
import { Location, Range, Diagnostic, DiagnosticSeverity, PublishDiagnosticsParams } from 'vscode-languageserver'
import * as symb from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import * as parseUtils from './astutils'
import * as psymb from "./antlr-sym"
import { PdeContentInfo } from "./sketch";

let integralTypes = [ 
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short
 ];

export class UsageVisitor extends AbstractParseTreeVisitor<symb.Type | undefined> implements ProcessingParserVisitor<symb.Type | undefined>
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
	protected defaultResult(): symb.Type | undefined { return this.mainClass; }

	visitClassDeclaration(ctx: pp.ClassDeclarationContext) : symb.Type | undefined
	{
		let classIdentifier = ctx.IDENTIFIER();
		let classBody = ctx.classBody();
		let typeParams = ctx.typeParameters();
		let extendsCtx = ctx.typeType();
		let implemCtx =ctx.typeList();

		if(extendsCtx)
			this.registerDefinitionForDeclarationType(extendsCtx);
		if(implemCtx)
		{
			let typesCtx = implemCtx.typeType();
			for(let i=0; i<typesCtx.length; i++)
				this.registerDefinitionForDeclarationType(typesCtx[i]);
		}
		if(typeParams)
		{
			let params = typeParams.typeParameter();
			for(let param of params)
			{
				let identif = param.IDENTIFIER();
				let bound = param.typeBound();
				let formalTypes : symb.Type [] = [];

				if(bound)
				{
					let boundTypesCtx = bound.typeType();
					
					for(let boundTypeCtx of boundTypesCtx)
						this.registerDefinitionForDeclarationType(boundTypeCtx);
				}
			}
		}
		this.visit(classBody);
		return;
	}
	visitEnhancedForControl(ctx: pp.EnhancedForControlContext) : symb.Type | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		this.visitChildren(ctx.variableDeclaratorId());
		this.visitExpression(ctx.expression());
		return;
	}
	visitForControl(ctx: pp.ForControlContext): symb.Type | undefined
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
				let expressionResult = this.visitExpression(comparerExpression);
				if(expressionResult && !psymb.PUtils.comparePrimitiveKind(expressionResult, psymb.PPrimitiveKind.Boolean) )
					this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${expressionResult.name})`, comparerExpression)
				else if(!expressionResult)
					this.pdeInfo.notifyCompileError(`Unable to evaluate expression (${comparerExpression.text})`, comparerExpression)
			}
			if(updateExpression)
				this.visitChildren(updateExpression);
		}
		return;
	}

	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext) : symb.Type | undefined 
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}
	
	visitFormalParameter(ctx: pp.FormalParameterContext) : symb.Type | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclaratorId());
	}

	visitFieldDeclaration(ctx: pp.FieldDeclarationContext) : symb.Type | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}

	visitMethodDeclaration(ctx: pp.MethodDeclarationContext) : symb.Type | undefined
	{
		//let identif = ctx.IDENTIFIER();
		//let signatureName : string = identif.text;

		let returnTypeOrVoid : pp.TypeTypeOrVoidContext = ctx.typeTypeOrVoid();
		let returnTypeCtx = returnTypeOrVoid.typeType();
		if(returnTypeCtx)
			this.registerDefinitionForDeclarationType(returnTypeCtx);

		this.visitTerminal(ctx.IDENTIFIER());
		this.visitChildren(ctx.formalParameters());
		this.visitChildren(ctx.methodBody());
		return;
	};

	visitExpression(ctx: pp.ExpressionContext) : symb.Type | undefined
	{
		const line = ctx.start.line;
		const pos = ctx.start.charPositionInLine;
		let currentScope : symb.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.pdeInfo.symbols, line, pos+1);
		if(!currentScope || !currentScope.context)
			return;
		return this.visitAndRegisterExpression(ctx, currentScope);
	}

	visitAndRegisterExpression(ctx: pp.ExpressionContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let methodCall : pp.MethodCallContext | undefined = ctx.methodCall();
		let expressions : pp.ExpressionContext[] = ctx.expression();
		let primary : pp.PrimaryContext | undefined = ctx.primary();
		let identif : TerminalNode | undefined = ctx.IDENTIFIER();
		let creator : pp.CreatorContext | undefined = ctx.creator();
		let expression : pp.ExpressionContext | undefined;
		if(expressions.length>0)
			expression = expressions[0];
		

		let dot = ctx.DOT();

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
			if(symbType && symbType.kind == symb.TypeKind.Array && symbType.baseTypes.length > 0)
				symbType = symbType.baseTypes[0];
			return symbType;
		}
		else if(methodCall)													// | methodCall
			return this.visitAndRegisterMethodCall(expression, dot, methodCall, currentScope);

		else if( ctx.NEW() && creator )										// | NEW creator
			return this.visitAndRegisterCreator(creator, currentScope);

		else if(expressions)
		{
			let results : symb.Type[] = [];
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
					let isComparingInterf = results[0].kind == symb.TypeKind.Interface || results[1].kind == symb.TypeKind.Interface;
					let isComparingClasses = results[0].kind == symb.TypeKind.Class || results[1].kind == symb.TypeKind.Class;
					let isComparingArray = results[0].kind == symb.TypeKind.Array || results[1].kind == symb.TypeKind.Array;
					let isComparingAgainstNull = results[0].name == "null" || results[1].name == "null";

					let isComparingObjectNull =  (isComparingInterf || isComparingClasses || isComparingArray) && isComparingAgainstNull;
					if( results[0].kind != results[1].kind && !isComparingObjectNull )
						this.pdeInfo.notifyCompileError(`Incompatible types in expression (${results[0].name}) == (${results[1].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.NOTEQUAL())										// expression '!=' expression	
				{
					let isComparingInterf = results[0].kind == symb.TypeKind.Interface || results[1].kind == symb.TypeKind.Interface;
					let isComparingClasses = results[0].kind == symb.TypeKind.Class || results[1].kind == symb.TypeKind.Class;
					let isComparingArray = results[0].kind == symb.TypeKind.Array || results[1].kind == symb.TypeKind.Array;
					let isComparingAgainstNull = results[0].name == "null" || results[1].name == "null";

					let isComparingObjectNull =  (isComparingInterf || isComparingClasses || isComparingArray) && isComparingAgainstNull;
					if( results[0].kind != results[1].kind && !isComparingObjectNull )
						this.pdeInfo.notifyCompileError(`Incompatible types in expression (${results[0].name}) != (${results[1].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.LE() || ctx.GE() )								// expression ('<='|'>=') expression
				{
					if( results[0].kind != results[1].kind )				
						this.pdeInfo.notifyCompileError(`Incompatible types in expression: possible lossy conversion (${results[0].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.AND() )											// expression '&&' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[0].name})`, expressions[0])
					if( !psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.OR() )											// expression '||' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[0].name})`, expressions[0])
					if( !psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyCompileError(`Incompatible types. Expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.ADD() )											// expression '+' expression
				{
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
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.BITOR())										// expression '|' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.CARET())										// expression '^' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.MOD())											// expression '%' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
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
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )
						this.pdeInfo.notifyCompileError(`Incompatible type. Expression should be of boolean type (${results[0].name})`, expressions[0])
				}
				else if(ctx.TILDE())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type in expression: possible lossy conversion (${results[0].name})`, expressions[0])
				}
				else if(ctx.INC())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible type using operator ++ (${results[0].name})`, expressions[0])
				}
				else if(ctx.DEC())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyCompileError(`Incompatible types using operator -- (${results[0].name})`, expressions[0])
				}
			}
		}
		else
			this.visitChildren(ctx);
	}

	visitAndRegisterCreator(creator: pp.CreatorContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let result : symb.Type | undefined;
		let createdName : pp.CreatedNameContext | undefined = creator.createdName();
		let typeArguments = createdName.typeArgumentsOrDiamond();
		let identifiers = createdName.IDENTIFIER();
		let classCreator : pp.ClassCreatorRestContext | undefined = creator.classCreatorRest();
		let arrayCreator : pp.ArrayCreatorRestContext | undefined = creator.arrayCreatorRest();
		if( classCreator )
		{
			let className =  parseUtils.buildFullClassName( identifiers );
			let genericClassSymbol = this.resolveSymbolType(className, currentScope);
			this.pdeInfo.registerDefinition(identifiers[identifiers.length-1], genericClassSymbol);
			let genericParams : symb.Type [] = []; 


			let paramsList : pp.ExpressionListContext | undefined;
			let args : pp.TypeArgumentContext [] = typeArguments[0]?.typeArguments()?.typeArgument() ?? [];

			parseUtils.buildTypeArgumentsToSymbolTypes(args , genericParams, currentScope);

			result = psymb.PUtils.createClassType(className, genericParams);
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

	visitAndRegisterMethodCall(expression: pp.ExpressionContext|undefined, dot:TerminalNode|undefined, methodCall: pp.MethodCallContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let methodID =  methodCall.IDENTIFIER();
		let thisCall = methodCall.THIS();5
		let superCall = methodCall.SUPER();
	
		let callScope: symb.IScopedSymbol = currentScope;
		let expressionType : symb.Type | undefined;
		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dot, expressionType);
			this.pdeInfo.registerContextType(methodID, expressionType);

			if(expressionType)
				callScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, expressionType);
		}

		if(methodID)
		{
			let localOnly = expression !== undefined;
			let methodName = methodID.text;

			let callContext : psymb.CallContext = new psymb.CallContext();
			callContext.callerType = expressionType;
			callContext.callerSymbol = callScope;

			let expressionParams = this.visitAndRegisterExpressionList(methodCall.expressionList(), currentScope);
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
			
			this.pdeInfo.registerDefinition(methodID, match);
			if(!match)
				return;

			if(!match.returnType || match.returnType.name == "void")
				return;
			if(match.returnType.kind == symb.TypeKind.Alias)
				return parseUtils.convertAliasType(match.returnType, callContext);
			else
				return match.returnType;
		}
		else
			this.visitChildren(methodCall);
	}

	visitAndRegisterExpressionList(expressionList: pp.ExpressionListContext|undefined, currentScope: symb.ScopedSymbol) : symb.Type []
	{
		let results : symb.Type [] = [];
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

	visitAndRegisterPrimary(primary: pp.PrimaryContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let thisCtx = primary.THIS();
		let identif = primary.IDENTIFIER();
		let literal = primary.literal();
		let expression = primary.expression();
		let superExpr = primary.SUPER();

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
					extSymb = psymb.PUtils.resolveSymbolSync(currentScope, psymb.PClassSymbol, result.extends.name)

				this.pdeInfo.registerDefinition(superExpr, result);
				return result;
			}
				
		}
		else if(literal)
			return this.visitAndRegisterLiteral(literal, currentScope);

		else if(identif)
			return this.visitAndRegisterVariable(undefined, undefined, identif, currentScope);

	}

	visitAndRegisterLiteral(literal: pp.LiteralContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
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

	visitAndRegisterVariable(expression: pp.ExpressionContext|undefined, dot: TerminalNode|undefined, identifier: TerminalNode, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let varScope = currentScope;
		let varName = identifier.text;
		let expressionType : symb.Type | undefined;
		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dot, expressionType);
			this.pdeInfo.registerContextType(identifier, expressionType);
			if(expressionType)
			{
				// A very special built-in case
				if(expressionType.kind == symb.TypeKind.Array && varName == 'length')
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Int);
				
				varScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, expressionType);
			}
		}
		let localOnly = varScope != currentScope;
		let res : symb.BaseSymbol | undefined = varScope.resolveSync(varName, localOnly);
		this.pdeInfo.registerDefinition(identifier, res);
		if(res instanceof psymb.PClassSymbol )
			return res;
		if(res instanceof psymb.PInterfaceSymbol )
			return res;
		if(res instanceof symb.VariableSymbol && res.type)
			return psymb.PUtils.cloneTypeAsInstance(res.type);
	}

	checkCandidatesMatch(callContext : psymb.CallContext, candidates: symb.MethodSymbol[], expressionList: symb.Type[], callContainer: symb.BaseSymbol, perfectMatch:boolean=false) 
	{
		let finalCandidates: symb.MethodSymbol[] = []
		for (let candidate of candidates) 
		{
			let params = candidate.getNestedSymbolsOfTypeSync(symb.ParameterSymbol)
			if (!this.compareMethodParameters(callContext, params, expressionList, callContainer, perfectMatch))
				continue;

			finalCandidates.push(candidate)
		}
		if(perfectMatch && finalCandidates.length > 0)
			return finalCandidates[0];
		return finalCandidates.length == 1 ? finalCandidates[0] : undefined
	}

	compareMethodParameters(callContext : psymb.CallContext, requiredParams : symb.ParameterSymbol [], userParams : symb.Type[], symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		for(let i : number = 0; i < requiredParams.length; i++)
		{
			if(i < userParams.length )
			{
				let paramType = requiredParams[i].type;
				if(!paramType)
					return false;

				if(paramType.kind == symb.TypeKind.Alias)
					paramType = parseUtils.convertAliasType(paramType, callContext);

				if( !this.compareTypes(paramType, userParams[i], symbolContext, perfectMatch))
					return false;
			}
			else if(!requiredParams[i].value)
				return false;
		}
		return userParams.length <= requiredParams.length;
	}

	compareTypes(symbolType : symb.Type | undefined, expressionType : symb.Type | undefined, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		if(symbolType===undefined || expressionType === undefined)
			return false;

		let isSameKind = symbolType.kind == expressionType.kind;
		// Special case:
		if( (symbolType.name == "Integer" && expressionType.name=="int") || (symbolType.name == "int" && expressionType.name=="Integer") )
			return true;

		if(!isSameKind)
			return false;

		if(symbolType.kind == symb.TypeKind.Class || symbolType.kind == symb.TypeKind.Interface )
			return this.compareClassTypes(symbolType, expressionType, symbolContext, perfectMatch);
		else
			return this.comparePrimitiveNames(expressionType.name, symbolType.name, perfectMatch);
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

	compareClassTypes(symbolType : symb.Type, expressionType : symb.Type, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
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
			if(requiredName == expressionName)
				return true;

			//if perfectMatch is not required then we still need to check with the class inheritance
			let classDef = symbolContext.resolveSync(expressionType.name, false);
			if(!classDef || !(classDef instanceof psymb.PClassSymbol))
				return false;
			return this.checkClassInheritanceType(symbolType, classDef, symbolContext, perfectMatch);
		}

	}

	checkClassInheritanceType(symbolType : symb.Type, classSymbol:psymb.PClassSymbol, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
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

	private registerDefinitionForDeclarationType(typeCtx : pp.TypeTypeContext)
	{
		const line = typeCtx.start.line;
		const pos = typeCtx.start.charPositionInLine;
		let currentScope : symb.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.pdeInfo.symbols, line, pos+1);
		if(!currentScope || !currentScope.context)
			return;

		this.registerTypeDefinitionWithScope(typeCtx, currentScope);
	}

	private registerTypeDefinitionWithScope(typeCtx : pp.TypeTypeContext, currentScope : symb.BaseSymbol)
	{
		let classOrInterface = typeCtx.classOrInterfaceType();
		if(classOrInterface)
		{
			let identifiers = classOrInterface.IDENTIFIER();
			let typeArgumentsCtx = classOrInterface.typeArguments();
			let className = parseUtils.buildFullClassName(identifiers);

			let typeDefinition = this.resolveSymbolType(className, currentScope);
			this.pdeInfo.registerDefinition(identifiers[identifiers.length-1], typeDefinition );

			for(let i=0; i < typeArgumentsCtx.length; i++)
			{
				let args = typeArgumentsCtx[0].typeArgument();
				if(args.length==0 )
					continue;
				let typeType = args[0].typeType();
				if(typeType)
					this.registerTypeDefinitionWithScope(typeType, currentScope);
			}
		}
	}


	validateExpressionAsPrimitiveType(type: symb.Type, typesToCheck:psymb.PPrimitiveKind[]) : boolean
	{
		for( let i=0; i < typesToCheck.length; i++)
		{
			if( psymb.PUtils.comparePrimitiveKind(type, typesToCheck[i]) )
				return true;
		}
		return false;
	}


}