import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts'
import { Location, Range, Diagnostic, DiagnosticSeverity, PublishDiagnosticsParams } from 'vscode-languageserver'
import * as symbols from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import * as defs from './definition'
import * as parseUtils from './astutils'
import { identity } from 'rxjs';

export class UsageVisitor extends AbstractParseTreeVisitor<symbols.BaseSymbol | undefined> implements ProcessingParserVisitor<symbols.BaseSymbol | undefined>
{
	private mainClass : symbols.ClassSymbol;
	private definitionMap : Map<ParseTree, symbols.BaseSymbol> = new Map<ParseTree, symbols.BaseSymbol>();
	private usageMap : Map<symbols.BaseSymbol, Range[]> = new Map<symbols.BaseSymbol, Range[]>();
	public diagnostics : Diagnostic[] = [];
	//private contextSymbol : symbols.BaseSymbol | null = null;
	constructor(mainClass : symbols.ClassSymbol) { super(); this.mainClass = mainClass; }
	protected defaultResult(): symbols.BaseSymbol | undefined { return this.mainClass; }

	public analize(ctx : ParserRuleContext) : UsageVisitor
	{
		// this.diagnostics = [];
		// this.definitionMap.clear();
		// this.usageMap.clear();
		this.visit(ctx);
		return this;
	}

	public addSymbolUsageArray( decl : symbols.BaseSymbol ) : Range[] | undefined
	{
		return this.usageMap.get(decl);
	}

	public findNodeSymbolDefinition( node : ParseTree )  : symbols.BaseSymbol | undefined
	{
		return this.definitionMap.get(node);
	}


	visitEnhancedForControl(ctx: pp.EnhancedForControlContext) : symbols.BaseSymbol | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		this.visitChildren(ctx.variableDeclaratorId());
		this.visitChildren(ctx.expression());
		return;
	}

	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext) : symbols.BaseSymbol | undefined 
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}
	
	visitFormalParameter(ctx: pp.FormalParameterContext) : symbols.BaseSymbol | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclaratorId());
	}

	visitFieldDeclaration(ctx: pp.FieldDeclarationContext) : symbols.BaseSymbol | undefined
	{
		this.registerDefinitionForDeclarationType(ctx.typeType());
		return this.visitChildren(ctx.variableDeclarators());
	}

	visitMethodDeclaration(ctx: pp.MethodDeclarationContext) : symbols.BaseSymbol | undefined
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

	visitExpression(ctx: pp.ExpressionContext) : symbols.BaseSymbol | undefined
	{
		const line = ctx.start.line;
		const pos = ctx.start.charPositionInLine;
		let currentScope : symbols.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, line, pos+1);
		if(!currentScope || !currentScope.context)
			return;

		let methodCall : pp.MethodCallContext | undefined = ctx.methodCall();
		let expression : pp.ExpressionContext[] = ctx.expression();
		let primary : pp.PrimaryContext | undefined = ctx.primary();
		let identif : TerminalNode | undefined = ctx.IDENTIFIER();
		let creator : pp.CreatorContext | undefined = ctx.creator();
		if(methodCall)
		{
			let methodID =  methodCall.IDENTIFIER();
			let thisCall = methodCall.THIS();
			let superCall = methodCall.SUPER();
			if(methodCall.functionWithPrimitiveTypeName())
				this.visitChildren(ctx);
			else if(methodID)
			{
				let contextSymbol : symbols.BaseSymbol | undefined = currentScope;
				let methodDef : symbols.BaseSymbol | undefined;
				if(expression && expression.length==1)
					contextSymbol = this.visitExpression(expression[0]);
				if(contextSymbol!==undefined)
					methodDef = defs.resolveMethodCall(methodID.text, methodCall.expressionList(), contextSymbol ? contextSymbol : currentScope, currentScope);
				this.registerDefinition(methodID, methodDef);
				return methodDef;
			}
			else
				this.visitChildren(ctx);
		}
		else if(primary)
		{
			if(primary.THIS())
				return this.findFirstClassOrInterfaceUp(currentScope);
	
			else if(primary.IDENTIFIER())
				return this.resolveSymbolType(primary.text, currentScope);
	
		}
		else if(identif)
		{
			return this.resolveSymbolType(identif.text, currentScope);
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
		else
			this.visitChildren(ctx);
	}

	visitTerminal(node: TerminalNode) : symbols.BaseSymbol | undefined
	{
		if(node.symbol.type == pp.ProcessingParser.IDENTIFIER)
		{
			let focusedDecl : symbols.BaseSymbol | undefined = this.findNodeSymbolDefinition(node);
	// 		let containerSymbol = parseUtils.findScopeAtPositionFromSymbols(this.mainClass.children, node.symbol.line, node.symbol.charPositionInLine);
	// 		if(containerSymbol===undefined)
	// 			containerSymbol = this.mainClass;
			
	// 		if(containerSymbol.context === node.parent)
	// 			focusedDecl = containerSymbol;
	// 		else
	// 			focusedDecl = defs.resolveSymbolDeclaration(node, containerSymbol);
			if(focusedDecl===undefined)
				this.registerDefinition(node, focusedDecl);
			return;
		}
	}

	public findFirstClassOrInterfaceUp(symb : symbols.BaseSymbol) : symbols.ClassSymbol | symbols.InterfaceSymbol | undefined
	{
		if( symb instanceof symbols.ClassSymbol || symb instanceof symbols.InterfaceSymbol )
			return symb;
		else if(symb.parent)
			return this.findFirstClassOrInterfaceUp(symb.parent);
		return;
	}

	public resolveSymbolType(name:string, symb : symbols.BaseSymbol) : symbols.BaseSymbol
	{
		let res : symbols.BaseSymbol | undefined = symb.resolveSync(name);
		if(res instanceof symbols.VariableSymbol && res.type)
		{
			if( res.type.reference == symbols.ReferenceKind.Reference )
				res = symb.resolveSync(res.type.name);
		}
		return res ? res : symb;
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

		let classOrInterface = typeCtx.classOrInterfaceType();
		if(classOrInterface)
		{
			let identifiers = classOrInterface.IDENTIFIER();
			if(	identifiers.length > 0)
			{
				let identif = identifiers[0];
				let typeDefinition = this.resolveSymbolType(identif.text, currentScope);
				this.registerDefinition(identif, typeDefinition );
			}
		}
	

	}

	public registerDefinition(node: TerminalNode, declaredSymbol : symbols.BaseSymbol | undefined)
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
	}
}