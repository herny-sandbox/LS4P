import { PType } from "./PType"
import { PComponentSymbol } from "./PComponentSymbol"

export class PEnumMemberSymbol extends PComponentSymbol 
{
    value: unknown;
	type: PType;
    constructor(name: string, value: unknown, type?: PType)
	{
		super(name);
		this.value = value;
		this.type = type;
	}
}