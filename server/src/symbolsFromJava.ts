
import { JavaClassParserVisitor } from './grammer/JavaClassParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ArrayTypeContext, ArrayTypeSignatureContext, BaseTypeContext, ClassTypeSignatureContext, FieldTypeContext, MethodTypeSignatureContext, ObjectTypeContext, ParameterDescriptorContext, ReturnDescriptorContext, TypeSignatureContext, TypeVariableSignatureContext } from './grammer/JavaClassParser';
import { ClassVisitor, Opcodes, FieldVisitor } from "@xmcl/asm"
import { SignatureReader }  from './grammer/SignatureReader'
import { SignatureVisitor }  from './grammer/SignatureVisitor'
import * as symb from 'antlr4-c3'
import * as psymb from "./antlr-sym"

let debugSignature : string="";
let debugClass:string = "";
let debugMethodName:string="";
let debugFieldName:string="";

export class ClassBuilderFromJava extends ClassVisitor
{
	protected classSymbol : psymb.PClassSymbol | undefined;
	protected libTable : psymb.PLibraryTable;
	protected name:string;
	public constructor(libTable : psymb.PLibraryTable, name:string) {
        super(Opcodes.ASM5);
		this.libTable = libTable;
		this.name=name;
		debugClass = name;
    }

    // visit the class 
    visit(version: number, access: number, pathName: string, signature: string, superName: string, interfaces: string[]): void 
	{
		let isPublic = (access & Opcodes.ACC_PUBLIC) != 0;
		let isStatic = (access & Opcodes.ACC_STATIC) != 0;

		if(!isPublic)
			return;

		debugSignature = signature;

		let ext : symb.Type | undefined;
		let impl : symb.Type [] = [];
	
		if(superName && superName.length!=0)
		{
			let fixedName = superName.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			ext = psymb.PUtils.createClassType(fixedName);
		}
		for(let i=0; interfaces && i < interfaces.length; i++)
		{
			let fixedName = interfaces[i].replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			impl.push( psymb.PUtils.createInterfaceType(fixedName) );
		}

		let genericParams : symb.Type[] = [];
		this.classSymbol = new psymb.PClassSymbol(this.name, ext, impl, genericParams);
		this.libTable.getOrCreateNamespaceFor(pathName, "/").addSymbol(this.classSymbol);
		if(signature)
		{
			const visitor = new ClassSignatureVisitor(this.classSymbol);
			new SignatureReader(signature).accept(visitor);
		}
	
		// 

    }

    // visit method
    public visitMethod(access: number, name: string, desc: string, signature: string, exceptions: string[]) 
	{
		if(!this.classSymbol)
			return null;

		let isPublic = (access & Opcodes.ACC_PUBLIC) != 0;
		let isProtected = (access & Opcodes.ACC_PROTECTED) != 0;
		let isStatic = (access & Opcodes.ACC_STATIC) != 0;
		let isFinal = (access & Opcodes.ACC_FINAL) != 0;

		if(!isPublic && !isProtected)
			return null;

		let isConstructor = (name == "<init>");
		debugSignature = signature?signature:desc;
		let returnType : symb.Type | undefined;

		if( isConstructor )
			name = this.name;
		if( !isConstructor )
			returnType = psymb.PUtils.createTypeUnknown();

		let methodSymbol : symb.MethodSymbol = new symb.MethodSymbol(name, returnType);
		this.classSymbol.addSymbol( methodSymbol );

		if(isStatic)
			methodSymbol.modifiers.add(symb.Modifier.Static);
		if(isFinal)
			methodSymbol.modifiers.add(symb.Modifier.Final);

		if(isPublic)
			methodSymbol.visibility = symb.MemberVisibility.Public;
		else if(isProtected)
			methodSymbol.visibility = symb.MemberVisibility.Protected;

		debugMethodName = "."+name+"(M)"; 
		const visitor = new MethodSignatureVisitor(methodSymbol);
		new SignatureReader(signature?signature:desc).accept(visitor);
		debugMethodName = "";

		return null;
    }

    // visit field
    public visitField(access: number, name: string, desc: string, signature: string, value: any)
	{
		if(!this.classSymbol)
			return null;

		let isPublic = (access & Opcodes.ACC_PUBLIC) != 0;
		let isProtected = (access & Opcodes.ACC_PROTECTED) != 0;
		let isStatic = (access & Opcodes.ACC_STATIC) != 0;
		let isFinal = (access & Opcodes.ACC_FINAL) != 0;

		if(!isPublic && !isProtected)
			return null;

		debugSignature = signature?signature:desc;
		let symbolType : symb.Type = psymb.PUtils.createTypeUnknown();
		let fieldSymbol : symb.FieldSymbol = new symb.FieldSymbol(name, null, symbolType);
		this.classSymbol.addSymbol( fieldSymbol );

		if(isStatic)
			fieldSymbol.modifiers.add(symb.Modifier.Static);
		if(isFinal)
			fieldSymbol.modifiers.add(symb.Modifier.Final);

		if(isPublic)
			fieldSymbol.visibility = symb.MemberVisibility.Public;
		else if(isProtected)
			fieldSymbol.visibility = symb.MemberVisibility.Protected;
		
		debugFieldName = "."+name;
		const visitor = new TypeSignatureVisitor(symbolType);
		new SignatureReader(signature?signature:desc).accept(visitor);
		debugFieldName = "";
		return null;
    }
}

class DebugSignatureVisitor extends SignatureVisitor
{
	constructor(api: number) { super(api); }
	public visitFormalTypeParameter(name: string): void { this.warnNoImplemented('visitFormalTypeParameter'); }
	public visitClassBound(): SignatureVisitor { this.warnNoImplemented('visitClassBound'); return this; }
	public visitInterfaceBound(): SignatureVisitor { this.warnNoImplemented('visitInterfaceBound'); return this; }
	public visitSuperclass(): SignatureVisitor { this.warnNoImplemented('visitSuperclass'); return this; }
	public visitInterface(): SignatureVisitor { this.warnNoImplemented('visitInterface'); return this; }
	public visitParameterType(): SignatureVisitor { this.warnNoImplemented('visitParameterType'); return this; }
	public visitReturnType(): SignatureVisitor { this.warnNoImplemented('visitReturnType'); return this; }
	public visitExceptionType(): SignatureVisitor { this.warnNoImplemented('visitExceptionType'); return this; }
	public visitBaseType(descriptor: string) { this.warnNoImplemented('visitBaseType'); }
	public visitTypeVariable(name: string) { this.warnNoImplemented('visitTypeVariable'); }
	public visitArrayType(): SignatureVisitor { this.warnNoImplemented('visitArrayType'); return this; }
	public visitIdentifier(name: string) { this.warnNoImplemented('visitIdentifier'); }
	public visitInnerClassType(name: string) { this.warnNoImplemented('visitInnerClassType'); }
	public visitUnboundedTypeArgument() { this.warnNoImplemented('visitUnboundedTypeArgument');}
	public visitTypeArgument(wildcard: string): SignatureVisitor { this.warnNoImplemented('visitTypeArgument'); return this; }
	public visitEnd() { this.warnNoImplemented('visitEnd'); }
	public warnNoImplemented(methodName : string)
	{
		console.warn(`The function ${methodName} was not correctly implemented in ${this.constructor.name} at ${debugClass}${debugMethodName}$${debugFieldName}`)
	}
  }

class ClassSignatureVisitor extends DebugSignatureVisitor
{
	protected classSymbol : psymb.PClassSymbol;
	protected scopedType : symb.Type | undefined;
	protected interfaceIndex : number = 0;
	public constructor(classSymbol : psymb.PClassSymbol) {
        super(Opcodes.ASM5);
		this.classSymbol = classSymbol;
    }

	public visitFormalTypeParameter(name: string) 
	{
		this.scopedType = psymb.PUtils.createTypeUnknown();
		this.classSymbol.addSymbol(new psymb.PFormalParamSymbol(name, this.scopedType));
	}
  
	public visitClassBound(): SignatureVisitor 
	{
		if(this.scopedType)
		{
			this.scopedType.kind = symb.TypeKind.Class;
			this.scopedType.reference = symb.ReferenceKind.Reference;
			return new TypeSignatureVisitor(this.scopedType);
		}
	  		
		return this;
	}
	public visitIdentifier(name: string)
	{
		if(this.scopedType)
		{
			let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			this.scopedType.name = fixedName;
		}
	}

	public visitSuperclass(): SignatureVisitor 
	{
		this.scopedType = this.classSymbol.extends;
		if(this.scopedType)
			return new TypeSignatureVisitor(this.scopedType);
  		return this;
	}
	public visitTypeVariable(name: string) 
	{
		if(this.scopedType)
		{
			let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			psymb.PUtils.setAsGenericType(this.scopedType, fixedName);
		}
	}
	public visitInterfaceBound(): SignatureVisitor 
	{
		if(this.scopedType)
		{
			this.scopedType.kind = symb.TypeKind.Interface;
			this.scopedType.reference = symb.ReferenceKind.Reference;
			return new TypeSignatureVisitor(this.scopedType);
		}
		return this;
	}

	public visitInterface(): SignatureVisitor 
	{
		this.scopedType = this.classSymbol.implements[this.interfaceIndex];
		this.scopedType.kind = symb.TypeKind.Interface;
		this.interfaceIndex++;
		if(this.scopedType)
			return new TypeSignatureVisitor(this.scopedType);
		return this;
	}
	public visitEnd(): SignatureVisitor
	{
		return this;
	}
}

class MethodSignatureVisitor extends DebugSignatureVisitor
{
	protected methodSymbol : symb.MethodSymbol;
	protected lastFocusedType : symb.Type | undefined;

	public constructor(methodSymbol : symb.MethodSymbol) {
        super(Opcodes.ASM5);
		this.methodSymbol = methodSymbol;
    }

	public visitFormalTypeParameter(name: string) 
	{
		this.lastFocusedType = psymb.PUtils.createTypeUnknown();
		this.methodSymbol.addSymbol(new psymb.PFormalParamSymbol(name, this.lastFocusedType));
	}

	public visitParameterType() : SignatureVisitor
	{
		this.lastFocusedType = psymb.PUtils.createTypeUnknown();
		this.methodSymbol.addSymbol(new symb.ParameterSymbol("", null, this.lastFocusedType));
		return new TypeSignatureVisitor(this.lastFocusedType);
	}
	public visitReturnType(): SignatureVisitor 
	{
		if(!this.methodSymbol.returnType) // It's a constructor
			return new TypeSignatureVisitor(psymb.PUtils.createTypeUnknown()); // We continue with a placeholder
		return new TypeSignatureVisitor(this.methodSymbol.returnType);
	}
	public visitClassBound(): SignatureVisitor 
	{
		if(this.lastFocusedType)
		{
			this.lastFocusedType.reference = symb.ReferenceKind.Reference;
			return new TypeSignatureVisitor(this.lastFocusedType);
		}
	  		
		return this;
	}
	public visitIdentifier(name: string)
	{
		if(this.lastFocusedType)
		{
			let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			this.lastFocusedType.name = fixedName;
		}
	}

	// public visitSuperclass(): SignatureVisitor 
	// {
	// 	// this.scopedType = this.methodSymbol.extends;
	// 	// if(this.scopedType)
	// 	// 	return new TypeSignatureVisitor(this.scopedType);
  	// 	return this;
	// }
	public visitTypeVariable(name: string) 
	{
		if(this.lastFocusedType)
		{
			let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			psymb.PUtils.setAsGenericType(this.lastFocusedType, fixedName);
		}
	}
	public visitInterfaceBound(): SignatureVisitor 
	{
		if(this.lastFocusedType)
		{
			this.lastFocusedType.kind = symb.TypeKind.Interface;
			this.lastFocusedType.reference = symb.ReferenceKind.Reference;
			return new TypeSignatureVisitor(this.lastFocusedType);
		}
		return this;
	}

	public visitExceptionType(): SignatureVisitor 
	{
		// We aren't going to support exceptions for now
		return new TypeSignatureVisitor(psymb.PUtils.createTypeUnknown()); // We continue with a placeholder
	}
	public visitEnd(): SignatureVisitor
	{
		return this;
	}
}

/// =====================================================================
///
class TypeSignatureVisitor extends DebugSignatureVisitor
{
	protected targetType : symb.Type;
	protected argBaseType : symb.Type | undefined;
	public constructor(targetType : symb.Type) {
        super(Opcodes.ASM5);
		this.targetType = targetType;
    }
	public visitSuperclass(): SignatureVisitor { return this; }
	public visitUnboundedTypeArgument() 
	{
		this.argBaseType =  psymb.PUtils.createTypeUnknown();
		this.argBaseType.name="?";
		this.argBaseType.kind = symb.TypeKind.Unknown;
		this.argBaseType.reference = symb.ReferenceKind.Reference;
		this.targetType.baseTypes.push(this.argBaseType);
	}
	public visitIdentifier(name: string)
	{
		let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
		this.targetType.name = fixedName;
		this.targetType.kind = symb.TypeKind.Class;
		this.targetType.reference = symb.ReferenceKind.Reference;
	}
	public visitArrayType(): SignatureVisitor 
	{
		let baseType = psymb.PUtils.createTypeUnknown();
		psymb.PUtils.setAsArrayType(this.targetType, baseType);
		return new TypeSignatureVisitor(baseType);
	}
	public visitTypeArgument(wildcard:string) : SignatureVisitor 
	{
		let baseType =  psymb.PUtils.createTypeUnknown();
		baseType.kind = symb.TypeKind.Alias;
		baseType.reference = symb.ReferenceKind.Reference;
		this.targetType.baseTypes.push(baseType);
		return new TypeSignatureVisitor(baseType);
	}
	public visitTypeVariable(name: string) 
	{
		let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
		psymb.PUtils.setAsGenericType(this.targetType, fixedName);
	}
	public visitBaseType(descriptor: string) 
	{ 
		if(descriptor == 'V')
			psymb.PUtils.setAsVoidType(this.targetType);

		else if(descriptor == 'B')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Byte);

		else if(descriptor == 'C')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Char);

		else if(descriptor == 'D')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Double);

		else if(descriptor == 'F')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Float);

		else if(descriptor == 'I')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Int);

		else if(descriptor == 'J')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Long);

		else if(descriptor == 'S')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Short);

		else if(descriptor == 'Z')
			psymb.PUtils.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Boolean);
	}
	
	public override visitEnd() 
	{
	}
}

export class MethodBuilderFromJava extends AbstractParseTreeVisitor<symb.MethodSymbol> implements JavaClassParserVisitor<symb.MethodSymbol>
{
	private methodSymbol : symb.MethodSymbol;
	private workingType : symb.Type | undefined;
	private isConstructor : boolean = false;

	constructor(methodName: string, isConstructor:boolean=false)
	{
		super();
		this.methodSymbol = new symb.MethodSymbol(methodName, undefined );
		this.isConstructor = isConstructor;
	}

	public defaultResult(): symb.MethodSymbol { return this.methodSymbol; }

	visitParameterDescriptor(ctx: ParameterDescriptorContext) 
	{
		let fieldType = ctx.fieldType();

		this.workingType = psymb.PUtils.createTypeUnknown();
		this.methodSymbol.addSymbol( new symb.ParameterSymbol("", null, this.workingType) );
		this.visit(fieldType)
		
		return this.defaultResult();
	}

	visitReturnDescriptor(ctx: ReturnDescriptorContext)
	{
		if(this.isConstructor)
			return this.defaultResult();

		if(ctx.voidDescriptor())
		{
			this.methodSymbol.returnType = psymb.PUtils.createVoidType();
		}
		else
		{
			let fieldType = ctx.fieldType();
			if(fieldType)
			{
				this.workingType = psymb.PUtils.createTypeUnknown();
				this.methodSymbol.returnType = this.workingType;
				this.visit(fieldType);
			}

		}
		return this.defaultResult();
	}

	visitBaseType(ctx: BaseTypeContext)
	{
		if(this.workingType)
		{
			if(ctx.BYTE())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Byte);
			else if(ctx.CHAR())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Char);
			else if(ctx.DOUBLE())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Double);
			else if(ctx.FLOAT())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Float);
			else if(ctx.INT())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Int);
			else if(ctx.LONG())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Long);
			else if(ctx.SHORT())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Short);
			else if(ctx.BOOLEAN())
				psymb.PUtils.setAsPrimitiveType(this.workingType, psymb.PPrimitiveKind.Boolean);
		}
		return this.defaultResult();
	}

	visitObjectType(ctx: ObjectTypeContext)
	{
		if(this.workingType)
		{
			let classPath = ctx.className();
			let finalName = classPath.text.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			psymb.PUtils.setAsClassType(this.workingType, finalName);
		}
		return this.defaultResult();
	}

	visitArrayType(ctx: ArrayTypeContext) 
	{
		if(this.workingType)
		{
			let savedtype = this.workingType;
			this.workingType = psymb.PUtils.createTypeUnknown();
			psymb.PUtils.setAsArrayType(savedtype, this.workingType);
			this.visit( ctx.fieldType() );
			this.workingType = savedtype;
		}
		return this.defaultResult();
	}

	visitMethodTypeSignature(ctx: MethodTypeSignatureContext)
	{
		let formalTypes = ctx.formalTypeParameters();
		let typeParams = ctx.typeSignature();
		let returnType = ctx.returnType();

		for(let i=0; i < typeParams.length; i++ )
		{
			this.workingType = psymb.PUtils.createTypeUnknown();
			this.methodSymbol.addSymbol( new symb.ParameterSymbol("", null, this.workingType) );
			this.visit(typeParams[i])
		}
		if(!this.isConstructor)
		{
			if(returnType.voidDescriptor())
				this.methodSymbol.returnType = psymb.PUtils.createVoidType();
			else
			{
				let typeSignature = returnType.typeSignature();
				if(typeSignature)
				{
					this.workingType = psymb.PUtils.createTypeUnknown();
					this.methodSymbol.returnType = this.workingType;
					this.visit(typeSignature);
				}
	
			}
		}
		return this.defaultResult();
	}

	visitTypeVariableSignature(ctx: TypeVariableSignatureContext)
	{
		if(this.workingType)
		{
			let idName = ctx.GEN_ID().text;
			psymb.PUtils.setAsGenericType(this.workingType, idName);
		}
		return this.defaultResult();
	}

	visitArrayTypeSignature(ctx: ArrayTypeSignatureContext)
	{
		if(this.workingType)
		{
			let savedtype = this.workingType;
			this.workingType = psymb.PUtils.createTypeUnknown();
			psymb.PUtils.setAsArrayType(savedtype, this.workingType);
			this.visit( ctx.typeSignature() );
			this.workingType = savedtype;
		}
		return this.defaultResult();
	}

	visitClassTypeSignature(ctx: ClassTypeSignatureContext)
	{
		if(this.workingType)
		{
			let finalName = "";
			let packageName = "";
			let classPath = ctx.simpleClassTypeSignature();
			if(classPath)
				packageName = classPath.text.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			psymb.PUtils.setAsClassType(this.workingType, finalName);
		}
		return this.defaultResult();
	}
}