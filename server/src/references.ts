import * as server from './server'
import * as sketch from './sketch'
import { Location, ReferenceParams } from 'vscode-languageserver'

export function scheduleLookUpReference(_referenceParams: ReferenceParams): Location[] | null
{
	let resultant: Location[] | null
	let currentContent = sketch.getPdeContentFromUri(_referenceParams.textDocument.uri)
	if (!currentContent) {
		return null
	}
	let splitDefine = currentContent.split(`\n`)
	let currentLine = splitDefine[_referenceParams.position.line]
	let currentReferenceMap = sketch.lineMap(currentLine)
	let tokenArray = sketch.getTokenArray();
	let adjustOffset = sketch.getLineOffset()

	let multipleTokenOccurenceLocations: Location[] = new Array()
	let _multipleTokenCount = 0

	// let lineAdjustment = 0

	// if(preprocessing.methodPattern.exec(currentLine)){
	// 	lineAdjustment = 6 // "public " -> 6 characters added during pre-processing
	// }

	currentReferenceMap.forEach(function(word){
		// params.position.character -> can be of any character, even a character within a word
		if((word[1] <= _referenceParams.position.character) && (_referenceParams.position.character <= word[2]))
		{
			tokenArray.forEach(function(tokenPair)
			{
				if(tokenPair[0].text == word[0])
				{
					let lineNumberJavaFile = word[1]-adjustOffset
					let refLine : number = 0;
					let docUri : string = '';
					let transformMap = sketch.getTransformationMap()
					if (transformMap.get(lineNumberJavaFile)) 
					{
						refLine = transformMap.get(lineNumberJavaFile)!.lineNumber
						let docName =  transformMap.get(lineNumberJavaFile)!.fileName
						docUri = sketch.getInfo().uri+docName
					}

					let charOffset = sketch.getCharacterOffset(lineNumberJavaFile, word[1])

					multipleTokenOccurenceLocations[_multipleTokenCount] = {
						uri: docUri,
						range: {
							start: {
								line: refLine-1,
								character: word[2] - charOffset
							},
							end: {
								line: refLine-1,
								character: word[2] + word[0].length - charOffset
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