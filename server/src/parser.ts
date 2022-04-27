import { parse } from 'java-ast'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import * as diagnostics from './diagnostics';
import { TextDocument } from 'vscode-languageserver';
import * as pStandards from './grammer/terms/preprocessingsnippets'
import * as log from './scripts/syslogs'
const childProcess = require('child_process');
const fs = require('fs')

// Tuple -> current Node, Parent Node
export let tokenArray: [ParseTree, ParseTree][] = new Array();
let _tokenCounter = -1

// Currently constructed AST after the last character change
export let ast: any

export function parseAST(processedText: string, textDocument: TextDocument) {
	ast = parse(processedText)
	tokenArray = []
	_tokenCounter = -1
	
	for(let i = 0; i < ast.childCount; i++){
		extractTokens(ast.children![i])
	}

	console.log("Break point here to obtain AST")
	log.writeLog("Parse Tree construction Successfully")
}

/**
 * Parses a line to extract each word and 
 * its start- and endPos within the parsed line
 * 
 * @param line Line to be mapped
 * @returns [word, startPos, endPos][]
 */
export function lineMap(line: string) : [string, number, number][]{
	let currentTempAST: [ParseTree][] = new Array()
	let tempCounter = -1

	//Extract tokens
	let currentTokens = parse(line)
	for (let i = 0; i < currentTokens.childCount; i++) {
		currentLineASTExtract(currentTokens.children![i])
	}

	let map : [string, number, number][] = new Array()
	let mapCount = 0
	//Cook map
	currentTempAST.forEach(function(word) {
		map[mapCount] = [word[0].text, line.indexOf(word[0].text), line.indexOf(word[0].text) + word[0].text.length]
		mapCount += 1
	})

	return map

	function currentLineASTExtract(gotOne: ParseTree){
		tempCounter += 1
		currentTempAST[tempCounter] = [gotOne]
		for(let j=0;j<gotOne.childCount;j++){
			currentLineASTExtract(gotOne.getChild(j))
		}
	}
}

function extractTokens(gotOne: ParseTree){
	for(let j = 0; j < gotOne.childCount; j++){
		if(gotOne.getChild(j).childCount == 0){
			_tokenCounter +=1
			tokenArray[_tokenCounter] = [gotOne.getChild(j),gotOne]
		}
		extractTokens(gotOne.getChild(j))
	}
}