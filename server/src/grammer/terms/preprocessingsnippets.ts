import * as preprocessing from '../../preprocessing'
export const classChecker = `class`
export const newChecker = `new`
export let defaultClassName = "ProcessingDefault"
const defaultLib = `PApplet`
// Dynamic Imports should take format - `import __.__.__;`
const dynamicImports = `import processing.core.*\;
import processing.awt.*\;
import processing.data.*\;
import processing.event.*\;
import processing.opengl.*\;
import java.util.*\;
import java.io.*\;
import java.lang.*\;
`

export const reduceLineDefaultBehaviour = 13
export const reduceLineMethodBehaviour = 12

// remove generated code from token stack
export let removeGeneratedToken = [
	`ProcessingDefault`,
	`main`,
	`args`
]

const sizePattern = /(size)\([ ]*[0-9]+[ ]*\,[ ]*[0-9]+[ ]*\,*[ ]*[A-Z 0-9]{0,}[ ]*\)\;/
const fullScreenPattern = /(fullScreen)\([ ]*[A-Z 0-9]{0,}[ ]*\,*[ ]*[0-9]*[ ]*\)\;/
const smoothPattern = /(smooth)\([ ]*[0-9]+[ ]*\)\;/
const noSmoothPatterns = /(noSmooth)\(\)\;/
const ifelsePattern = /[ ]*(else)[ ]*(if)[ ]*\(/g
const singleLineComment = /\/\/(.)*/g
const multiLineCommentComponents = [
	/\/\*/g,
	/\*\//g
]
export const methodPattern = /[\w\<\>\[\]]+\s+(\w+) *\([^\)]*\) *(\{)/g

let settingsContext = ""
let isSettingsRequired = false
let settingsSet = new Set()

export function setDefaultClassName(className : string){
	defaultClassName = className as string
}

// Similar to : https://github.com/processing/processing/blob/37108add372272d7b1fc23d2500dce911c4d1098/java/src/processing/mode/java/preproc/PdePreprocessor.java#L1149
// Mode.STATIC
export function setupBehaviour(unProcessedTest: string): string {
	let processedText = `
${dynamicImports}
public class ${defaultClassName} extends ${defaultLib}{
public void setup(){
${unProcessedTest}
}
${settingsPreprocessing()}
${preprocessingFooter()}
}
`
	return processedText
}

// Mode.ACTIVE
export function methodBehaviour(unProcessedTest: string): string {
	let processedText = `
${dynamicImports}
public class ${defaultClassName} extends ${defaultLib}{
${unProcessedTest}
${settingsPreprocessing()}
${preprocessingFooter()}
}
`
	return processedText
}

// Handle size(), fullScreen(), smooth() & noSmooth()
// Takes in Unprocessed Text and returns UnProcessed Text with the `settings` lines stripped out
export function settingsRenderPipeline(unProcessedTest: string): string {
	let recordLine = unProcessedTest.split(`\n`)
	let newUnProcessedText = ``
	// Fixes method scoping for methods unassigned access specifiers
	recordLine.forEach(function(line,index){
		if(methodPattern.exec(line) && !(line.includes(`public`) || line.includes(`private`) || line.includes(`protected`) || ifelsePattern.exec(line))){
			recordLine[index] = `public ${line.trimLeft()}`
		}
	})
	let startEncountered = false
	recordLine.forEach(function(line, index){
		if(multiLineCommentComponents[0].exec(line)){
			startEncountered = true
		}
		if(startEncountered) {
			recordLine[index] = ``
			if(multiLineCommentComponents[1].exec(line)){
				startEncountered = false
			}
		}
		if(	sizePattern.exec(recordLine[index]) || 
			fullScreenPattern.exec(recordLine[index]) || 
			smoothPattern.exec(recordLine[index]) ||
			noSmoothPatterns.exec(recordLine[index]) ){
			moveToSettings(recordLine[index])
		}
	})
	cookSettingsContext(unProcessedTest)
	recordLine.forEach(function(line,index){
		if(sizePattern.exec(line) || fullScreenPattern.exec(line) || smoothPattern.exec(line) || noSmoothPatterns.exec(line)){
			recordLine[index] = ``
		}
		newUnProcessedText = `${newUnProcessedText}\n${recordLine[index]}`
	})
	newUnProcessedText = mapperPipeline(newUnProcessedText)
	return newUnProcessedText
}

export function mapperPipeline(newUnProcessedText: string): string{
	let localUnProcessedText = newUnProcessedText.replace(/([0-9]+\.[0-9]+)/g,'$1f')
	conversionTuples.forEach(function(tuple){
		localUnProcessedText = localUnProcessedText.replace(tuple[0],tuple[1])
	})
	localUnProcessedText = localUnProcessedText.replace(singleLineComment,``)
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

function settingsPreprocessing(): string{
	let generateSettings: string = ""
	if(isSettingsRequired){
		generateSettings = `
public void settings(){
${settingsContext}
}`
	} else {
		settingsContext = ``
		disableSettingsBeforeParse()
	}
	return generateSettings
}

function preprocessingFooter(): string{
	let generatedFooter: string = `
public static void main(String[] args) {
PApplet.main("${defaultClassName}");
}`
	return generatedFooter
}

let conversionTuples : [RegExp,string][] = [
	[/(float\()/g,"PApplet.parseFloat("],
	[/(boolean\()/g,"PApplet.parseBoolean("],
	[/(byte\()/g,"PApplet.parseByte("],
	[/(char\()/g,"PApplet.parseChar("],
	// [/(int\()/g,"PApplet.parseInt("],
	[/(color[ ]+)/g,"int "],
	[/(color\[)/g,"int["]
]

function getRandomInt(max: number) {
	return Math.floor(Math.random() * Math.floor(max));
}