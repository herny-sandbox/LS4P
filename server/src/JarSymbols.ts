import * as symb from 'antlr4-c3'
import * as path from 'path';
import * as AdmZip from 'adm-zip';
import * as javaTools from 'java-class-tools'
//import * as JavaClassParser from 'java-class-parser';
import * as psymb from "./antlr-sym"

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
	let lastIndex = classPath.lastIndexOf(".");
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
					let ast : javaTools.JavaClassFile = reader.read(fullClassPath);
					AddClassSymbol(ast, className, libTable);
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

function AddClassSymbol(classType: javaTools.JavaClassFile, className : string, libTable : psymb.PLibraryTable)
{
	let ext : symb.Type | undefined;
	let impl : symb.Type [] = [];

	if(classType.super_class!=0)
	{
		const superClassName = getNameFromConstantClassInfo(classType, classType.super_class);
		ext = psymb.PUtils.createClassType(superClassName);
		//console.log(`class: ${className}:${superClassName}`)
	}
	for(let i=0; i < classType.interfaces_count; i++)
	{
		const superInterfName = getNameFromConstantClassInfo(classType, classType.interfaces[i]);
		impl.push( psymb.PUtils.createInterfaceType(superInterfName) );
	}
	const thisClassName = getNameFromConstantClassInfo(classType, classType.this_class);
	//console.log(`class: ${className}:${thisClassName}`)
	let genericSignature : string | undefined; 
	for(let i=0; i < classType.attributes_count; i++)
	{
		genericSignature = getGenericSignatureFromConstantPool(classType, classType.attributes[i]);
		if(genericSignature)
			break;
	}
	let classSymbol : psymb.PClassSymbol;
	let genericParams : symb.Type[] = [];

	if(genericSignature)
	{
		//console.log(`class: ${className}:${genericSignature}`)
		let index = buildGenericParams(genericSignature, 0, genericParams);
		if(ext)
		{
			let superGenericParams : symb.Type[] = [];
			if(genericSignature[index] == 'L')
				index += ext.name.length+1;
			buildGenericParams(genericSignature, index, superGenericParams);
			ext.baseTypes = superGenericParams;
		}
	}

	classSymbol = new psymb.PClassSymbol(className, ext, impl, genericParams);
	libTable.getOrCreateNamespaceFor(thisClassName, "/").addSymbol(classSymbol);

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

			let returnType : symb.Type = createDefaultType()
			typeDescriptorToSymbolType(returnTypeName, returnType, 0);
			let methodSymbol : symb.MethodSymbol = new symb.MethodSymbol(methodName, returnType );
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
			let symbolType : symb.Type = createDefaultType();
			typeDescriptorToSymbolType(typeDescriptor, symbolType, 0);
			let fieldSymbol : symb.FieldSymbol = new symb.FieldSymbol(fieldName, null, symbolType);
			classSymbol.addSymbol( fieldSymbol );
		}
		catch(e)
		{
			console.error(`Unable to parse class ${className} field: ${i} `);
		}
	}

}

function getNameFromConstantClassInfo(classType:any, index:number) : string
{
	const nameInConstantPool = classType.constant_pool[index];
	const name = getNameFromConstantPool(classType, nameInConstantPool.name_index);
	return name;
}

function getNameFromConstantPool(classType:any, index:number) : string
{
	const nameInConstantPool = classType.constant_pool[index];
	const name = String.fromCharCode.apply(null, nameInConstantPool.bytes);
	return name;
}

function getGenericSignatureFromConstantPool(classType:any, signatureAttrib:any) : string | undefined
{
	if( !signatureAttrib.signature_index )
		return;
	const nameInConstantPool = classType.constant_pool[signatureAttrib.signature_index];
	const name = String.fromCharCode.apply(null, nameInConstantPool.bytes);
	return name;
}

function typeDescriptorToSymbolType( fullDescr : string, result : symb.Type, index : number = 0 ) : number
{
	let typeDescr = fullDescr[index];
	if(typeDescr == 'V')
	{
		result.name = "void";
		result.kind = symb.TypeKind.Unknown;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'B')
	{
		result.name = "byte";
		result.kind = symb.TypeKind.Char;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'C')
	{
		result.name = "char";
		result.kind = symb.TypeKind.Char;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'D')
	{
		result.name = "double";
		result.kind = symb.TypeKind.Float;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'F')
	{
		result.name = "float";
		result.kind = symb.TypeKind.Float;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'I')
	{
		result.name = "int";
		result.kind = symb.TypeKind.Integer;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'J')
	{
		result.name = "long";
		result.kind = symb.TypeKind.Integer;
		result.reference = symb.ReferenceKind.Instance;
		return index+1;
	}
	else if(typeDescr == 'L')
	{
		let indexEnd = fullDescr.indexOf(';', index);
		let typeDescr = fullDescr.substring(index+1, indexEnd );
		let classType = typeDescr.replace(/\//g, ".");
		result.name = classType;
		result.kind = symb.TypeKind.Class;
		result.reference = symb.ReferenceKind.Reference;
		return indexEnd+1;
	}
	else if(typeDescr == '[')
	{
		let baseType : symb.Type = createDefaultType();
		index = typeDescriptorToSymbolType(fullDescr, baseType, index+1);
		result.name = "Array";
		result.kind = symb.TypeKind.Array;
		result.baseTypes = [baseType];
		result.reference = symb.ReferenceKind.Reference;
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

function buildGenericParams(genericParamsDescr: string, index:number, result: symb.Type[]) : number
{
	let typeDescr = genericParamsDescr[index];
	if(typeDescr != '<')
		return index;
	index++;
	let indexEnd = genericParamsDescr.indexOf('>', index);
	while(index < indexEnd)
	{
		let baseTypes : symb.Type[] = [];
		let genericType : symb.Type = createDefaultType();
		let genDescrName : string;

		let indexSep = genericParamsDescr.indexOf(':', index);
		if(indexSep >= 0 )
		{
			let baseType : symb.Type = createDefaultType();
			genDescrName = genericParamsDescr.substring(index, indexSep );
			index = typeDescriptorToSymbolType(genericParamsDescr, baseType, indexSep+1);
			baseTypes.push(baseType);
		}
		else
		{
			indexSep = genericParamsDescr.indexOf(';', index);
			genDescrName = genericParamsDescr.substring(index+1, indexSep );
			index = indexSep+1;
		}
		genericType.name = genDescrName;
		genericType.baseTypes = baseTypes;
		genericType.kind = symb.TypeKind.Alias;
		genericType.reference = symb.ReferenceKind.Irrelevant;

		result.push(genericType);
	}
	return indexEnd+1;
}

function buildParamsFromDescriptor(methodParamsDescriptor: string, methodSymbol: symb.MethodSymbol) 
{
	let symbolType : symb.Type;
	let index : number=0;
	let length = methodParamsDescriptor.length;
	while(index < length)
	{
		symbolType = createDefaultType();
		index = typeDescriptorToSymbolType(methodParamsDescriptor, symbolType, index);
		methodSymbol.addSymbol( new symb.ParameterSymbol("", null, symbolType) );
	}
}

function createDefaultType(typeName:string="") : symb.Type
{
	return {  
		name : typeName,
		kind : symb.TypeKind.Unknown,
		baseTypes : [],
		reference : symb.ReferenceKind.Irrelevant
	};
}


