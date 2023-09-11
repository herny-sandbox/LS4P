import { 
	Type, 
	ReferenceKind, 
	BaseSymbol,
	SymbolTable,
	ScopedSymbol,
	SymbolTableOptions,
	SymbolConstructor,
	IScopedSymbol
} from "antlr4-c3";
import { PNamespaceSymbol } from "./PNamespaceSymbol"
import { PClassSymbol } from "./PClassSymbol"
import { PLibraryTable } from './PLibraryTable';
const PClassSymbol_1 = require("./PClassSymbol");

const fakeEmptyDependencies : Set<SymbolTable> = new Set<SymbolTable>();
export class PSymbolTable extends SymbolTable 
{
	protected imports : Set<string> = new Set<string>();
	protected importDict : Map<string, string> | null = null;

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
	public addImport(importPath: string) { this.imports.add(importPath); }

	getImportShortcut(fullPath : string) : string | undefined
	{
		for(let importPath of this.imports)
		{
			if( fullPath.startsWith(importPath) )
				return fullPath.substring(importPath.length+1);
		}
	}

	public ensureIsFullPath(name: string) : string
	{
		if(this.importDict==null)
			this.rebuildImportDict();

		let dotIndex = name.lastIndexOf(PNamespaceSymbol.delimiter);
		if(dotIndex>=0)
			return name;
		return this.importDict?.get(name)??name;
	}

	rebuildImportDict()
	{
		this.importDict = new Map<string, string>();

		for(let dependency of this.dependencies)
		{
			let result = dependency.getAllSymbolsSync(PClassSymbol_1.PClassSymbol, false);
			for(let classSymbol of result)
			{
				if(classSymbol instanceof ScopedSymbol)
				{
					let fullName = classSymbol.qualifiedName(PNamespaceSymbol.delimiter, true, false);
					let importShortcut = this.getImportShortcut(fullName);
					if(importShortcut)
						this.importDict.set(importShortcut, fullName);
				}
			}
		}
	}

    resolveSync(name:string, localOnly = false) : BaseSymbol | undefined
	{
		if(this.importDict==null)
			this.rebuildImportDict();

		// Little hack so the super class doesn't try to check in the dependencies tables
		let savedDependencies = this.dependencies;
		this.dependencies = fakeEmptyDependencies;
		let result = super.resolveSync(name, localOnly);
		this.dependencies = savedDependencies;
		if(!result)
		{
			let fullName = this.importDict?.get(name)
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