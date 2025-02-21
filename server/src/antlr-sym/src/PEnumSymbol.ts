import { PClassSymbol } from "./PClassSymbol"
import { IPType, PType, PTypeKind } from "./PType"

export class PEnumSymbol extends PClassSymbol implements IPType 
{
	readonly implements: PType[] = [];

	constructor(name: string, impl: PType[]=[])
	{
		super(name, PType.createEnumBaseClass(name), impl);
	}

	get typeKind() { return PTypeKind.Enum; }
	get implementTypes() { return this.implements; }
}