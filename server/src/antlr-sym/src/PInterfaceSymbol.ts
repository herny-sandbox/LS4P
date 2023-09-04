import { 
	Type, 
	ReferenceKind, 
	TypeKind, 
	BaseSymbol,
	FieldSymbol,
	MethodSymbol,
	ScopedSymbol 
} from "antlr4-c3";

/** Classes and structs. */
export class PInterfaceSymbol extends ScopedSymbol implements Type 
{
    isStruct: boolean = false;
    reference: ReferenceKind = ReferenceKind.Reference;
    /** Usually only one member, unless the language supports multiple inheritance (like C++). */
    readonly extends: Type[] = [];
 
	constructor(name: string, ext: Type[]=[])
	{
		super(name);
		this.extends = ext;
	}

    get baseTypes() { return this.extends; }
    get kind() { return TypeKind.Interface; }
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
		for(let i=0; i < this.extends.length; i++)
		{
			let implSymbol : BaseSymbol | undefined = super.resolveSync(this.extends[i].name, false);
			if(implSymbol && implSymbol instanceof PInterfaceSymbol)
				result = implSymbol.resolveSync(name, true);
			if( result )
				return result;
		}
		
		return undefined;
	}

	resolveInheritance(name:string) : PInterfaceSymbol | undefined
	{
		let result : BaseSymbol | undefined;
		if(this.name===name)
			result = this;
		if(!result)
		{
			for(let i=0; i < this.extends.length; i++)
			{
				let implSymbol : BaseSymbol | undefined = super.resolveSync(this.extends[i].name, false);
				if(implSymbol && implSymbol instanceof PInterfaceSymbol)
					result = implSymbol.resolveInheritance(name);
				if( result )
					break;
			}
		}
		return;
	}
}