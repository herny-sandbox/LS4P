import * as symb from 'antlr4-c3'
import * as psymb from "./antlr-sym"
import { ClassReader } from "@xmcl/asm"
import { JavaClassVisitor } from "./javaClassVisitor"

import * as path from 'path';

const fs = require('fs');
const AdmZip = require('adm-zip');

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
export let libTable : psymb.PLibraryTable = new psymb.PLibraryTable("", { allowDuplicateSymbols: true});
export let processingImports : Set<string> = new Set<string>();

export function loadDefaultLibraries()
{
	loadDefaultJavaSymbolsFile("ct.sym");

	importModuleInfo("customcontainer/", "", "custom");

	for(let _counter: number = 0; _counter < extractionModuleType.length; _counter++)
		importModuleInfo("container/", "extractor/processing/", extractionModuleType[_counter]);
}

function importModuleInfo(moduleDeclPath:string, classesRoute:string, modType:string) : ModuleInfo | undefined
{
	try 
	{   
		let filePath = containerPath + moduleDeclPath + modType + ".txt";
		let data = fs.readFileSync(filePath, 'utf-8')
		let tempSplit = data.split('\n');

 
		for(let i : number=0; i < tempSplit.length; i++)
		{
			let classFileName : string = tempSplit[i];
			if( classFileName.includes('.class') )
			{
				let fullClassPath : string = `${containerPath}${classesRoute}${modType}/${classFileName}`;
				
				try
				{
					let className : string = classFileName.substring(classFileName.lastIndexOf('$')+1, classFileName.lastIndexOf('.'));

					const visitor = new JavaClassVisitor(libTable, className);
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

export function loadJarsFromDirectory(directoryPath: string)
{
	  // Read the contents of the directory
	let fileNames = fs.readdirSync(directoryPath);
	for(let fileName of fileNames)
	{
		if (fileName.endsWith('.jar') )
		  	loadJarFile(directoryPath+fileName);
	}
}

function loadJarFile(filename:string)
{
	try 
	{
        // Create an instance of AdmZip
        const zip = new AdmZip(filename);

        // Get the entries (files and directories) in the zip archive
        const zipEntries = zip.getEntries();
        // Process each entry in the zip archive
        for (const entry of zipEntries) 
		{
            if (entry.isDirectory)
                continue;
            if(!entry.name || entry.name.length == 0)
                continue;

			if (!entry.name.endsWith('.class') )
				continue;
			
			let fullName = entry.entryName;
			fullName = fullName.substring(0, fullName.length-6);

			let packageEndIndex = fullName.lastIndexOf('/');

			let packageName = fullName.substring(0, packageEndIndex);
			packageName = packageName.replace(/\//g, psymb.PNamespaceSymbol.delimiter);

			let classFileName = fullName.substring(packageEndIndex+1);
			let className : string = classFileName.substring(classFileName.indexOf('$')+1);

			processingImports.add(packageName);
			
			const fileContent : Buffer = entry.getData();
			const visitor = new JavaClassVisitor(libTable, className);
			try {
				new ClassReader(fileContent).accept(visitor);
			} catch (error) {
				console.error(`Error reading Java Jar class symbol: ${error} (${className})`);
			}
		}
		
    } catch (error) {
        console.error(`Error reading zip file: ${error} for ${filename}`);
    }
}

export function loadDefaultJavaSymbolsFile(filename:string)
{
	loadJavaSymbolsFile(containerPath + filename)
}

export function loadJavaSymbolsFile(filename:string)
{
	let filePath = filename;
	let classMap : Map<string, Buffer> = new Map<string, Buffer>();
	let className : string;

	try {
        // Create an instance of AdmZip
        const zip = new AdmZip(filePath);

        // Get the entries (files and directories) in the zip archive
        const zipEntries = zip.getEntries();

        // Process each entry in the zip archive
        for (const entry of zipEntries) 
		{
            if (entry.isDirectory)
                continue;
            if(!entry.name || entry.name.length == 0)
                continue;

            let versionMarker = entry.entryName.indexOf('/');
            let moduleMarker = entry.entryName.indexOf('/', versionMarker+1);
            let classMarker = entry.entryName.lastIndexOf('/');

            let moduleName = entry.entryName.substring(versionMarker+1, moduleMarker);
            let packageName = entry.entryName.substring(moduleMarker+1, classMarker);
            let className = entry.entryName.substring(classMarker+1);
 
			packageName = packageName.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			const fileContent : Buffer = entry.getData();//.toString('utf-8');
			let fullname = `${packageName}.${className}`;
			classMap.set(fullname, fileContent);
		}
		let i:number=0;
		for(let [key, buffer] of classMap)
		{
			let fullName = key;
			if(key.endsWith(".sig"))
				fullName = fullName.substring(0, fullName.length-4);
			let classFileName = fullName.substring(fullName.lastIndexOf('.')+1);
			className = classFileName.substring(classFileName.indexOf('$')+1);

			const visitor = new JavaClassVisitor(libTable, className);
			try
			{
				new ClassReader(buffer).accept(visitor);
			} catch (error) {
				console.error(`Error reading Java class symbol: ${error} (${className})`);
			}
			i++;
		}
		console.log(`found ${i} elements`);
		
    } catch (error) {
        console.error(`Error reading java symbol file: ${error} for ${filename} (${className})`);
    }
}
