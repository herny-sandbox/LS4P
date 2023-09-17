// import { 
// 	SymbolTable,
// 	SymbolTableOptions,
// 	IScopedSymbol,
// 	BaseSymbol,
// 	SymbolConstructor
// } from "antlr4-c3";
import * as symb from "antlr4-c3";
import { PNamespaceSymbol } from "./PNamespaceSymbol"
import { PComponentSymbol } from "./PComponentSymbol"
import { PUtils } from "./PUtils"

export class PLibraryTable extends symb.SymbolTable 
{
	constructor(name: string, options: symb.SymbolTableOptions)
	{
		super(name, options);
	}

	getOrCreateNamespaceFor(symbolPath:string, delimiter:string="/") : symb.IScopedSymbol
	{
		const parts = symbolPath.split(delimiter);
        let i = 0;
        let currentParent : symb.IScopedSymbol = this;

		while (i < parts.length - 1) 
		{
			let component = PUtils.resolveChildSymbolSync(currentParent, PComponentSymbol, parts[i]);
			if(component == undefined)
			{
                component = new PNamespaceSymbol(parts[i]);
				currentParent.addSymbol(component);
			}
            currentParent = component;
            ++i;
       	}
        return currentParent;
	}

	// resolveSync(name: string, localOnly?: boolean | undefined): symb.BaseSymbol | undefined 
	// {
	// 	let result ;
	// 	for(let child of this.children)
	// 	{
	// 		if(child instanceof PNamespaceSymbol)
	// 			result = child.resolveSync(name, localOnly);
	// 		else if(child.name === name)
	// 			result = child;
	// 		if(result)
	// 			break;
	// 	}
	// 	return result;	
	// }

	resolveComponent<T extends PComponentSymbol, Args extends unknown[]>(t: symb.SymbolConstructor<T, Args>, name:string) : T | undefined
	{
		if(name.indexOf('.')>=0)
		{
			let nameParts : string [] = name.split(".");
			let callContext = PUtils.resolveChildSymbolSync(this, PComponentSymbol, nameParts[0] );
			let partIndex = 1;
			while(callContext && partIndex < nameParts.length)
			{
				callContext = PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, nameParts[partIndex]);
				partIndex++;
			}
			return (callContext instanceof t)? callContext : undefined;
		}
		else
		{
			let callContext = PUtils.resolveChildSymbolSync(this, t, name );
			return callContext;
		}
	}
}