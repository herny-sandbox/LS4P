
import { 
	Type, 
	TypeKind,
	ReferenceKind, 
} from "antlr4-c3";

/** Rough categorization of a type. */
export enum PTypeKind 
{
    Unknown = 0,
    Primitive = 1,
    Namespace = 2,
	Method = 3,
    String = 4,
	Null = 5,
	Void = 6,
    Class = 7,
    Interface = 8,
    Array = 9,
    Map = 10,
    Enum = 11,
    Alias = 12,
	Generic = 13,
}

export class PType implements Type 
{
	name: string;
    /**
     * The super type of this type or empty if this is a fundamental type.
     * Also used as the target type for type aliases.
     */
    baseTypes: PType[];
	kind : TypeKind = TypeKind.Unknown;
    typeKind: PTypeKind;
    reference: ReferenceKind;

    constructor(name: string, kind : PTypeKind, referenceKind: ReferenceKind, baseTypes: PType[]=[] )
	{
		this.name = name;
		this.reference = referenceKind;
		this.typeKind =  kind;
		this.baseTypes = baseTypes;
	}
}