import { 
	Type, 
	ReferenceKind, 
	TypeKind, 
	BaseSymbol,
	FieldSymbol,
	MethodSymbol,
	ScopedSymbol 
} from "antlr4-c3";
import { PInterfaceSymbol } from "./PInterfaceSymbol"

/** Classes and structs. */
export class PClassSymbol extends ScopedSymbol implements Type 
{
    isStruct: boolean = false;
    reference: ReferenceKind = ReferenceKind.Reference;
    /** Usually only one member, unless the language supports multiple inheritance (like C++). */
    readonly extends: Type | undefined;
    /** Typescript allows a class to implement a class, not only interfaces. */
    readonly implements: Type[] = [];
	readonly genericParams: Type[] = [];
    constructor(name: string, ext?: Type|undefined, impl: Type[]=[], genParam:Type[]=[])
	{
		super(name);
		this.extends = ext;
		this.implements = impl;
		this.genericParams = genParam;
		// if(!this.extends && name != rootClassType.name)
		// 	this.extends = rootClassType;
	}

    get baseTypes() { return this.genericParams; }
    get kind() { return TypeKind.Class; }
	get isGeneric() { return this.genericParams.length > 0; }
	/**
		 * @param includeInherited Not used.
		 *
		 * @returns a list of all methods.
		 */
	getMethods(includeInherited = false) {
		return this.getSymbolsOfType(MethodSymbol);
	}
	/**
	 * @param includeInherited Not used.
	 *
	 * @returns all fields.
	 */
	getFields(includeInherited = false) {
		return this.getSymbolsOfType(FieldSymbol);
	}

	/**
     * @param name The name of the symbol to resolve.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns the first symbol with a given name, in the order of appearance in this scope
     *          or any of the parent scopes (conditionally).
     */
	resolveSync(name:string, localOnly: boolean = false) : BaseSymbol | undefined
	{
		let result : BaseSymbol | undefined = super.resolveSync(name, localOnly);
		if(result)
			return result;

		// Not found yet, keep searching in the extensions
		if(this.extends)
		{
			let extSymbol : BaseSymbol | undefined = super.resolveSync(this.extends.name, false);
			if(extSymbol && extSymbol instanceof PClassSymbol)
				result = extSymbol.resolveSync(name, true);
		}
		if(!result)
		{
			for(let i=0; i < this.implements.length; i++)
			{
				let implSymbol : BaseSymbol | undefined = super.resolveSync(this.implements[i].name, false);
				if(implSymbol && implSymbol instanceof PInterfaceSymbol)
					result = implSymbol.resolveSync(name);
				if( result )
					break;
			}
		}
		return result;
	}

	resolveInheritance(name:string) : BaseSymbol | undefined
	{
		let result : BaseSymbol | undefined;
		if(this.name===name)
			result = this;

		if(!result && this.extends && this.parent)
		{
			let extSymbol : BaseSymbol | undefined = this.parent.resolveSync(this.extends.name, false);
			if(extSymbol && extSymbol instanceof PClassSymbol)
				result = extSymbol.resolveInheritance(name);
		}
		if(!result)
		{
			for(let i=0; i < this.implements.length; i++)
			{
				let implSymbol : BaseSymbol | undefined = super.resolveSync(this.implements[i].name, false);
				if(implSymbol && implSymbol instanceof PInterfaceSymbol)
					result = implSymbol.resolveInheritance(name);
				if( result )
					break;
			}
		}
		return result;
	}
}