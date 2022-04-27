import * as server from './server'
import * as log from './scripts/syslogs'
import * as preprocessing from './preprocessing'
import { Definition } from 'vscode-languageserver'
import * as parser from './parser'
import * as javaSpecific from './grammer/terms/javaspecific'
import { ClassDeclarationContext, VariableDeclaratorIdContext, MethodDeclarationContext } from 'java-ast/dist/parser/JavaParser';
import * as sketch from './sketch'

// [string,string,number,number] => [type, name, line number, character number]
let foundDeclaration: [string,string,number,number][] = new Array();
let _foundDeclarationCount = 0

export function scheduleLookUpDefinition(receivedUri: string, lineNumber: number, charNumber: number): Definition | null  {
	let currentContent = server.latestChangesInTextDoc.getText()
	let splitDefine = currentContent.split(`\n`)
	let currentLine = splitDefine[lineNumber]
	let currentDefineMap = sketch.lineMap(currentLine)
	let adjustOffset = sketch.getLineOffset()
	let tokenArray = sketch.getTokenArray();

	tokenArray.forEach(function(token){
		if(token[1] instanceof ClassDeclarationContext){
			if(!(javaSpecific.TOP_LEVEL_KEYWORDS.indexOf(token[0].text) > -1)){
				foundDeclaration[_foundDeclarationCount] = [`class`, token[0].text, token[0].payload._line, token[0].payload._charPositionInLine]
				_foundDeclarationCount +=1
			}
		} else if(token[1] instanceof VariableDeclaratorIdContext){
			foundDeclaration[_foundDeclarationCount] = [`var`, token[0].text, token[0].payload._line, token[0].payload._charPositionInLine]
			_foundDeclarationCount +=1
		} else if(token[1] instanceof MethodDeclarationContext){
			// TODO: conflict in `_charPositionInLine` due to addition of `public` infront during preprocessing -> tabs should also be handled
			foundDeclaration[_foundDeclarationCount] = [`method`, token[0].text, token[0].payload._line, token[0].payload._charPositionInLine]
			_foundDeclarationCount +=1
		}
	})

	// Default Range value
	let finalDefinition: Definition | null = null
	currentDefineMap.forEach(function(word){
		// params.position.character -> can be of any character, even a character within a word
		if((word[1] <= charNumber) && (charNumber <= word[2])){
			foundDeclaration.forEach(function(delarationName){
				if(word[0] == delarationName[1]){

					let lineNumberJavaFile = delarationName[2]-adjustOffset;
					let diffLine : number = 0;
					let docUri : string = '';
					if (sketch.transformMap.get(lineNumberJavaFile)) {
						diffLine = sketch.transformMap.get(lineNumberJavaFile)!.lineNumber
						let docName =  sketch.transformMap.get(lineNumberJavaFile)!.fileName
						docUri = sketch.getInfo().uri+docName
					}

					let charOffset = sketch.getCharacterOffset(lineNumberJavaFile, delarationName[2])

					finalDefinition = {
						uri: docUri,
						range:{
							start: {
								line: diffLine-1,
								character: delarationName[3] - charOffset
							},
							end: {
								line: diffLine-1,
								character: delarationName[3] + word[0].length - charOffset
							}
						}
					}
				}
			})
		}
	})
	clearTempAST()
	return finalDefinition
}

function clearTempAST(){
	foundDeclaration = []
	_foundDeclarationCount = 0
}