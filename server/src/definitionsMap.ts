import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts'
import { Location, Range, Diagnostic, DiagnosticSeverity, PublishDiagnosticsParams } from 'vscode-languageserver'
import * as symb from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import * as parseUtils from './astutils'
import * as psymb from "./antlr-sym"

let integralTypes = [ 
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short
 ];

export class UsageVisitor extends AbstractParseTreeVisitor<symb.Type | undefined> implements ProcessingParserVisitor<symb.Type | undefined>
{
	private mainClass : psymb.PClassSymbol;
	private definitionDict : Map<TerminalNode, symb.BaseSymbol> = new Map<TerminalNode, symb.BaseSymbol>();
	private contextTypeDict : Map<ParseTree, symb.Type> = new Map<ParseTree, symb.Type>();
	private usageMap : Map<symb.BaseSymbol, Range[]> = new Map<symb.BaseSymbol, Range[]>();
	public diagnostics : Diagnostic[] = [];
	//private contextSymbol : symbols.BaseSymbol | null = null;
	constructor(mainClass : psymb.PClassSymbol) { super(); this.mainClass = mainClass; }
	protected defaultResult(): symb.Type | undefined { return this.mainClass; }

	public getUsageReferencesFor( decl : symb.BaseSymbol ) : Range[] | undefined
	{
		return this.usageMap.get(decl);
	}

	public findNodeSymbolDefinition( node : TerminalNode )  : symb.BaseSymbol | undefined
	{
		return this.definitionDict.get(node);
	}

	public findNodeContextTypeDefinition(node : ParseTree ) : symb.Type | undefined
	{
		return this.contextTypeDict.get(node);
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
					this.notifyCompileError(`Incompatible types. Expression should be boolean (${expressionResult.name})`, comparerExpression)
				else if(!expressionResult)
					this.notifyCompileError(`Unable to evaluate expression (${comparerExpression.text})`, comparerExpression)
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
		let currentScope : symb.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, line, pos+1);
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
			if(symbType && symbType.kind == symb.TypeKind.Array && symbType.baseTypes.length > 0)
				symbType = symbType.baseTypes[0];
			if(!symbType)
				symbType = psymb.PUtils.createTypeUnknown();
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
					let isComparingClasses = results[0].kind == symb.TypeKind.Class || results[1].kind == symb.TypeKind.Class;
					let isComparingAgainstNull = results[0].name == "null" || results[1].name == "null";
					if( results[0].kind != results[1].kind && !(isComparingClasses && isComparingAgainstNull) )
						this.notifyCompileError(`Incompatible types in expression (${results[0].name}) == (${results[1].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.NOTEQUAL())										// expression '!=' expression	
				{
					if( results[0].kind != results[1].kind )
						this.notifyCompileError(`Incompatible types in expression (${results[0].name}) != (${results[1].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.LE() || ctx.GE() )								// expression ('<='|'>=') expression
				{
					if( results[0].kind != results[1].kind )				
						this.notifyCompileError(`Incompatible types in expression: possible lossy conversion (${results[0].name})`, expressions[0])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.AND() )											// expression '&&' expression
				{
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )				
						this.notifyCompileError(`Incompatible types. Expression should be boolean (${results[0].name})`, expressions[0])
					if( psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean) )				
						this.notifyCompileError(`Incompatible types. Expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.OR() )											// expression '||' expression
				{
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )				
						this.notifyCompileError(`Incompatible types. Expression should be boolean (${results[0].name})`, expressions[0])
					if( psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean) )				
						this.notifyCompileError(`Incompatible types. Expression should be boolean (${results[1].name})`, expressions[1])
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
						this.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.BITOR())										// expression '|' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.CARET())										// expression '^' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.MOD())											// expression '%' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression (${results[1].name})`, expressions[1])
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
						this.notifyCompileError(`Incompatible type. Expression should be of boolean type (${results[0].name})`, expressions[0])
				}
				else if(ctx.TILDE())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.notifyCompileError(`Incompatible type in expression: possible lossy conversion (${results[0].name})`, expressions[0])
				}
				else if(ctx.INC())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.notifyCompileError(`Incompatible type using operator ++ (${results[0].name})`, expressions[0])
				}
				else if(ctx.DEC())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.notifyCompileError(`Incompatible types using operator -- (${results[0].name})`, expressions[0])
				}
			}
		}
		else
			this.visitChildren(ctx);
	}

	visitAndRegisterCreator(creator: pp.CreatorContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let createdName : pp.CreatedNameContext | undefined = creator.createdName();
		let typeArguments = createdName.typeArgumentsOrDiamond();
		let identifiers = createdName.IDENTIFIER();
		let classCreator : pp.ClassCreatorRestContext | undefined = creator.classCreatorRest();
		let arrayCreator : pp.ArrayCreatorRestContext | undefined = creator.arrayCreatorRest();
		if( classCreator && identifiers.length > 0 )
		{
			let className =  identifiers[0];
			let genericClassSymbol = this.resolveSymbolType(className.text, currentScope);
			this.registerDefinition(identifiers[0], genericClassSymbol);

			let paramsList : pp.ExpressionListContext | undefined;
			let args : pp.TypeArgumentContext [] = typeArguments[0]?.typeArguments()?.typeArgument() ?? [];
			for(let i : number = 0; i < args.length; i++ )
			{
				let genericType = args[i].typeType();
				if(genericType)
				{
					let classType = genericType.classOrInterfaceType();
					if(classType)
					{
						let identifiers = classType.IDENTIFIER();
						if(identifiers.length == 1)
						{
							let genericTypeSymbol = this.resolveSymbolType(genericType.text, currentScope);
							this.registerDefinition(identifiers[0], genericTypeSymbol);
						}
					}					
				}
			
			}
		}
		else if( arrayCreator )
		{
			//result = symbolContainer;
		}
		return;
	}

	visitTerminal(node: TerminalNode) : symb.Type | undefined
	{
		if(node.symbol.type == pp.ProcessingParser.IDENTIFIER)
		{
			let focusedDecl : symb.BaseSymbol | undefined = this.findNodeSymbolDefinition(node);
			if(focusedDecl===undefined)
				this.registerDefinition(node, focusedDecl);
			return;
		}
	}

	visitAndRegisterMethodCall(expression: pp.ExpressionContext|undefined, dot:TerminalNode|undefined, methodCall: pp.MethodCallContext, currentScope: symb.ScopedSymbol) : symb.Type | undefined
	{
		let methodID =  methodCall.IDENTIFIER();
		let thisCall = methodCall.THIS();
		let superCall = methodCall.SUPER();
	
		let callScope: symb.IScopedSymbol = currentScope;
		let expressionType : symb.Type | undefined;
		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.registerContextType(expression, expressionType);
			this.registerContextType(dot, expressionType);
			this.registerContextType(methodID, expressionType);

			if(expressionType)
			{
				//psymb.PUtils.resolveByName(expressionType.name, currentScope,  )
				let scopeResult = currentScope.resolveSync(expressionType.name, false);
				if(scopeResult && scopeResult instanceof symb.ScopedSymbol)
					callScope = scopeResult;
			}
		}

		if(methodID)
		{
			let localOnly = expression !== undefined;
			let methodName = methodID.text;
			let expressionParams = this.visitAndRegisterExpressionList(methodCall.expressionList(), currentScope);
			let candidates = psymb.PUtils.getAllSymbolsSync(callScope, symb.MethodSymbol, methodName, localOnly);
			
			let callContext : psymb.CallContext = new psymb.CallContext();
			callContext.callerType = expressionType;
			callContext.callerSymbol = callScope;

			let match = this.checkCandidatesMatch(callContext, candidates, expressionParams, currentScope, true);
			if(!match)
				match = this.checkCandidatesMatch(callContext, candidates, expressionParams, currentScope, false);
			
			this.registerDefinition(methodID, match);
			if(!match)
				return;

			if(!match.returnType || match.returnType.name == "void")
				return;
			if(match.returnType.kind == symb.TypeKind.Alias)
				return this.convertAliasType(match.returnType, callContext);
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

		if(thisCtx)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope)
			this.registerDefinition(thisCtx, result);
			return result;
		}
		else if(identif)
			return this.visitAndRegisterVariable(undefined, undefined, identif, currentScope);
		else if(literal)
			return this.visitAndRegisterLiteral(literal, currentScope);

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
			this.registerContextType(expression, expressionType);
			this.registerContextType(dot, expressionType);
			this.registerContextType(identifier, expressionType);
			if(expressionType)
			{
				// A very special built-in case
				if(expressionType.kind == symb.TypeKind.Array && varName == 'length')
					return psymb.PUtils.createPrimitiveType(psymb.PPrimitiveKind.Int);
				
				let callContext = currentScope.resolveSync(expressionType.name, false);
				if(callContext && callContext instanceof symb.ScopedSymbol)
					varScope = callContext;
			}
		}
		let localOnly = varScope != currentScope;
		let res : symb.BaseSymbol | undefined = varScope.resolveSync(varName, localOnly);
		this.registerDefinition(identifier, res);
		if(res instanceof symb.VariableSymbol && res.type)
			return res.type;
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
					paramType = this.convertAliasType(paramType, callContext);

				if( !this.compareTypes(paramType, userParams[i], symbolContext, perfectMatch))
					return false;
			}
			else if(!requiredParams[i].value)
				return false;
		}
		return userParams.length <= requiredParams.length;
	}

	convertAliasType( type: symb.Type, callContext : psymb.CallContext ) : symb.Type
	{
		if( !callContext.callerSymbol || !callContext.callerType  )
		{
			console.error("Unable to resolve Generic Alias: "+type.name)
			return type;
		}
		
		for( let baseType of callContext.callerType.baseTypes )
		{
			if(baseType.name == type.name)
				return baseType.baseTypes[0];
		}
		console.error("Unable to resolve generic type: "+type.name);
		// let paramDef = psymb.PUtils.resolveSymbolSync(callContext.callerSymbol, psymb.PFormalParamSymbol, type.name, false);
		// if(paramDef)
		// {

		// }
		return type;
	}

	compareTypes(symbolType : symb.Type | undefined, expressionType : symb.Type | undefined, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		if(symbolType===undefined || expressionType === undefined)
			return false;

		let isSameKind = symbolType.kind == expressionType.kind;
		let isSameName = symbolType.name == expressionType.name;
		if(perfectMatch && (!isSameKind || !isSameName)  )
			return false;

		if(symbolType.kind == symb.TypeKind.Class)
			return this.compareClassTypes(symbolType, expressionType, symbolContext, perfectMatch);
		else
			return this.comparePrimitiveNames(expressionType.name, symbolType.name, perfectMatch)
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
		if(expressionType.name == symbolType.name)
			return true;
		// If the types doesn't match and we are seeking for a perfect match then just fail
		if(perfectMatch)
			return false;

		//if perfectMatch is not required then we still need to check with the class inheritance
		let classDef = symbolContext.resolveSync(expressionType.name, false);
		if(!classDef || !(classDef instanceof psymb.PClassSymbol))
		 	return false;
		return this.checkClassInheritanceType(symbolType, classDef, symbolContext, perfectMatch);
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
		let currentScope : symb.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, line, pos+1);
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
			if(	identifiers.length > 0)
			{
				let identif = identifiers[0];
				let typeDefinition = this.resolveSymbolType(identif.text, currentScope);
				this.registerDefinition(identif, typeDefinition );
			}
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

	public registerDefinition(node: TerminalNode, declaredSymbol : symb.BaseSymbol | undefined) : symb.BaseSymbol | undefined
	{
		if(declaredSymbol !== undefined)
		{
			this.definitionDict.set(node, declaredSymbol);
			let lst = this.usageMap.get(declaredSymbol);
			if(lst === undefined)
				this.usageMap.set(declaredSymbol, lst = []);
			lst.push(this.getRange(node));
		}
		else
			this.notifyCompileError(`Unable to find declaration for ${node.text}`, node);

		return declaredSymbol;
	}

	public registerContextType(node: ParseTree | undefined, ctxType : symb.Type | undefined)
	{
		if(!ctxType)
			return;
		if(!node)
			return;
		this.contextTypeDict.set(node, ctxType);
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

	notifyCompileError(msg:string, node:ParseTree)
	{
		let diagnostic: Diagnostic = {
			severity: DiagnosticSeverity.Error,
			range: parseUtils.calcRangeFromParseTree(node),
			message: msg,
			source: `pde`
	   }
	   this.diagnostics.push(diagnostic);
	}
}