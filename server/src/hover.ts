import * as log from './scripts/syslogs'
import * as lsp from 'vscode-languageserver'
import * as server from './server'
import * as sketch from './sketch'
import { Hover, MarkedString, MarkupContent } from 'vscode-languageserver';
import * as symb from 'antlr4-c3'
import * as parseUtils from './astutils'
import * as ast from 'antlr4ts/tree'
import * as psymb from "./antlr-sym"


const fs = require('fs');
const ParameterSymbol_1 = require("antlr4-c3");

// This contains Insights for keywords - used in `Hover for Insights`
export let insightMap: [string,string][] = new Array();
let _insightCounter = 0

// Regular expression used to strip out the html tags from the description
const startardTagRegex = /<[/]*\w+>/g
const shortHandedRegex = /<\w+[ ]*[/]+>/g

try{
	let data = fs.readFileSync(`${__dirname}/processing/insightscontainer/insightlist.txt`, 'utf-8')
	let inisghtSpitMap = data.split('\n')
	inisghtSpitMap.forEach(function(value: string){
		if(value.includes(`.xml`)){
			let tempfileRead = fs.readFileSync(`${__dirname}/processing/lspinsights/${value}`, 'utf-8') as string
			let mainDescription: string
			try{
				mainDescription = (tempfileRead.split("<description><![CDATA[")[1]).split("]]></description>")[0]
				mainDescription = mainDescription.replace(startardTagRegex,``)
				mainDescription = mainDescription.replace(shortHandedRegex,``)
			} catch(e){
				mainDescription = "Unable to find insights"
			}
			if(value.includes(`_`)){
				let tempKey = value.substring(0,value.length-4).split(`_`)
				insightMap[_insightCounter] = [tempKey[1], `${tempKey[0]} - ${mainDescription}` as string]
			} else {
				insightMap[_insightCounter] = [value.substring(0,value.length-4), `${mainDescription}`]
			}
			_insightCounter += 1
		}
	})
	_insightCounter = 0
} catch(e) {
	log.write(`During fetching Insights`, log.severity.ERROR)
	log.write(e, log.severity.ERROR)
}

export function scheduleHoverInfo(pdeInfo: sketch.PdeContentInfo, line: number, pos : number): lsp.Hover | null
{
	if( !pdeInfo.syntaxTokens)
		return null;

	let definition : symb.BaseSymbol | undefined;
	//let definition : symbols.BaseSymbol | undefined = await lookUpSymbolDefinition(pdeInfo.symbols, line, pos);
	// Finds for the symbol (block or scope) that contains our searched identifier
	let symbolContainer : symb.BaseSymbol | undefined =  parseUtils.findLeafSymbolAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!symbolContainer || !symbolContainer.context)
		return null;
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ast.TerminalNode | null = parseUtils.findIdentifierAtPosition(symbolContainer.context, line, pos);
	if(!parseNode)
		return null;
	
	let accessByReference : boolean = false;
	// We now filter out if the terminal node matches the symbolContainer
	// (means is also a declaration of some kind since we only record declarations)
	if(symbolContainer.context === parseNode.parent)
		definition = symbolContainer;
	else
	{
		let qualifiedName = pdeInfo.findNodeSymbolDefinitionName(parseNode);
		if(qualifiedName)
		{
			accessByReference = qualifiedName.indexOf('#') >= 0;
			definition = pdeInfo.findSymbol(qualifiedName);
		}
	}
	
	let contextIType = pdeInfo.findNodeContextTypeDefinition(parseNode);

	let hover : Hover | null = null;
	let contextSymbol : symb.ScopedSymbol | undefined;

	if(definition instanceof symb.ScopedSymbol)
		contextSymbol = definition;

	let contextType : psymb.PType | undefined;
	if(contextIType)
		contextType = psymb.PType.createFromIType(contextIType);


	let callContext : psymb.CallContext = new psymb.CallContext(contextType, contextSymbol);

	if(definition)
	{
		hover = {
			contents: formatHoverContent(definition, callContext),
			range: parseUtils.calcRangeFromParseTree(parseNode)
		}
	}
	return hover;
}

function formatHoverContent(baseSymbol : symb.BaseSymbol, callContext : psymb.CallContext ) : MarkupContent
{
	let result = "";
	if(baseSymbol instanceof psymb.PClassSymbol)
		result += "(class) ";
	else if(baseSymbol instanceof psymb.PMethodSymbol)
		result += "(function) ";
	else if(baseSymbol instanceof psymb.PFieldSymbol)
		result += "(field) ";
	else if(baseSymbol instanceof psymb.PVariableSymbol)
		result += "(var) ";
	
	if(baseSymbol instanceof psymb.PMethodSymbol)
	{
		if(baseSymbol.returnType)
		{
			if(baseSymbol.returnType.typeKind == psymb.PTypeKind.Generic)
				result +=  extractClassName(parseUtils.convertAliasType(baseSymbol.returnType, callContext).name) + " ";
			else
				result += typeTypeToString(baseSymbol.returnType) + " ";
		} 
	}
	if(baseSymbol instanceof psymb.PVariableSymbol)
		result += typeTypeToString(baseSymbol.type) + " ";

	if(baseSymbol instanceof psymb.PMethodSymbol)
		result += psymb.PUtils.extractMethodName(baseSymbol.name);
	else
		result += baseSymbol.name;

	if(baseSymbol instanceof psymb.PVariableSymbol && baseSymbol.value != null )
		result += " = " + baseSymbol.value;
	
	if(baseSymbol instanceof psymb.PMethodSymbol)
	{
		result += "(";
		let params = baseSymbol.getAllSymbolsSync(psymb.PParameterSymbol, true);
		for(let i = 0; i < params.length; i++)
		{
			if(i>0)
				result += ", ";
			let param = params[i];
			if( param instanceof psymb.PParameterSymbol)
			{
				if(param.type.typeKind == psymb.PTypeKind.Generic)
					result +=  extractClassName(parseUtils.convertAliasType(param.type, callContext).name);
				else
					result += typeTypeToString(param.type);
			}
		}
		result += ")";
	}

	let markupResult = {
		kind : lsp.MarkupKind.Markdown,
		value : result
	};
	return markupResult;
}

function typeTypeToString(type: psymb.PType | undefined) : string
{
	if(!type)
		return "";
	
	if(type.typeKind == psymb.PTypeKind.Array)
		return typeTypeToString(type.arrayType) + "[]";
	if(type.typeKind == psymb.PTypeKind.Generic)
	{
		if(type.genericTypes.length==1)
			return typeTypeToString(type.genericTypes[0]);
		else 
			return type.name;
	}
		

	let result = extractClassName(type.name);
	if(type.genericTypes.length > 0)
	{
		result += '{';
		for(let i=0; i<type.genericTypes.length;i++)
		{
			if(i>0)
				result += ", ";
			result += typeTypeToString(type.genericTypes[i]);
		}
		result += '}';
	}
	return result;
}

function extractClassName(fullName:string) : string
{
	let lastIndex = fullName.lastIndexOf(psymb.PNamespaceSymbol.delimiter);
	return fullName.substring(lastIndex+1);
}