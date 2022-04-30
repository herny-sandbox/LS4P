import * as log from './scripts/syslogs'
import * as lsp from 'vscode-languageserver'
import * as parser from './parser'
import * as pStandards from './grammer/terms/preprocessingsnippets'
import * as preprocessor from './preprocessing'
import { ParseTree } from 'antlr4ts/tree/ParseTree'

const fs = require('fs')
const pathM = require('path')
const childProcess = require('child_process');

let sketchInfo : Info;
let contents  = new Map<string, string>()
let initialized = false;

let unProcessedCode : string = ''
let processedCode: string = ''
let compileErrors: CompileError[]
let tokenArray: [ParseTree, ParseTree][];

/** 
 * Map which maps the line in the java file to the line in the .pde file (tab). 
 * Index is the java file number.
 * The interface holds the line number and name of the .pde file (tab).
*/
let transformMap = new Map<number, IOriginalTab>()

export interface IOriginalTab {
	lineNumber: number;
	fileName: string;
}

export interface Info{
	path : string,
	uri : string,
	name : string,
}

export interface CompileError{
	lineNumber: number,
	message: string
}

/**
 * Initializes a sketch. 
 * Determens the sketch folder based on the parameter
 * 
 * @param textDocument  .pde file(tab) in the sketch directory.
 * @returns Creation succes state
 */
export function initialize(textDocument: lsp.TextDocument) {
	
	let uri = pathM.dirname(textDocument.uri)+'/'
	let path = getPathFromUri(uri)
	let name = pathM.basename(path)
	sketchInfo = { 
		uri : uri,
		path : path,
		name : name
	}

	try {
		let mainFileName = sketchInfo.name+'.pde'
		let mainFileContents = fs.readFileSync(sketchInfo.path+mainFileName, 'utf-8')

		contents.set(mainFileName, mainFileContents)
	}
	catch (e) {
		console.log("Something went wrong while loading the main file")
		console.log(e)
		return false
	}

	try{
		let fileNames = fs.readdirSync(sketchInfo.path)
		fileNames.forEach((fileName : string) =>{
			if (fileName.endsWith('.pde') && !fileName.includes(sketchInfo.name)){
				let tabContents = fs.readFileSync(sketchInfo.path+fileName, 'utf-8')
				contents.set(fileName, tabContents)
			}
		});
	}
	catch(e) {
		console.log("Some thing went wrong while loading the other files")
		console.log(e)
		return false
	}
	
	initialized = true
	return true
}

/**
 * Creates the java-code does this by updating the existing code,
 * preprocessing, parsing the tokenarray and compiling the code.
 * After which the errors are checked
 * 
 * @param textDocument last changed document
 */
export function build(textDocument: lsp.TextDocument){
	if (!initialized) {
		initialize(textDocument);
	}

	updateContent(textDocument)
	unProcessedCode = getContent()
	processedCode = preprocessor.performPreProcessing(unProcessedCode)
	tokenArray = parser.parseAST(processedCode)
	compile(processedCode)

	// Wrote methods to handle Error in the Error Stream
	// diagnostics.cookDiagnosticsReport(processedText)
	let pwd
	if (process.platform === 'win32') {
		pwd =`${__dirname}\\compile\\${pStandards.defaultClassName}.java`
	}else {
		pwd = `${__dirname}/compile/${pStandards.defaultClassName}.java`
	}
	cookCompilationErrors(pwd)
}

/**
 * Updates the sketch based on the changed document.
 * The tranform dict is automatically updated to the new changes
 * 
 * @param changedDocument Document of which the content should be updated
 * @returns Update succes state
 */
export function updateContent(changedDocument: lsp.TextDocument) {

	if (!initialized) {
		return false
	}

	//Update content
	let tabName = pathM.basename(changedDocument.uri)
	if(tabName.endsWith('.pde')) {
		contents.set(tabName, changedDocument.getText())
	}

	//Update transformation dict
	let bigCount = 1
	for (let [fileName, fileContents] of contents) {
		fileContents += '\n'

		bigCount = cookTransformDict(fileName, fileContents, bigCount)
	}

	return true
}

/**
 * Appends the name and content of a .pde file (tab)
 * to the content map of the sketch
 * 
 * @param uri Location to the file that needs adding
 */
 export function addTab(uri: string) {
	if (initialized) {
		let fileName = pathM.basename(uri)
		if (fileName.endsWith('.pde')) {
			let tabContents = fs.readdirSync(sketchInfo.path+fileName, 'utf-8')
			contents.set(fileName, tabContents)
		}
	}
}

/**
 * Deletes the name and content of a .pde file (tab)
 * from the sketch content map
 * 
 * @param uri Location to the file that needs removing
 */
export function removeTab(uri: string) {
	if (initialized) {
		let fileName = pathM.basename(uri)
		if (fileName.endsWith('.pde') && contents.has(fileName)) {
			contents.delete(fileName)
		}
	}
}

/**
 * Provides the basic sketch info
 * @returns Sketch ifo
 */
export function getInfo() : Info {
	return sketchInfo;
}

/**
 * Provides the current content of a sketch.
 * 
 * @returns sketch content
 */
export function getContent() : string{

	if (!initialized) {
		return ''
	}

	let content = ''

	for (let [fileName, fileContents] of contents) {
		fileContents += '\n' //Tab must end with a new line
		content += fileContents
	}

	return content
}

/**
 * Provides all the names of the files used by the sketch
 * 
 * @returns sketch file names
 */
 export function getFileNames() : string[] | undefined{

	if (!initialized) {
		return
	}

	let fileNames : string[] = new Array

	for (let [fileName, fileContents] of contents) {
		fileNames.push(fileName)
	}

	return fileNames
}

/**
 * Provides the content of a single (.pde) file/tab
 * 
 * @param uri Uri to the file
 * @returns tab content or undefined if no file is found
 */
export function getTabContent(uri : string) : string | undefined{
	if (!initialized) {
		return
	}
	let tabName = pathM.basename(uri)

	for (let [fileName, fileContents] of contents) {
		if (fileName == tabName) {
			return fileContents
		}
	}

	return

}

/**
 * This methode returns the ammount of lines that where added during preprocessing. 
 * In preprocessing adds lines to the code to be able to compile it. 
 * The ammount of lines that where added can change depending on the unprocessed code.
 * @returns number of lines added during preprocessing
 */
 export function getLineOffset() : number {
	let adjustOffset = 0
	let behaviourType = preprocessor.getBehavoirType()
	if(behaviourType.defaultEnabled){
		adjustOffset = pStandards.reduceLineDefaultBehaviour
	} else if(behaviourType.methodEnabled){
		adjustOffset = pStandards.reduceLineMethodBehaviour
	}

	return adjustOffset
}

/**
 * Calculates the difference between two line lengths in the processedText and unprocessedText. 
 * Preprocessing could add acces modifiers to the code. Which changes the position of some symbols.
 * This creates a problem when needing the correct character position of a symbol for features where
 * the position is relevant like rename.
 * 
 * @param unProcessedLineNumber The unprocessed text line number to use.
 * @param processedLineNumber The processed text line number to use.
 * @returns The amount of characters to offset
 */
export function getCharacterOffset(unProcessedLineNumber: number, processedLineNumber: number): number {
	let offset: number = 0;
	let processedTextSplit = processedCode.split(/\r\n|\n/)
	let unProcessedTextSplit = unProcessedCode.split(/\r\n|\n/)

	//Arrays start at 0, lineNumbers at 1. So offset
	unProcessedLineNumber -= 1
	processedLineNumber -= 1

	let processedLine = processedTextSplit[processedLineNumber]
	let unProcessedLine = unProcessedTextSplit[unProcessedLineNumber]

	offset = processedLine.length - unProcessedLine.length
	if (offset < 0) {
		offset = 0
	}
	return offset
}

/**
 * Provides the token parsetree provided by the parser
 * 
 * @returns The token parse tree of the sketch
 */
export function getTokenArray() : [ParseTree, ParseTree][]{
	return tokenArray;
}

/**
 * Provides a array of all compile errors
 * @returns Array of all compile errors
 */
export function getCompileErrors() : CompileError[]{
	return compileErrors
}

/**
 * Provides the tranformation map which maps the compiled java-code 
 * and its linenumbers to the original tab (.pde file) code
 * @returns transformation map
 */
export function getTransformationMap() : Map<number, IOriginalTab>{
	return transformMap
}

/**
 * Parses a line to extract each word and 
 * its start- and endPos within the parsed line
 * 
 * @param line Line to be mapped
 * @returns [word, startPos, endPos][]
 */
 export function lineMap(line: string) : [string, number, number][]{
	return parser.lineMap(line)
 }

/**
 * Runs the compiler to check the java-code on error's
 * 
 * @param processedCode Code to compile
 */
function compile(processedCode: string){
	// mkdir /out/compile
	// make sure to set .classpath for Processing core as environment variable
	// This suites for raw java case - should handle for default and setupDraw case
	try{
		fs.writeFileSync(__dirname+"/compile/"+pStandards.defaultClassName+".java", processedCode)
		log.writeLog(`Java File creation successful`)
	} catch(e) {
		log.writeLog(`[[ERR]] - Error in Java File Creation`)
	}

	try{
		childProcess.execSync(`javac -classpath ${__dirname.substring(0,__dirname.length-11)}/pcore/ ${__dirname}/compile/${pStandards.defaultClassName}.java -Xlint:none -Xstdout ${__dirname}/compile/error.txt`,
			{ stdio:[ 'inherit', 'pipe', 'pipe' ], windowsHide : true})
		log.writeLog(`Java File compilation successful`)
	} catch(e) {
		log.writeLog(`[[ERR]] - Error in Java File Compilation`)
	}
}

/**
 * Creates compile error array from the compiler output
 * 
 * @param pwd Path to the error.txt file generated by the compiler
 */
function cookCompilationErrors(pwd: string){
	// If one error is fixed it's not popped from stack - check
	try {  
		compileErrors = new Array()
		let data = fs.readFileSync(`${__dirname}/compile/error.txt`, 'utf-8')
		if(data == ''){
			// No Error on Compilation
			log.writeLog(`No error on Compilation`)
		} else if(data.split(`:`)[0] == `Note`){
			// Compilation warning
			log.writeLog(`Compilation warning encountered`)
		} else {
			let tempSplit = data.split('\n')
			
			tempSplit.forEach(function(line:string, index: number){
				if(line.includes(`${pwd}`)){
					let innerSplit = line.split(":")

					// Windows paths have a colon after the drive letter
					// Shifts the error colon by one in the array
					let splitIndex
					if(process.platform === 'win32') {
						splitIndex = 2
					}
					else {
						splitIndex = 1
					}

					// Handling line number based on current Behaviour - since preprocessing is done
					let errorLineNumber = +innerSplit[splitIndex] - getLineOffset()

					let localIndex = index + 1
					let errorMessage = line.split("error:")[1]
					while(true){
						if(tempSplit[localIndex].includes(`${pwd}`) || 
							tempSplit[localIndex].includes(`error`) ||
							tempSplit[localIndex].includes(`errors`)) {
							break
						} else {
							errorMessage += `\n ${tempSplit[localIndex]}`
							localIndex+=1
						}
					}
					compileErrors.push({lineNumber : errorLineNumber, message: errorMessage})
				}
			})
			// Place a break point
			log.writeLog(`[[ERR]] - Compiler throws errors check \`server\/out\/compile\/error\.txt\``)
		}
	} catch(e) {
		log.writeLog(`[[ERR]] - Problem with cooking diagnostics`)
	}
}

/**
 * Updates the sketch transformation map
 * 
 * 
 * @param fileName Name of the .pde file (tab)
 * @param fileContents Contents of the .pde file (tab)
 * @param bigCount Line number in the created java file
 * @returns 
 */
function cookTransformDict(fileName: string, fileContents: string, bigCount: number) : number{

	// Revert big count due to new line at end of a tab
	if (bigCount > 1) {
		bigCount -= 1
	}

	try {
		// Create transformation Dictonary
		let lineCount = 1			
		fileContents.split(/\r?\n/).forEach((line) => {
			transformMap.set(bigCount, {lineNumber: lineCount, fileName: fileName})
			bigCount ++
			lineCount ++
		})
		log.writeLog(`[INFO] Transform dictonary created for : ${fileName}`)
	}
	catch (e)
	{
		console.log(`[ERROR] ${e}`)
	}

	return bigCount;

}

/**
 * Transforms a file uri to a path
 * 
 * @param uri File based Uniform resource identifier
 * @returns Path in OS style
 */
function getPathFromUri(uri : string) : string {
	let path = uri.replace('file:///', '')
	path =  path.replace('%3A', ':')

	return path
}

/**
 * Transforms a path to a file uri
 * 
 * @param path Path of a file
 * @returns Uniform resource identifier (URI) to the file path
 */
function getUriFromPath(path : string) : string  {
	let tempUri = path.replace(':', '%3A')
	tempUri = 'file:///'+ + tempUri

	return tempUri
}