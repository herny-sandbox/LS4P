import { 
	Type,
	TypeKind,
	ReferenceKind,
	BaseSymbol,
	IScopedSymbol,
	VariableSymbol,
	SymbolTable,
	SymbolConstructor,
	ScopedSymbol,
} from "antlr4-c3";
import { PClassSymbol} from "./PClassSymbol"
import { PFormalParamSymbol } from "./PFormalParamSymbol"

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

const defaultStringClass = "java.lang.String"
const defaultObjectClass = "java.util.Object"
const defaultNullName = "null"

export class CallContext
{
	public callerType : Type | undefined;
	public callerSymbol : BaseSymbol | undefined;
	public genericsDict : Map<string, Type> = new Map<string, Type>();
}

export class PUtils 
{
	public static createClassType(className:string, baseTypes:Type[]=[]) : Type
	{
		return PUtils.setAsClassType(PUtils.createTypeUnknown(), className, baseTypes);
	}

	public static createInterfaceType(className:string, baseTypes:Type[]=[]) : Type
	{
		return PUtils.setAsInterfaceType(PUtils.createTypeUnknown(), className, baseTypes); 
	}

	public static createPrimitiveType(kind:PPrimitiveKind) : Type
	{
		return PUtils.setAsPrimitiveType(PUtils.createTypeUnknown(), kind); 
	}

	public static createStringType() : Type
	{
		return PUtils.setAsClassType(PUtils.createTypeUnknown(), defaultStringClass); 
	}

	public static createNullType() : Type
	{
		return PUtils.setAsNullType(PUtils.createTypeUnknown()); 
	}

	public static createArrayType(baseType:Type) : Type
	{
		return PUtils.setAsArrayType(PUtils.createTypeUnknown(), baseType); 
	}

	public static createVoidType() : Type
	{
		return PUtils.createClassType("void");  
	}
	public static createGenericType(name:string, extendType: Type|undefined)
	{
		return PUtils.setAsGenericType(PUtils.createTypeUnknown(), name, extendType);
	}

	public static createTypeUnknown(typeName:string="<unknown>", baseTypes:Type[]=[]) : Type
	{
		return {  
			name : typeName,
			kind : TypeKind.Unknown,
			baseTypes : baseTypes,
			reference : ReferenceKind.Irrelevant
		};
	}

	public static setAsNullType(type: Type) : Type
	{
		type.name = defaultNullName;
		type.kind = TypeKind.Unknown,
		type.baseTypes = [],
		type.reference = ReferenceKind.Reference
		return type;	}

	public static setAsClassType(type: Type, className:string, baseTypes:Type[]=[]) : Type
	{
		type.name = className;
		type.kind = TypeKind.Class,
		type.baseTypes = baseTypes,
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsInterfaceType(type: Type, interfName:string, baseTypes:Type[]=[]) : Type
	{
		type.name = interfName;
		type.kind = TypeKind.Interface,
		type.baseTypes = baseTypes,
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsPrimitiveType(type: Type, kind:PPrimitiveKind) : Type
	{
		type.name = primitiveKindNames[kind];
		type.kind = TypeKind.Integer, // all primitives are going to be marked as integer
		type.baseTypes = [],
		type.reference = ReferenceKind.Instance
		return type;
	}

	public static setAsArrayType(type: Type, baseType:Type) : Type
	{
		type.name = "Array";
		type.kind = TypeKind.Array,
		type.baseTypes = [baseType],
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsGenericType(type: Type, genericName:string, extendType?:Type ): Type
	{
		type.name = genericName;
		type.kind = TypeKind.Alias,
		type.baseTypes = [],
		type.reference = ReferenceKind.Reference;
		if(extendType)
			type.baseTypes.push(extendType)
		return type;
	}

	public static setAsTypeUnknown(type: Type, typeName:string="<unknown>", baseTypes:Type[]=[]) : Type
	{
		type.name = typeName;
		type.kind = TypeKind.Unknown,
		type.baseTypes = baseTypes,
		type.reference = ReferenceKind.Irrelevant;
		return type;
	}

	public static setAsVoidType(type: Type) : Type
	{
		return PUtils.setAsTypeUnknown(type, "void");  
	}

	public static getParentClass(ctx:BaseSymbol): PClassSymbol | undefined
	{
		if(ctx.parent)
		{
			if(ctx.parent instanceof PClassSymbol)
				return ctx.parent;
			return PUtils.getParentClass(ctx.parent);
		} 
		return;
	}

	public static resolveByName(name: string, context : BaseSymbol, results : BaseSymbol [],  localOnly : boolean = false) : void
	{
		let anyMatch : BaseSymbol | undefined;
		if(context instanceof SymbolTable)
		{
			let result = context.resolveSync(name, false);
			if(result !== undefined)
				results.push(result);
		}
		else
		{
			anyMatch = context.resolveSync(name, true);
			if(anyMatch !== undefined)
			{
				let child : BaseSymbol | undefined = anyMatch;
				while(child !== undefined)
				{
					if(child.name === name)
						results.push(child);
					child = child.nextSibling;
				}
			}
		
			// Nothing found locally. Let the parent continue.
			if (!localOnly) {
				if (context.parent) {
					return PUtils.resolveByName(name, context.parent, results, false);
				}
			}
		}
	}

	public static getAllSymbolsSync<T extends BaseSymbol, Args extends unknown[]>(ctx: IScopedSymbol, t: SymbolConstructor<T, Args>, name?:string, localOnly?: boolean): T[] 
	{
        const result = [];

		if(ctx instanceof ScopedSymbol)
		{
			for (const child of ctx.children) 
			{
				const isNameMatch = !name || (child.name == name);
				const isRightType = (child instanceof t );
				if (isRightType && isNameMatch)
					result.push(child);
			}
		}
		if(ctx instanceof PClassSymbol)
		{
			if(ctx.extends)
			{
				let extSymbol : BaseSymbol | undefined = ctx.resolveSync(ctx.extends.name, false);
				if(extSymbol && extSymbol instanceof PClassSymbol)
				{
					const parentSymbols = PUtils.getAllSymbolsSync(extSymbol, t, name, true);
					result.push(...parentSymbols);
				}
			}
		}
			
        if (!localOnly && ctx.parent) 
		{
			const parentSymbols = PUtils.getAllSymbolsSync(ctx.parent, t, name, false);
			result.push(...parentSymbols);
        }
        return result;
	}

	public static resolveSymbolSync<T extends BaseSymbol, Args extends unknown[]>(ctx: BaseSymbol, t: SymbolConstructor<T, Args>, name?:string, localOnly?: boolean): T | undefined
	{
        let result : T | undefined;

		if(ctx instanceof ScopedSymbol)
		{
			for (const child of ctx.children) 
			{
				const isNameMatch = !name || (child.name == name);
				const isRightType = (child instanceof t );
				if (isRightType && isNameMatch)
					return child;
			}
		}
		if(ctx instanceof PClassSymbol)
		{
			if(ctx.extends)
			{
				let extSymbol : BaseSymbol | undefined = ctx.resolveSync(ctx.extends.name, false);
				if(extSymbol && extSymbol instanceof PClassSymbol)
				{
					const parentSymbol = PUtils.resolveSymbolSync(extSymbol, t, name, true);
					if(parentSymbol)
						return parentSymbol;
				}
			}
		}
			
        if (!localOnly && ctx.parent) 
		{
			const parentSymbol = PUtils.resolveSymbolSync(ctx.parent, t, name, false);
			if(parentSymbol)
				return parentSymbol;
       }
        return undefined;
	}

	public static getFirstParentMatch<T extends BaseSymbol, Args extends unknown[]>(t: SymbolConstructor<T, Args>, ctx: BaseSymbol): T | undefined 
	{
		if (!ctx.parent)
			return;
		if(ctx.parent instanceof t)
			return ctx.parent;
		return PUtils.getFirstParentMatch(t, ctx.parent);
	}

	public static resolveVariableDeclaration(name:string, symb : BaseSymbol) : VariableSymbol | undefined
	{
		let res : BaseSymbol | undefined = symb.resolveSync(name);
		if(res instanceof VariableSymbol)
			return res;
		return;
	}

	public static comparePrimitiveKind(symbolType : Type, primKind : PPrimitiveKind)
	{
		return symbolType.kind == TypeKind.Integer && symbolType.name == primitiveKindNames[primKind];
	}

	public static convertSymbolTypeToString(symbolType : Type | undefined, full:boolean=false) : string
	{
		if(!symbolType)
			return "<unknown>";

		if(symbolType.kind == TypeKind.Array)
		{
			if(symbolType.baseTypes.length==1)
				return PUtils.convertSymbolTypeToString(symbolType.baseTypes[0], full) + "[]"
			else
				return "<unknown> []"
		}
		else if(symbolType.kind == TypeKind.Class || symbolType.kind == TypeKind.Interface)
		{
			let result : string;
			if(full)
				result = symbolType.name;
			else
				result = symbolType.name.substring(symbolType.name.lastIndexOf(".")+1);

			if(symbolType.baseTypes.length > 0)
				result += "<";
			for(let i=0; i < symbolType.baseTypes.length; i++ )
			{
				if(i > 0)
					result += ", ";
				result += PUtils.convertSymbolTypeToString(symbolType.baseTypes[i], full)
			}
			if(symbolType.baseTypes.length > 0)
				result += ">";

			return result;
		}
		else
			return symbolType.name;
	}
}

export const rootClassType = PUtils.createClassType("java.lang.Object");