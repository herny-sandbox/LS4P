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
import * as jarSymbols from './JarSymbols'
import * as parseUtils from './astutils'

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

export function findFirstClassOrInterfaceUp(baseSymbol : symb.BaseSymbol) : psymb.PClassSymbol | psymb.PInterfaceSymbol | undefined
{
	if( baseSymbol instanceof psymb.PClassSymbol || baseSymbol instanceof psymb.PInterfaceSymbol )
		return baseSymbol;
	else if(baseSymbol.parent)
		return findFirstClassOrInterfaceUp(baseSymbol.parent);

	return;
}

export function resolveSymbolType(name:string, contextSymbol : symb.BaseSymbol) : symb.BaseSymbol
{
	let res : symb.BaseSymbol | undefined = contextSymbol.resolveSync(name);
	if(res instanceof symb.VariableSymbol && res.type)
	{
		if( res.type.reference == symb.ReferenceKind.Reference )
			res = contextSymbol.resolveSync(res.type.name);
	}
	return res ? res : contextSymbol;
}

export function resolveVariableDeclaration(name:string, contextSymbol : symb.BaseSymbol) : symb.VariableSymbol | undefined
{
	let res : symb.BaseSymbol | undefined = contextSymbol.resolveSync(name);
	if(res instanceof symb.VariableSymbol)
		return res;
	return;
}

export function resolveExpresionParamsAsString(paramListContext : pp.ExpressionListContext | undefined, contextSymbol : symb.BaseSymbol) : string
{
	let result : string = "";
	if(paramListContext)
	{
		let paramsList : pp.ExpressionContext[] = paramListContext.expression();
		if(paramsList.length > 0)
		{
			result += " ";
			result += resolveExpresionType(paramsList[0], contextSymbol);
			for(let i=1; i < paramsList.length; i++)
				result += ", " + resolveExpresionType(paramsList[i], contextSymbol);
			result += " ";
		}
	}

	return result;
}

export function resolveExpresionType(expressionContext : pp.ExpressionContext, contextSymbol : symb.BaseSymbol) : string
{
	
	let prim : pp.PrimaryContext | undefined = expressionContext.primary();
	if( prim )
	{
		let literal : pp.LiteralContext | undefined = prim.literal();
		if(prim.THIS())
		{
			return findFirstClassOrInterfaceUp(contextSymbol)?.name??"<unknown>";
		}
		else if(prim.IDENTIFIER())
		{
			let variab : symb.VariableSymbol | undefined = resolveVariableDeclaration(prim.text, contextSymbol);
			if(variab && variab.type)
				return variab.type.name;
		}
		else if(literal)
		{
			if(literal.integerLiteral())
				return "int";
			else if(literal.floatLiteral())
				return "float";
			else if(literal.CHAR_LITERAL())
				return "char";
			else if(literal.stringLiteral())
				return "float";
			else if(literal.BOOL_LITERAL())
				return "bool";
		}
	}
	return "<UnknownType>";
}

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
		this.symbolTable = new psymb.PSymbolTable(mainName, { allowDuplicateSymbols: true });

		jarSymbols.loadDefaultLibraries();
		jarSymbols.tryAddDependency(this.symbolTable, "java.lang");
		jarSymbols.tryAddDependency(this.symbolTable, "processing.core");
		jarSymbols.tryAddDependency(this.symbolTable, "processing.awt");
		jarSymbols.tryAddDependency(this.symbolTable, "processing.data");
		jarSymbols.tryAddDependency(this.symbolTable, "processing.event");
		jarSymbols.tryAddDependency(this.symbolTable, "processing.javafx");
		jarSymbols.tryAddDependency(this.symbolTable, "processing.opengl");
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
				log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text, log.severity.ERROR);
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
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId());
		return this.defaultResult();
	}

	visitLocalVariableDeclaration = (ctx: pp.LocalVariableDeclarationContext) => 
	{
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(ctx.typeType());
		this.addTypedSymbols(symbolType, ctx.variableDeclarators());
		return this.defaultResult();
	}
	
	visitFormalParameter = (ctx: pp.FormalParameterContext) => 
	{
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), true);
		
		return this.defaultResult();
	}

	visitFieldDeclaration = (ctx: pp.FieldDeclarationContext) => 
	{
		let fileTypeCtx = ctx.typeType();
		let symbolType = parseUtils.evaluateTypeTypeToSymbolType(fileTypeCtx);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators());
		return this.defaultResult();
	}

	visitClassDeclaration = (ctx: pp.ClassDeclarationContext) => 
	{
		let ext : psymb.PClassSymbol | undefined;
		let impl : psymb.PInterfaceSymbol [] = [];
		let classIdentifier = ctx.IDENTIFIER();
		let className = classIdentifier.text;
		let classSymbol = new psymb.PClassSymbol(className, ext, impl)
		this.pdeInfo?.refs?.registerDefinition(classIdentifier, classSymbol );
		return this.addScope(ctx, classSymbol, () => this.visitChildren(ctx.classBody()));
	}

	visitClassCreatorRest = (ctx: pp.ClassCreatorRestContext) => 
	{
		let fakeSymbolName : string = "classRest"+ctx.start.startIndex;
		let ext : psymb.PClassSymbol;
		let impl : Array<psymb.PClassSymbol | psymb.PInterfaceSymbol> = new Array<psymb.PClassSymbol | psymb.PInterfaceSymbol> ();
		return this.addScope(ctx, new psymb.PClassSymbol(fakeSymbolName), () => this.visitChildren(ctx));
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
		let returnTypeCtx = returnTypeOrVoid.typeType()
		let returnType : symb.Type | undefined;
		if(returnTypeCtx)
			returnType = parseUtils.evaluateTypeTypeToSymbolType(returnTypeCtx);
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
		let fakeSymbolName : string = "block"+ctx.start.startIndex;
		let newSymbol : symb.ScopedSymbol = new symb.ScopedSymbol(fakeSymbolName);
		return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	};
	
	visitForLoop = (ctx: pp.ForLoopContext) => 
	{
		let fakeSymbolName : string = "for"+ctx.start.startIndex;
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

	protected addTypedSymbols(symbolType : symb.Type | undefined, ctx: pp.VariableDeclaratorsContext )
	{
		let variableDeclarators : pp.VariableDeclaratorContext [] = ctx.variableDeclarator();
		for( let i:number=0; i < variableDeclarators.length; i++ )
		{
			//let terminalNode = variableDeclarators[i].variableDeclaratorId().IDENTIFIER();
			this.addTypedSymbol(symbolType, variableDeclarators[i].variableDeclaratorId());
		}
	}

	protected addTypedSymbol(symbolType : symb.Type | undefined, ctx: pp.VariableDeclaratorIdContext, isParameter : boolean = false )
	{
		let terminalNode = ctx.IDENTIFIER();
		if(!terminalNode)
		{
			log.write("add variable declaration failed at: "+this.scope.qualifiedName(":", true, false)+".", log.severity.ERROR);
			return;
		}

		try
		{
			let typedSymbol : symb.BaseSymbol;
			if(isParameter)
				typedSymbol = new symb.ParameterSymbol(terminalNode.text, null, symbolType);
			else
				typedSymbol = new symb.VariableSymbol(terminalNode.text, null, symbolType);

			this.pdeInfo?.refs?.registerDefinition(terminalNode, typedSymbol );
			this.addChildSymbol(ctx, typedSymbol);
		}
		catch(e)
		{
			log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text, log.severity.ERROR);
		}
	}

	protected registerPdeName(relatedSymbol: any, pdeName:string)
	{
		relatedSymbol.pdeName = pdeName;
	}



}