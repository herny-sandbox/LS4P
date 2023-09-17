import { PClassSymbol } from "./PClassSymbol"
import { PType } from "./PType"

export class PGenericClassSymbol extends PClassSymbol
{
	readonly genericTypes: PType[] = [];
    constructor(name: string, genTypes: PType[], ext?: PType|undefined, impl: PType[]=[])
	{
		super(name, ext, impl);
		this.genericTypes = genTypes;
	}
}