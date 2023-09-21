import { 
	ReferenceKind, 
	TypeKind, 
} from "antlr4-c3";
import { PClassSymbol } from "./PClassSymbol"
import { PUtils } from "./PUtils"
import { IPType, PType, PTypeKind } from "./PType"

export class PEnumSymbol extends PClassSymbol implements IPType 
{
	readonly implements: PType[] = [];

	constructor(name: string, impl: PType[]=[])
	{
		super(name, PUtils.createEnumBaseClass(name), impl);
	}

    get baseTypes() { return []; }
	get typeKind() { return PTypeKind.Enum; }
}