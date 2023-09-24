import { PTypedSymbol } from "./PTypedSymbol"
import { PType, PTypeKind } from "./PType"

export class PVariableSymbol extends PTypedSymbol
{
    value: unknown;
    constructor(name: string, value: unknown, type?: PType)
	{
		super(name, type);
		this.value = value;
	}
}