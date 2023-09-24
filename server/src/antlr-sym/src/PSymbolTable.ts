import { 
	BaseSymbol,
	SymbolTable,
	SymbolTableOptions,
} from "antlr4-c3";
import { PNamespaceSymbol } from "./PNamespaceSymbol"
import { PComponentSymbol } from "./PComponentSymbol"
import { PLibraryTable } from './PLibraryTable';
import { PUtils } from './PUtils';


const fakeEmptyDependencies : Set<SymbolTable> = new Set<SymbolTable>();

export class PSymbolTable extends SymbolTable 
{
	//protected imports : Set<string> = new Set<string>();
	protected importDict : Map<string, string> = new Map<string, string>();


	constructor(name: string, options: SymbolTableOptions)
	{
		super(name, options);
	}

	public getDependencies() : PLibraryTable[] 
	{ 
		let result : PLibraryTable[] = [];
		for( let lib of this.dependencies)
		{
			if(lib instanceof PLibraryTable)
				result.push(lib);
		} 

		return result;
	}
	public addImport(importPath: string, allMembers: boolean) 
	{ 
		if(allMembers)
		{
			for(let dependency of this.dependencies)
			{
				if(dependency instanceof PLibraryTable)
				{
					let result = dependency.resolveComponent(PComponentSymbol, importPath);
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
			}
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
		// Little hack so the super class doesn't try to check in the dependencies tables
		let savedDependencies = this.dependencies;
		this.dependencies = fakeEmptyDependencies;
		let result = super.resolveSync(name, localOnly);
		this.dependencies = savedDependencies;
		if(!result)
		{
			let fullName = this.ensureIsFullPath(name)
			if(!fullName)
				fullName = name;
			for(let dependency of savedDependencies)
			{
				result = dependency.symbolFromPath(fullName, ".");
				if(result)
					break;
			}
		}
		return result;
    }
}