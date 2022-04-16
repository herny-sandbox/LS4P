import { Location, ReferenceParams } from 'vscode-languageserver'
import * as server from './server'
import * as preprocessing from './preprocessing'
import * as parser from './parser'
import * as sketch from './sketch'

export function scheduleLookUpReference(_referenceParams: ReferenceParams): Location[] | null{
	let resultant: Location[] | null
	let currentContent = server.latestChangesInTextDoc.getText()
	let splitDefine = currentContent.split(`\n`)
	let currentLine = splitDefine[_referenceParams.position.line]
	let currentReferenceMap = parser.lineMap(currentLine)

	let adjustOffset = preprocessing.getLineOffset()

	let multipleTokenOccurenceLocations: Location[] = new Array()
	let _multipleTokenCount = 0

	// let lineAdjustment = 0

	// if(preprocessing.methodPattern.exec(currentLine)){
	// 	lineAdjustment = 6 // "public " -> 6 characters added during pre-processing
	// }

	currentReferenceMap.forEach(function(word){
		// params.position.character -> can be of any character, even a character within a word
		if((word[1] <= _referenceParams.position.character) && (_referenceParams.position.character <= word[2])){
			parser.tokenArray.forEach(function(token){
				if(token[0].text == word[0]){
					let lineNumberJavaFile = token[0].payload._line-adjustOffset
					let refLine : number = 0;
					let docUri : string = '';
					if (sketch.transformMap.get(lineNumberJavaFile)) {
						refLine = sketch.transformMap.get(lineNumberJavaFile)!.lineNumber
						let docName =  sketch.transformMap.get(lineNumberJavaFile)!.fileName
						docUri = sketch.uri+docName
					}
					multipleTokenOccurenceLocations[_multipleTokenCount] = {
						uri: docUri,
						range: {
							start: {
								line: refLine-1,
								character: token[0].payload._charPositionInLine
							},
							end: {
								line: refLine-1,
								character: token[0].payload._charPositionInLine + word[0].length
							}
						}
					}
					_multipleTokenCount += 1
				}
			})
		}
	})

	if(multipleTokenOccurenceLocations.length > 0){
		resultant = multipleTokenOccurenceLocations
	} else {
		resultant = null
	}
	return resultant
}