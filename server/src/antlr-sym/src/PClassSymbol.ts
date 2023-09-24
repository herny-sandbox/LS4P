import { BaseSymbol } from "antlr4-c3";
import { PInterfaceSymbol } from "./PInterfaceSymbol"
import { PMethodSymbol } from "./PMethodSymbol"
import { PFieldSymbol } from "./PFieldSymbol"
import { PComponentSymbol } from "./PComponentSymbol"
import { PType, PTypeKind } from "./PType"

/** Classes and structs. */
export class PClassSymbol extends PComponentSymbol 
{
    /** Typescript allows a class to implement a class, not only interfaces. */
    readonly implements: PType[] = [];


   	constructor(name: string, ext?: PType|undefined, impl: PType[]=[])
	{
		super(name, ext);
		this.implements = impl;
	}

	get typeKind() { return PTypeKind.Class; }

	/**
		 * @param includeInherited Not used.
		 *
		 * @returns a list of all methods.
		 */
	getMethods(includeInherited = false) {
		return this.getSymbolsOfType(PMethodSymbol);
	}
	/**
	 * @param includeInherited Not used.
	 *
	 * @returns all fields.
	 */
	getFields(includeInherited = false) {
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
	// resolveSync(name:string, localOnly: boolean = false) : BaseSymbol | undefined
	// {
	// 	let result : BaseSymbol | undefined = super.resolveSync(name, true);
	// 	if(result)
	// 		return result;

	// 	// Not found yet, keep searching in the extensions
	// 	if(this.extends)
	// 	{
	// 		let extSymbol : BaseSymbol | undefined = super.resolveSync(this.extends.name, true);
	// 		if(extSymbol && extSymbol instanceof PClassSymbol)
	// 			result = extSymbol.resolveSync(name, true);
	// 	}
	// 	if(!result)
	// 	{
	// 		for(let i=0; i < this.implements.length; i++)
	// 		{
	// 			let implSymbol : BaseSymbol | undefined = super.resolveSync(this.implements[i].name, true);
	// 			if(implSymbol && implSymbol instanceof PInterfaceSymbol)
	// 				result = implSymbol.resolveSync(name);
	// 			if( result )
	// 				break;
	// 		}
	// 	}
	// 	// Nothing found locally. Let the parent continue.
	// 	if (!localOnly) {
	// 		if (this.parent) {
	// 			return this.parent.resolveSync(name, false);
	// 		}
	// 	}
	// 	return result;
	// }

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