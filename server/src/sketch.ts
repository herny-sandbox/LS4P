import * as log from './scripts/syslogs'
import * as parser from './parser'
import * as pStandards from './grammer/terms/processingStandards'
import { IDiagnosticReporter } from "./grammer/ProcessingErrorListener";
//import * as preprocessor from './preprocessing'
import { ProcessingSketchContext } from "./grammer/ProcessingParser";
import { SymbolTableVisitor } from './symbols';
import * as server from './server'
import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts';
import * as symb from 'antlr4-c3'
import * as dm from './definitionsMap'
import * as lsp from 'vscode-languageserver'
import * as psymb from './antlr-sym';
import * as javaModules from './javaModules'
import * as parseUtils from './astutils'
import * as fs from 'fs';

const pathM = require('path')
const childProcess = require('child_process');

let processingPath : string = '';

let sketchInfo : Info;
let workspaceInitialized = false;
let processingInitialized = false;
let logPdeChanges : boolean = false;
let recompiling : boolean = false;

let dirtyPdeCount = 0;
let unProcessedCode : string = ''
let processedCode: string = ''
let processedSketchTokens : ProcessingSketchContext
let compileErrors: CompileError[]
let tokenArray: [ParseTree, ParseTree][];
let jrePath:string = ''

let symbolTableVisitor : SymbolTableVisitor;
let mainSymbolTable : psymb.PSymbolTable = new psymb.PSymbolTable("", { allowDuplicateSymbols: true });
let mainClass : psymb.PClassSymbol;

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

export class PdeContentInfo implements IDiagnosticReporter
{
	public name : string = "";
	public rawContent : string = "";
	public syntaxTokens : ParserRuleContext | null = null;
	public symbols : symb.BaseSymbol [] = [];
	
	public dirty : boolean = false;
	public requireDeclarationsRebuild : boolean = false;
	public requireReferencesRebuild : boolean = false;
	public diagnosticsChanged : boolean = false;

	public diagnostics : lsp.Diagnostic[] = [];

	public processedTokens: ParserRuleContext[] | null = null;
	public linesCount : number=0;
	public linesOffset: number=0;

	private definitionDict : Map<TerminalNode, string> = new Map<TerminalNode, string>();
	private contextTypeDict : Map<ParseTree, psymb.IPType> = new Map<ParseTree, psymb.IPType>();
	private usageMap : Map<string, lsp.Range[]> = new Map<string, lsp.Range[]>();


	static createPdeContentInfo(pdeName: string, newContent: string, linesCount: number): PdeContentInfo 
	{
		let result = new PdeContentInfo();
		result.name = pdeName;
		result.rawContent = newContent;
		result.linesCount = linesCount;
		return result;
	}

	public isBeingRebuilt() : boolean
	{
		return(this.dirty || this.requireDeclarationsRebuild || this.requireReferencesRebuild );
	}

	public markForRecompile()
	{
		this.dirty = true;
	}

	public tryRebuildSymbolDeclarations()
	{
		if(this.dirty)
			this.buildDeclarationSymbols();
	}

	public buildDeclarationSymbols() 
	{
		this.requireDeclarationsRebuild = true;
		this.dirty = false;
		this.diagnosticsChanged = true;

		this.definitionDict.clear();
		this.contextTypeDict.clear();
		this.usageMap.clear();
		this.diagnostics = [];

		this.removeSymbolsFromMainClass();

		if(logPdeChanges)
			log.write(`building <${this.name}> declaration symbols.`, log.severity.EVENT);

		try
		{
			this.syntaxTokens = parser.parse(this.rawContent, this) as ParserRuleContext;
		
			symbolTableVisitor.visitPdeLinked(this);
			this.requireReferencesRebuild = true;
		}
		catch(e)
		{
			console.error("Unable to parse pde file.\n"+e.stack)
		}
		finally
		{
			this.requireDeclarationsRebuild = false;
			markAsRebuildCompleted(this);
		}
	}

	public tryRebuildSymbolReferences()
	{
		if(this.requireReferencesRebuild)
			this.buildSymbolReferences();
	}

	buildSymbolReferences() 
	{
		if(logPdeChanges)
			log.write(`building <${this.name}> references.`, log.severity.EVENT);

		if(this.syntaxTokens)
			new dm.UsageVisitor(mainSymbolTable, mainClass, this).visit(this.syntaxTokens);

		//log.write(`<${this.name}> errors: ${this.diagnostics.length}`, log.severity.EVENT);
		
		this.requireReferencesRebuild = false;

		markAsRebuildCompleted(this);
	}

	public trySendDiagnostics()
	{
		if(!this.diagnosticsChanged)
			return;
		let fileUri = sketchInfo.uri+this.name;
		server.connection.sendDiagnostics({uri: fileUri, diagnostics: this.diagnostics});
		this.diagnosticsChanged = false;
	}

	public removeSymbolsFromMainClass()
	{
		while(this.symbols.length > 0)
		{
			let s : symb.BaseSymbol | undefined = this.symbols.pop();
			if(s)
				mainClass.removeSymbol(s);
		}
	}

	public getUsageReferencesFor( decl : symb.BaseSymbol ) : lsp.Range[] | undefined
	{
		return this.getUsageReferencesForQualifiedName(decl.qualifiedName('.', true, false));
	}

	public getUsageReferencesForQualifiedName( declName : string ) : lsp.Range[] | undefined
	{
		return this.usageMap.get(declName);
	}

	public findNodeSymbolDefinition( node : TerminalNode )  : symb.BaseSymbol | undefined
	{
		let qualifiedName = this.definitionDict.get(node);
		return psymb.PUtils.resolveSymbolSync(mainSymbolTable, symb.BaseSymbol, qualifiedName);
		//return mainSymbolTable.resolveSync(qualifiedName);
	}

	public findSymbol( qualifiedName : string )  : symb.BaseSymbol | undefined
	{
		return psymb.PUtils.resolveSymbolSync(mainSymbolTable, symb.BaseSymbol, qualifiedName);
	}

	public findNodeSymbolDefinitionName( node : TerminalNode )  : string | undefined
	{
		return this.definitionDict.get(node);
	}

	public findNodeContextTypeDefinition(node : ParseTree ) : psymb.IPType | undefined
	{
		return this.contextTypeDict.get(node);
	}

	public registerDefinition(node: TerminalNode, declaredSymbol : symb.BaseSymbol | undefined, isInstance:boolean=true) : symb.BaseSymbol | undefined
	{
		if(declaredSymbol !== undefined)
		{
			let qualifiedName : string = psymb.PUtils.extractSignature( declaredSymbol ) + (isInstance?"":"#");
			this.definitionDict.set(node, qualifiedName);
			let idText = node.text;
			if(idText != "this" && idText != "super" )
			{
				let lst = this.usageMap.get(qualifiedName);
				if(lst === undefined)
					this.usageMap.set(qualifiedName, lst = []);
				lst.push(parseUtils.calcRangeFromParseTree(node));
			}
		}
		else
			this.notifyDiagnostic(`Unable to find declaration for ${node.text}`, node);

		return declaredSymbol;
	}

	public registerContextType(node: ParseTree | undefined, ctxType : psymb.IPType | undefined)
	{
		if(!ctxType)
			return;
		if(!node)
			return;
		this.contextTypeDict.set(node, ctxType);
	}

	public notifyDiagnostic(msg:string, node?:ParseTree|undefined, severity:lsp.DiagnosticSeverity=lsp.DiagnosticSeverity.Error )
	{
		this.notifyDiagnosticRange(msg, parseUtils.calcRangeFromParseTree(node), severity);
	}

	public notifyDiagnosticRange(msg:string, rg:lsp.Range, severity:lsp.DiagnosticSeverity=lsp.DiagnosticSeverity.Error )
	{
		let diagnostic: lsp.Diagnostic = {
			severity: severity,
			range: rg,
			message: msg,
			source: this.name
	   }
	   this.diagnostics.push(diagnostic);
	}
}

export function getRootContext() { return processedSketchTokens; }
export function getSymbolTable() { return symbolTableVisitor.symbolTable; }

export function setProcessingPath(path: string)
{ 
	processingPath = path;

	tryInitializeProcessing(processingPath);
}

export function checkOnProcessingPathChanged(newProcessingPath : string)
{
	if(processingPath == newProcessingPath)
		return;

	setProcessingPath(newProcessingPath);
	tryInitializeWorkspaceSketch();
	tryRecompile(false);
}

/**
 * Initializes a sketch. 
 * Determens the sketch folder based on the parameter
 * 
 * @param textDocument  .pde file(tab) in the sketch directory.
 * @returns Creation succes state
 */
export function initialize(workspacePath: string) 
{
	//outputChannel = vscode.window.createOutputChannel("Processing Sketch", "Processing");
	

	let uri = workspacePath;
	let path = getPathFromUri(uri);
	let name = pathM.basename(path);
	sketchInfo = { 
		uri : uri,
		path : path,
		name : name
	}
	//outputChannel.appendLine(`Loading ${name} Sketch.`);

	jrePath = `${__dirname.substring(0,__dirname.length-11)}/jre/bin`;

	// Now we can prepare the workspace sketch
	tryInitializeWorkspaceSketch();

	return true
}

function tryInitializeWorkspaceSketch() 
{
	workspaceInitialized = false;
	if(!processingInitialized)
	{
		console.error("Unable to initialize sketch since processing wasn't correctly initialized");
		return;
	}
	let mainSketchFilename = sketchInfo.name + '.pde';
	if (!isPathValid(sketchInfo.path + mainSketchFilename)) 
	{
		console.error('Unable to initialize sketch. The main sketch file must have the same name as the sketch folder.');
		return;
	}
	if (!isPathValid(sketchInfo.path))
	{
		console.error('Unable to initialize sketch. Seems that the sketch folder is not valid.');
		return;
	}

	// Loading custom libraries required by the user specific project
	tryInitializeSketchCode(sketchInfo.path+"code/");

	console.log('Initializing workspace sketch...');
	mainClass = new psymb.PClassSymbol(sketchInfo.name, psymb.PType.createAppletClassType());
	mainSymbolTable.addSymbol(mainClass);

	symbolTableVisitor = new SymbolTableVisitor(mainSymbolTable, mainClass);
	tryAddPdeFile(mainSketchFilename);
	
	let fileNames = fs.readdirSync(sketchInfo.path);
	for (let fileName of fileNames) 
	{
		if (fileName.endsWith('.pde') && !fileName.includes(sketchInfo.name))
			tryAddPdeFile(fileName);
	}

	cookPdeContentOffsets();
	workspaceInitialized = true
}

function tryInitializeSketchCode(codeDirectoryPath: string) 
{
	if(!isPathValid(codeDirectoryPath))
		return;

	console.log('Initializing workspace code...');
	let loadedNamespaces : Set<string> = new Set<string>();
	javaModules.loadJarsFromDirectory(codeDirectoryPath, mainSymbolTable.dependencyTable, loadedNamespaces);

	// Adding the custom libraries import aliasses
	for (let procImport of loadedNamespaces)
		mainSymbolTable.addImport(procImport, true, mainSymbolTable.dependencyTable);
}

function tryInitializeProcessing(processingPath:string)
{
	processingInitialized = false;
	if(!isPathValid(processingPath))
	{
		console.error(`Unable to locate processing at the given path ('${processingPath}'). \nMake sure to setup the correct configuration in the Processing extension settings`);
		return;
	}

	let javaSymbolsFilename = processingPath + "java/lib/ct.sym";
	let processingCoreDirectory = processingPath + "core/library/";
	if(!isPathValid(javaSymbolsFilename))
		return;
	if(!isPathValid(processingCoreDirectory))
		return;

	mainSymbolTable.dependencyTable.clear();
	javaModules.loadJavaSymbolsFromFile(javaSymbolsFilename, mainSymbolTable.dependencyTable);
	javaModules.loadJarsFromDirectory(processingCoreDirectory, mainSymbolTable.dependencyTable);

	// Adding all the processing library import aliases
	mainSymbolTable.addImport("java.util", true, mainSymbolTable.dependencyTable);
	mainSymbolTable.addImport("java.io", true, mainSymbolTable.dependencyTable);
	mainSymbolTable.addImport("java.lang", true, mainSymbolTable.dependencyTable);
	mainSymbolTable.addImport("processing.core", true, mainSymbolTable.dependencyTable);
	mainSymbolTable.addImport("processing.data", true, mainSymbolTable.dependencyTable);
	mainSymbolTable.addImport("processing.event", true, mainSymbolTable.dependencyTable);
	mainSymbolTable.addImport("processing.opengl", true, mainSymbolTable.dependencyTable);
	processingInitialized = true;
}

function isPathValid(directoryPath: string): boolean 
{
	try {
	  const stat = fs.statSync(directoryPath);
	  return stat != null;
	} catch (error) {
	  // If an error occurs, it means the directory doesn't exist or there was an issue accessing it.
	  return false;
	}
}

export function prepareSketch(sketchFolder : string)
{
	log.write("prepareSketch Started", log.severity.EVENT);
	initialize(sketchFolder+'/');
}

export async function tryRecompile(logOn:boolean)
{
	if(recompiling || !workspaceInitialized)
		return;

	recompiling = true;

	logPdeChanges = logOn;
	await rebuildReferences();
	// An additional recompile in case changes were made while we compile large amount of files...
	if(dirtyPdeCount > 0)
		await rebuildReferences();
	
	recompiling = false;
}

export async function rebuildReferences()
{
	log.write("Rebuilding definitions...", log.severity.EVENT);
	for (let pdeInfo of getAllPdeInfos()) 
		pdeInfo.tryRebuildSymbolDeclarations();

	log.write("Rebuilding references...", log.severity.EVENT);
	for (let pdeInfo of getAllPdeInfos()) 
		pdeInfo.tryRebuildSymbolReferences();

	await new Promise(resolve => setTimeout(resolve, 200));
	log.write("Sending diagnostics...", log.severity.EVENT);
	for (let pdeInfo of getAllPdeInfos())
		pdeInfo.trySendDiagnostics();
	log.write("Rebuild definitions & references ENDED", log.severity.EVENT);
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
	if (!workspaceInitialized)
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
	if (!workspaceInitialized)
		return;

	let fileName = pathM.basename(uri)
	if (fileName.endsWith('.pde')) 
		tryAddPdeFile(fileName);

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
	if (!workspaceInitialized)
		return;

	let fileName = pathM.basename(uri)
	if (fileName.endsWith('.pde') && pdeMap.has(fileName))
		pdeMap.delete(fileName);
}

/**
 * Appends the name and content of a .pde file (tab)
 * to the content map of the sketch
 * 
 * @param uri Location to the file that needs adding
 */
export function UpdatePdeFromSketch(uri: string) 
{
   if (!workspaceInitialized)
	   return;

   let fileName = pathM.basename(uri)
   if (fileName.endsWith('.pde')) 
	   tryUpdatePdeFile(fileName);

   cookPdeContentOffsets();
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
	if (!workspaceInitialized)
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
	if (!workspaceInitialized)
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
//  export function getLineOffset() : number 
//  {
// 	let adjustOffset = 0;
// 	let behaviourType = preprocessor.getBehavoirType();

// 	if(behaviourType.defaultEnabled)
// 		adjustOffset = pStandards.reduceLineDefaultBehaviour;
// 	else if(behaviourType.methodEnabled)
// 		adjustOffset = pStandards.reduceLineMethodBehaviour;

// 	return adjustOffset
// }

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
// function cookCompilationErrors(pwd: string)
// {
// 	// If one error is fixed it's not popped from stack - check
// 	try 
// 	{  
// 		compileErrors = new Array()
// 		let data = fs.readFileSync(`${__dirname}/compile/error.txt`, 'utf-8')
// 		if(data == '')
// 		{
// 			// No Error on Compilation
// 			log.write(`No error on compilation`, log.severity.INFO)
// 		} 
// 		else if(data.split(`:`)[0] == `Note`)
// 		{
// 			// Compilation warning
// 			log.write(`Compilation warning encountered`, log.severity.WARNING)
// 		} 
// 		else 
// 		{
// 			let tempSplit = data.split('\n')
			
// 			tempSplit.forEach(function(line:string, index: number)
// 			{
// 				if(line.includes(`${pwd}`))
// 				{
// 					let innerSplit = line.split(":");

// 					// Windows paths have a colon after the drive letter
// 					// Shifts the error colon by one in the array
// 					let splitIndex;
// 					if(process.platform === 'win32')
// 						splitIndex = 3;
// 					else
// 						splitIndex = 2;

// 					// Handling line number based on current Behaviour - since preprocessing is done
// 					let errorLineNumber = +innerSplit[splitIndex].replace("L", "") - getLineOffset()

// 					let localIndex = index + 1
// 					let errorMessage = ""
// 					while(true)
// 					{
// 						if (localIndex >= tempSplit.length)
// 							break;
						
// 						else if(tempSplit[localIndex].includes(`${pwd}`) || 
// 							tempSplit[localIndex].includes(`error`) ||
// 							tempSplit[localIndex].includes(`errors`)) 
// 						{
// 							break;
// 						} 
// 						else 
// 						{
// 							errorMessage += `\n ${tempSplit[localIndex]}`
// 							localIndex+=1
// 						}
// 					}
// 					compileErrors.push({lineNumber : errorLineNumber, message: errorMessage})
// 				}
// 			})
// 			// Place a break point
// 			log.write(`Compilation errors encountered`, log.severity.INFO)
// 		}
// 	} catch(e) {
// 		log.write(`Problem with cooking diagnostics`, log.severity.ERROR)
// 		log.write(e, log.severity.ERROR)
// 	}
// }

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

export function getUriFromPdeName(pdeName : string) : lsp.DocumentUri
{
	return getUriFromPath(sketchInfo.path+pdeName);
}

export function getPdeContentInfo(pdeName : string ) : PdeContentInfo | undefined
{
	return pdeMap.get(pdeName);
}

export function updatePdeContent(pdeName : string, newContent : string, linesCount : number)
{
	if (!workspaceInitialized)
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
		pdeInfo = PdeContentInfo.createPdeContentInfo(pdeName, newContent, linesCount);
		pdeMap.set(pdeName, pdeInfo);
	}

	if(offsetsChanged)
		cookPdeContentOffsets();

	markAsRequireRebuild(pdeInfo);

	return pdeInfo;
}

function tryAddPdeFile(pdeFilename : string)
{
	let fileContent = fs.readFileSync(sketchInfo.path+pdeFilename, 'utf-8');
	addPdeContent(pdeFilename, fileContent);
}

function tryUpdatePdeFile(pdeFilename : string)
{
	let fileContent = fs.readFileSync(sketchInfo.path+pdeFilename, 'utf-8');
	let	linesCount : number = fileContent.split(/\r?\n/).length;
	updatePdeContent(pdeFilename, fileContent, linesCount);
}

function addPdeContent(pdeName : string, newContent : string) : PdeContentInfo
{
	//log.write(`loading ${pdeName} content.`, log.severity.EVENT);
	let	linesCount : number = newContent.split(/\r?\n/).length;

	let result : PdeContentInfo = PdeContentInfo.createPdeContentInfo(pdeName, newContent, linesCount);
	pdeMap.set(pdeName, result);
	markAsRequireRebuild(result);
	return result;
}

function markAsRequireRebuild(pdeInfo: PdeContentInfo)
{
	if(pdeInfo.dirty)
		return;
	pdeInfo.markForRecompile();
	dirtyPdeCount++;
}

function markAsRebuildCompleted(pdeInfo: PdeContentInfo)
{
	if(pdeInfo.requireDeclarationsRebuild || pdeInfo.requireReferencesRebuild)
		return;
	dirtyPdeCount--;
}
