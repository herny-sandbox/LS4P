import { ClassVisitor, Opcodes } from "@xmcl/asm"
import { SignatureReader }  from './grammer/SignatureReader'
import { SignatureVisitor }  from './grammer/SignatureVisitor'
import * as symb from 'antlr4-c3'
import * as psymb from "./antlr-sym"

let debugSignature : string="";
let debugClass:string = "";
let debugMethodName:string="";
let debugFieldName:string="";

export class JavaClassVisitor extends ClassVisitor
{
	protected classSymbol : symb.ScopedSymbol | undefined;
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
		let isInterface = (access & Opcodes.ACC_INTERFACE) != 0;

		if(!isPublic)
			return;

		debugSignature = signature;

		let ext : psymb.PType | undefined;
		let impl : psymb.PType [] = [];
	
		if(superName && superName.length!=0)
		{
			let fixedName = superName.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			ext = psymb.PType.createClassType(fixedName);
		}
		for(let i=0; interfaces && i < interfaces.length; i++)
		{
			let fixedName = interfaces[i].replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			impl.push( psymb.PType.createInterfaceType(fixedName) );
		}

		if(isInterface)
			this.classSymbol = new psymb.PInterfaceSymbol(this.name, impl);
		else
			this.classSymbol = new psymb.PClassSymbol(this.name, ext, impl);

		pathName = pathName.replace(/[/$]/g, ".");
		let container = this.libTable.getOrCreateNamespaceFor(pathName, ".");

		let component = psymb.PUtils.resolveChildSymbolSync(container, psymb.PComponentSymbol, this.classSymbol.name);
		//let component = container.resolveSync(this.classSymbol.name, true);
		container.addSymbol(this.classSymbol);
		if(component instanceof psymb.PNamespaceSymbol)
		{
			// We translate all the component childrens to this new symbol
			let childs = component.children;
			for(let child of childs)
			{
				this.classSymbol.addSymbol(child);
			}
			container.removeSymbol(component);
		}
		
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
		let hasVArgs = (access & Opcodes.ACC_VARARGS) != 0;

		if(!isPublic && !isProtected)
			return null;

		let isConstructor = (name == "<init>");
		debugSignature = signature?signature:desc;
		let returnType : psymb.PType | undefined;

		if( isConstructor )
			name = this.name;
		if( !isConstructor )
			returnType = psymb.PType.createUnknownType();

		let methodSymbol : psymb.PMethodSymbol = new psymb.PMethodSymbol(name, returnType);
		if(hasVArgs)
			psymb.PUtils.setMethodLastVargs(methodSymbol);

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
		let symbolType : psymb.PType = psymb.PType.createUnknownType();
		let fieldSymbol : psymb.PFieldSymbol = new psymb.PFieldSymbol(name, null, symbolType);
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

	public visitInnerClass(name: string, outerName: string, innerName: string | null, access: number): void 
	{
		let isPublic = (access & Opcodes.ACC_PUBLIC) != 0;
		let isProtected = (access & Opcodes.ACC_PROTECTED) != 0;
		let isStatic = (access & Opcodes.ACC_STATIC) != 0;
		let isFinal = (access & Opcodes.ACC_FINAL) != 0;
		
		if(!isPublic && !isProtected)
			return;
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
	protected scopedSymbol : symb.ScopedSymbol;
	protected scopedType : psymb.PType | undefined;
	protected interfaceIndex : number = 0;
	protected formalTypes : psymb.PType [] | undefined;

	public constructor(classSymbol : symb.ScopedSymbol) {
        super(Opcodes.ASM5);
		this.scopedSymbol = classSymbol;
    }
	public visitFormalTypeParameter(name: string) 
	{
		this.formalTypes = [];
		this.scopedSymbol.addSymbol(new psymb.PFormalParamSymbol(name, this.formalTypes));
	}
	public visitClassBound(): SignatureVisitor 
	{
		let formalType = psymb.PType.createObjectType();
		formalType.typeKind = psymb.PTypeKind.Class;
		formalType.reference = symb.ReferenceKind.Reference;
		if(this.formalTypes)
			this.formalTypes.push(formalType);
		return new TypeSignatureVisitor(formalType);
	}
	public visitInterfaceBound(): SignatureVisitor 
	{
		let formalType = psymb.PType.createUnknownType();
		formalType.typeKind = psymb.PTypeKind.Interface;
		formalType.reference = symb.ReferenceKind.Reference;
		if(this.formalTypes)
			this.formalTypes.push(formalType);
		return new TypeSignatureVisitor(formalType);
	}
	public visitSuperclass(): SignatureVisitor 
	{
		let ext : psymb.PType | undefined;
		if( this.scopedSymbol instanceof psymb.PClassSymbol)
			ext = this.scopedSymbol.extends;
		if(!ext)
			ext = psymb.PType.createObjectType();
		return new TypeSignatureVisitor(ext);
 	}
	public visitInterface(): SignatureVisitor 
	{
		let interf : psymb.PType | undefined;
		if( this.scopedSymbol instanceof psymb.PClassSymbol)
			interf = this.scopedSymbol.implements[this.interfaceIndex];
		else if( this.scopedSymbol instanceof psymb.PInterfaceSymbol)
			interf = this.scopedSymbol.extends[this.interfaceIndex];
		else 
			interf = psymb.PType.createObjectType();

		this.interfaceIndex++;
		return new TypeSignatureVisitor(interf);
	}
	public visitEnd(): SignatureVisitor
	{
		return this;
	}
}

class MethodSignatureVisitor extends DebugSignatureVisitor
{
	protected methodSymbol : psymb.PMethodSymbol;
	protected formalTypes : psymb.PType [] | undefined;
	public constructor(methodSymbol : psymb.PMethodSymbol) {
        super(Opcodes.ASM5);
		this.methodSymbol = methodSymbol;
    }

	public visitFormalTypeParameter(name: string) 
	{
		this.formalTypes = [];
		this.methodSymbol.addSymbol(new psymb.PFormalParamSymbol(name, this.formalTypes));
	}
	public visitClassBound(): SignatureVisitor 
	{
		let formalType = psymb.PType.createObjectType();
		formalType.typeKind = psymb.PTypeKind.Class;
		formalType.reference = symb.ReferenceKind.Reference;
		if(this.formalTypes)
			this.formalTypes.push(formalType);
		return new TypeSignatureVisitor(formalType);
	}
	public visitInterfaceBound(): SignatureVisitor 
	{
		let formalType = psymb.PType.createObjectType();
		formalType.typeKind = psymb.PTypeKind.Interface;
		formalType.reference = symb.ReferenceKind.Reference;
		if(this.formalTypes)
			this.formalTypes.push(formalType);
		return new TypeSignatureVisitor(formalType);
	}
	public visitParameterType() : SignatureVisitor
	{
		let paramType = psymb.PType.createUnknownType();
		this.methodSymbol.addSymbol(new psymb.PParameterSymbol("", null, paramType));
		return new TypeSignatureVisitor(paramType);
	}
	public visitReturnType(): SignatureVisitor 
	{
		if( this.methodSymbol.returnType ) // It's a constructor
			return new TypeSignatureVisitor(this.methodSymbol.returnType);

		return new TypeSignatureVisitor(psymb.PType.createUnknownType()); // We continue with a placeholder
	}

	public visitExceptionType(): SignatureVisitor 
	{
		// We aren't going to support exceptions for now
		return new TypeSignatureVisitor(psymb.PType.createUnknownType()); // We continue with a placeholder
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
	protected targetType : psymb.PType;
	//protected argBaseType : symb.Type | undefined;
	public constructor(targetType : psymb.PType) {
        super(Opcodes.ASM5);
		this.targetType = targetType;
    }
	public visitSuperclass(): SignatureVisitor { return this; }
	public visitIdentifier(name: string)
	{
		let fixedName = name.replace(/[\/$]/g, psymb.PNamespaceSymbol.delimiter);
		this.targetType.name = fixedName;
		this.targetType.typeKind = psymb.PTypeKind.Class;
		this.targetType.reference = symb.ReferenceKind.Reference;
	}
	public visitUnboundedTypeArgument() 
	{
		let baseType =  psymb.PType.createUnknownType();
		baseType.name="?";
		baseType.typeKind = psymb.PTypeKind.Generic;
		baseType.reference = symb.ReferenceKind.Reference;
		this.targetType.genericTypes.push(baseType);
	}
	public visitTypeArgument(wildcard:string) : SignatureVisitor 
	{
		let baseType =  psymb.PType.createUnknownType();
		baseType.name = wildcard;
		baseType.typeKind = psymb.PTypeKind.Generic;
		baseType.reference = symb.ReferenceKind.Reference;
		this.targetType.genericTypes.push(baseType);
		return new TypeSignatureVisitor(baseType);
	}
	public visitTypeVariable(name: string) 
	{
		let fixedName = name.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
		//this.argBaseType = psymb.PUtils.createTypeUnknown();
		this.targetType.name = fixedName;
		this.targetType.typeKind = psymb.PTypeKind.Generic;
		this.targetType.reference = symb.ReferenceKind.Reference;
	}

	public visitArrayType(): SignatureVisitor 
	{
		let baseType = psymb.PType.createUnknownType();
		psymb.PType.setAsArrayType(this.targetType, baseType);
		return new TypeSignatureVisitor(baseType);
	}


	public visitBaseType(descriptor: string) 
	{ 
		if(descriptor == 'V')
			psymb.PType.setAsVoidType(this.targetType);

		else if(descriptor == 'B')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Byte);

		else if(descriptor == 'C')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Char);

		else if(descriptor == 'D')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Double);

		else if(descriptor == 'F')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Float);

		else if(descriptor == 'I')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Int);

		else if(descriptor == 'J')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Long);

		else if(descriptor == 'S')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Short);

		else if(descriptor == 'Z')
			psymb.PType.setAsPrimitiveType(this.targetType, psymb.PPrimitiveKind.Boolean);
	}
	
	public override visitEnd() 
	{
	}
}