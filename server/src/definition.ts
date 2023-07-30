import * as server from './server'
import * as sketch from './sketch'
import * as javaSpecific from './grammer/terms/javaspecific'
import { Definition } from 'vscode-languageserver'
import { ClassDeclarationContext, VariableDeclaratorIdContext, MethodDeclarationContext } from 'java-ast/dist/parser/JavaParser';
import { ParserRuleContext, Token } from 'antlr4ts';

// [string,string,number,number] => [type, name, line number, character number]
let foundDeclaration: [string,string,number,number][] = new Array();
let _foundDeclarationCount = 0

export function scheduleLookUpDefinition(receivedUri: string, lineNumber: number, charNumber: number): Definition | null  {
	let currentContent = sketch.getTabContent(receivedUri)
	if (!currentContent) {
		return null
	}
	let splitDefine = currentContent.split(`\n`)
	let currentLine = splitDefine[lineNumber]
	let currentDefineMap = sketch.lineMap(currentLine)
	let adjustOffset = sketch.getLineOffset()
	let tokenArray = sketch.getTokenArray();

	tokenArray.forEach(function(tokenPair)
	{
		if( tokenPair[0] instanceof ParserRuleContext)
		{
			const token: Token = (tokenPair[0] as ParserRuleContext).start;

			if(tokenPair[1] instanceof ClassDeclarationContext)
			{
				if(!(javaSpecific.TOP_LEVEL_KEYWORDS.indexOf(tokenPair[0].text) > -1))
				{
					
					foundDeclaration[_foundDeclarationCount] = [`class`, tokenPair[0].text, token.line, token.charPositionInLine]
					_foundDeclarationCount +=1
				}
			} 
			else if(tokenPair[1] instanceof VariableDeclaratorIdContext)
			{
				foundDeclaration[_foundDeclarationCount] = [`var`, tokenPair[0].text, token.line, token.charPositionInLine]
				_foundDeclarationCount +=1
			} 
			else if(tokenPair[1] instanceof MethodDeclarationContext)
			{
				// TODO: conflict in `_charPositionInLine` due to addition of `public` infront during preprocessing -> tabs should also be handled
				foundDeclaration[_foundDeclarationCount] = [`method`, tokenPair[0].text, token.line, token.charPositionInLine]
				_foundDeclarationCount +=1
			}
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
					let transformMap = sketch.getTransformationMap()
					if (transformMap.get(lineNumberJavaFile)) {
						diffLine = transformMap.get(lineNumberJavaFile)!.lineNumber
						let docName =  transformMap.get(lineNumberJavaFile)!.fileName
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