import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts';
import * as symbols from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import { LocationLink } from 'vscode-languageserver/node';
import * as log from './scripts/syslogs'
import { DocumentSymbols } from "./documentSymbols"
import { PdeContentInfo } from "./sketch";

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

export function findFirstClassOrInterfaceUp(symb : symbols.BaseSymbol) : symbols.ClassSymbol | symbols.InterfaceSymbol | undefined
{
	if( symb instanceof symbols.ClassSymbol || symb instanceof symbols.InterfaceSymbol )
		return symb;
	else if(symb.parent)
		return findFirstClassOrInterfaceUp(symb.parent);

	return;
}

export function resolveSymbolType(name:string, symb : symbols.BaseSymbol) : symbols.BaseSymbol
{
	let res : symbols.BaseSymbol | undefined = symb.resolveSync(name);
	if(res instanceof symbols.VariableSymbol && res.type)
	{
		if( res.type.reference == symbols.ReferenceKind.Reference )
			res = symb.resolveSync(res.type.name);
	}
	return res ? res : symb;
}

export function resolveVariableDeclaration(name:string, symb : symbols.BaseSymbol) : symbols.VariableSymbol | undefined
{
	let res : symbols.BaseSymbol | undefined = symb.resolveSync(name);
	if(res instanceof symbols.VariableSymbol)
		return res;
	return;
}

export function resolveExpresionParamsAsString(paramListContext : pp.ExpressionListContext | undefined, symbolContext : symbols.BaseSymbol) : string
{
	let result : string = "";
	if(paramListContext)
	{
		let paramsList : pp.ExpressionContext[] = paramListContext.expression();
		if(paramsList.length > 0)
		{
			result += " ";
			result += resolveExpresionType(paramsList[0], symbolContext);
			for(let i=1; i < paramsList.length; i++)
				result += ", " + resolveExpresionType(paramsList[i], symbolContext);
			result += " ";
		}
	}

	return result;
}

export function resolveExpresionType(expressionContext : pp.ExpressionContext, symbolContext : symbols.BaseSymbol) : string
{
	
	let prim : pp.PrimaryContext | undefined = expressionContext.primary();
	if( prim )
	{
		let literal : pp.LiteralContext | undefined = prim.literal();
		if(prim.THIS())
		{
			return findFirstClassOrInterfaceUp(symbolContext)?.name??"<unknown>";
		}
		else if(prim.IDENTIFIER())
		{
			let variab : symbols.VariableSymbol | undefined = resolveVariableDeclaration(prim.text, symbolContext);
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

export class SymbolTableVisitor extends AbstractParseTreeVisitor<symbols.SymbolTable> implements ProcessingParserVisitor<symbols.SymbolTable>
{
	private visitingSymbols : symbols.BaseSymbol[] | null = null;
	private visitorRootSymbol : symbols.ScopedSymbol | null = null;
	private mainClass : symbols.ClassSymbol;
	protected scope : symbols.ScopedSymbol;
	protected pdeInfo: PdeContentInfo | undefined;
	public symbolTable;

	constructor(mainName : string)
	{
		super();
		this.symbolTable = new symbols.SymbolTable(mainName, { allowDuplicateSymbols: true });
		this.mainClass = this.symbolTable.addNewSymbolOfType(symbols.ClassSymbol, undefined, mainName, [], new Array<symbols.ClassSymbol | symbols.InterfaceSymbol> ());
		this.scope = this.mainClass;
	}

	public getMainClass() : symbols.ClassSymbol { return this.mainClass; }
	protected defaultResult(): symbols.SymbolTable { return this.symbolTable; }

	public visitPdeLinked(pdeInfo: PdeContentInfo) : symbols.SymbolTable
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

	visitImportDeclaration = (ctx: pp.ImportDeclarationContext) =>
	{
		log.write("Importing "+ctx.qualifiedName().text, log.severity.WARNING);
		return this.defaultResult();
	} 

	visitEnhancedForControl = (ctx: pp.EnhancedForControlContext) => 
	{
		let symbolType : symbols.Type = this.evaluateSymbolType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId());
		return this.defaultResult();
	}

	visitLocalVariableDeclaration = (ctx: pp.LocalVariableDeclarationContext) => 
	{
		let symbolType : symbols.Type = this.evaluateSymbolType(ctx.typeType());
		this.addTypedSymbols(symbolType, ctx.variableDeclarators());
		return this.defaultResult();
	}
	
	visitFormalParameter = (ctx: pp.FormalParameterContext) => 
	{
		let symbolType : symbols.Type = this.evaluateSymbolType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), true);
		
		return this.defaultResult();
	}

	visitFieldDeclaration = (ctx: pp.FieldDeclarationContext) => 
	{
		let fileTypeCtx = ctx.typeType();
		let symbolType : symbols.Type = this.evaluateSymbolType(fileTypeCtx);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators());
		return this.defaultResult();
	}

	visitClassDeclaration = (ctx: pp.ClassDeclarationContext) => 
	{
		let ext : symbols.ClassSymbol [] = [];
		let impl : Array<symbols.ClassSymbol | symbols.InterfaceSymbol> = new Array<symbols.ClassSymbol | symbols.InterfaceSymbol> ();
		let classIdentifier = ctx.IDENTIFIER();
		let className = classIdentifier.text;
		let classSymbol = new symbols.ClassSymbol(className, ext, impl)
		this.pdeInfo?.refs?.registerDefinition(classIdentifier, classSymbol );
		return this.addScope(ctx, classSymbol, () => this.visitChildren(ctx.classBody()));
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
		//signatureName += "(" + DocumentSymbols.ParseParamsAsString(ctx.formalParameters()) + ")";
		let returnTypeOrVoid : pp.TypeTypeOrVoidContext = ctx.typeTypeOrVoid();
		let returnTypeCtx = returnTypeOrVoid.typeType()
		let returnType : symbols.Type | undefined;
		if(returnTypeCtx)
			returnType = this.evaluateSymbolType(returnTypeCtx);
		let method : symbols.MethodSymbol = new symbols.MethodSymbol(signatureName, returnType);
		this.pdeInfo?.refs?.registerDefinition(ctx.IDENTIFIER(), method );
		return this.addScope(ctx, method, () => this.visitChildren(ctx));
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

	protected evaluateSymbolType(typeContext : pp.TypeTypeContext) : symbols.Type
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


	public checkTypeFromClassOrInterface(symbolTypeName : string, classOrInterface : symbols.ClassSymbol | symbols.InterfaceSymbol) : boolean
	{
		if( classOrInterface.name === symbolTypeName )
			return true;
		for( let ext of classOrInterface.extends )
		{
			if(this.checkTypeFromClassOrInterface(symbolTypeName, ext))
				return true;
		}
		if(classOrInterface instanceof symbols.ClassSymbol)
		{
			for( let impl of classOrInterface.implements )
			{
				if(this.checkTypeFromClassOrInterface(symbolTypeName, impl))
					return true;
			}
		}
		return false;
	}

	protected addTypedSymbols(symbolType : symbols.Type, ctx: pp.VariableDeclaratorsContext )
	{
		let variableDeclarators : pp.VariableDeclaratorContext [] = ctx.variableDeclarator();
		for( let i:number=0; i < variableDeclarators.length; i++ )
		{
			//let terminalNode = variableDeclarators[i].variableDeclaratorId().IDENTIFIER();
			this.addTypedSymbol(symbolType, variableDeclarators[i].variableDeclaratorId());
		}
	}

	protected addTypedSymbol(symbolType : symbols.Type, ctx: pp.VariableDeclaratorIdContext, isParameter : boolean = false )
	{
		let terminalNode = ctx.IDENTIFIER();
		if(!terminalNode)
		{
			log.write("add variable declaration failed at: "+this.scope.qualifiedName(":", true, false)+".", log.severity.ERROR);
			return;
		}

		try
		{
			let typedSymbol : symbols.BaseSymbol;
			if(isParameter)
				typedSymbol = new symbols.ParameterSymbol(terminalNode.text, null, symbolType);
			else
				typedSymbol = new symbols.VariableSymbol(terminalNode.text, null, symbolType);

			this.pdeInfo?.refs?.registerDefinition(terminalNode, typedSymbol );
			this.addChildSymbol(ctx, typedSymbol);
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