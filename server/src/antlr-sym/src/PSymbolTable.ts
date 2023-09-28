import { 
	BaseSymbol,
	SymbolTable,
	SymbolTableOptions,
} from "antlr4-c3";
import { PNamespaceSymbol } from "./PNamespaceSymbol"
import { PComponentSymbol } from "./PComponentSymbol"
import { PLibraryTable } from './PLibraryTable';
import { PUtils } from './PUtils';
import { IPType } from './PType';

const fakeEmptyDependencies : Set<SymbolTable> = new Set<SymbolTable>();

export class PSymbolTable extends SymbolTable 
{
	//protected imports : Set<string> = new Set<string>();
	protected importDict : Map<string, string> = new Map<string, string>();

	public dependencyTable : PLibraryTable = new PLibraryTable("", { allowDuplicateSymbols: true});


	constructor(name: string, options: SymbolTableOptions)
	{
		super(name, options);
	}

	public addImport(importPath: string, allMembers: boolean) 
	{ 
		if(allMembers)
		{
			let result = this.dependencyTable.resolveComponent(PComponentSymbol, importPath);
			if(result)
			{
				let components = PUtils.getAllDirectChildSymbolSync(result, PComponentSymbol, undefined);
				for(let component of components)
				{
					let fullName = component.qualifiedName(PNamespaceSymbol.delimiter, true, false);
					this.addImportAlias(component.name, fullName);
				}
			}
			else
				console.error("Unable to add any import symbol for "+importPath+(allMembers?".*":""));
		}
		else
		{
			let lastDotIndex = importPath.lastIndexOf(PNamespaceSymbol.delimiter);
			if(lastDotIndex >= 0)
			{
				let className = importPath.substring(lastDotIndex+1);
				this.addImportAlias(className, importPath);
			}
		}
	}

	private addImportAlias(name:string, fullpath:string)
	{
		this.importDict.set(name, fullpath);
	}

	public getFullPath(ptype: IPType, checkAliasToo:boolean=true) : string
	{
		if(ptype.outterType)
			return this.getFullPath(ptype.outterType, false) + '.' + ptype.name;
		else if(checkAliasToo)
			return this.ensureIsFullPath(ptype.name);
		return ptype.name;
	}

	public ensureIsFullPath(name: string) : string
	{
		let dotIndex = name.indexOf(PNamespaceSymbol.delimiter);
		if(dotIndex>=0)
		{
			let firstPart = name.substring(0, dotIndex);
			return this.importDict.get(firstPart)??name;
		}
			
		return this.importDict.get(name)??name;
	}

    resolveSync(name:string, localOnly = false) : BaseSymbol | undefined
	{
		let result = super.resolveSync(name, localOnly);

		if(!result)
		{
			let fullName = this.ensureIsFullPath(name)
			if(!fullName)
				fullName = name;

			result = this.dependencyTable.symbolFromPath(fullName, ".");
		}
		return result;
    }
}