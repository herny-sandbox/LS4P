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

export const sizePattern = /(size)\([ ]*[0-9]+[ ]*\,[ ]*[0-9]+[ ]*\,*[ ]*[A-Z 0-9]{0,}[ ]*\)\;/
export const fullScreenPattern = /(fullScreen)\([ ]*[A-Z 0-9]{0,}[ ]*\,*[ ]*[0-9]*[ ]*\)\;/
export const smoothPattern = /(smooth)\([ ]*[0-9]+[ ]*\)\;/
export const noSmoothPatterns = /(noSmooth)\(\)\;/
export const ifelsePattern = /[ ]*(else)[ ]*(if)[ ]*\(/g
export const singleLineComment = /\/\/(.)*/g
export const multiLineCommentComponents = [
	/\/\*/g,
	/\*\//g
]
export const methodPattern = /[\w\<\>\[\]]+\s+(\w+) *\([^\)]*\) *(\{)/g

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
${preprocessingFooter()}
}
`
	return processedText
}

export function preprocessingSettings(settingsContext : string): string{
	let	generateSettings = `
	public void settings(){
${settingsContext}
	}`
	return generateSettings
}

function preprocessingFooter(): string{
	let generatedFooter: string = `
public static void main(String[] args) {
PApplet.main("${defaultClassName}");
}`
	return generatedFooter
}

export let conversionTuples : [RegExp,string][] = [
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