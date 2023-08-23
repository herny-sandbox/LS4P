
import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts';
import * as symbols from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import { LocationLink } from 'vscode-languageserver/node';
import * as log from './scripts/syslogs'
import { DocumentSymbols } from "./documentSymbols"

function getPdeName(symb: any) : string | undefined
{
	return symb.pdeName;
}

export function findPdeName(symb : symbols.BaseSymbol) : string | undefined
{
	let result : string | undefined = getPdeName(symb);
	if( result ) 
		return result;
	if(!symb.parent)
		return;
	return findPdeName(symb.parent);
}

export class SymbolTableVisitor extends AbstractParseTreeVisitor<symbols.SymbolTable> implements ProcessingParserVisitor<symbols.SymbolTable>
{
	private visitingSymbols : symbols.BaseSymbol[] | null = null;
	private visitorRootSymbol : symbols.ScopedSymbol | null = null;

	constructor(
		public symbolTable = new symbols.SymbolTable("", {}),
		protected scope =  symbolTable.addNewSymbolOfType(symbols.ScopedSymbol, undefined)) 
	{
		super();
	}

	protected defaultResult(): symbols.SymbolTable 
	{
		return this.symbolTable;
	}

	public visitPdeLinked(pdeName: string, ctx : ParseTree, resultSymbols : symbols.BaseSymbol[]) : symbols.SymbolTable
	{
		this.visitorRootSymbol = this.scope;
		this.visitingSymbols = resultSymbols;
		this.visit(ctx);
		this.visitingSymbols = null;
		// we record our current pde name for future use...
		for(let i=0; i < resultSymbols.length; i++ )
			this.registerPdeName(resultSymbols[i], pdeName);
		return this.defaultResult();
	}

	public removeRootSymbols(symbs : symbols.BaseSymbol[])
	{
		while(symbs.length > 0)
		{
			let s : symbols.BaseSymbol | undefined = symbs.pop();
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
				let symbolType : symbols.Type | undefined = undefined;
				this.addChildSymbol(ctx, new symbols.VariableSymbol(terminalNode.text, null, symbolType));
			}
			catch(e)
			{
				log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text, log.severity.ERROR);
			}
		}
		return this.visitChildren(ctx);
	}

	visitEnhancedForControl = (ctx: pp.EnhancedForControlContext) => 
	{
		let symbolType : symbols.Type = this.parseSymbolType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId());
		return this.defaultResult();
	}

	visitLocalVariableDeclaration = (ctx: pp.LocalVariableDeclarationContext) => 
	{
		let symbolType : symbols.Type = this.parseSymbolType(ctx.typeType());
		this.addTypedSymbols(symbolType, ctx.variableDeclarators());
		return this.defaultResult();
	}
	
	visitFormalParameter = (ctx: pp.FormalParameterContext) => 
	{
		let symbolType : symbols.Type = this.parseSymbolType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId());
		return this.defaultResult();
	}

	visitFieldDeclaration = (ctx: pp.FieldDeclarationContext) => 
	{
		let symbolType : symbols.Type = this.parseSymbolType(ctx.typeType());
		this.addTypedSymbols(symbolType, ctx.variableDeclarators());
		return this.defaultResult();
	}

	visitClassDeclaration = (ctx: pp.ClassDeclarationContext) => 
	{
		let ext : symbols.ClassSymbol [] = [];
		let impl : Array<symbols.ClassSymbol | symbols.InterfaceSymbol> = new Array<symbols.ClassSymbol | symbols.InterfaceSymbol> ();
		return this.addScope(ctx, new symbols.ClassSymbol(ctx.IDENTIFIER().text, ext, impl), () => this.visitChildren(ctx));
	}

	visitClassCreatorRest = (ctx: pp.ClassCreatorRestContext) => 
	{
		let fakeSymbolName : string = "classRest"+ctx.start.startIndex;
		let ext : symbols.ClassSymbol [] = [];
		let impl : Array<symbols.ClassSymbol | symbols.InterfaceSymbol> = new Array<symbols.ClassSymbol | symbols.InterfaceSymbol> ();
		return this.addScope(ctx, new symbols.ClassSymbol(fakeSymbolName, ext, impl), () => this.visitChildren(ctx));
	}

	visitEnumDeclaration = (ctx: pp.EnumDeclarationContext) => 
	{
		let signatureName : string = ctx.IDENTIFIER().text;
		let ext : symbols.ClassSymbol [] = [];
		let impl : Array<symbols.ClassSymbol | symbols.InterfaceSymbol> = new Array<symbols.ClassSymbol | symbols.InterfaceSymbol> ();
		return this.addScope(ctx, new symbols.ClassSymbol(signatureName, ext, impl), () => this.visitChildren(ctx));
	}

	visitMethodDeclaration = (ctx: pp.MethodDeclarationContext) => 
	{
		let signatureName : string = ctx.IDENTIFIER().text;
		signatureName += "(" + DocumentSymbols.ParseParamsAsString(ctx.formalParameters()) + ")";
		return this.addScope(ctx, new symbols.MethodSymbol(signatureName), () => this.visitChildren(ctx));
	};

	visitConstructorDeclaration = (ctx: pp.ConstructorDeclarationContext) => 
	{
		let signatureName : string = ctx.IDENTIFIER().text;
		signatureName += "(" + DocumentSymbols.ParseParamsAsString(ctx.formalParameters()) + ")";

		return this.addScope(ctx, new symbols.MethodSymbol(signatureName), () => this.visitChildren(ctx));
	}

	visitBlock = (ctx: pp.BlockContext) => 
	{
		let fakeSymbolName : string = "block"+ctx.start.startIndex;
		let newSymbol : symbols.ScopedSymbol = new symbols.ScopedSymbol(fakeSymbolName);
		return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	};
	
	visitForLoop = (ctx: pp.ForLoopContext) => 
	{
		let fakeSymbolName : string = "for"+ctx.start.startIndex;
		let newSymbol : symbols.ScopedSymbol = new symbols.ScopedSymbol(fakeSymbolName);
		return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	};

	// =============================================================
	// =============================================================
	// =============================================================
	// =============================================================
	// PROTECTED HELPER FUNCTIONS
	// =============================================================

	protected addScope(ctx: ParseTree, newSymbol: symbols.ScopedSymbol, action: () => symbols.SymbolTable): symbols.SymbolTable 
	{
		
		try {
			this.addChildSymbol(ctx, newSymbol);
			this.scope = newSymbol;

			try {
				return action();
			} finally {
				this.scope = newSymbol.parent as symbols.ScopedSymbol;
			}
		} 
		catch(e) 
		{
			log.write("adding scope failed at: "+this.scope.qualifiedName(":", true, false)+"."+newSymbol.qualifiedName("|", false, false), log.severity.WARNING);
			log.write(e, log.severity.ERROR);
		}
		return this.defaultResult();
	}

	protected addChildSymbol(ctx: ParseTree, newSymbol: symbols.BaseSymbol)
	{
		newSymbol.context = ctx;
		this.scope.addSymbol(newSymbol);

		if( this.visitingSymbols !== null && this.scope === this.visitorRootSymbol )
			this.visitingSymbols.push(newSymbol);

	}

	protected parseTypeToSymbolType(classOrInterface : pp.ClassOrInterfaceTypeContext | undefined, primitive : pp.PrimitiveTypeContext | undefined) : symbols.TypeKind
	{
		if(primitive)
		{
			if(primitive.BOOLEAN())
				return symbols.TypeKind.Boolean;
			if(primitive.CHAR())
				return symbols.TypeKind.Char;
			if(primitive.BYTE())
				return symbols.TypeKind.Integer;
			if(primitive.SHORT())
				return symbols.TypeKind.Integer;
			if(primitive.INT())
				return symbols.TypeKind.Integer;
			if(primitive.LONG())
				return symbols.TypeKind.Number;
			if(primitive.FLOAT())
				return symbols.TypeKind.Float;
			if(primitive.DOUBLE())
				return symbols.TypeKind.Float;
			if(primitive.colorPrimitiveType())
				return symbols.TypeKind.Class;
		}
		else if(classOrInterface)
		{
			return symbols.TypeKind.Class;
		}
		return symbols.TypeKind.Boolean;
	}

	protected parseSymbolType(typeContext : pp.TypeTypeContext) : symbols.Type
	{
		let classOrInterface : pp.ClassOrInterfaceTypeContext | undefined = typeContext.classOrInterfaceType();
		let primitive : pp.PrimitiveTypeContext | undefined =  typeContext.primitiveType();

		let symbolType : symbols.Type = {  
			name : typeContext.text,
			kind : this.parseTypeToSymbolType(classOrInterface, primitive),
			baseTypes : [],
			reference : classOrInterface ? symbols.ReferenceKind.Reference : symbols.ReferenceKind.Instance
		};
		return symbolType;
	}


	protected addTypedSymbols(symbolType : symbols.Type, ctx: pp.VariableDeclaratorsContext )
	{
		let variableDeclarators : pp.VariableDeclaratorContext [] = ctx.variableDeclarator();
		for( let i:number=0; i < variableDeclarators.length; i++ )
		{
			let terminalNode = variableDeclarators[i].variableDeclaratorId().IDENTIFIER();
			this.addTypedSymbol(symbolType, variableDeclarators[i].variableDeclaratorId());
		}
	}

	protected addTypedSymbol(symbolType : symbols.Type, ctx: pp.VariableDeclaratorIdContext )
	{
		let terminalNode = ctx.IDENTIFIER();
		if(!terminalNode)
		{
			log.write("add variable declaration failed at: "+this.scope.qualifiedName(":", true, false)+".", log.severity.ERROR);
			return;
		}

		try
		{
			this.addChildSymbol(ctx, new symbols.VariableSymbol(terminalNode.text, null, symbolType));
		}
		catch(e)
		{
			log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text, log.severity.ERROR);
		}
	}

	protected registerPdeName(symb: any, pdeName:string)
	{
		symb.pdeName = pdeName;
	}



}