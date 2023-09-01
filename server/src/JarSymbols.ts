import * as symbols from 'antlr4-c3'
import * as path from 'path';
import * as AdmZip from 'adm-zip';
import * as javaTools from 'java-class-tools'
//import * as JavaClassParser from 'java-class-parser';

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

let currentCompletionClass = `PApplet`
let completionConstantClass = `PConstants`

export interface ModuleInfo
{
	type : string,
	symbols : symbols.SymbolTable;
}

let modules : Map<string, ModuleInfo> = new Map<string, ModuleInfo>();
const reader = new javaTools.JavaClassFileReader();

export function ImportDefaultLibraries( table:symbols.SymbolTable )
{
	for(let _counter: number = 0; _counter < extractionModuleType.length; _counter++)
	{
		let name = extractionModuleType[_counter];
		let module = importModuleInfo("container/", "extractor/processing/", name);
		if(module)
		{
			table.addDependencies(module.symbols);
			modules.set("processing."+name, module);
		}
	}
	let module = importModuleInfo("customcontainer/", "", "custom");
	if(module)
	{
		table.addDependencies(module.symbols);
		modules.set("custom", module);
	}
}

function importModuleInfo(moduleDeclPath:string, classesRoute:string, modType:string) : ModuleInfo | undefined
{
	try 
	{  
		let filePath = containerPath + moduleDeclPath + modType + ".txt";
		let data = fs.readFileSync(filePath, 'utf-8')
		let tempSplit = data.split('\n');

		let symbTable : symbols.SymbolTable = new symbols.SymbolTable("processing."+modType, { allowDuplicateSymbols: true });
 
		for(let i : number=0; i < tempSplit.length; i++)
		{
			let classFileName : string = tempSplit[i];
			if(!classFileName.includes('$') && classFileName.includes('.class'))
			{
				let fullClassPath : string = `${containerPath}${classesRoute}${modType}/${classFileName}`;
				
				try
				{
					let className : string = classFileName.substring(0, classFileName.length-6);
					let ast : javaTools.JavaClassFile = reader.read(fullClassPath);
					AddClassSymbol(ast, className, symbTable);
				}
				catch(e)
				{
					console.error("Unable to load class symbols for: "+fullClassPath);
				}
			}
		}

		let module : ModuleInfo = { type: modType,  symbols: symbTable };
		return module;
	} 
	catch(e) 
	{

	}
	return;
}

function AddClassSymbol(classType: javaTools.JavaClassFile, className : string, symbTable : symbols.SymbolTable)
{
	let ext : symbols.ClassSymbol [] = [];
	let impl : Array<symbols.ClassSymbol | symbols.InterfaceSymbol> = new Array<symbols.ClassSymbol | symbols.InterfaceSymbol> ();

	const superClassName = getNameFromConstantPool(classType, classType.super_class);
	const thisClassName = getNameFromConstantPool(classType, classType.this_class);

	let classSymbol : symbols.ClassSymbol = new symbols.ClassSymbol(className, ext, impl);
	symbTable.addSymbol( classSymbol );

	let methods : javaTools.MethodInfo [] = classType.methods;
	let fields : javaTools.FieldInfo [] = classType.fields;

	for( let i=0; i < methods.length; i++ )
	{
		try
		{
			let methodName = getNameFromConstantPool(classType, methods[i].name_index);
			if(methodName=="<clinit>")
				continue;
			if(methodName=="<init>")
				methodName = className;
			const methodDescriptor = getNameFromConstantPool(classType, methods[i].descriptor_index );
			let returnTypeName = methodDescriptor.substring( methodDescriptor.indexOf(')')+1 );

			let returnType : symbols.Type = createDefaultType()
			typeDescriptorToSymbolType(returnTypeName, returnType, 0);
			let methodSymbol : symbols.MethodSymbol = new symbols.MethodSymbol(methodName, returnType );
			classSymbol.addSymbol( methodSymbol );
			let methodParamsStartIndex = methodDescriptor.indexOf('(')+1;
			let methodParamsEndIndex = methodDescriptor.indexOf(')');
			let methodParamsDescriptor = methodDescriptor.substring( methodParamsStartIndex, methodParamsEndIndex );
			if(methodParamsDescriptor.length > 0)
				buildParamsFromDescriptor(methodParamsDescriptor, methodSymbol);
		}
		catch(e)
		{
			console.error(`Unable to parse class ${className} method: ${i} `);
		}
	}
	
	for( let i=0; i < fields.length; i++ )
	{
		try
		{
			const fieldName = getNameFromConstantPool(classType, fields[i].name_index);
			const typeDescriptor = getNameFromConstantPool(classType, fields[i].descriptor_index );
			let symbolType : symbols.Type = createDefaultType();
			typeDescriptorToSymbolType(typeDescriptor, symbolType, 0);
			let fieldSymbol : symbols.FieldSymbol = new symbols.FieldSymbol(fieldName, null, symbolType);
			classSymbol.addSymbol( fieldSymbol );
		}
		catch(e)
		{
			console.error(`Unable to parse class ${className} field: ${i} `);
		}
	}

}

function getNameFromConstantPool(classType:any, index:number) : string
{
	const nameInConstantPool = classType.constant_pool[index];
	const name = String.fromCharCode.apply(null, nameInConstantPool.bytes);
	return name;
}

function typeDescriptorToSymbolType( fullDescr : string, result : symbols.Type, index : number = 0 ) : number
{
	let typeDescr = fullDescr[index];
	if(typeDescr == 'V')
	{
		result.name = "void";
		return index+1;
	}
	else if(typeDescr == 'B')
	{
		result.name = "byte";
		return index+1;
	}
	else if(typeDescr == 'C')
	{
		result.name = "char";
		return index+1;
	}
	else if(typeDescr == 'D')
	{
		result.name = "double";
		return index+1;
	}
	else if(typeDescr == 'F')
	{
		result.name = "float";
		return index+1;
	}
	else if(typeDescr == 'I')
	{
		result.name = "int";
		return index+1;
	}
	else if(typeDescr == 'J')
	{
		result.name = "long";
		return index+1;
	}
	else if(typeDescr == 'L')
	{
		let indexEnd = fullDescr.indexOf(';', index);
		let typeDescr = fullDescr.substring(index+1, indexEnd );
		let classType = typeDescr.replace(/\//g, ".");
		result.name = classType;
		result.kind = symbols.TypeKind.Class;
		result.reference = symbols.ReferenceKind.Reference;
		return indexEnd+1;
	}
	else if(typeDescr == '[')
	{
		let baseType : symbols.Type = createDefaultType();
		index = typeDescriptorToSymbolType(fullDescr, baseType, index+1);
		result.name = "Array";
		result.kind = symbols.TypeKind.Array;
		result.baseTypes = [baseType];
		result.reference = symbols.ReferenceKind.Reference;
		return index;
	}
	else if(typeDescr == 'S')
	{
		result.name = "short";
		return index+1;
	}
	else if(typeDescr == 'Z')
	{
		result.name = "boolean";
		return index+1;
	}
	return index;
}

function buildParamsFromDescriptor(methodParamsDescriptor: string, methodSymbol: symbols.MethodSymbol) 
{
	let symbolType : symbols.Type;
	let index : number=0;
	let length = methodParamsDescriptor.length;
	while(index < length)
	{
		symbolType = createDefaultType();
		index = typeDescriptorToSymbolType(methodParamsDescriptor, symbolType, index);
		methodSymbol.addSymbol( new symbols.ParameterSymbol("", null, symbolType) );
	}
}

function createDefaultType(typeName:string="") : symbols.Type
{
	return {  
		name : typeName,
		kind : symbols.TypeKind.Unknown,
		baseTypes : [],
		reference : symbols.ReferenceKind.Irrelevant
	};
}
export function GetClass(classPath: string): symbols.ClassSymbol | undefined 
{
	let lastIndex = classPath.lastIndexOf(".");
	let moduleName = classPath.substring(0, lastIndex);
	let className = classPath.substring(lastIndex+1, classPath.length);
	let moduleInfo = modules.get(moduleName);
	let result = moduleInfo?.symbols.resolveSync(className);
	if(result instanceof symbols.ClassSymbol)
		return result;
	return;
}

