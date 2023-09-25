import { BaseSymbol } from "antlr4-c3";
import { PType } from "./PType"

export class PGenericParamSymbol extends BaseSymbol 
{
	readonly extends : PType[] = [];

	constructor(name: string, extTypes: PType[])
	{
		super(name);
		this.extends = extTypes;
	}
}