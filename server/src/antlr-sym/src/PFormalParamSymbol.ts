import { BaseSymbol, Type } from "antlr4-c3";

export class PFormalParamSymbol extends BaseSymbol 
{
	readonly extends : Type[] = [];

	constructor(name: string, extTypes: Type[])
	{
		super(name);
		this.extends = extTypes;
	}
}