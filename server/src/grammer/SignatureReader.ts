import { SignatureVisitor } from "./SignatureVisitor"

export class SignatureReader {
	private readonly signatureValue: string;
  
	constructor(signature: string) {
	  this.signatureValue = signature;
	}
  
	public accept(signatureVisitor: SignatureVisitor): void {
	  let signature: string = this.signatureValue;
	  const length: number = signature.length;
	  let offset: number; // Current offset in the parsed signature (parsed from left to right).
	  let currentChar: string; // The signature character at 'offset', or just before.
  
	  if (signature.charAt(0) === '<') {
		offset = 2;
		do {
		  // The formal type parameter name is everything between offset - 1 and the first ':'.
		  const classBoundStartOffset: number = signature.indexOf(':', offset);
		  signatureVisitor.visitFormalTypeParameter(
			signature.substring(offset - 1, classBoundStartOffset)
		  );
  
		  offset = classBoundStartOffset + 1;
		  currentChar = signature.charAt(offset);
		  if (currentChar === 'L' || currentChar === '[' || currentChar === 'T') {
			offset = this.parseType(signature, offset, signatureVisitor.visitClassBound());
		  }
  
		  while ((currentChar = signature.charAt(offset++)) === ':') {
			offset = this.parseType(signature, offset, signatureVisitor.visitInterfaceBound());
		  }
		} while (currentChar !== '>');
	  } else {
		offset = 0;
	  }
  
	  if (signature.charAt(offset) === '(') {
		offset++;
		while (signature.charAt(offset) !== ')') {
		  offset = this.parseType(signature, offset, signatureVisitor.visitParameterType());
		}
		// Use offset + 1 to skip ')'.
		offset = this.parseType(signature, offset + 1, signatureVisitor.visitReturnType());
		while (offset < length) {
		  // Use offset + 1 to skip the first character of a ThrowsSignature, i.e. '^'.
		  offset = this.parseType(signature, offset + 1, signatureVisitor.visitExceptionType());
		}
	  } else {
		offset = this.parseType(signature, offset, signatureVisitor.visitSuperclass());
		while (offset < length) {
		  offset = this.parseType(signature, offset, signatureVisitor.visitInterface());
		}
	  }
	}
  
	public acceptType(signatureVisitor: SignatureVisitor): void {
	  this.parseType(this.signatureValue, 0, signatureVisitor);
	}
  
	private parseType(
	  signature: string,
	  startOffset: number,
	  signatureVisitor: SignatureVisitor
	): number {
	  let offset: number = startOffset; // Current offset in the parsed signature.
	  let currentChar: string = signature.charAt(offset++); // The signature character at 'offset'.
  
	  // Switch based on the first character of the JavaTypeSignature, which indicates its kind.
	  switch (currentChar) {
		case 'Z':
		case 'C':
		case 'B':
		case 'S':
		case 'I':
		case 'F':
		case 'J':
		case 'D':
		case 'V':
		  // Case of a BaseType or a VoidDescriptor.
		  signatureVisitor.visitBaseType(currentChar);
		  return offset;
  
		case '[':
		  // Case of an ArrayTypeSignature, a '[' followed by a JavaTypeSignature.
		  return this.parseType(signature, offset, signatureVisitor.visitArrayType());
  
		case 'T':
		  // Case of TypeVariableSignature, an identifier between 'T' and ';'.
		  const endOffset: number = signature.indexOf(';', offset);
		  signatureVisitor.visitTypeVariable(signature.substring(offset, endOffset));
		  return endOffset + 1;
  
		case 'L':
		  let start: number = offset; // The start offset of the currently parsed main or inner class name.
		  let visited: boolean = false; // Whether the currently parsed class name has been visited.
		  let inner: boolean = false; // Whether we are currently parsing an inner class type.
		  // Parses the signature, one character at a time.
		  while (true) {
			currentChar = signature.charAt(offset++);
			if (currentChar === '.' || currentChar === ';') {
			  if (!visited) {
				const name: string = signature.substring(start, offset - 1);
				if (inner) {
				  signatureVisitor.visitInnerClassType(name);
				} else {
				  signatureVisitor.visitIdentifier(name);
				}
			  }
			  // If we reached the end of the ClassTypeSignature return, otherwise start the parsing
			  // of a new class name, which is necessarily an inner class name.
			  if (currentChar === ';') {
				signatureVisitor.visitEnd();
				break;
			  }
			  start = offset;
			  visited = false;
			  inner = true;
			} else if (currentChar === '<') {
			  const name: string = signature.substring(start, offset - 1);
			  if (inner) {
				signatureVisitor.visitInnerClassType(name);
			  } else {
				signatureVisitor.visitIdentifier(name);
			  }
			  visited = true;
			  // Now, parse the TypeArgument(s), one at a time.
			  while ((currentChar = signature.charAt(offset)) !== '>') {
				switch (currentChar) {
				  case '*':
					// Unbounded TypeArgument.
					++offset;
					signatureVisitor.visitUnboundedTypeArgument();
					break;
				  case '+':
				  case '-':
					// Extends or Super TypeArgument. Use offset + 1 to skip the '+' or '-'.
					offset = this.parseType(
					  signature,
					  offset + 1,
					  signatureVisitor.visitTypeArgument(currentChar)
					);
					break;
				  default:
					// Instanceof TypeArgument. The '=' is implicit.
					offset = this.parseType(signature, offset, signatureVisitor.visitTypeArgument('='));
					break;
				}
			  }
			}
		  }
		  return offset;
  
		default:
		  throw new Error('Invalid signature');
	  }
	}
  }