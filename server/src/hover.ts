import * as log from './scripts/syslogs'
import * as lsp from 'vscode-languageserver'
import * as server from './server'
import * as sketch from './sketch'
import { Hover, MarkedString } from 'vscode-languageserver';
import * as symbols from 'antlr4-c3'
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

	let definition : symbols.BaseSymbol | undefined;
	//let definition : symbols.BaseSymbol | undefined = await lookUpSymbolDefinition(pdeInfo.symbols, line, pos);
	// Finds for the symbol (block or scope) that contains our searched identifier
	let symbolContainer : symbols.BaseSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, pos);
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
		definition = pdeInfo.refs?.findNodeSymbolDefinition(parseNode);
	
	let hover : Hover | null = null;

	if(definition)
	{
		hover = {
			contents: formatHoverContent(definition),
			range: parseUtils.calcRangeFromParseTree(parseNode)
		}
	}
	return hover;
}

export function scheduleHover(params: lsp.TextDocumentPositionParams, errorLine: number = -10): lsp.Hover | null 
{
	if(errorLine - 1 == params.position.line)
		return null;

	let currentContent = sketch.getPdeContentFromUri(params.textDocument.uri)
	if (!currentContent)
		return null;

	let splitHover = currentContent.split(`\n`);
	let currentLine = splitHover[params.position.line];
	let hover : Hover | null = null;
	let hoverMap = sketch.lineMap(currentLine);

	hoverMap.forEach(function(word){
		// params.position.character -> can be of any character, even a character within a word
		if((word[1] <= params.position.character) && (params.position.character <= word[2])){
			insightMap.forEach(function(value){
				if(value[0] == word[0]){
					hover = {
						contents:MarkedString.fromPlainText(value[1]),
						range: {
							start: {
								line: params.position.line,
								character: word[1]
							},
							end: {
								line: params.position.line,
								character: word[2]
							}
						}
					}
				}
			})
		}
	})
	return hover;
}

function formatHoverContent(baseSymbol : symbols.BaseSymbol ) : string
{
	let result = "";
	if(baseSymbol instanceof psymb.PClassSymbol)
		result += "(class) ";
	if(baseSymbol instanceof symbols.MethodSymbol)
		result += "(function) ";
	if(baseSymbol instanceof symbols.FieldSymbol)
		result += "(field) ";
	if(baseSymbol instanceof symbols.VariableSymbol)
		result += "(var) ";

	if(baseSymbol instanceof symbols.MethodSymbol)
		result += `[${baseSymbol.returnType?baseSymbol.returnType.name:"void"}] `;
	if(baseSymbol instanceof symbols.VariableSymbol)
		result += `[${baseSymbol.type?baseSymbol.type.name:"<unknown>"}] `;

	result += baseSymbol.name;

	if(baseSymbol instanceof symbols.MethodSymbol)
	{
		result += "(";
		let params = baseSymbol.getAllSymbolsSync(ParameterSymbol_1.ParameterSymbol, true);
		for(let i = 0; i < params.length; i++)
		{
			if(i>0)
				result += ", ";
			let param = params[i];
			if( param instanceof symbols.ParameterSymbol )
				result += param.type?.name;
		}
		result += ")";
	}
	return result;
}