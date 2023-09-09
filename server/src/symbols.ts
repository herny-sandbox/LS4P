import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts';
import * as symb from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import { LocationLink } from 'vscode-languageserver/node';
import * as log from './scripts/syslogs'
import { DocumentSymbols } from "./documentSymbols"
import { PdeContentInfo } from "./sketch";
import * as psymb from "./antlr-sym"
import * as javaModules from './javaModules'
import * as parseUtils from './astutils'

const VAR_FIELD = 1;
const VAR_PARAM = 2;
const VAR_LOCAL = 3;
const VAR_TYPE_PARAM = 4;

export class SymbolTableVisitor extends AbstractParseTreeVisitor<symb.SymbolTable> implements ProcessingParserVisitor<symb.SymbolTable>
{
	

	private visitingSymbols : symb.BaseSymbol[] | null = null;
	private visitorRootSymbol : symb.ScopedSymbol | null = null;
	private mainClass : psymb.PClassSymbol;
	protected scope : symb.ScopedSymbol;
	protected pdeInfo: PdeContentInfo | undefined;
	public symbolTable;

	constructor(mainName : string)
	{
		super();
		this.symbolTable = new psymb.PSymbolTable("", { allowDuplicateSymbols: true });

		javaModules.loadDefaultLibraries();
		javaModules.tryAddDependency(this.symbolTable, "java.lang");
		javaModules.tryAddDependency(this.symbolTable, "processing.core");
		javaModules.tryAddDependency(this.symbolTable, "processing.awt");
		javaModules.tryAddDependency(this.symbolTable, "processing.data");
		javaModules.tryAddDependency(this.symbolTable, "processing.event");
		javaModules.tryAddDependency(this.symbolTable, "processing.javafx");
		javaModules.tryAddDependency(this.symbolTable, "processing.opengl");
		this.symbolTable.addImport("java.util")

		this.mainClass = new psymb.PClassSymbol(mainName, psymb.PUtils.createClassType("processing.core.PApplet"));
		this.symbolTable.addSymbol(this.mainClass);
		this.scope = this.mainClass;
	}

	public getMainClass() : psymb.PClassSymbol { return this.mainClass; }
	protected defaultResult(): symb.SymbolTable { return this.symbolTable; }

	public visitPdeLinked(pdeInfo: PdeContentInfo) : symb.SymbolTable
	{
		this.visitorRootSymbol = this.scope;
		this.visitingSymbols = pdeInfo.symbols;
		this.pdeInfo = pdeInfo;
		if(pdeInfo.syntaxTokens)
			this.visit(pdeInfo.syntaxTokens);
		this.visitingSymbols = null;
		// we record our current pde name for future use...
		for(let i=0; i < pdeInfo.symbols.length; i++ )
			this.registerPdeName(pdeInfo.symbols[i], pdeInfo.name);
		return this.defaultResult();
	}

	public removeRootSymbols(symbs : symb.BaseSymbol[])
	{
		while(symbs.length > 0)
		{
			let s : symb.BaseSymbol | undefined = symbs.pop();
			if(s)
				this.scope.removeSymbol(s);
		}
	}

	visitVariableDeclaratorId = (ctx: pp.VariableDeclaratorIdContext) => 
	{
		let terminalNode = ctx.IDENTIFIER();
		if(terminalNode)
		{
			try
			{
				let symbolType : symb.Type | undefined = undefined;
				this.addChildSymbol(ctx, new symb.VariableSymbol(terminalNode.text, null, symbolType));
			}
			catch(e)
			{
				log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
			}
		}
		return this.visitChildren(ctx);
	}

	visitImportDeclaration = (ctx: pp.ImportDeclarationContext) =>
	{
		log.write("Importing "+ctx.qualifiedName().text, log.severity.WARNING);
		return this.defaultResult();
	} 

	visitEnhancedForControl = (ctx: pp.EnhancedForControlContext) => 
	{
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(ctx.typeType(), this.scope);
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_LOCAL);
		return this.defaultResult();
	}

	visitLocalVariableDeclaration = (ctx: pp.LocalVariableDeclarationContext) => 
	{
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(ctx.typeType(), this.scope);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators(), VAR_LOCAL);
		return this.defaultResult();
	}
	
	visitFormalParameter = (ctx: pp.FormalParameterContext) => 
	{
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(ctx.typeType(), this.scope);
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_PARAM);
		
		return this.defaultResult();
	}

	visitFieldDeclaration = (ctx: pp.FieldDeclarationContext) => 
	{
		let fileTypeCtx = ctx.typeType();
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(fileTypeCtx, this.scope);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators(), VAR_FIELD);
		return this.defaultResult();
	}

	visitClassDeclaration = (ctx: pp.ClassDeclarationContext) => 
	{
		let ext : symb.Type = psymb.rootClassType;
		let impl : symb.Type [] = [];
		let classIdentifier = ctx.IDENTIFIER();
		let className = classIdentifier.text;
		let classSymbol = new psymb.PClassSymbol(className, ext, impl)
		this.pdeInfo?.refs?.registerDefinition(classIdentifier, classSymbol );
		return this.addScope(ctx, classSymbol, () => this.visitChildren(ctx.classBody()));
	}

	visitClassCreatorRest = (ctx: pp.ClassCreatorRestContext) => 
	{
		let ext : symb.Type = psymb.rootClassType;
		let impl : symb.Type [] = [];
		return this.addScope(ctx, new psymb.PClassSymbol("", ext, impl), () => this.visitChildren(ctx));
	}

	visitEnumDeclaration = (ctx: pp.EnumDeclarationContext) => 
	{
		let signatureName : string = ctx.IDENTIFIER().text;
		return this.addScope(ctx, new psymb.PClassSymbol(signatureName), () => this.visitChildren(ctx));
	}

	visitMethodDeclaration = (ctx: pp.MethodDeclarationContext) => 
	{
		let signatureName : string = ctx.IDENTIFIER().text;
		//signatureName += "(" + DocumentSymbols.ParseParamsAsString(ctx.formalParameters()) + ")";
		let returnTypeOrVoid : pp.TypeTypeOrVoidContext = ctx.typeTypeOrVoid();
		let returnTypeCtx = returnTypeOrVoid.typeType();
		let returnVoid = returnTypeOrVoid.VOID();

		let returnType : symb.Type | undefined;
		if(returnTypeCtx)
			returnType = parseUtils.evaluateTypeTypeToSymbolType(returnTypeCtx, this.scope);
		else
			returnType = psymb.PUtils.createVoidType();
		
		if(!returnType)
			returnType = psymb.PUtils.createTypeUnknown();

		let method : symb.MethodSymbol = new symb.MethodSymbol(signatureName, returnType);
		this.pdeInfo?.refs?.registerDefinition(ctx.IDENTIFIER(), method );
		return this.addScope(ctx, method, () => this.visitChildren(ctx));
	};

	visitConstructorDeclaration = (ctx: pp.ConstructorDeclarationContext) => 
	{
		let signatureName : string = ctx.IDENTIFIER().text;
		signatureName += "(" + DocumentSymbols.ParseParamsAsString(ctx.formalParameters()) + ")";

		return this.addScope(ctx, new symb.MethodSymbol(signatureName), () => this.visitChildren(ctx));
	}

	visitBlock = (ctx: pp.BlockContext) => 
	{
		let fakeSymbolName : string = "";//"block"+ctx.start.startIndex;
		let newSymbol : symb.ScopedSymbol = new symb.ScopedSymbol(fakeSymbolName);
		return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	};
	
	visitForLoop = (ctx: pp.ForLoopContext) => 
	{
		let fakeSymbolName : string = "";//"for"+ctx.start.startIndex;
		let newSymbol : symb.ScopedSymbol = new symb.ScopedSymbol(fakeSymbolName);
		return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	};

	// =============================================================
	// =============================================================
	// =============================================================
	// =============================================================
	// PROTECTED HELPER FUNCTIONS
	// =============================================================

	protected addScope(ctx: ParseTree, newSymbol: symb.ScopedSymbol, action: () => symb.SymbolTable): symb.SymbolTable 
	{
		
		try {
			this.addChildSymbol(ctx, newSymbol);
			this.scope = newSymbol;

			try {
				return action();
			} finally {
				this.scope = newSymbol.parent as symb.ScopedSymbol;
			}
		} 
		catch(e) 
		{
			log.write("adding scope failed at: "+this.scope.qualifiedName(":", true, false)+"."+newSymbol.qualifiedName("|", false, false), log.severity.WARNING);
			log.write(e, log.severity.ERROR);
		}
		return this.defaultResult();
	}

	protected addChildSymbol(ctx: ParseTree, newSymbol: symb.BaseSymbol)
	{
		newSymbol.context = ctx;
		this.scope.addSymbol(newSymbol);

		if( this.visitingSymbols !== null && this.scope === this.visitorRootSymbol )
			this.visitingSymbols.push(newSymbol);

	}

	protected addTypedSymbols(symbolType : symb.Type | undefined, ctx: pp.VariableDeclaratorsContext, kind : number = 1 )
	{
		let variableDeclarators : pp.VariableDeclaratorContext [] = ctx.variableDeclarator();
		for( let i:number=0; i < variableDeclarators.length; i++ )
		{
			//let terminalNode = variableDeclarators[i].variableDeclaratorId().IDENTIFIER();
			this.addTypedSymbol(symbolType, variableDeclarators[i].variableDeclaratorId(), kind);
		}
	}

	protected addTypedSymbol(varType : symb.Type | undefined, ctx: pp.VariableDeclaratorIdContext, kind : number = 1 )
	{
		let terminalNode = ctx.IDENTIFIER();
		if(!terminalNode)
		{
			log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+ctx.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
			return;
		}

		try
		{
			let symbol : symb.BaseSymbol;
			if(kind == VAR_PARAM)
				symbol = new symb.ParameterSymbol(terminalNode.text, null, varType);
			else if(kind == VAR_FIELD)
				symbol = new symb.FieldSymbol(terminalNode.text, null, varType);
			else
				symbol = new symb.VariableSymbol(terminalNode.text, null, varType);

			this.pdeInfo?.refs?.registerDefinition(terminalNode, symbol );
			this.addChildSymbol(ctx, symbol);
		}
		catch(e)
		{
			log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
		}
	}

	protected registerPdeName(relatedSymbol: any, pdeName:string)
	{
		relatedSymbol.pdeName = pdeName;
	}



}