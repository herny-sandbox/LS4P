import { Type } from "antlr4-c3";
import { PClassSymbol } from "./PClassSymbol"

export class PGenericClassSymbol extends PClassSymbol
{
	readonly genericTypes: Type[] = [];
    constructor(name: string, genTypes: Type[], ext?: Type|undefined, impl: Type[]=[])
	{
		super(name, ext, impl);
		this.genericTypes = genTypes;
	}
}