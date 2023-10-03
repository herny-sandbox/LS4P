
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
	GenericDecl = 13,
    Component = 14,
    Generic = 15,
}

export interface IPType //extends Type
{
    name:string;
    genericTypes: PType[];
    outterType : PType | undefined;
    extendType: PType | undefined;
    implementTypes: PType[];
    arrayType: PType | undefined;

    typeKind: PTypeKind;
    reference: ReferenceKind;
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

let primitiveWrapperNames = [
    "",
    "Byte",
    "Character",
    "Double",
    "Float",
    "Integer",
    "Long",
    "Short",
    "Boolean",
    ""
]

let nullableTypes : PTypeKind[] = [
    PTypeKind.String,
    PTypeKind.Class,
    PTypeKind.Interface,
    PTypeKind.Array,
    PTypeKind.Enum,
    PTypeKind.Component,
    PTypeKind.Generic,
]

const defaultPAppletClassName = "processing.core.PApplet";
const defaultStringClass = "java.lang.String"
const defaultObjectClass = "java.lang.Object"
const defaultClassClass = "java.lang.Class"
const defaultEnumBaseClass = "java.lang.Enum"
const defaultNullName = "null"


// =======================================================================================
export class PType implements IPType 
{
    public static getPrimitiveTypeName(kind:PPrimitiveKind) { return primitiveKindNames[kind]; }
	public static isDefaultObjectPath(path: string) {return path == defaultObjectClass || path == "Object"; }
	public static isDefaultStringPath(path: string) {return path == defaultStringClass; }
    
    name: string;
    genericTypes: PType[];
    extendType : PType | undefined;
    implementTypes: PType[];
    outterType : PType | undefined;
	kind : TypeKind = TypeKind.Unknown;
    typeKind: PTypeKind;
    reference: ReferenceKind;

    arrayType: PType;
    primitiveKind : PPrimitiveKind | undefined;

    constructor(kind : PTypeKind, name: string )
	{
		this.name = name;
		this.reference = ReferenceKind.Reference;
		this.typeKind =  kind;
        this.outterType = undefined;
        this.genericTypes = []; 
        this.implementTypes = [];
	}

    public static isNullableType(type:IPType) : boolean { return PType.checkIsAnyTypeKind(type, nullableTypes); }

    public static checkIsAnyTypeKind(type:IPType, kinds:PTypeKind[]) : boolean
    {
        for(let kind of kinds)
        {
            if(kind == type.typeKind)
                return true;
        }
    }

    public static getBoxedPrimitiveType(primKind : PPrimitiveKind ) : PType | undefined
    {
        let primWrapperName = primitiveWrapperNames[primKind];
        if(primWrapperName == "")
            return;
        return PType.createClassType("java.lang."+primWrapperName);
    }

    public hasGenericParams() { return this.genericTypes.length > 0; }

    public setOutter(outter:PType) : PType { this.outterType = outter; return this; }

    public setReference(refType:ReferenceKind) : PType { this.reference = refType; return this; }

    public setExtend(extType: PType|undefined) : PType { this.extendType = extType; return this; }

    public setGenericTypes(generics: PType[]) : PType { this.genericTypes = PType.createCloneArray(generics); return this; }
    public setImplementTypes(implementTypes: PType[]) : PType { this.implementTypes = PType.createCloneArray(implementTypes); return this; }
    
    public setPrimitive(primitive: PPrimitiveKind|undefined) : PType { this.primitiveKind = primitive; return this; }
    public setArrayType(arrayType: PType) : PType { this.arrayType = arrayType; return this; }


    public static canClassBeBoxedOrAutoboxed(classType : IPType, primKind : PPrimitiveKind ) : boolean
    {
        let primWrapperName = primitiveWrapperNames[primKind];
        if(primWrapperName == "")
            return false;
        if( classType.name == primWrapperName )
            return true;
        return classType.name == "java.lang."+primWrapperName;
    }

    public static createGenericDeclType(wildcard:string) : PType { return new PType(PTypeKind.GenericDecl, wildcard); }

    public static createUnknownType() : PType { return new PType(PTypeKind.Unknown, ""); }

	public static createStringType() : PType { return new PType(PTypeKind.Class, defaultStringClass); }

    public static createObjectType() : PType { return new PType(PTypeKind.Class, defaultObjectClass); }

    public static createClassClassType() : PType { return new PType(PTypeKind.Class, defaultClassClass); }

    public static createAppletClassType() : PType
	{
		return new PType(PTypeKind.Class, defaultPAppletClassName).setExtend(PType.createObjectType());
	}

    public static createInterfaceType(typeName:string) : PType { return new PType(PTypeKind.Interface, typeName); }

    public static createNamespaceType(typeName:string) : PType 	{ return new PType(PTypeKind.Namespace, typeName); }

    public static createGenericType(typeName:string) : PType 	{ return new PType(PTypeKind.Generic, typeName); }

    public static createClassType(typeName:string) : PType 	{ return new PType(PTypeKind.Class, typeName); }

    public static createComponentType(typeName:string) : PType { return new PType(PTypeKind.Component, typeName); }

    public static createNullType() : PType { return new PType(PTypeKind.Null, defaultNullName); }

	public static createPrimitiveType(kind:PPrimitiveKind) : PType { return new PType(PTypeKind.Primitive, primitiveKindNames[kind]).setPrimitive(kind); }

	public static createEnumBaseClass(baseOnName:string) : PType { return new PType(PTypeKind.Class, defaultEnumBaseClass).setGenericTypes([PType.createClassType(baseOnName)]); }

	public static createArrayType(baseType:PType) : PType { return new PType(PTypeKind.Array, "Array").setArrayType(baseType);}

	public static createVoidType() : PType { return new PType(PTypeKind.Void, "void").setReference(ReferenceKind.Irrelevant); }

	public static createEnumType(typeName:string) : PType { return new PType(PTypeKind.Enum, typeName).setExtend(PType.createEnumBaseClass(typeName));}


    public static createFromIType(original:IPType) : PType
    {
        return new PType(original.typeKind, original.name).setExtend(original.extendType).setOutter(original.outterType).setReference(original.reference).setGenericTypes(original.genericTypes);
    }

    public static createClone(original: PType) : PType
    {
        return new PType(original.typeKind, original.name)
                                .setExtend(original.extendType)
                                .setOutter(original.outterType)
                                .setReference(original.reference)
                                .setGenericTypes(original.genericTypes)
                                .setPrimitive(original.primitiveKind)
                                .setArrayType(original.arrayType)
                                .setImplementTypes(original.implementTypes);
    }

    public static createCloneArray(original: PType[]) : PType[]
    {
        let result : PType[] = [];
        for(let i=0; i< original.length; i++ )
            result.push( PType.createClone(original[i]));
        return result;
    }

    public static setAsPrimitiveType( target:PType, kind:PPrimitiveKind) 
    { 
        target.typeKind = PTypeKind.Primitive;
        target.name = primitiveKindNames[kind];
        target.setPrimitive(kind); 
    }

    public static setAsVoidType( target:PType) 
    { 
        target.typeKind = PTypeKind.Void;
        target.name = "void";
    }

    public static setAsArrayType( target:PType, arrayType:PType) 
    { 
        target.typeKind = PTypeKind.Array;
        target.name = "Array";
        target.setArrayType(arrayType);
    }
}