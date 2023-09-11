import * as symb from 'antlr4-c3'
import * as path from 'path';
import * as AdmZip from 'adm-zip';
import * as javaTools from 'java-class-tools'
//import * as JavaClassParser from 'java-class-parser';
import * as psymb from "./antlr-sym"
import * as antlr from 'antlr4ts';
import { ClassReader } from "@xmcl/asm"
import { ClassBuilderFromJava } from "./symbolsFromJava"

const fs = require('fs');

const containerPath = `${__dirname}/processing/`;

let extractionModuleType = [
	'core',
	'awt',
	'data',
	'event',
	'javafx',
	'opengl'
]

export interface ModuleInfo
{
	type : string,
	symbols : symb.SymbolTable;
}

let modulesMap : Map<string, ModuleInfo> = new Map<string, ModuleInfo>();
const reader = new javaTools.JavaClassFileReader();

export function loadDefaultLibraries()
{
	for(let i=0; i <50000; i++);

	let module = importModuleInfo("customcontainer/", "", "custom");
	if(module)
		modulesMap.set("java.lang", module);

	for(let _counter: number = 0; _counter < extractionModuleType.length; _counter++)
	{
		let name = extractionModuleType[_counter];
		let module = importModuleInfo("container/", "extractor/processing/", name);
		if(module)
			modulesMap.set("processing."+name, module);
	}
}

export function getModuleSymbols(moduleName: string): symb.SymbolTable | undefined 
{
	let moduleInfo = modulesMap.get(moduleName);
	return moduleInfo?.symbols;
}

export function tryAddDependency(mainTable : psymb.PSymbolTable, moduleName : string)
{
	let module = getModuleSymbols(moduleName);
	if(module)
		mainTable.addDependencies(module);
	mainTable.addImport(moduleName);
}

export function GetClass(classPath: string): psymb.PClassSymbol | undefined 
{
	let lastIndex = classPath.lastIndexOf(psymb.PNamespaceSymbol.delimiter);
	let moduleName = classPath.substring(0, lastIndex);
	let className = classPath.substring(lastIndex+1, classPath.length);
	let moduleInfo = modulesMap.get(moduleName);
	let result = moduleInfo?.symbols.resolveSync(className);
	if(result instanceof psymb.PClassSymbol)
		return result;
	return;
}

function importModuleInfo(moduleDeclPath:string, classesRoute:string, modType:string) : ModuleInfo | undefined
{
	try 
	{   
		let filePath = containerPath + moduleDeclPath + modType + ".txt";
		let data = fs.readFileSync(filePath, 'utf-8')
		let tempSplit = data.split('\n');

		let libTable : psymb.PLibraryTable = new psymb.PLibraryTable("", { allowDuplicateSymbols: true });
 
		for(let i : number=0; i < tempSplit.length; i++)
		{
			let classFileName : string = tempSplit[i];
			if(!classFileName.includes('$') && classFileName.includes('.class'))
			{
				let fullClassPath : string = `${containerPath}${classesRoute}${modType}/${classFileName}`;
				
				try
				{
					let className : string = classFileName.substring(0, classFileName.length-6);

					const visitor = new ClassBuilderFromJava(libTable, className);
					const classData: Buffer = fs.readFileSync(fullClassPath);
					new ClassReader(classData).accept(visitor);
				}
				catch(e)
				{
					console.error("Unable to load class symbols for: "+fullClassPath);
				}
			}
		}

		let module : ModuleInfo = { type: modType,  symbols: libTable };
		return module;
	} 
	catch(e) 
	{

	}
	return;
}

