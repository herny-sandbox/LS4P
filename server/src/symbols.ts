import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import * as antlr from 'antlr4ts/tree'
import * as symb from 'antlr4-c3'
import * as pp from './grammer/ProcessingParser';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver'
import * as log from './scripts/syslogs'
import { DocumentSymbols } from "./documentSymbols"
import { PdeContentInfo } from "./sketch";
import * as psymb from "./antlr-sym"

import * as parseUtils from './astutils'
import { ParserRuleContext } from 'antlr4';

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

	constructor(symbolTable : psymb.PSymbolTable, mainClass : psymb.PClassSymbol)
	{
		super();
		this.symbolTable = symbolTable;
		this.mainClass = mainClass;
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

	visitVariableDeclaratorId(ctx: pp.VariableDeclaratorIdContext) : symb.SymbolTable
	{
		let terminalNode = ctx.IDENTIFIER();
		if(terminalNode)
		{
			try
			{
				let symbolType : psymb.PType | undefined = undefined;
				this.addChildSymbol(ctx, new symb.VariableSymbol(terminalNode.text, null, symbolType));
			}
			catch(e)
			{
				log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
			}
		}
		return this.visitChildren(ctx);
	}

	visitClassBodyDeclaration(ctx: pp.ClassBodyDeclarationContext) : symb.SymbolTable
	{
		let importDecl = ctx.importDeclaration();
		let memberDecl = ctx.memberDeclaration();
		let memberModif = ctx.modifier();

		let visibility : symb.MemberVisibility = this.evaluateMemberVisibility(memberModif);
		let modifiers : symb.Modifier[] = this.evaluateMemberModifiers(memberModif);
		if(importDecl)
			this.visitImportDeclaration(importDecl);
		else if(memberDecl)
		{
			let method = memberDecl.methodDeclaration();
			let genericMethod = memberDecl.genericMethodDeclaration();
			let field = memberDecl.fieldDeclaration();
			let constr = memberDecl.constructorDeclaration();
			let genericConstr = memberDecl.genericConstructorDeclaration();
			let interf = memberDecl.interfaceDeclaration();
			let annotation = memberDecl.annotationTypeDeclaration();
			let classDecl = memberDecl.classDeclaration();
			let enumDecl = memberDecl.enumDeclaration();

			if(method)
				return this.tryDeclareMethod(undefined, method, visibility, modifiers);
			else if(genericMethod)
				return this.tryDeclareGenericMethod(genericMethod, visibility, modifiers);
			else if(field)
				return this.tryDeclareField(field, visibility, modifiers);
			else if(constr)
				this.tryDeclareConstructor(undefined, constr, visibility, modifiers);
			else if(genericConstr)
				this.tryDeclareGenericConstructor(genericConstr, visibility, modifiers);
			else if(interf)
				this.visit(interf);
				//this.tryDeclareInterface(interf);
			else if(annotation)
			{
				// ignored for now
			}
			else if(classDecl)
				this.visit(classDecl);
			else if(enumDecl)
				this.tryDeclareEnum(enumDecl, visibility, modifiers);
		}
		return this.defaultResult();
	}

	visitImportDeclaration(ctx: pp.ImportDeclarationContext) : symb.SymbolTable
	{
		let staticCtx = ctx.STATIC();
		let qualifiedName = ctx.qualifiedName();
		let allMembers = ctx.MUL() != undefined;

		let fullName = parseUtils.buildFullClassName(qualifiedName.IDENTIFIER())

		if(staticCtx)
		{
			console.error("unhandled static import: " + fullName + (allMembers?".*":""));
		}
		else
			this.symbolTable.addImport(fullName, allMembers);

		return this.defaultResult();
	} 

	visitEnhancedForControl(ctx: pp.EnhancedForControlContext) : symb.SymbolTable
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}

		let symbolType = parseUtils.convertTypeTypeToSymbolType(ctx.typeType(), this.scope);
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_LOCAL, symb.MemberVisibility.Private, modifiers);
		return this.defaultResult();
	}

	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext) : symb.SymbolTable 
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}
		let typeCtx = ctx.typeType();
		let symbolType = parseUtils.convertTypeTypeToSymbolType(typeCtx, this.scope);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators(), VAR_LOCAL, symb.MemberVisibility.Private, modifiers);
		return this.defaultResult();
	}
	
	visitFormalParameter(ctx: pp.FormalParameterContext) : symb.SymbolTable 
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}

		let symbolType = parseUtils.convertTypeTypeToSymbolType(ctx.typeType(), this.scope);
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_PARAM, symb.MemberVisibility.Private, modifiers);
		
		return this.defaultResult();
	}

	visitLastFormalParameter(ctx: pp.LastFormalParameterContext) : symb.SymbolTable 
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}
		let ctxType = ctx.typeType();
		let symbolType = parseUtils.convertTypeTypeToSymbolType(ctxType, this.scope);
		if(ctx.ELLIPSIS() && symbolType)
		{
			symbolType = psymb.PUtils.createArrayType(symbolType);
			if(this.scope instanceof symb.MethodSymbol)
				psymb.PUtils.setMethodLastVargs(this.scope);
		}
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_PARAM, symb.MemberVisibility.Private, modifiers);
		
		return this.defaultResult();
	}

	tryDeclareField(ctx: pp.FieldDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		let fileTypeCtx = ctx.typeType();
		let symbolType = parseUtils.convertTypeTypeToSymbolType(fileTypeCtx, this.scope);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators(), VAR_FIELD, visibility, modifiers);
		return this.defaultResult();
	}

	visitClassDeclaration(ctx: pp.ClassDeclarationContext) : symb.SymbolTable
	{
		let classIdentifier = ctx.IDENTIFIER();
		let classBody = ctx.classBody();
		let typeParams = ctx.typeParameters();
		let extendsCtx = ctx.typeType();
		let implemCtx =ctx.typeList();

		let ext : psymb.PType;
		let impl : psymb.PType [] = [];

		if(extendsCtx)
			ext = parseUtils.convertTypeTypeToSymbolType(extendsCtx, this.scope);
		else
			ext = psymb.PUtils.createDefaultObjectType();

		ext.typeKind = psymb.PTypeKind.Class;
		if(implemCtx)
			impl = parseUtils.convertTypeListToSymbolTypeList(implemCtx, this.scope);
		for(let interf of impl)
			interf.typeKind = psymb.PTypeKind.Interface;

		let className = classIdentifier.text;
		let classSymbol = new psymb.PClassSymbol(className, ext, impl);
		this.pdeInfo?.registerDefinition(classIdentifier, classSymbol );

		if(typeParams)
		{
			let params = typeParams.typeParameter();
			for(let param of params)
			{
				let identif = param.IDENTIFIER();
				let bound = param.typeBound();
				let formalTypes : psymb.PType [] = [];

				if(bound)
				{
					let boundTypesCtx = bound.typeType();
					for(let boundTypeCtx of boundTypesCtx)
						formalTypes.push( parseUtils.convertTypeTypeToSymbolType(boundTypeCtx, this.scope) );
				}
				let typeParam = new psymb.PFormalParamSymbol(identif.text, formalTypes);
				classSymbol.addSymbol(typeParam);
			}
		}

		return this.addScope(ctx, classSymbol, () => this.visitChildren(classBody));
	}

	visitInterfaceDeclaration(ctx: pp.InterfaceDeclarationContext) 
	{
		let identifier = ctx.IDENTIFIER();
		let typeParams = ctx.typeParameters();
		let extendsCtx =ctx.typeList();
		let interfaceBody = ctx.interfaceBody();

		let exts : psymb.PType [] = [];

		if(extendsCtx)
			exts = parseUtils.convertTypeListToSymbolTypeList(extendsCtx, this.scope);
		for(let ext of exts)
			ext.typeKind = psymb.PTypeKind.Interface;

		let interfName = identifier.text;
		let interfSymbol = new psymb.PInterfaceSymbol(interfName, exts);
		this.pdeInfo?.registerDefinition(identifier, interfSymbol );

		if(typeParams)
		{
			let params = typeParams.typeParameter();
			for(let param of params)
			{
				let identif = param.IDENTIFIER();
				let bound = param.typeBound();
				let formalTypes : psymb.PType [] = [];

				if(bound)
				{
					let boundTypesCtx = bound.typeType();
					for(let boundTypeCtx of boundTypesCtx)
						formalTypes.push( parseUtils.convertTypeTypeToSymbolType(boundTypeCtx, this.scope) );
				}
				let typeParam = new psymb.PFormalParamSymbol(identif.text, formalTypes);
				interfSymbol.addSymbol(typeParam);
			}
		}

		return this.addScope(ctx, interfSymbol, () => this.visitChildren(interfaceBody));
	}

	visitClassCreatorRest(ctx: pp.ClassCreatorRestContext) : symb.SymbolTable
	{
		let ext : psymb.PType = psymb.PUtils.createDefaultObjectType();
		let impl : psymb.PType [] = [];
		return this.addScope(ctx, new psymb.PClassSymbol("", ext, impl), () => this.visitChildren(ctx));
	}

	visitEnumDeclaration(ctx: pp.EnumDeclarationContext) : symb.SymbolTable
	{
		return this.tryDeclareEnum(ctx, undefined, []);
	}

	tryDeclareMethod(typeParameters: pp.TypeParametersContext|undefined, ctx: pp.MethodDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		return this.tryDeclareMethodRaw(typeParameters, 
										ctx.typeTypeOrVoid(), 
										ctx.IDENTIFIER(), 
										ctx.formalParameters().formalParameterList(),
										ctx.qualifiedNameList(),
										ctx.methodBody().block(),
										visibility,
										modifiers);
	}

	tryDeclareMethodRaw(typeParameters: pp.TypeParametersContext|undefined, 
						returnTypeOrVoid: pp.TypeTypeOrVoidContext|undefined, 
						identif: TerminalNode, 
						params: pp.FormalParameterListContext|undefined,
						exceptions: pp.QualifiedNameListContext|undefined,
						body : pp.BlockContext|undefined,
						visibility:symb.MemberVisibility, 
						modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		let signatureName : string = identif.text;

		let returnType : psymb.PType | undefined;
		if(returnTypeOrVoid)
		{
			let returnTypeCtx = returnTypeOrVoid.typeType();
	
			if(returnTypeCtx)
				returnType = parseUtils.convertTypeTypeToSymbolType(returnTypeCtx, this.scope);
			else
				returnType = psymb.PUtils.createVoidType();
			
			if(!returnType)
				returnType = psymb.PUtils.createTypeUnknown();
		}

		let method : symb.MethodSymbol = new symb.MethodSymbol(signatureName, returnType);
		this.applyModifiers(method, visibility, modifiers);

		this.pdeInfo?.registerDefinition(identif, method );
		let parentCtx : ParseTree;
		//if() = identif.parent;
		// if(identif.parent instanceof ParserRuleContext)
		// {
		if(!identif.parent)
			return this.defaultResult();
	
		this.addChildSymbol(identif.parent, method);
		this.scope = method;

		try {

			if(typeParameters)
				this.tryDeclareTypeParams(typeParameters);
			if(params)
			{
				let paramList = params.formalParameter();
				for(let param of paramList)
					this.visitFormalParameter(param);
				let lastParam = params.lastFormalParameter();
				if(lastParam)
					this.visitLastFormalParameter(lastParam);
			}
			if(exceptions) // The method symbol is a scope so no need to create another one, we move directly to the body childrens
				this.visitChildren(exceptions);
			if(body) // The method symbol is a scope so no need to create another one, we move directly to the body childrens
				this.visitChildren(body);

		} finally {
			this.scope = method.parent as symb.ScopedSymbol;
			return this.defaultResult();
		}
		//}
		return this.defaultResult();
	}

	tryDeclareGenericMethod(ctx: pp.GenericMethodDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		let typeParameters = ctx.typeParameters();
		let methodDecl = ctx.methodDeclaration();

		return this.tryDeclareMethod(typeParameters, methodDecl, visibility, modifiers);
	}

	private tryDeclareTypeParams(typeParameters: pp.TypeParametersContext) {
		let typeParameterArray = typeParameters.typeParameter();
		let boundTypes: psymb.PType[] = [];
		for (let i = 0; i < typeParameterArray.length; i++) {
			//let baseType: symb.Type;
			let paramName = typeParameterArray[i].IDENTIFIER().text;
			let typeBound = typeParameterArray[i].typeBound();
			//let extendDecl = typeParameterArray[i].EXTENDS();

			if (typeBound) {
				let boundedTypes = typeBound.typeType();
				for (let i = 0; i < boundedTypes.length; i++) {
					let symbolType = parseUtils.convertTypeTypeToSymbolType(boundedTypes[i], this.scope);
					if (!symbolType) {
						symbolType = psymb.PUtils.createTypeUnknown();
						this.pdeInfo?.notifyCompileError("", boundedTypes[i]);
					}
					boundTypes.push(symbolType);
				}
			}
			else
				boundTypes.push(psymb.PUtils.createDefaultObjectType());

			this.scope.addSymbol(new psymb.PFormalParamSymbol(paramName, boundTypes));
		}
	}

	tryDeclareConstructor(	typeParameters: pp.TypeParametersContext|undefined,
							ctx: pp.ConstructorDeclarationContext, 
							visibility:symb.MemberVisibility, 
							modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		return this.tryDeclareMethodRaw(typeParameters, 
										undefined, 
										ctx.IDENTIFIER(), 
										ctx.formalParameters().formalParameterList(),
										ctx.qualifiedNameList(),
										ctx.block(),
										visibility,
										modifiers);
	}

	tryDeclareGenericConstructor(ctx: pp.GenericConstructorDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		let typeParameters = ctx.typeParameters();
		let constDecl = ctx.constructorDeclaration();
		return this.tryDeclareConstructor(typeParameters, constDecl, visibility, modifiers);
	}

	tryDeclareEnum(ctx: pp.EnumDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[]) : symb.SymbolTable
	{
		let enumID = ctx.IDENTIFIER();
		let implCtx = ctx.typeList();
		let enumMembers = ctx.enumConstants();
		let enumBodyDecl = ctx.enumBodyDeclarations();

		let implementing : psymb.PType [] = [];
		if(implCtx)
			implementing = parseUtils.convertTypeListToSymbolTypeList(implCtx, this.scope);
		for(let impl of implementing)
			impl.typeKind = psymb.PTypeKind.Interface;

		let savedScope = this.scope;
		let enumSymbol = new psymb.PEnumSymbol(enumID.text, implementing)
		this.pdeInfo?.registerDefinition( enumID, enumSymbol );
		this.addChildSymbol(ctx, enumSymbol);
		this.scope = enumSymbol;

		let enumContantArray = enumMembers.enumConstant();
		for(let enumConstant of enumContantArray)
		{
			let enumMemberID = enumConstant.IDENTIFIER();
			let args = enumConstant.arguments();
			let body = enumConstant.classBody();

			let enumMemberSymbol = new psymb.PEnumMemberSymbol(enumMemberID.text, implementing)
			this.pdeInfo?.registerDefinition( enumMemberID, enumMemberSymbol );
			this.addChildSymbol(ctx, enumMemberSymbol);

			this.scope = enumMemberSymbol;

			if(body)
				this.visitChildren(body);

			this.scope = enumSymbol;
		}
		if(enumBodyDecl)
			this.visitChildren(enumBodyDecl)
		this.scope = savedScope;

		return this.defaultResult();
	}

	visitBlock(ctx: pp.BlockContext) : symb.SymbolTable
	{
		let fakeSymbolName : string = "";//"block"+ctx.start.startIndex;
		let newSymbol : symb.ScopedSymbol = new symb.ScopedSymbol(fakeSymbolName);
		return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	};

	visitCatchClause(ctx: pp.CatchClauseContext)  : symb.SymbolTable
	{
		let catchType = ctx.catchType();
		let identif = ctx.IDENTIFIER();

		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}
		let savedSymbol = this.scope;
		let catchSymbol : symb.ScopedSymbol = new symb.ScopedSymbol("");
		this.addChildSymbol(ctx, catchSymbol);

		let qualifName = catchType.qualifiedName();
		if(qualifName.length > 0)
		{
			let exceptionType = psymb.PUtils.createClassType(qualifName[0].text);
			let exceptionSymbol = new symb.VariableSymbol(identif.text, null, exceptionType);

			this.applyModifiers(exceptionSymbol, symb.MemberVisibility.Private, modifiers);
			this.pdeInfo?.registerDefinition(identif, exceptionSymbol );
			this.addChildSymbol(ctx, exceptionSymbol);
		}
		this.visit(ctx.block());
		this.scope = savedSymbol;
		return this.defaultResult();
		//return this.addScope(ctx, catchSymbol, () => this.visitChildren(ctx));
	}

	// visitFinallyBlock(ctx: pp.FinallyBlockContext)   : symb.SymbolTable
	// {
	// 	let fakeSymbolName : string = "";
	// 	let newSymbol : symb.ScopedSymbol = new symb.ScopedSymbol(fakeSymbolName);
	// 	return this.addScope(ctx, newSymbol, () => this.visitChildren(ctx));
	// }
	
	visitForLoop(ctx: pp.ForLoopContext) : symb.SymbolTable
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
			if(e instanceof TypeError)
				console.error(e.stack);
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

	protected addTypedSymbols(symbolType : psymb.PType, ctx: pp.VariableDeclaratorsContext, kind : number = 1, visibility:symb.MemberVisibility, modifiers:symb.Modifier[] )
	{
		let variableDeclarators : pp.VariableDeclaratorContext [] = ctx.variableDeclarator();
		for( let i:number=0; i < variableDeclarators.length; i++ )
		{
			let varDeclarator = variableDeclarators[i];
			let decl = varDeclarator.variableDeclaratorId();

			this.addTypedSymbol(symbolType, decl, kind, visibility, modifiers);
		}
	}

	protected addTypedSymbol(varType : psymb.PType, ctx: pp.VariableDeclaratorIdContext, kind : number = 1, visibility:symb.MemberVisibility, modifiers:symb.Modifier[] )
	{
		let terminalNode = ctx.IDENTIFIER();
		let arraySize = ctx.LBRACK().length;
		if(!terminalNode)
		{
			log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+ctx.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
			return;
		}
		while(arraySize > 0)
		{
			varType = psymb.PUtils.createArrayType(varType);
			arraySize--;
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

			this.applyModifiers(symbol, visibility, modifiers);
			this.pdeInfo?.registerDefinition(terminalNode, symbol );
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

	evaluateMemberVisibility(memberModifiers: pp.ModifierContext[]) : symb.MemberVisibility
	{
		let result : symb.MemberVisibility = symb.MemberVisibility.Public;
		for(let memberModif of memberModifiers)
		{
			let actualModif = memberModif.classOrInterfaceModifier();
			if(!actualModif)
				continue;
			if(actualModif.PUBLIC())
				return symb.MemberVisibility.Public;
			if(actualModif.PROTECTED())
				return symb.MemberVisibility.Protected;
			if(actualModif.PRIVATE())
				return symb.MemberVisibility.Private;
		}
		return result;
	}
	evaluateMemberModifiers(memberModifiers: pp.ModifierContext[]) : symb.Modifier[]
	{
		let result : symb.Modifier[] = [];
		for(let memberModif of memberModifiers)
		{
			let actualModif = memberModif.classOrInterfaceModifier();
			if(!actualModif)
				continue;
			if(actualModif.STATIC())
				result.push( symb.Modifier.Static );
			if(actualModif.FINAL())
				result.push( symb.Modifier.Final );
			if(actualModif.ABSTRACT())
				result.push( symb.Modifier.Abstract );
		}
		return result;
	}
	applyModifiers(symbol: symb.BaseSymbol, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		symbol.visibility = visibility;
		symbol.modifiers.clear();
		for(let modif of modifiers)
			symbol.modifiers.add(modif);
	}
}