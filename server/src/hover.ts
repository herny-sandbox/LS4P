import * as lsp from 'vscode-languageserver'
import * as server from './server'
const fs = require('fs');
import { Hover, MarkedString } from 'vscode-languageserver';
import * as parser from './parser'
import { errorNodeLine } from './sketch'
import * as log from './scripts/syslogs'

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
	console.log(`Error fetching Insights`)
}


export async function checkforHoverContents(textDocument: lsp.TextDocument): Promise<void>{

	server.connection.onHover(
		(params: lsp.TextDocumentPositionParams): lsp.Hover | null => {
			let hoverResult: lsp.Hover | null = null
			if(errorNodeLine.length == 0){
				hoverResult = scheduleHover(textDocument, params)
			} else {
				errorNodeLine.forEach(function(errorLine){
					hoverResult = scheduleHover(textDocument, params, errorLine)
				})
			}
			log.writeLog(`Hover Invoked`)
			return hoverResult
		}
	)
}

function scheduleHover(textDocument: lsp.TextDocument, params: lsp.TextDocumentPositionParams, errorLine: number = -10): lsp.Hover | null {
	if(errorLine - 1 != params.position.line){
		let text = textDocument.getText();
		let splitHover = text.split(`\n`)
		let currentLine = splitHover[params.position.line]
		let hover : Hover | null = null
		let hoverMap = parser.lineMap(currentLine)

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
		return hover
	} else {
		return null
	}
}