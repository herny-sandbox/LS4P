import { BaseSymbol } from "antlr4-c3";
import { PType } from "./PType"

export class PThrowsSymbol extends BaseSymbol 
{
	readonly type : PType;

	constructor(name: string, extTypes: PType)
	{
		super(name);
		this.type = extTypes;
	}
}