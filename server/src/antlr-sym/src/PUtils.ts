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
import { PGenericParamSymbol } from './PGenericParamSymbol';
import { PParameterSymbol} from "./PParameterSymbol";
import { PThrowsSymbol } from "./PThrowsSymbol";




export class CallContext
{
	public outter : CallContext | undefined;
	public type : PType | undefined;
	public symbol : ScopedSymbol | undefined;

	constructor( callerType : PType, callerSymbol : ScopedSymbol | undefined )
	{
		this.type = callerType;
		this.symbol = callerSymbol;
	}
	setOutter(outter : CallContext | undefined) : CallContext
	{ 
		this.outter = outter; 
		return this;
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
			let symbols = PUtils.getAllDirectChildSymbolSync(ctx, t, name)
			result.push(...symbols);

			if(name)
				name = ctx.ensureIsFullPath(name);

			symbols = PUtils.getAllDirectChildSymbolSync(ctx.dependencyTable, t, name)
			result.push(...symbols);
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
		let result : T | undefined;
		for (const child of ctx.children) 
		{
			const isNameMatch = !name || (child.name == name);
			const isRightType = (child instanceof t );
			if (isRightType && isNameMatch)
			{
				result = child;
				break;
			}
		}
		return result;
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

	public static resolveComponentSyncFromPType<T extends PComponentSymbol, Args extends unknown[]>(ctx: IScopedSymbol, t: SymbolConstructor<T, Args>, ptype:IPType): T | undefined
	{
		let outter : PComponentSymbol | undefined; 
		if(ptype.outterType)
			outter = PUtils.resolveComponentSyncFromPType(ctx, PComponentSymbol, ptype.outterType);
		
		if(outter)
			return PUtils.resolveComponentSync(outter, t, ptype.name);
		else
			return PUtils.resolveComponentSync(ctx, t, ptype.name);
	}

	public static resolveComponentSync<T extends PComponentSymbol, Args extends unknown[]>(ctx: IScopedSymbol, t: SymbolConstructor<T, Args>, name?:string): T | undefined
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
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx.dependencyTable, t, name);
			if(resultSymbol)
				return resultSymbol;
			
			if(name)
				name = ctx.ensureIsFullPath(name);

			let component = ctx.dependencyTable.resolveComponent(t, name);
			if(component)
				return component;
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
				type.typeKind == PTypeKind.Component || type.typeKind == PTypeKind.Namespace || type.typeKind == PTypeKind.Enum)
		{
			result = PUtils.resolveComponentSyncFromPType(currentScope, PComponentSymbol, type );
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

	public static convertToSignature( method : PMethodSymbol ) : string
	{
		let genericParams : PGenericParamSymbol [] = PUtils.getAllDirectChildSymbolSync(method, PGenericParamSymbol);
		let throwsParams : PThrowsSymbol [] = PUtils.getAllDirectChildSymbolSync(method, PThrowsSymbol);
		let params : PParameterSymbol [] = PUtils.getAllDirectChildSymbolSync(method, PParameterSymbol);
		let returnSignature = PUtils.convertPTypeToSignature(method.returnType);
		let paramsSignature : string = "";
		let genericSignature : string = "";
		let throwsSignature : string = "";

		if(genericParams.length>0)
		{
			genericSignature += '<';
			for(let param of genericParams)
			{
				genericSignature += param.name;
				genericSignature += ':';
				
				for(let i=0; i < param.extends.length; i++ )
				{
					if(i!=0 || param.extends[i].typeKind != PTypeKind.Class)
						genericSignature += ':';
					genericSignature += PUtils.convertPTypeToSignature(param.extends[i]);
				}

			}	
			genericSignature += '>';
		}

		for(let param of params)
			paramsSignature += PUtils.convertPTypeToSignature(param.type);

		for(let throwParam of throwsParams)
			throwsSignature += '^' + PUtils.convertPTypeToSignature(throwParam.type);

		let result : string = `${genericSignature}(${paramsSignature})${returnSignature}${throwsSignature}`;

		return result;
	}

	public static convertPTypeToSignature( type : PType | undefined ) : string
	{
		if(type == undefined)
			return 'V';
		if(type.typeKind == PTypeKind.Primitive)
			return PUtils.convertPrimitiveToSignature(type.primitiveKind);
		else if(type.typeKind == PTypeKind.Void)
			return 'V';
		else if(type.typeKind == PTypeKind.Class || type.typeKind == PTypeKind.Interface || type.typeKind == PTypeKind.Component)
		{
			let result = 'L' + PUtils.convertComponentToSignature(type);
			if(type.hasGenericParams())
			{
				result += '<';
				for( let genericParam of type.genericTypes)
				{
					result += PUtils.convertPTypeToSignature(genericParam);
				}
				result += '>';
			}
			result += ';';
			return result;
		}
		else if(type.typeKind == PTypeKind.Array)
			return '['+PUtils.convertPTypeToSignature(type.arrayType);
		else if(type.typeKind == PTypeKind.GenericDecl)
		{
			if(type.name=='?')
				return '*';
			else if(type.name=='=')
				return PUtils.convertPTypeToSignature(type.extendType)
			else if(type.name=='+')
				return '+' + PUtils.convertPTypeToSignature(type.extendType);
			else if(type.name=='-')
				return '-' + PUtils.convertPTypeToSignature(type.extendType);
		}
		else if(type.typeKind == PTypeKind.Generic)
		{
			return 'T' + type.name + ';';
		}
	}

	public static convertPrimitiveToSignature( kind : PPrimitiveKind ) : string
	{
		if(kind == PPrimitiveKind.Boolean )
			return 'Z';
		else if(kind == PPrimitiveKind.Byte )
			return 'B';
		else if(kind == PPrimitiveKind.Char )
			return 'C';
		else if(kind == PPrimitiveKind.Double )
			return 'D';
		else if(kind == PPrimitiveKind.Float )
			return 'F';
		else if(kind == PPrimitiveKind.Int )
			return 'I';
		else if(kind == PPrimitiveKind.Long )
			return 'J';
		else // if(kind == PPrimitiveKind.Short )
			return 'S';
	}

	public static convertComponentToSignature( type : PType ) : string
	{
		let result : string = "";
		if(type.outterType)
			result += PUtils.convertComponentToSignature(type.outterType) + "$";
		result += type.name.replace(/[.$]/g, "/");
		return result;
	}
}