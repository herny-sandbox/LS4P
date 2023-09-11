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

export function scheduleHoverInfo(pdeName: string, line: number, pos : number): lsp.Hover | null
{
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return null;

	let definition : symb.BaseSymbol | undefined;
	//let definition : symbols.BaseSymbol | undefined = await lookUpSymbolDefinition(pdeInfo.symbols, line, pos);
	// Finds for the symbol (block or scope) that contains our searched identifier
	let symbolContainer : symb.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!symbolContainer || !symbolContainer.context)
		return null;
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ast.TerminalNode | null = parseUtils.findIdentifierAtPosition(symbolContainer.context, line, pos);
	if(!parseNode)
		return null;
	
	// We now filter out if the terminal node matches the symbolContainer
	// (means is also a declaration of some kind since we only record declarations)
	if(symbolContainer.context === parseNode.parent)
		definition = symbolContainer;
	else
		definition = pdeInfo.findNodeSymbolDefinition(parseNode);
	
	let contextType = pdeInfo.findNodeContextTypeDefinition(parseNode);

	let hover : Hover | null = null;

	let callContext : psymb.CallContext = new psymb.CallContext();
	callContext.callerType = contextType;
	callContext.callerSymbol = definition;

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
	else if(baseSymbol instanceof symb.MethodSymbol)
		result += "(function) ";
	else if(baseSymbol instanceof symb.FieldSymbol)
		result += "(field) ";
	else if(baseSymbol instanceof symb.VariableSymbol)
		result += "(var) ";
	
	if(baseSymbol instanceof symb.MethodSymbol)
	{
		if(baseSymbol.returnType)
		{
			if(baseSymbol.returnType.kind == symb.TypeKind.Alias)
				result +=  extractClassName(parseUtils.convertAliasType(baseSymbol.returnType, callContext).name) + " ";
			else
				result += typeTypeToString(baseSymbol.returnType) + " ";
		} 
	}
	if(baseSymbol instanceof symb.VariableSymbol)
		result += typeTypeToString(baseSymbol.type) + " ";

	result += baseSymbol.name;

	if(baseSymbol instanceof symb.MethodSymbol)
	{
		result += "(";
		let params = baseSymbol.getAllSymbolsSync(ParameterSymbol_1.ParameterSymbol, true);
		for(let i = 0; i < params.length; i++)
		{
			if(i>0)
				result += ", ";
			let param = params[i];
			if( param instanceof symb.ParameterSymbol && param.type)
			{
				if(param.type.kind == symb.TypeKind.Alias)
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

function typeTypeToString(type: symb.Type | undefined) : string
{
	if(!type)
		return "";
	
	if(type.kind == symb.TypeKind.Array)
		return typeTypeToString(type.baseTypes[0]) + "[]";
	if(type.kind == symb.TypeKind.Alias)
	{
		if(type.baseTypes.length==1)
			return typeTypeToString(type.baseTypes[0]);
		else 
			return type.name;
	}
		

	let result = extractClassName(type.name);
	if(type.baseTypes.length > 0)
	{
		result += '{';
		for(let i=0; i<type.baseTypes.length;i++)
		{
			if(i>0)
				result += ", ";
			result += typeTypeToString(type.baseTypes[i]);
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