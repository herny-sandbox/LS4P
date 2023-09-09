import { Opcodes } from "@xmcl/asm"

export class SignatureVisitor 
{
	public static readonly EXTENDS: string = '+';
	public static readonly SUPER: string = '-';
	public static readonly INSTANCEOF: string = '=';
  
	protected readonly api: number;
  
	constructor(api: number) {
	  if ( api !== Opcodes.ASM5 && api !== Opcodes.ASM4 ) 
	  {
		throw new Error("Unsupported api " + api);
	  }
	  this.api = api;
	}
  
	public visitFormalTypeParameter(name: string): void {}
  
	public visitClassBound(): SignatureVisitor {
	  return this;
	}
  
	public visitInterfaceBound(): SignatureVisitor {
	  return this;
	}
  
	public visitSuperclass(): SignatureVisitor {
	  return this;
	}
  
	public visitInterface(): SignatureVisitor {
	  return this;
	}
  
	public visitParameterType(): SignatureVisitor {
	  return this;
	}
  
	public visitReturnType(): SignatureVisitor {
	  return this;
	}
  
	public visitExceptionType(): SignatureVisitor {
	  return this;
	}
  
	public visitBaseType(descriptor: string): void {}
  
	public visitTypeVariable(name: string): void {}
  
	public visitArrayType(): SignatureVisitor {
	  return this;
	}
  
	public visitIdentifier(name: string): void {}
  
	public visitInnerClassType(name: string): void {}
  
	public visitUnboundedTypeArgument(): void {}
  
	public visitTypeArgument(wildcard: string): SignatureVisitor {
	  return this;
	}
  
	public visitEnd(): void {}
  }