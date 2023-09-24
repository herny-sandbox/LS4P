import { ScopedSymbol } from "antlr4-c3";
import { PType, PTypeKind } from "./PType"
import { PVariableSymbol } from "./PVariableSymbol"
import { PParameterSymbol } from "./PParameterSymbol"


export declare enum MethodFlags {
    None = 0,
    Virtual = 1,
    Const = 2,
    Overwritten = 4,
    /** Distinguished by the return type. */
    SetterOrGetter = 8,
    /** Special flag used e.g. in C++ for explicit c-tors. */
    Explicit = 16
}
/** A function which belongs to a class or other outer container structure. */
export class PMethodSymbol extends ScopedSymbol 
{
    methodFlags: MethodFlags;

	returnType: PType | undefined;

    constructor(name: string, returnType?: PType) {
		super(name);
		this.returnType = returnType;
	}

	getVariables(localOnly:boolean = true) : Promise<PVariableSymbol[]> {
        return this.getSymbolsOfType(PVariableSymbol);
    }
    getParameters(localOnly:boolean = true): Promise<PParameterSymbol[]> {
        return this.getSymbolsOfType(PParameterSymbol);
    }
}