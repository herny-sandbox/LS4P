import { 
	SymbolTable,
	SymbolTableOptions,
	IScopedSymbol,
	BaseSymbol
} from "antlr4-c3";
import { PNamespaceSymbol } from "./PNamespaceSymbol"

export class PLibraryTable extends SymbolTable 
{
	constructor(name: string, options: SymbolTableOptions)
	{
		super(name, options);
	}

	getOrCreateNamespaceFor(symbolPath:string, delimiter:string="/") : IScopedSymbol
	{
		const parts = symbolPath.split(delimiter);
        let i = 0;
        let currentParent : IScopedSymbol = this;
		let fixedName = parts[i];
        while (i < parts.length - 1) 
		{
            let symbol = currentParent.resolveSync(fixedName, true);
			let namespace : PNamespaceSymbol;
			if( symbol instanceof PNamespaceSymbol )
				namespace = symbol;
			else
			{
                namespace = new PNamespaceSymbol(parts[i]);
				currentParent.addSymbol(namespace);
			}
            currentParent = namespace;
            ++i;
			fixedName = parts[i-1] + PNamespaceSymbol.delimiter + parts[i];
       }
        return currentParent;
	}

	resolveSync(name: string, localOnly?: boolean | undefined): BaseSymbol | undefined 
	{
		let result ;
		for(let child of this.children)
		{
			if(child instanceof PNamespaceSymbol)
				result = child.resolveSync(name, localOnly);
			else if(child.name === name)
				result = child;
			if(result)
				break;
		}
		return result;	
	}
}