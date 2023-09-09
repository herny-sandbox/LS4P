import { TypedSymbol, Type } from "antlr4-c3";

export class PFormalParamSymbol extends TypedSymbol 
{
    constructor(name: string, type?: Type)
	{
		super(name, type);
	}
}