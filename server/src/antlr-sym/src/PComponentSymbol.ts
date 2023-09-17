import { 
	ScopedSymbol 
} from "antlr4-c3";

export class PComponentSymbol extends ScopedSymbol
{
	constructor(name: string)
	{
		super(name);
	}
}