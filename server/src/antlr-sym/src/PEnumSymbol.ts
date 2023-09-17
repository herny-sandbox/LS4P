import { 
	ReferenceKind, 
	TypeKind, 
} from "antlr4-c3";
import { PComponentSymbol } from "./PComponentSymbol"
import { PType, PTypeKind } from "./PType"

export class PEnumSymbol extends PComponentSymbol implements PType 
{
	readonly implements: PType[] = [];

	constructor(name: string, impl: PType[]=[])
	{
		super(name);
		this.implements = impl;
	}

    get baseTypes() { return []; }
    get kind() { return TypeKind.Class; }
	get typeKind() { return PTypeKind.Enum; }
	get reference() { return ReferenceKind.Reference; }
}