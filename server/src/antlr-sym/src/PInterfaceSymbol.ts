import { BaseSymbol } from "antlr4-c3";
import { PComponentSymbol } from "./PComponentSymbol"
import { PMethodSymbol } from "./PMethodSymbol"
import { PFieldSymbol } from "./PFieldSymbol"
import { PType, PTypeKind } from "./PType"

/** Classes and structs. */
export class PInterfaceSymbol extends PComponentSymbol 
{
	/** Usually only one member, unless the language supports multiple inheritance (like C++). */
    readonly implements: PType[] = [];
 
	constructor(name: string, ext: PType[]=[])
	{
		super(name);
		this.implements = ext;
	}

	get typeKind() { return PTypeKind.Interface; }
	get implementTypes() { return this.implements; }

	/**
		 * @param includeInherited Not used.
		 *
		 * @returns a list of all methods.
		 */
	getMethods(includeInherited:boolean = false) {
		return this.getSymbolsOfType(PMethodSymbol);
	}
	/**
	 * @param includeInherited Not used.
	 *
	 * @returns all fields.
	 */
	getFields(includeInherited:boolean = false) {
		return this.getSymbolsOfType(PFieldSymbol);
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
		for(let i=0; i < this.implements.length; i++)
		{
			let implSymbol : BaseSymbol | undefined = super.resolveSync(this.implements[i].name, false);
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
			for(let i=0; i < this.implements.length; i++)
			{
				let implSymbol : BaseSymbol | undefined = super.resolveSync(this.implements[i].name, false);
				if(implSymbol && implSymbol instanceof PInterfaceSymbol)
					result = implSymbol.resolveInheritance(name);
				if( result )
					break;
			}
		}
		return;
	}
}