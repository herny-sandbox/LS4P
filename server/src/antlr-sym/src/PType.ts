
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
    Component = 14,
}

export interface IPType extends Type
{
    genericTypes: PType[];
    outterType : PType | undefined;
    typeKind: PTypeKind;
    extendType: PType | undefined;
}

export enum PPrimitiveKind {
    Unknown = 0,
    Byte = 1,
    Char = 2,
    Double = 3,
    Float = 4,
    Int = 5,
    Long = 6,
    Short = 7,
    Boolean = 8,
	Color = 9,
}

let primitiveKindNames = [
    "void",
    "byte",
    "char",
    "double",
    "float",
    "int",
    "long",
    "short",
    "boolean",
    "color"
]

const defaultPAppletClassName = "processing.core.PApplet";
const defaultStringClass = "java.lang.String"
const defaultObjectClass = "java.lang.Object"
const defaultEnumBaseClass = "java.lang.Enum"
const defaultNullName = "null"


// =======================================================================================
export class PType implements IPType 
{
    private static unknownType : PType = new PType(PTypeKind.Unknown, "");
    public static getPrimitiveTypeName(kind:PPrimitiveKind) { return primitiveKindNames[kind]; }
	public static isDefaultObjectPath(path: string) {return path == defaultObjectClass; }
	public static isDefaultStringPath(path: string) {return path == defaultStringClass; }
    
    name: string;
    genericTypes: PType[];
    baseTypes: PType[];
    primitiveKind : PPrimitiveKind | undefined;
    extendType : PType | undefined;
    outterType : PType | undefined;
	kind : TypeKind = TypeKind.Unknown;
    typeKind: PTypeKind;
    reference: ReferenceKind;
 
    constructor(kind : PTypeKind, name: string )
	{
		this.name = name;
		this.reference = ReferenceKind.Reference;
		this.typeKind =  kind;
        this.outterType = undefined;
	}

    public setOutter(outter:PType) : PType { this.outterType = outter; return this; }

    public setReference(refType:ReferenceKind) : PType { this.reference = refType; return this; }

    public setExtend(extType: PType|undefined) : PType { this.extendType = extType; return this; }

    public setGenericTypes(generics: PType[]) : PType { this.genericTypes = PType.createCloneArray(generics); return this; }
    
    public setPrimitive(primitive: PPrimitiveKind|undefined) : PType { this.primitiveKind = primitive; return this; }
    public setBaseTypes(baseTypes: PType[]) : PType { this.baseTypes = baseTypes; return this; }


    public static createUnknownType() : PType
	{
		return PType.unknownType;
	}

	public static createStringType() : PType { return new PType(PTypeKind.Class, defaultStringClass); }

    public static createObjectClassType() : PType { return new PType(PTypeKind.Class, defaultObjectClass); }

    public static createAppletClassType() : PType
	{
		return new PType(PTypeKind.Class, defaultPAppletClassName).setExtend(PType.createObjectClassType());
	}

    public static createInterfaceType(typeName:string) : PType { return new PType(PTypeKind.Interface, typeName); }

    public static createNamespaceType(typeName:string) : PType 	{ return new PType(PTypeKind.Namespace, typeName); }

    public static createClassType(typeName:string) : PType 	{ return new PType(PTypeKind.Class, typeName); }

    public static createComponentType(typeName:string) : PType { return new PType(PTypeKind.Component, typeName); }

    public static createNullType() : PType { return new PType(PTypeKind.Null, "null"); }

	public static createPrimitiveType(kind:PPrimitiveKind) : PType { return new PType(PTypeKind.Primitive, primitiveKindNames[kind]).setPrimitive(kind); }

	public static createEnumBaseClass(baseOnName:string) : PType { return new PType(PTypeKind.Class, defaultEnumBaseClass).setGenericTypes([PType.createClassType(baseOnName)]); }

	public static createArrayType(baseType:PType) : PType { return new PType(PTypeKind.Array, "Array").setBaseTypes([baseType]);}

	public static createVoidType() : PType { return new PType(PTypeKind.Void, "void").setReference(ReferenceKind.Irrelevant); }


    public static createClone(original: PType) : PType
    {
        return new PType(original.typeKind, original.name).setExtend(original.extendType).setOutter(original.outterType).setReference(original.reference).setGenericTypes(original.genericTypes);
    }

    public static createCloneArray(original: PType[]) : PType[]
    {
        let result : PType[] = [];
        for(let i=0; i< original.length; i++ )
            result.push( PType.createClone(original[i]));
        return result;
    }
}