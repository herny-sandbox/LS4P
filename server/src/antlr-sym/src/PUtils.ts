import { 
	Type,
	TypeKind,
	ReferenceKind,
	BaseSymbol,
	IScopedSymbol,
	VariableSymbol,
	SymbolTable,
	SymbolConstructor,
	MethodSymbol,
	ScopedSymbol,
	MethodFlags,
} from "antlr4-c3";
import { PClassSymbol} from "./PClassSymbol"
import { PInterfaceSymbol} from "./PInterfaceSymbol"
import { PEnumSymbol} from "./PEnumSymbol"
import { PFormalParamSymbol } from "./PFormalParamSymbol"
import { PComponentSymbol} from "./PComponentSymbol"
import { PSymbolTable } from './PSymbolTable';
import { PNamespaceSymbol } from './PNamespaceSymbol';
import { PLibraryTable } from './PLibraryTable';
import { PType, PTypeKind } from './PType';

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
	public callerType : PType | undefined;
	public callerSymbol : BaseSymbol | undefined;
}

export class PUtils 
{
	public static typeToPType(type: any|undefined) : PType | undefined
	{
		if(type == undefined)
			return undefined;
		return new PType(type.name, type.typeKind, type.reference, type.baseTypes);
	}

	public static isDefaultObjectPath(path: string) {return path == defaultObjectClass; }
	public static createDefaultObjectType() : PType
	{
		return PUtils.createClassType(defaultObjectClass);
	}
	public static createClassType(className:string, baseTypes:PType[]=[]) : PType
	{
		return PUtils.setAsClassType(PUtils.createTypeUnknown(), className, baseTypes);
	}

	public static createInterfaceType(className:string, baseTypes:PType[]=[]) : PType
	{
		return PUtils.setAsInterfaceType(PUtils.createTypeUnknown(), className, baseTypes); 
	}

	public static createPrimitiveType(kind:PPrimitiveKind) : PType
	{
		return PUtils.setAsPrimitiveType(PUtils.createTypeUnknown(), kind); 
	}

	public static createStringType() : PType
	{
		return PUtils.setAsClassType(PUtils.createTypeUnknown(), defaultStringClass); 
	}

	public static createNullType() : PType
	{
		return new PType("null", PTypeKind.Null, ReferenceKind.Irrelevant); 
	}

	public static createArrayType(baseType:PType) : PType
	{
		return PUtils.setAsArrayType(PUtils.createTypeUnknown(), baseType); 
	}

	public static createVoidType() : PType
	{
		return new PType("void", PTypeKind.Void, ReferenceKind.Irrelevant);  
	}
	public static createGenericType(name:string, boundTypes: PType[])
	{
		return new PType(name, PTypeKind.Generic, ReferenceKind.Reference, boundTypes); 
	}
	public static createNamespaceType(name:string) : PType
	{
		return new PType(name, PTypeKind.Namespace, ReferenceKind.Reference);  
	}

	public static createTypeUnknown(typeName:string="<unknown>") : PType
	{
		return {  
			name : typeName,
			kind : TypeKind.Unknown,
			typeKind : PTypeKind.Unknown,
			baseTypes : [],
			reference : ReferenceKind.Irrelevant
		};
	}

	public static setAsNullType(type: PType) : PType
	{
		type.name = defaultNullName;
		type.kind = TypeKind.Unknown,
		type.typeKind = PTypeKind.Null;
		type.baseTypes = [],
		type.reference = ReferenceKind.Reference
		return type;	}

	public static setAsClassType(type: PType, className:string, baseTypes:PType[]=[]) : PType
	{
		type.name = className;
		type.kind = TypeKind.Class,
		type.typeKind = PTypeKind.Class;
		type.baseTypes = PUtils.cloneTypes(baseTypes),
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsInterfaceType(type: PType, interfName:string, baseTypes:PType[]=[]) : PType
	{
		type.name = interfName;
		type.kind = TypeKind.Interface,
		type.typeKind = PTypeKind.Interface;
		type.baseTypes = PUtils.cloneTypes(baseTypes),
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsNamespaceType(type: PType, name: string)
	{
		type.name = name;
		type.kind = TypeKind.Float,
		type.typeKind = PTypeKind.Namespace;
		type.baseTypes = [],
		type.reference = ReferenceKind.Reference
		return type;
	}

	public static setAsPrimitiveType(type: PType, kind:PPrimitiveKind) : PType
	{
		type.name = primitiveKindNames[kind];
		type.kind = TypeKind.Integer, // all primitives are going to be marked as integer
		type.typeKind = PTypeKind.Primitive;
		type.baseTypes = [],
		type.reference = ReferenceKind.Instance
		return type;
	}

	public static setAsArrayType(type: PType, baseType:PType) : PType
	{
		type.name = "Array";
		type.kind = TypeKind.Array,
		type.typeKind = PTypeKind.Array;
		type.baseTypes = [baseType],
		type.reference = ReferenceKind.Reference
		return type;
	}

	private static setAsGenericType(type: PType, genericName:string, boundTypes:PType[] ): PType
	{
		type.name = genericName;
		type.kind = TypeKind.Alias,
		type.typeKind = PTypeKind.Generic;
		type.baseTypes = PUtils.cloneTypes(boundTypes),
		type.reference = ReferenceKind.Reference;
		return type;
	}

	public static setAsTypeUnknown(type: PType, typeName:string="<unknown>") : PType
	{
		type.name = typeName;
		type.kind = TypeKind.Unknown;
		type.typeKind = PTypeKind.Unknown;
		type.baseTypes = [];
		type.reference = ReferenceKind.Irrelevant;
		return type;
	}
	
	public static setAsVoidType(type: PType) : PType
	{
		type.name = "void";
		type.kind = TypeKind.Unknown;
		type.typeKind = PTypeKind.Void;
		type.baseTypes = [];
		type.reference = ReferenceKind.Irrelevant;
		return type;
	}
	public static cloneTypeAsInstance(type: PType) : PType
	{
		return {  
			name : type.name,
			kind : type.kind,
			typeKind : type.typeKind,
			baseTypes : PUtils.cloneTypes(type.baseTypes),
			reference : ReferenceKind.Instance,
		};
	}
	public static cloneType(type: PType) : PType
	{
		return {  
			name : type.name,
			kind : type.kind,
			typeKind : type.typeKind,
			baseTypes : PUtils.cloneTypes(type.baseTypes),
			reference : type.reference
		};
	}
	public static cloneTypes(types:PType[]) : PType[]
	{
		let baseTypes : PType[] = [];
		for(let i=0; i < types.length; i++)
			baseTypes.push(PUtils.cloneType(types[i]));
		return baseTypes;
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
				let extSymbol : PClassSymbol | undefined = PUtils.resolveComponentSync(ctx, PClassSymbol, ctx.extends.name )
				if(extSymbol && extSymbol instanceof PClassSymbol)
				{
					const parentSymbols = PUtils.getAllSymbolsSync(extSymbol, t, name, true);
					result.push(...parentSymbols);
				}
			}
		}
		else if(ctx instanceof PSymbolTable)
		{
			const symbols = PUtils.getAllDirectChildSymbolSync(ctx, t, name)
			result.push(...symbols);

			if(name)
				name = ctx.ensureIsFullPath(name);

			for(let dependency of ctx.getDependencies())
			{
				const symbols = PUtils.getAllDirectChildSymbolSync(dependency, t, name)
				result.push(...symbols);
			}
		}
			
        if (!localOnly && ctx.parent) 
		{
			const parentSymbols = PUtils.getAllSymbolsSync(ctx.parent, t, name, false);
			result.push(...parentSymbols);
        }
        return result;
	}

	public static resolveChildSymbolSync<T extends BaseSymbol, Args extends unknown[]>(ctx: IScopedSymbol, t: SymbolConstructor<T, Args>, name?:string): T | undefined
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

	public static getAllDirectChildSymbolSync<T extends BaseSymbol, Args extends unknown[]>(ctx: IScopedSymbol, t: SymbolConstructor<T, Args>, name?:string): T[]
	{
		let result : T[] = [];
		for (const child of ctx.children) 
		{
			const isNameMatch = !name || (child.name == name);
			const isRightType = (child instanceof t );
			if (isRightType && isNameMatch)
				result.push( child );
		}
		return result;
	}

	public static resolveSymbolSync<T extends BaseSymbol, Args extends unknown[]>(ctx: BaseSymbol, t: SymbolConstructor<T, Args>, name?:string, localOnly?: boolean): T | undefined
	{
        let result : T | undefined;

		if(name && name.indexOf('.')>=0)
		{
			let nameParts : string [] = name.split(".");
			let callContext = PUtils.resolveSymbolSync(ctx, PComponentSymbol, nameParts[0], false );
			let partIndex = 1;
			while(callContext && partIndex < nameParts.length)
			{
				callContext = PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, nameParts[partIndex]);
				partIndex++;
			}
			if(callContext instanceof t)
				return callContext;
			return undefined;
		}

		if(ctx instanceof PClassSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
			if(ctx.extends)
			{
				let extSymbol : PClassSymbol | undefined = PUtils.resolveComponentSync(ctx, PClassSymbol, ctx.extends.name )
				if(extSymbol)
				{
					const resultSymbol = PUtils.resolveSymbolSync(extSymbol, t, name, true);
					if(resultSymbol)
						return resultSymbol;
				}
			}
			for(let impl of ctx.implements)
			{
				let implSymbol : PInterfaceSymbol | undefined = PUtils.resolveComponentSync(ctx, PInterfaceSymbol, impl.name )
				if(implSymbol)
				{
					const resultSymbol = PUtils.resolveSymbolSync(implSymbol, t, name, true);
					if(resultSymbol)
						return resultSymbol;
				}
			}
		}
		else if(ctx instanceof PInterfaceSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
			for(let interf of ctx.extends)
			{
				let implSymbol : BaseSymbol | undefined = ctx.resolveSync(interf.name, false);
				if(implSymbol && implSymbol instanceof PInterfaceSymbol)
				{
					const resultSymbol = PUtils.resolveSymbolSync(implSymbol, t, name, true);
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

			// for(let dependency of ctx.getDependencies())
			// {
			// 	if(dependency instanceof PLibraryTable)
			// 	{
			// 		// let component = dependency.resolveComponent(t, name);
			// 		// if(component)
			// 		// 	return component;
			// 	}
			// }
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

	public static resolveComponentSync<T extends PComponentSymbol, Args extends unknown[]>(ctx: BaseSymbol, t: SymbolConstructor<T, Args>, name?:string): T | undefined
	{
        let result : T | undefined;

		if(name && name.indexOf('.')>=0)
		{
			let nameParts : string [] = name.split(".");
			let callContext = PUtils.resolveComponentSync(ctx, PComponentSymbol, nameParts[0] );
			let partIndex = 1;
			while(callContext && partIndex < nameParts.length)
			{
				callContext = PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, nameParts[partIndex]);
				partIndex++;
			}
			if(callContext instanceof t)
				return callContext;
			return undefined;
		}
		if(ctx instanceof ScopedSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
		}
		if(ctx instanceof PSymbolTable)
		{
			if(name)
				name = ctx.ensureIsFullPath(name);

			for(let dependency of ctx.getDependencies())
			{
				if(dependency instanceof PLibraryTable)
				{
					let component = dependency.resolveComponent(t, name);
					if(component)
						return component;
				}
			}
		}
		else  
		if (ctx.parent) 
		{
			const parentSymbol = PUtils.resolveComponentSync(ctx.parent, t, name);
			if(parentSymbol)
				return parentSymbol;
       	}
    	return undefined;
	}

	public static resolveSymbolFromTypeSync(currentScope: ScopedSymbol, type: PType): ScopedSymbol
	{
		let result : ScopedSymbol | undefined;
		if(type instanceof PClassSymbol)
			result = type;
		else if(type instanceof PInterfaceSymbol)
			result = type;
		else if(type instanceof PEnumSymbol)
			result = type;
		else if(type.typeKind == PTypeKind.Class || type.typeKind == PTypeKind.Interface || 
				type.typeKind == PTypeKind.Unknown || type.typeKind == PTypeKind.Namespace || type.typeKind == PTypeKind.Enum)
		{
			result = PUtils.resolveComponentSync(currentScope, PComponentSymbol, type.name );
		}
		if(!result)
			result = currentScope;
		return result;
	}

	public static resolveTypeNameReference(currentScope : ScopedSymbol, typeName: string) : ScopedSymbol | undefined
	{
		let callContext : ScopedSymbol | undefined;
		callContext = PUtils.resolveSymbolSync(currentScope, PClassSymbol, typeName, false );
		if(!callContext)
			callContext = PUtils.resolveSymbolSync(currentScope, PInterfaceSymbol, typeName, false );
		if(!callContext)
			callContext = PUtils.resolveSymbolSync(currentScope, PNamespaceSymbol, typeName, false );
		return callContext;
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

	public static comparePrimitiveKind(symbolType : PType, primKind : PPrimitiveKind, scope: ScopedSymbol)
	{
		if(symbolType.typeKind == PTypeKind.Primitive)
			return symbolType.name == primitiveKindNames[primKind];
		else if(symbolType.typeKind == PTypeKind.Class || symbolType.typeKind == PTypeKind.Interface)
		{
			let classSymb = PUtils.resolveSymbolFromTypeSync(scope, symbolType);
			if(!classSymb)
				return false;
			let callContext = PUtils.resolveSymbolSync(classSymb, MethodSymbol, primitiveKindNames[primKind]+"Value", true );
			return callContext !== undefined;
		}

		//return symbolType.typeKind == PTypeKind.Primitive && symbolType.name == primitiveKindNames[primKind];
	}

	public static convertSymbolTypeToString(symbolType : PType | undefined, full:boolean=false) : string
	{
		if(!symbolType)
			return "<unknown>";

		if(symbolType.typeKind == PTypeKind.Array)
		{
			if(symbolType.baseTypes.length==1)
				return PUtils.convertSymbolTypeToString(symbolType.baseTypes[0], full) + "[]"
			else
				return "<unknown> []"
		}
		else if(symbolType.typeKind == PTypeKind.Class || symbolType.typeKind == PTypeKind.Interface)
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

	static checkComparableTypes(left: PType, right: PType, scope: ScopedSymbol) : boolean
	{
		let comparingInterfaces = left.typeKind == PTypeKind.Interface || right.typeKind == PTypeKind.Interface;
		let comparingClasses = left.typeKind == PTypeKind.Class || right.typeKind == PTypeKind.Class;
		let comparingArray = left.typeKind == PTypeKind.Array || right.typeKind == PTypeKind.Array;
		let comparingNull = left.name == "null" || right.name == "null";
		let comparingPrimitive = left.typeKind == PTypeKind.Primitive || right.typeKind == PTypeKind.Primitive;

		if((comparingInterfaces || comparingClasses || comparingArray) && comparingNull)
			return true;

		if(comparingClasses && comparingPrimitive)
		{
			let primitive = left.typeKind == PTypeKind.Primitive ? left : right;
			let classType = left.typeKind == PTypeKind.Class ? left : right;

			let classSymb = PUtils.resolveSymbolFromTypeSync(scope, classType);
			if(!classSymb)
				return false;
			let callContext = PUtils.resolveSymbolSync(classSymb, MethodSymbol, primitive.name+"Value", true );
			return callContext !== undefined;
		}
		if(comparingArray && comparingClasses)
			return true;

		return left.typeKind == right.typeKind;
	}

	public static setMethodLastVargs( method : MethodSymbol)
	{
		method.methodFlags |= MethodFlags.Virtual;
	} 

	public static hasMethodLastVargs( method : MethodSymbol)
	{
		return (method.methodFlags & MethodFlags.Virtual) != 0;
	} 
}