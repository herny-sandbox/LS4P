import { 
	ScopedSymbol,
	ReferenceKind,
	TypeKind,
} from "antlr4-c3";
import { IPType, PType, PTypeKind } from "./PType"

export class PComponentSymbol extends ScopedSymbol implements IPType
{
	readonly extends: PType | undefined;
	
	private generics: PType[] = [];


	get arrayType() { return undefined; }
	get extendType() { return this.extends; }
	get genericTypes() { return this.generics; }
    get kind() { return TypeKind.Unknown; }
	get outterType() { return undefined; }
	get typeKind() { return PTypeKind.Component; }
	get reference() { return ReferenceKind.Reference; }

	constructor(name: string, ext?:PType|undefined)
	{
		super(name);
		if(ext)
			this.extends=ext;
	}

	public setGenericTypes(genTypes:PType[]) : PComponentSymbol
	{
		this.generics = PType.createCloneArray(genTypes);
		return this;
	}
}