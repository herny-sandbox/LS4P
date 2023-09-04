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
import { PClassSymbol } from "./PClassSymbol"

let typeKindNames = [
    "void",
    "int",
    "float",
    "int",
    "string",
    "char",
    "boolean",
    "class",
    "interface",
    "ArrayList",
    "Map",
    "enum",
    "alias"
]

export class PUtils 
{
	public static createClassType(className:string, baseTypes:Type[]=[]) : Type
	{
		return {  
			name : className,
			kind : TypeKind.Class,
			baseTypes : baseTypes,
			reference : ReferenceKind.Reference
		};
	}

	public static createInterfaceType(className:string, baseTypes:Type[]=[]) : Type
	{
		return {  
			name : className,
			kind : TypeKind.Interface,
			baseTypes : baseTypes,
			reference : ReferenceKind.Reference
		};
	}

	public static createPrimitiveType(kind:TypeKind, customName ?:string) : Type
	{
		return {  
			name : customName ? customName : typeKindNames[kind],
			kind : kind,
			baseTypes : [],
			reference : ReferenceKind.Instance
		};
	}

	public static createUnknownType(typeName:string, baseTypes:Type[]=[]) : Type
	{
		return {  
			name : typeName,
			kind : TypeKind.Unknown,
			baseTypes : baseTypes,
			reference : ReferenceKind.Irrelevant
		};
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

	public static getAllSymbolsSync<T extends BaseSymbol, Args extends unknown[]>(ctx: BaseSymbol, t: SymbolConstructor<T, Args>, name?:string, localOnly?: boolean): BaseSymbol[] 
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
			
        if (!localOnly && ctx.parent) 
		{
			const parentSymbols = PUtils.getAllSymbolsSync(ctx.parent, t, name, false);
			result.push(...parentSymbols);
        }
        return result;
	}

	public static getFirstParentMatch<T extends IScopedSymbol>(ctx:BaseSymbol, comparer:(a:IScopedSymbol)=>T | undefined): T | undefined
	{
		let result :  T | undefined; 
		if(ctx.parent)
		{
			result = comparer(ctx.parent)
			if(result)
				return result;
			result = PUtils.getFirstParentMatch(ctx.parent, comparer);
		} 
		return result;
	}

	public static resolveVariableDeclaration(name:string, symb : BaseSymbol) : VariableSymbol | undefined
	{
		let res : BaseSymbol | undefined = symb.resolveSync(name);
		if(res instanceof VariableSymbol)
			return res;
		return;
	}

	public static compareTypes(symbolType : Type | undefined, expressionType : Type | undefined, symbolContext : BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		if(symbolType===undefined || expressionType === undefined)
			return false;
		if(symbolType.kind != expressionType.kind )
			return false;

		if(symbolType.kind == TypeKind.Class)
			return PUtils.compareClassTypes(symbolType, expressionType, symbolContext, perfectMatch);
		else
			return PUtils.comparePrimitiveNames(expressionType.name, symbolType.name, perfectMatch)
	}

	static comparePrimitiveNames(expressionTypeName: string, requiredName:string, perfectMatch:boolean=false) : boolean
	{
		if( expressionTypeName == requiredName )
			return true;
		if(perfectMatch)
			return false;

		if(requiredName==="int")
			return expressionTypeName == "char";
		if(requiredName==="float")
			return expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName==="double")
			return expressionTypeName == "float" || expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName=="boolean")
			return expressionTypeName == "int" || expressionTypeName == "char";
		
		return false;
	}

	static compareClassTypes(symbolType : Type, expressionType : Type, symbolContext : BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		if(expressionType.name == symbolType.name)
			return true;
		// If the types doesn't match and we are seeking for a perfect match then just fail
		if(perfectMatch)
			return false;

		//if perfectMatch is not required then we still need to check with the class inheritance
		let classDef = symbolContext.resolveSync(expressionType.name, false);
		if(!classDef || !(classDef instanceof PClassSymbol))
		 	return false;
		return PUtils.checkClassInheritanceType(symbolType, classDef, symbolContext, perfectMatch);
	}

	static checkClassInheritanceType(symbolType : Type, classSymbol:PClassSymbol, symbolContext : BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		let result : boolean = false;
		if(classSymbol.name===symbolType.name)
			return true;

		if(classSymbol.extends)
			result = PUtils.compareClassTypes(symbolType, classSymbol.extends, symbolContext, perfectMatch );
		if(result)
			return true;
		// {
		// 	let extSymbol : BaseSymbol | undefined = classSymbol.parent.resolveSync(classSymbol.extends.name, false);
		// 	if(extSymbol && extSymbol instanceof PClassSymbol)
		// 		result = extSymbol.resolveInheritance(name);
		// }
	// 	if(!result)
	// 	{
	// 		for(let i=0; i < this.implements.length; i++)
	// 		{
	// 			let implSymbol : BaseSymbol | undefined = super.resolveSync(this.implements[i].name, false);
	// 			if(implSymbol && implSymbol instanceof PInterfaceSymbol)
	// 				result = implSymbol.resolveInheritance(name);
	// 			if( result )
	// 				break;
	// 		}
	// 	}
		return false;
	}
}