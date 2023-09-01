import * as log from './scripts/syslogs'
import * as parser from './parser'
import * as pStandards from './grammer/terms/processingStandards'
import * as preprocessor from './preprocessing'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
//import { TextDocument } from 'vscode-languageserver-textdocument';
import { ParserRuleContext } from 'antlr4ts';
import { ProcessingSketchContext, StaticProcessingSketchContext } from "./grammer/ProcessingParser";
import { SymbolTableVisitor } from './symbols';
import * as symbols from 'antlr4-c3'
import { DocumentUri, Range } from 'vscode-languageserver'
import { ReferencesVisitor } from './references';
import * as dm from './definitionsMap'
import * as server from './server'
import * as jarSymbols from './JarSymbols'

const fs = require('fs')
const pathM = require('path')
const childProcess = require('child_process');

let sketchInfo : Info;
let initialized = false;

let unProcessedCode : string = ''
let processedCode: string = ''
let processedSketchTokens : ProcessingSketchContext
let compileErrors: CompileError[]
let tokenArray: [ParseTree, ParseTree][];
let jrePath:string = ''

let symbolTableVisitor : SymbolTableVisitor;

/** 
 * Map which maps the line in the java file to the line in the .pde file (tab). 
 * Index is the java file number.
 * The interface holds the line number and name of the .pde file (tab).
*/
let transformMap = new Map<number, IOriginalTab>()
let pdeMap  = new Map<string, PdeContentInfo>()

export interface IOriginalTab 
{
	lineNumber: number;
	fileName: string;
}

export interface Info
{
	path : string,
	uri : string,
	name : string,
}

export interface CompileError
{
	lineNumber: number,
	message: string
}
export interface PdeContentInfo
{
	name : string;
	rawContent : string;
	syntaxTokens : ParserRuleContext | null;
	symbols : symbols.BaseSymbol [];
	refs : dm.UsageVisitor | null;

	processedTokens: ParserRuleContext[] | null;
	linesCount : number;
	linesOffset: number;
}
function createPdeContentInfo(name: string, c : string, lines : number)
{
	return {
		name: name, 
		rawContent: c, 
		syntaxTokens: null, 
		symbols: [], 
		refs : null,

		processedTokens: null, 
		linesCount: lines, 
		linesOffset: 0, 
	};
}

export function getRootContext() { return processedSketchTokens; }
export function getSymbolTable() { return symbolTableVisitor.symbolTable; }

/**
 * Initializes a sketch. 
 * Determens the sketch folder based on the parameter
 * 
 * @param textDocument  .pde file(tab) in the sketch directory.
 * @returns Creation succes state
 */
export function initialize(workspacePath: string) 
{
	let uri = workspacePath;
	let path = getPathFromUri(uri);
	let name = pathM.basename(path);
	sketchInfo = { 
		uri : uri,
		path : path,
		name : name
	}
	jrePath = `${__dirname.substring(0,__dirname.length-11)}/jre/bin`;

	symbolTableVisitor = new SymbolTableVisitor(name);
	jarSymbols.ImportDefaultLibraries(symbolTableVisitor.symbolTable);
	let pappletSymbol : symbols.ClassSymbol | undefined = jarSymbols.GetClass("processing.core.PApplet");
	if(pappletSymbol)
		symbolTableVisitor.getMainClass().extends.push(pappletSymbol);
	
	try 
	{
		let mainFileName = sketchInfo.name+'.pde';
		let mainFileContents : string = fs.readFileSync(sketchInfo.path+mainFileName, 'utf-8');

		addPdeContent(mainFileName, mainFileContents);
		//contents.set(mainFileName, mainFileContents);
	}
	catch (e) 
	{
		log.write("Something went wrong while loading the main file", log.severity.ERROR);
		log.write(e, log.severity.ERROR);
		return false;
	}

	try
	{
		let fileNames = fs.readdirSync(sketchInfo.path);
		fileNames.forEach((fileName : string) =>{
			if (fileName.endsWith('.pde') && !fileName.includes(sketchInfo.name))
			{
				let tabContents = fs.readFileSync(sketchInfo.path+fileName, 'utf-8');
				addPdeContent(fileName, tabContents);
				//contents.set(fileName, tabContents);
			}
		});
	}
	catch(e) 
	{
		log.write("Some thing went wrong while loading the other files", log.severity.ERROR);
		log.write(e, log.severity.ERROR);
		return false;
	}
	
	cookPdeContentOffsets();
	initialized = true
	return true
}

export function prepareSketch(sketchFolder : string)
{
	log.write("prepareSketch Started", log.severity.EVENT);
	initialize(sketchFolder+'/');

	// let bigCount = 1
	// for (let [pdeName, pdeContents] of pdeMap) 
	// 	bigCount = cookTransformDict(pdeName, pdeContents, bigCount);
	
	
}

export function startPreprocessing()
{
	// log.write("startPreprocessing BEGIN", log.severity.EVENT);
	
	// log.write("generating unprocessed content", log.severity.INFO);
	// unProcessedCode = getFullUnprocessedContent();
	// //log.write("generating preprocessing content", log.severity.EVENT);
	// //processedCode = preprocessor.performPreProcessing(unProcessedCode);

	// log.write("parsing AST", log.severity.INFO);
	// let ast : ProcessingSketchContext | undefined = parser.parse(unProcessedCode);
	// if(ast)
	// {
	// 	tokenArray = parser.buildTokenArray(ast);
	// 	processedSketchTokens = ast;
	// 	//symbolTableVisitor.visit(processedSketchTokens);
	// 	LinkTokensWithPDEs(processedSketchTokens);
	// }
	// log.write("startPreprocessing END", log.severity.EVENT);

}

/**
 * Creates the java-code does this by updating the existing code,
 * preprocessing, parsing the tokenarray and compiling the code.
 * After which the errors are checked
 */
export function build()
{
	// log.write("sketch build started", log.severity.EVENT);
	// unProcessedCode = getFullJavaContent();
	// processedCode = preprocessor.performPreProcessing(unProcessedCode);

	// log.write("parsing AST pairs", log.severity.EVENT);
	tokenArray = parser.parseAST(processedCode);

	// log.write("parsing AST", log.severity.EVENT);

	// let ast : ParseTree = parser.parse(processedCode);

	// log.write("LinkTokensWithPDEs", log.severity.EVENT);
	// if(ast instanceof ParserRuleContext) 
	// 	LinkTokensWithPDEs(ast);

	//compile(processedCode)
	// Wrote methods to handle Error in the Error Stream
	// diagnostics.cookDiagnosticsReport(processedText)
	// let pwd
	// if (process.platform === 'win32') 
	// {
	// 	let cwd = __dirname.replace(/(\\)/g, "/")
	// 	pwd =`${cwd}/compile/${pStandards.defaultClassName}.java`
	// }
	// else 
	// {
	// 	pwd = `${__dirname}/compile/${pStandards.defaultClassName}.java`
	// }B
	// cookCompilationErrors(pwd);
	log.write("sketch build ended", log.severity.EVENT);
}

/**
 * Provides the content of a single (.pde) file/tab
 * 
 * @param uri Uri to the file
 * @returns tab content or undefined if no file is found
 */
export function getPdeContentFromUri(uri : string) : string | undefined
{
	if (!initialized)
		return
	
	let tabName = pathM.basename(uri)

	let pdeInfo : PdeContentInfo | undefined = pdeMap.get(tabName);
	return pdeInfo?.rawContent??undefined;
}

/**
 * Appends the name and content of a .pde file (tab)
 * to the content map of the sketch
 * 
 * @param uri Location to the file that needs adding
 */
 export function addPdeToSketch(uri: string) 
 {
	if (!initialized)
		return;

	let fileName = pathM.basename(uri)
	if (fileName.endsWith('.pde')) 
	{
		let tabContents = fs.readdirSync(sketchInfo.path+fileName, 'utf-8');
		addPdeContent(fileName, tabContents);
		//contents.set(fileName, tabContents)
	}
	cookPdeContentOffsets();
}

/**
 * Deletes the name and content of a .pde file (tab)
 * from the sketch content map
 * 
 * @param uri Location to the file that needs removing
 */
export function removePdeFromSketch(uri: string) 
{
	if (!initialized)
		return;

	let fileName = pathM.basename(uri)
	if (fileName.endsWith('.pde') && pdeMap.has(fileName))
		pdeMap.delete(fileName);
}



/**
 * Provides the basic sketch info
 * @returns Sketch ifo
 */
export function getInfo() : Info 
{
	return sketchInfo;
}

/**
 * Provides the current content of a sketch.
 * 
 * @returns sketch content
 */
export function getFullUnprocessedContent() : string
{
	if (!initialized)
		return '';
	
	let content = ''

	for (let [fileName, pdeContent] of pdeMap) 
		content += pdeContent.rawContent + '\n'; //Tab must end with a new line

	return content
}

export function getAllPdeInfos() : IterableIterator<PdeContentInfo>
{
	return pdeMap.values();
}

/**
 * Provides all the names of the files used by the sketch
 * 
 * @returns sketch file names
 */
 export function getFileNames() : string[] | undefined
 {
	if (!initialized)
		return;

	let fileNames : string[] = new Array;

	for (let [fileName, fileContents] of pdeMap)
		fileNames.push(fileName)

	return fileNames
}



/**
 * This methode returns the ammount of lines that where added during preprocessing. 
 * In preprocessing adds lines to the code to be able to compile it. 
 * The ammount of lines that where added can change depending on the unprocessed code.
 * @returns number of lines added during preprocessing
 */
 export function getLineOffset() : number 
 {
	let adjustOffset = 0;
	let behaviourType = preprocessor.getBehavoirType();

	if(behaviourType.defaultEnabled)
		adjustOffset = pStandards.reduceLineDefaultBehaviour;
	else if(behaviourType.methodEnabled)
		adjustOffset = pStandards.reduceLineMethodBehaviour;

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
export function getCharacterOffset(unProcessedLineNumber: number, processedLineNumber: number): number 
{
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
export function getTokenArray() : [ParseTree, ParseTree][]
{
	return tokenArray;
}

/**
 * Provides a array of all compile errors
 * @returns Array of all compile errors
 */
export function getCompileErrors() : CompileError[]
{
	return compileErrors
}

/**
 * Provides the tranformation map which maps the compiled java-code 
 * and its linenumbers to the original tab (.pde file) code
 * @returns transformation map
 */
export function getTransformationMap() : Map<number, IOriginalTab>
{
	return transformMap
}

/**
 * Parses a line to extract each word and 
 * its start- and endPos within the parsed line
 * 
 * @param line Line to be mapped
 * @returns [word, startPos, endPos][]
 */
 export function lineMap(line: string) : [string, number, number][]
 {
	return parser.lineMap(line)
 }

/**
 * Runs the compiler to check the java-code on error's
 * 
 * @param processedCode Code to compile
 */
function compile(processedCode: string)
{
	// mkdir /out/compile
	// make sure to set .classpath for Processing core as environment variable
	// This suites for raw java case - should handle for default and setupDraw case
	try
	{
		fs.writeFileSync(__dirname+"/compile/"+pStandards.defaultClassName+".java", processedCode)
		log.write(`Java File created`, log.severity.SUCCES)
	} 
	catch(e) 
	{
		log.write(`Java File Creation failed`, log.severity.ERROR)
		log.write(e, log.severity.ERROR)
	}

	try
	{
		childProcess.execSync(`${jrePath}/java --module compilerModule/com.compiler ${__dirname}/compile/${pStandards.defaultClassName}.java > ${__dirname}/compile/error.txt`, 
		{ stdio:[ 'inherit', 'pipe', 'pipe' ], windowsHide : true})
		log.write(`Java File compiled`, log.severity.SUCCES)
	} 
	catch(e) 
	{
		log.write(`Java file compilation failed`, log.severity.ERROR)
		log.write(e, log.severity.ERROR)
	}
}

/**
 * Creates compile error array from the compiler output
 * 
 * @param pwd Path to the error.txt file generated by the compiler
 */
function cookCompilationErrors(pwd: string)
{
	// If one error is fixed it's not popped from stack - check
	try 
	{  
		compileErrors = new Array()
		let data = fs.readFileSync(`${__dirname}/compile/error.txt`, 'utf-8')
		if(data == '')
		{
			// No Error on Compilation
			log.write(`No error on compilation`, log.severity.INFO)
		} 
		else if(data.split(`:`)[0] == `Note`)
		{
			// Compilation warning
			log.write(`Compilation warning encountered`, log.severity.WARNING)
		} 
		else 
		{
			let tempSplit = data.split('\n')
			
			tempSplit.forEach(function(line:string, index: number)
			{
				if(line.includes(`${pwd}`))
				{
					let innerSplit = line.split(":");

					// Windows paths have a colon after the drive letter
					// Shifts the error colon by one in the array
					let splitIndex;
					if(process.platform === 'win32')
						splitIndex = 3;
					else
						splitIndex = 2;

					// Handling line number based on current Behaviour - since preprocessing is done
					let errorLineNumber = +innerSplit[splitIndex].replace("L", "") - getLineOffset()

					let localIndex = index + 1
					let errorMessage = ""
					while(true)
					{
						if (localIndex >= tempSplit.length)
							break;
						
						else if(tempSplit[localIndex].includes(`${pwd}`) || 
							tempSplit[localIndex].includes(`error`) ||
							tempSplit[localIndex].includes(`errors`)) 
						{
							break;
						} 
						else 
						{
							errorMessage += `\n ${tempSplit[localIndex]}`
							localIndex+=1
						}
					}
					compileErrors.push({lineNumber : errorLineNumber, message: errorMessage})
				}
			})
			// Place a break point
			log.write(`Compilation errors encountered`, log.severity.INFO)
		}
	} catch(e) {
		log.write(`Problem with cooking diagnostics`, log.severity.ERROR)
		log.write(e, log.severity.ERROR)
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
function cookTransformDict(fileName: string, pdeContent: PdeContentInfo, bigCount: number) : number{

	// Revert big count due to new line at end of a tab
	if (bigCount > 1)
		bigCount -= 1

	try 
	{
		let fileContents : string = pdeContent.rawContent + "\n";
	
		// Create transformation Dictonary
		let lineCount = 1;
		fileContents.split(/\r?\n/).forEach((line) => {
			transformMap.set(bigCount, {lineNumber: lineCount, fileName: fileName})
			bigCount ++
			lineCount ++
		})
		log.write(`Transform dictonary created for : ${fileName}`, log.severity.INFO)
	}
	catch (e)
	{
		log.write(`Transformation dictionary creation failed`, log.severity.ERROR)
		log.write(e, log.severity.ERROR)
	}

	return bigCount;
}


function LinkTokensWithPDEs(node : ParseTree)
{
	if(!(node instanceof ParserRuleContext))
		return;
	const startPos : number = node.start.line;
	const endPos : number = node.stop?.line ?? startPos;
	let found = false;
	let mainIndex : number = 1;
	for (let [pdeName, pdeContent] of pdeMap) 
	{
		let contentLineStart : number = mainIndex;
		let contentLineEnd : number = mainIndex + pdeContent.linesCount - 1;
		if( startPos >= contentLineStart && endPos < contentLineEnd )
		{
			if(!pdeContent.processedTokens)
				pdeContent.processedTokens = [];
			pdeContent.processedTokens.push(node);
			found = true;
			break;
		}
		mainIndex = contentLineEnd+1;
	}
	if(node.children && !found)
	{
		for(let i=0; i < node.childCount; i++)
			LinkTokensWithPDEs(node.children[i]);
	}
}

function cookPdeContentOffsets()
{
	let mainIndex : number = 0;
	for (let [pdeName, pdeContent] of pdeMap) 
	{
		pdeContent.linesOffset = mainIndex + 1;
		mainIndex = mainIndex + pdeContent.linesCount;
	}
}

export function getPdeContentBySyntaxPosition(line : number) : PdeContentInfo | null
{
	for (let [pdeName, pdeContent] of pdeMap) 
	{
		let endPos : number = pdeContent.linesOffset + pdeContent.linesCount;
		if( line >= pdeContent.linesOffset && line < endPos)
			return pdeContent;
	}
	return null;
}



/**
 * Transforms a file uri to a path
 * 
 * @param uri File based Uniform resource identifier
 * @returns Path in OS style
 */
export function getPathFromUri(uri : string) : string 
{
	let path = uri.replace('file:///', '');
	path =  path.replace('%3A', ':');

	return path;
}

/**
 * Transforms a path to a file uri
 * 
 * @param path Path of a file
 * @returns Uniform resource identifier (URI) to the file path
 */
function getUriFromPath(path : string) : string  
{
	let tempUri = path.replace(':', '%3A');
	return 'file:///'+ tempUri;
}

export function getUriFromPdeName(pdeName : string) : DocumentUri
{
	return getUriFromPath(sketchInfo.path+pdeName);
}

export function getPdeContentInfo(pdeName : string ) : PdeContentInfo | undefined
{
	return pdeMap.get(pdeName);
}

export function updatePdeContent(pdeName : string, newContent : string, linesCount : number)
{
	if (!initialized)
		return false;

	let offsetsChanged : boolean = true;
	let pdeInfo : PdeContentInfo | undefined = pdeMap.get(pdeName);
	if(pdeInfo)
	{
		offsetsChanged = pdeInfo.linesCount != linesCount;

		pdeInfo.rawContent = newContent;
		pdeInfo.linesCount = linesCount;
	}
	else
	{
		pdeInfo = createPdeContentInfo(pdeName, newContent, linesCount);
		pdeMap.set(pdeName, pdeInfo);
	}

	if(offsetsChanged)
		cookPdeContentOffsets();

	pdeInfo.syntaxTokens = parser.parse(newContent) as ParserRuleContext;
	
	pdeInfo.refs = new dm.UsageVisitor(symbolTableVisitor.getMainClass());
	symbolTableVisitor.removeRootSymbols(pdeInfo.symbols);
	symbolTableVisitor.visitPdeLinked(pdeInfo);

	pdeInfo.refs.analize(pdeInfo.syntaxTokens);

	let fileUri = sketchInfo.uri+pdeInfo.name
	server.connection.sendDiagnostics({uri: fileUri, diagnostics: pdeInfo.refs.diagnostics})

	//new ReferencesVisitor(symbolTableVisitor.symbolTable).visitForInfo(pdeInfo.syntaxTokens, pdeInfo.references)
	return pdeInfo;
}

function addPdeContent(pdeName : string, newContent : string) : PdeContentInfo
{
	log.write(`adding ${pdeName} symbols.`, log.severity.EVENT);
	let	linesCount : number = newContent.split(/\r?\n/).length;

	let result : PdeContentInfo = createPdeContentInfo(pdeName, newContent, linesCount);
	pdeMap.set(pdeName, result);
	result.refs = new dm.UsageVisitor(symbolTableVisitor.getMainClass());
	result.syntaxTokens = parser.parse(newContent) as ParserRuleContext;
	symbolTableVisitor.visitPdeLinked(result);
	result.refs.analize(result.syntaxTokens);
	
	return result;
}
