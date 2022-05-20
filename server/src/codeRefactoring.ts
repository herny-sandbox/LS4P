import * as pStandards from './grammer/terms/preprocessingsnippets'

export let settingsContext = ""
export let isSettingsRequired = false
let settingsSet = new Set()

// Handle size(), fullScreen(), smooth() & noSmooth()
// Takes in Unprocessed Text and returns UnProcessed Text with the `settings` lines stripped out
export function settingsRenderPipeline(unProcessedTest: string): string {
	let settingsContext = ""

	let recordLine = unProcessedTest.split(`\n`)
	let newUnProcessedText = ``
	// Fixes method scoping for methods unassigned access specifiers
	recordLine.forEach(function(line,index){
		if(pStandards.methodPattern.exec(line) && !(line.includes(`public`) || line.includes(`private`) || line.includes(`protected`) || pStandards.ifelsePattern.exec(line))){
			recordLine[index] = `public ${line.trimLeft()}`
		}
	})
	let startEncountered = false
	recordLine.forEach(function(line, index){
		if(pStandards.multiLineCommentComponents[0].exec(line)){
			startEncountered = true
		}
		if(startEncountered) {
			recordLine[index] = ``
			if(pStandards.multiLineCommentComponents[1].exec(line)){
				startEncountered = false
			}
		}
		if(	pStandards.sizePattern.exec(recordLine[index]) || 
			pStandards.fullScreenPattern.exec(recordLine[index]) || 
			pStandards.smoothPattern.exec(recordLine[index]) ||
			pStandards.noSmoothPatterns.exec(recordLine[index]) ){
			moveToSettings(recordLine[index])
		}
	})
	cookSettingsContext(unProcessedTest)
	recordLine.forEach(function(line,index){
		if(pStandards.sizePattern.exec(line) || pStandards.fullScreenPattern.exec(line) || pStandards.smoothPattern.exec(line) || pStandards.noSmoothPatterns.exec(line)){
			recordLine[index] = ``
		}
		newUnProcessedText = `${newUnProcessedText}\n${recordLine[index]}`
	})
	newUnProcessedText = mapperPipeline(newUnProcessedText)
	return newUnProcessedText
}

export function mapperPipeline(newUnProcessedText: string): string{
	let localUnProcessedText = newUnProcessedText.replace(/([0-9]+\.[0-9]+)/g,'$1f')
	pStandards.conversionTuples.forEach(function(tuple){
		localUnProcessedText = localUnProcessedText.replace(tuple[0],tuple[1])
	})
	localUnProcessedText = localUnProcessedText.replace(pStandards.singleLineComment,``)
	// localUnProcessedText = localUnProcessedText.replace(/[\']{1}/g,"\\\'")
	// localUnProcessedText = localUnProcessedText.replace(/[\"]{1}/g,"\\\"")
	return localUnProcessedText
}

export function disableSettingsBeforeParse() {
	isSettingsRequired = false
}

// TODO - appends a new line for every character change after settings is initiated - fix it
function moveToSettings(line: string) {
	isSettingsRequired = true
	settingsSet.add(line);
}

function cookSettingsContext(unProcessedTest: string){
	settingsContext = ``
	settingsSet.forEach(function(setting : any){
		if(unProcessedTest.includes(setting)){
			settingsContext = `${settingsContext}\n${setting}`
		}
	})
}