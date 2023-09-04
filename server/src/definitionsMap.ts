import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts'
import { Location, Range, Diagnostic, DiagnosticSeverity, PublishDiagnosticsParams } from 'vscode-languageserver'
import * as symbols from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import * as parseUtils from './astutils'
import * as psymb from "./antlr-sym"

export class UsageVisitor extends AbstractParseTreeVisitor<symbols.Type | undefined> implements ProcessingParserVisitor<symbols.Type | undefined>
{
	private mainClass : psymb.PClassSymbol;
	private definitionMap : Map<TerminalNode, symbols.BaseSymbol> = new Map<TerminalNode, symbols.BaseSymbol>();
	private usageMap : Map<symbols.BaseSymbol, Range[]> = new Map<symbols.BaseSymbol, Range[]>();
	public diagnostics : Diagnostic[] = [];
	//private contextSymbol : symbols.BaseSymbol | null = null;
	constructor(mainClass : psymb.PClassSymbol) { super(); this.mainClass = mainClass; }
	protected defaultResult(): symbols.Type | undefined { return this.mainClass; }

	public getUsageReferencesFor( decl : symbols.BaseSymbol ) : Range[] | undefined
	{
		return this.usageMap.get(decl);
	}

	public findNodeSymbolDefinition( node : TerminalNode )  : symbols.BaseSymbol | undefined
	{
		return this.definitionMap.get(node);
	}


	visitEnhancedForControl(ctx: pp.EnhancedForControlContext) : symbols.Type | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		this.visitChildren(ctx.variableDeclaratorId());
		this.visitExpression(ctx.expression());
		return;
	}

	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext) : symbols.Type | undefined 
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}
	
	visitFormalParameter(ctx: pp.FormalParameterContext) : symbols.Type | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclaratorId());
	}

	visitFieldDeclaration(ctx: pp.FieldDeclarationContext) : symbols.Type | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}

	visitMethodDeclaration(ctx: pp.MethodDeclarationContext) : symbols.Type | undefined
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

	visitExpression(ctx: pp.ExpressionContext) : symbols.Type | undefined
	{
		const line = ctx.start.line;
		const pos = ctx.start.charPositionInLine;
		let currentScope : symbols.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, line, pos+1);
		if(!currentScope || !currentScope.context)
			return;
		this.visitAndRegisterExpression(ctx, currentScope);
	}

	visitAndRegisterExpression(ctx: pp.ExpressionContext, currentScope: symbols.ScopedSymbol) : symbols.Type | undefined
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

		if(methodCall)
			return this.visitAndRegisterMethodCall(methodCall, expression, currentScope);

		else if(identif)
			return this.visitAndRegisterVariable(identif, expression, currentScope);

		else if(primary)
		{
			let thisCtx = primary.THIS();
			let identif = primary.IDENTIFIER();

			if(thisCtx)
			{
				let result = this.findFirstClassOrInterfaceUp(currentScope)
				this.registerDefinition(thisCtx, result);
				return result;
			}
	
			else if(identif)
				return this.visitAndRegisterVariable(identif, expression, currentScope);

		}
		else if( creator )
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
				//if(currentScope!==undefined)
				//	methodDef = defs.resolveMethodCall(className, paramsList, contextSymbol ? contextSymbol : currentScope, currentScope);
				//if(!classCreator.classBody())
				//	symbolContainer = symb.resolveSymbolType(ctx.IDENTIFIER()[0].text, symbolContainer);
			}
			else if( arrayCreator )
			{
				//result = symbolContainer;
			}
		}
		else if(expressions)
		{
			if( !dot )
			{
				for(let i=0; i < expressions.length; i++)
					this.visitExpression(expressions[i]);
			}
		}
		else
			this.visitChildren(ctx);
	}

	visitTerminal(node: TerminalNode) : symbols.Type | undefined
	{
		if(node.symbol.type == pp.ProcessingParser.IDENTIFIER)
		{
			let focusedDecl : symbols.BaseSymbol | undefined = this.findNodeSymbolDefinition(node);
			if(focusedDecl===undefined)
				this.registerDefinition(node, focusedDecl);
			return;
		}
	}

	visitAndRegisterMethodCall(methodCall: pp.MethodCallContext, expression: pp.ExpressionContext|undefined, currentScope: symbols.ScopedSymbol) : symbols.Type | undefined
	{
		let methodID =  methodCall.IDENTIFIER();
		let thisCall = methodCall.THIS();
		let superCall = methodCall.SUPER();
		
		if(methodID)
		{
			let callScope = currentScope;
			if(expression)
			{
				let expressionType = this.visitAndRegisterExpression(expression, currentScope);
				if(expressionType)
				{
					let callContext = currentScope.resolveSync(expressionType.name, false);
					if(callContext && callContext instanceof symbols.ScopedSymbol)
						callScope = callContext;
				}
			}
			let localOnly = expression !== undefined;
			let methodName = methodID.text;
			let candidates : symbols.BaseSymbol [];
			let actualParams = this.visitAndRegisterExpressionList(methodCall.expressionList(), currentScope);
			candidates = psymb.PUtils.getAllSymbolsSync(callScope, symbols.MethodSymbol, methodName, localOnly)
			//candidates = currentScope.getAllSymbolsSync(symbols.MethodSymbol, false);
			//candidates = candidates.filter((x) => { return x.name == methodName })
			let match = this.checkCandidatesMatch(candidates, actualParams, currentScope, true);
			if(!match)
				match = this.checkCandidatesMatch(candidates, actualParams, currentScope, false);
			
			this.registerDefinition(methodID, match);
			return match?.returnType;
		}
		else
			this.visitChildren(methodCall);
	}

	visitAndRegisterExpressionList(expressionList: pp.ExpressionListContext|undefined, currentScope: symbols.ScopedSymbol) : symbols.Type []
	{
		let results : symbols.Type [] = [];
		if(expressionList)
		{
			let expressions : pp.ExpressionContext [] | undefined = expressionList.expression();
			if(expressions)
			{
				for(let i : number = 0; i < expressions.length; i++)
				{
					let expressionType = this.visitAndRegisterExpression(expressions[i], currentScope);
					if(!expressionType)
						expressionType = psymb.PUtils.createUnknownType("unknown");
					results.push(expressionType);
				}
				
			}

		}
		return results;
	}

	visitAndRegisterVariable(identifier: TerminalNode, expression: pp.ExpressionContext|undefined, currentScope: symbols.ScopedSymbol) : symbols.Type | undefined
	{
		let varScope = currentScope;
		if(expression)
		{
			let expressionType = this.visitAndRegisterExpression(expression, currentScope);
			if(expressionType)
			{
				let callContext = currentScope.resolveSync(expressionType.name, false);
				if(callContext && callContext instanceof symbols.ScopedSymbol)
					varScope = callContext;
			}
		}
		let localOnly = varScope != currentScope;
		let varName = identifier.text;
		let res : symbols.BaseSymbol | undefined = varScope.resolveSync(varName, localOnly);
		this.registerDefinition(identifier, res);
		if(res instanceof symbols.VariableSymbol && res.type)
			return res.type;
	}

	checkCandidatesMatch(candidates: symbols.BaseSymbol[], expressionList: symbols.Type[], callContainer: symbols.BaseSymbol, perfectMatch:boolean=false) 
	{
		let finalCandidates: symbols.MethodSymbol[] = []
		for (let candidate of candidates) {
			if (!(candidate instanceof symbols.MethodSymbol))
				continue

			if (expressionList) {
				let params = candidate.getNestedSymbolsOfTypeSync(symbols.ParameterSymbol)
				if (!this.compareMethodParameters(params, expressionList, callContainer, perfectMatch))
					continue
			}
			finalCandidates.push(candidate)
		}
		return finalCandidates.length == 1 ? finalCandidates[0] : undefined
	}

	compareMethodParameters(requiredParams : symbols.ParameterSymbol [], userParams : symbols.Type[], symbolContext : symbols.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		for(let i : number = 0; i < requiredParams.length; i++)
		{
			if(i < userParams.length )
			{
				let paramType = requiredParams[i].type;
				if( !psymb.PUtils.compareTypes(paramType, userParams[i], symbolContext, perfectMatch))
					return false;
				// if( !checkParameterSymbolExpression(paramType, paramList[i], symbolContext, perfectMatch) )
				// 	return false;
			}
			else if(!requiredParams[i].value)
				return false;
			
		}
		return true;
	}

	public findFirstClassOrInterfaceUp(scopedSymbol : symbols.BaseSymbol) : psymb.PClassSymbol | psymb.PInterfaceSymbol | undefined
	{
		if( scopedSymbol instanceof psymb.PClassSymbol || scopedSymbol instanceof psymb.PInterfaceSymbol )
			return scopedSymbol;
		else if(scopedSymbol.parent)
			return this.findFirstClassOrInterfaceUp(scopedSymbol.parent);
		return;
	}

	public resolveSymbolType(name:string, symb : symbols.BaseSymbol) : symbols.BaseSymbol | undefined
	{
		let res : symbols.BaseSymbol | undefined = symb.resolveSync(name);
		if(res instanceof symbols.VariableSymbol && res.type)
		{
			if( res.type.reference == symbols.ReferenceKind.Reference )
				res = symb.resolveSync(res.type.name);
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
		let currentScope : symbols.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, line, pos+1);
		if(!currentScope || !currentScope.context)
			return;

		this.registerTypeDefinitionWithScope(typeCtx, currentScope);
	}

	private registerTypeDefinitionWithScope(typeCtx : pp.TypeTypeContext, currentScope : symbols.BaseSymbol)
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

	public registerDefinition(node: TerminalNode, declaredSymbol : symbols.BaseSymbol | undefined) : symbols.BaseSymbol | undefined
	{
		if(declaredSymbol !== undefined)
		{
			this.definitionMap.set(node, declaredSymbol);
			let lst = this.usageMap.get(declaredSymbol);
			if(lst === undefined)
				this.usageMap.set(declaredSymbol, lst = []);
			lst.push(this.getRange(node));
		}
		else
		{
			let diagnostic: Diagnostic = {
				 severity: DiagnosticSeverity.Error,
				 range: this.getRange(node),
				 message: `Unable to find declaration for ${node.text}`,
				 source: `pde`
			}
			this.diagnostics.push(diagnostic);
		}
		return declaredSymbol;
	}
}