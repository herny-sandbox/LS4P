import { BaseSymbol } from "antlr4-c3";
import { PType, PTypeKind } from "./PType"

/** A symbol with an attached type (variables, fields etc.). */
export class PTypedSymbol extends BaseSymbol 
{
    type: PType | undefined;
    constructor(name: string, type?: PType)
	{
		super(name);
		this.type=type;
	}
}
