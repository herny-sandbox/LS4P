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
import { PInterfaceSymbol} from "./PInterfaceSymbol"
import { PFormalParamSymbol } from "./PFormalParamSymbol"
import { PSymbolTable } from './PSymbolTable';
import { PNamespaceSymbol } from './PNamespaceSymbol';
import { PLibraryTable } from './PLibraryTable';

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
const defaultObjectClass = "java.lang.Object"
const defaultNullName = "null"

export class CallContext
{
	public callerType : Type | undefined;
	public callerSymbol : BaseSymbol | undefined;
	public genericsDict : Map<string, Type> = new Map<string, Type>();
}

export class PUtils 
{
	public static createDefaultObjectType()
	{
		return PUtils.createClassType(defaultObjectClass);
	}
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
	public static createGenericType(name:string, boundTypes: Type[])
	{
		return PUtils.setAsGenericType(PUtils.createTypeUnknown(), name, boundTypes);
	}

	public static createTypeUnknown(typeName:string="<unknown>") : Type
	{
		return {  
			name : typeName,
			kind : TypeKind.Unknown,
			baseTypes : [],
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
		type.baseTypes = PUtils.cloneTypes(baseTypes),
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsInterfaceType(type: Type, interfName:string, baseTypes:Type[]=[]) : Type
	{
		type.name = interfName;
		type.kind = TypeKind.Interface,
		type.baseTypes = PUtils.cloneTypes(baseTypes),
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

	private static setAsGenericType(type: Type, genericName:string, boundTypes:Type[] ): Type
	{
		type.name = genericName;
		type.kind = TypeKind.Alias,
		type.baseTypes = PUtils.cloneTypes(boundTypes),
		type.reference = ReferenceKind.Reference;
		return type;
	}

	public static setAsTypeUnknown(type: Type, typeName:string="<unknown>") : Type
	{
		type.name = typeName;
		type.kind = TypeKind.Unknown,
		type.baseTypes = [],
		type.reference = ReferenceKind.Irrelevant;
		return type;
	}
	public static cloneTypeAsInstance(type: Type) : Type
	{
		return {  
			name : type.name,
			kind : type.kind,
			baseTypes : PUtils.cloneTypes(type.baseTypes),
			reference : ReferenceKind.Instance,
		};
	}
	public static cloneType(type: Type) : Type
	{
		return {  
			name : type.name,
			kind : type.kind,
			baseTypes : PUtils.cloneTypes(type.baseTypes),
			reference : type.reference
		};
	}
	public static cloneTypes(types:Type[]) : Type[]
	{
		let baseTypes : Type[] = [];
		for(let i=0; i < types.length; i++)
			baseTypes.push(PUtils.cloneType(types[i]));
		return baseTypes;
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
		//if()
			
        if (!localOnly && ctx.parent) 
		{
			const parentSymbols = PUtils.getAllSymbolsSync(ctx.parent, t, name, false);
			result.push(...parentSymbols);
        }
        return result;
	}

	public static resolveChildSymbolSync<T extends BaseSymbol, Args extends unknown[]>(ctx: ScopedSymbol, t: SymbolConstructor<T, Args>, name?:string): T | undefined
	{
		for (const child of ctx.children) 
		{
			const isNameMatch = !name || (child.name == name);
			const isRightType = (child instanceof t );
			if (isRightType && isNameMatch)
				return child;
		}
		return undefined;
	}

	public static resolveSymbolSync<T extends BaseSymbol, Args extends unknown[]>(ctx: BaseSymbol, t: SymbolConstructor<T, Args>, name?:string, localOnly?: boolean): T | undefined
	{
        let result : T | undefined;

		if(ctx instanceof PClassSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
			if(ctx.extends)
			{
				let extSymbol : BaseSymbol | undefined = ctx.resolveSync(ctx.extends.name, false);
				if(extSymbol && extSymbol instanceof PClassSymbol)
				{
					const resultSymbol = PUtils.resolveSymbolSync(extSymbol, t, name, true);
					if(resultSymbol)
						return resultSymbol;
				}
			}
		}
		else if(ctx instanceof PSymbolTable)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;

			if(name)
				name = ctx.ensureIsFullPath(name);

			for(let dependency of ctx.getDependencies())
			{
				const resultSymbol = PUtils.resolveSymbolSync(dependency, t, name, true);
				if(resultSymbol)
					return resultSymbol;
			}
		}
		else if(ctx instanceof PNamespaceSymbol)
		{
			if(name && !ctx.containsName(name))
				return undefined;

			const relativeName = ctx.consumeName(name);
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, relativeName);
			if(resultSymbol)
				return resultSymbol;

			let childNamespaces = PUtils.getAllSymbolsSync(ctx, PNamespaceSymbol, undefined, true);
			for (const child of childNamespaces) 
			{
				const resultSymbol = PUtils.resolveSymbolSync(child, t, relativeName, true);
				if(resultSymbol)
					return resultSymbol;
			}
		}
		else if(ctx instanceof PLibraryTable)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;

			for (const child of ctx.children) 
			{
				const resultSymbol = PUtils.resolveSymbolSync(child, t, name, true);
				if(resultSymbol)
					return resultSymbol;
			}
		}
		else  if(ctx instanceof ScopedSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
		}
			
        if (!localOnly && ctx.parent) 
		{
			const parentSymbol = PUtils.resolveSymbolSync(ctx.parent, t, name, false);
			if(parentSymbol)
				return parentSymbol;
       }
        return undefined;
	}

	public static resolveSymbolFromTypeSync(currentScope: ScopedSymbol, type: Type): ScopedSymbol
	{
		let result : ScopedSymbol | undefined;
		if(type instanceof PClassSymbol)
			result = type;
		else if(type instanceof PInterfaceSymbol)
			result = type;
		else if(type.kind == TypeKind.Class)
		{
			let callContext = PUtils.resolveSymbolSync(currentScope, PClassSymbol, type.name, false )
			if(callContext && callContext instanceof ScopedSymbol)
				result = callContext;
		}
		else if(type.kind == TypeKind.Interface)
		{
			let callContext = PUtils.resolveSymbolSync(currentScope, PInterfaceSymbol, type.name, false )
			if(callContext && callContext instanceof ScopedSymbol)
				result = callContext;
		}
		if(!result)
			result = currentScope;
		return result;
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