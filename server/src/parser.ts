import * as log from './scripts/syslogs'
import { ParseTree, } from 'antlr4ts/tree/ParseTree'
import { PredictionMode } from 'antlr4ts/atn'
import { CharStreams, CommonTokenStream, BailErrorStrategy, ParserRuleContext } from 'antlr4ts'

import { ProcessingParserListener } from "./grammer/ProcessingParserListener";
import { ProcessingParserVisitor } from "./grammer/ProcessingParserVisitor";
import { ProcessingErrorStrategy } from './grammer/ProcessingErrorStrategy'
import { ProcessingErrorListener, clearSyntaxDiagnostics, IDiagnosticReporter } from "./grammer/ProcessingErrorListener";
import { ProcessingLexer } from "./grammer/ProcessingLexer";
import { ProcessingParser, ProcessingSketchContext } from "./grammer/ProcessingParser";

export let currentParser : ProcessingParser;
let errorListener : ProcessingErrorListener;

/**
 * Parses code to create a AST
 * 
 * @param processedText code to generate a parsetree from
 * @returns Parse tree
 */
export function parseAST(processedText: string) : [ParseTree, ParseTree][] 
{
	let ast = parse(processedText);
	return buildTokenArray(ast);
}

/**
 * Builds the token array
 *  
 * @param ast processing sketch context to generate a parsetree from
 * @returns Parse tree
 */
export function buildTokenArray( ast : ParserRuleContext | undefined ) : [ParseTree, ParseTree][] 
{
	let tokenArray: [ParseTree, ParseTree][] = new Array();
	let _tokenCounter = -1
	if(ast)
		extractTokens(ast);
	// for(let i = 0; i < ast.childCount; i++)
	// 	extractTokens(ast.children![i])

	log.write("Parse Tree constructed", log.severity.SUCCES)
	return tokenArray

	function extractTokens(gotOne: ParseTree)
	{
		for(let j = 0; j < gotOne.childCount; j++)
		{
			let child : ParseTree =  gotOne.getChild(j);
			if(child.childCount == 0)
			{
				_tokenCounter +=1
				tokenArray[_tokenCounter] = [child,gotOne]
			}
			extractTokens(child)
		}
	}
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
	let currentTempAST: [ParseTree][] = new Array()
	let tempCounter = -1

	//Extract tokens
	let currentTokens = parse(line);

	for (let i = 0; currentTokens && i < currentTokens.childCount; i++) {
		currentLineASTExtract(currentTokens.children![i])
	}

	let map : [string, number, number][] = new Array()
	let mapCount = 0
	//Cook map
	currentTempAST.forEach(function(word) {
		map[mapCount] = [word[0].text, line.indexOf(word[0].text), line.indexOf(word[0].text) + word[0].text.length]
		mapCount += 1
	})

	return map

	function currentLineASTExtract(gotOne: ParseTree){
		tempCounter += 1
		currentTempAST[tempCounter] = [gotOne]
		for(let j=0;j<gotOne.childCount;j++){
			currentLineASTExtract(gotOne.getChild(j))
		}
	}
}

/**
 * "Overide" function for java-ast parser. Mutes the false errors during parsing.
 * 
 * @param source string to be parsed
 * @returns Compilation unit
 */
export function parse(source : string, diagnosticReporter?:IDiagnosticReporter|undefined) : ParserRuleContext | undefined
{
	//let consoleOriginal = console
	try 
	{
		clearSyntaxDiagnostics();

		//console = redirectConsole(console)
		const chars = CharStreams.fromString(source);
		const lexer = new ProcessingLexer(chars);
		let tokens = new CommonTokenStream(lexer);
		currentParser = new ProcessingParser(tokens);
		currentParser.interpreter.setPredictionMode(PredictionMode.SLL);
		// we don't want error messages or recovery during first try
		currentParser.removeErrorListeners();
		currentParser.errorHandler = new BailErrorStrategy();

		let compilationUnit : ParserRuleContext;

		// 
		//currentParser.removeErrorListeners();
		// currentParser.addErrorListener(errorListener);
		try {
			compilationUnit = currentParser.processingSketch();
		} catch (ex) {
			// thrown by BailErrorStrategy
			tokens = new CommonTokenStream(lexer);
			//tokens.reset();
			// rewind input stream
			currentParser.reset();
			// back to standard listeners/handlers
			if(diagnosticReporter)
			{
				errorListener = new ProcessingErrorListener(diagnosticReporter);
				currentParser.addErrorListener(errorListener);
				currentParser.errorHandler = new ProcessingErrorStrategy(diagnosticReporter);
			}
			// full now with full LL(*)
			currentParser.interpreter.setPredictionMode(PredictionMode.LL_EXACT_AMBIG_DETECTION);
			try
			{
				compilationUnit = currentParser.activeProcessingSketch();
			}
			catch(ex2)
			{
				return;
			}
		}

		//console = consoleOriginal
		return compilationUnit
	}
	catch(e)
	{
		//console = consoleOriginal
		log.write("Parsing failed", log.severity.ERROR)
		log.write(e, log.severity.ERROR)
	}
}

/**
 * Redirects console output. Is needed to have no output during parsing @see parse 
 * Not the niced thing but the only way i could think of. 
 * An issue (#44) is opend to clean this up
 * 
 * @param obj console instance
 * @returns mutated console
 */
function redirectConsole(obj : any)
{
    return new Proxy(obj, {
        get(target, methodName, receiver) {
            // get origin method
            const originMethod = target[methodName];

            return function(...args : any) {
			};
        }
    });
}

// class SintaxErrorListener extends BaseErrorListener
// {

// }