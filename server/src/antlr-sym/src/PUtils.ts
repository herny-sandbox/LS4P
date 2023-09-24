import { 
	Type,
	TypeKind,
	ReferenceKind,
	BaseSymbol,
	IScopedSymbol,
	VariableSymbol,
	SymbolConstructor,
	ScopedSymbol,
	MethodFlags,
} from "antlr4-c3";
import { PClassSymbol} from "./PClassSymbol"
import { PInterfaceSymbol} from "./PInterfaceSymbol"
import { PMethodSymbol} from "./PMethodSymbol"
import { PEnumSymbol} from "./PEnumSymbol"
import { PComponentSymbol} from "./PComponentSymbol"
import { PSymbolTable } from './PSymbolTable';
import { PNamespaceSymbol } from './PNamespaceSymbol';
import { PLibraryTable } from './PLibraryTable';
import { IPType, PType, PTypeKind, PPrimitiveKind } from './PType';





export class CallContext
{
	public type : PType | undefined;
	public symbol : ScopedSymbol | undefined;

	constructor( callerType : PType, callerSymbol : ScopedSymbol | undefined )
	{
		this.type = callerType;
		this.symbol = callerSymbol;
	}
}

export class PUtils 
{
	public static cloneTypeAsInstance(type: PType) : PType
	{
		return PType.createClone(type).setReference(ReferenceKind.Instance);
	}

	public static ComponentSymbolToPType(comp: PComponentSymbol | undefined) : PType
	{
		if(comp === undefined)
			return PType.createUnknownType();
		if(comp instanceof PClassSymbol)
			return PType.createClassType(comp.name);
		else if(comp instanceof PInterfaceSymbol)
			return PType.createInterfaceType(comp.name);
		else if(comp instanceof PEnumSymbol)
			return PType.createEnumType(comp.name);
		else if(comp instanceof PNamespaceSymbol)
			return PType.createNamespaceType(comp.name);
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
		if(ctx instanceof PInterfaceSymbol)
		{
			if(ctx.implements)
			{
				for(let i=0; i < ctx.implements.length; i++ )
				{
					let extSymbol : PInterfaceSymbol | undefined = PUtils.resolveComponentSync(ctx, PInterfaceSymbol, ctx.implements[i].name )
					if( extSymbol )
					{
						const parentSymbols = PUtils.getAllSymbolsSync(extSymbol, t, name, true);
						result.push(...parentSymbols);
					}
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

	public static getClassName( fullname : string )  : string
	{
		if(fullname && fullname.indexOf('.')>=0)
		{
			let nameParts : string [] = fullname.split(".");
			return nameParts[nameParts.length-1];
		}

		return fullname;
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
			for(let interf of ctx.implements)
			{
				let implSymbol : PInterfaceSymbol | undefined = PUtils.resolveComponentSync(ctx, PInterfaceSymbol, interf.name )
				//let implSymbol : BaseSymbol | undefined = ctx.resolveSync(interf.name, false);
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

	public static resolveSymbolFromTypeSync(currentScope: ScopedSymbol, type: IPType): ScopedSymbol
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

	public static comparePrimitiveKind(symbolType : IPType, primKind : PPrimitiveKind, scope: ScopedSymbol)
	{
		if(symbolType.typeKind == PTypeKind.Primitive && symbolType instanceof PType)
			return symbolType.primitiveKind == primKind;
		else if(symbolType.typeKind == PTypeKind.Class || symbolType.typeKind == PTypeKind.Interface)
		{
			let classSymb = PUtils.resolveSymbolFromTypeSync(scope, symbolType);
			if(!classSymb)
				return false;
			let callContext = PUtils.resolveSymbolSync(classSymb, PMethodSymbol, PType.getPrimitiveTypeName(primKind)+"Value", true );
			return callContext !== undefined;
		}
	}

	public static convertSymbolTypeToString(symbolType : IPType | undefined, full:boolean=false) : string
	{
		if(!symbolType)
			return "<unknown>";

		if(symbolType.typeKind == PTypeKind.Array && symbolType instanceof PType)
		{
			if(symbolType.arrayType)
				return PUtils.convertSymbolTypeToString(symbolType.arrayType, full) + "[]"
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

			if(symbolType.genericTypes.length > 0)
				result += "<";
			for(let i=0; i < symbolType.genericTypes.length; i++ )
			{
				if(i > 0)
					result += ", ";
				result += PUtils.convertSymbolTypeToString(symbolType.genericTypes[i], full)
			}
			if(symbolType.genericTypes.length > 0)
				result += ">";

			return result;
		}
		else
			return symbolType.name;
	}

	static checkComparableTypes(left: IPType, right: IPType, scope: ScopedSymbol) : boolean
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

			if(classType.name == "Object" || PType.isDefaultObjectPath(classType.name))
				return true;

			let classSymb = PUtils.resolveSymbolFromTypeSync(scope, classType);
			if(!classSymb)
				return false;
			let callContext = PUtils.resolveSymbolSync(classSymb, PMethodSymbol, primitive.name+"Value", true );
			return callContext !== undefined;
		}
		if(comparingArray && comparingClasses)
			return true;

		return left.typeKind == right.typeKind;
	}

	public static setMethodLastVargs( method : PMethodSymbol)
	{
		method.methodFlags |= MethodFlags.Virtual;
	} 

	public static hasMethodLastVargs( method : PMethodSymbol)
	{
		return (method.methodFlags & MethodFlags.Virtual) != 0;
	} 
}