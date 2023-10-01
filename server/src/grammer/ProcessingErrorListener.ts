import * as log from '../scripts/syslogs'

import { ANTLRErrorListener, RecognitionException, Recognizer, Token } from 'antlr4ts';
import { Diagnostic, DiagnosticSeverity, Range} from 'vscode-languageserver';
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { ProcessingParser } from './ProcessingParser';

export interface ParseDiagnosticError
{
	lineNumber: number;
	charPositionInLine: number;
	msg: string;
}

export interface IDiagnosticReporter
{
	notifyDiagnostic(msg:string, node?:ParseTree|undefined, severity?:DiagnosticSeverity ) : void;
	notifyDiagnosticRange(msg:string, rg:Range, severity?:DiagnosticSeverity ) : void;
}


let fileSyntaxDiagnostics : ParseDiagnosticError[] = [];

export function clearSyntaxDiagnostics()
{
	fileSyntaxDiagnostics = [];
}

export function getSyntaxDiagnostics() : ParseDiagnosticError[]
{
	return fileSyntaxDiagnostics;
}

export class ProcessingErrorListener implements ANTLRErrorListener<Token> 
{
	reporter:IDiagnosticReporter|undefined;
	constructor(reporter:IDiagnosticReporter)
	{
		this.reporter = reporter;
	}
	
	syntaxError<T extends Token>(
	  recognizer: Recognizer<T, any>,
	  offendingSymbol: T | undefined,
	  line: number,
	  charPositionInLine: number,
	  msg: string,
	  e: RecognitionException | undefined ): void 
	{
		//log.write("ERROR !!!!");
		let symbol : ParseTree | undefined;
		if(recognizer instanceof ProcessingParser)
			symbol = recognizer.ruleContext;
		if(this.reporter)
			this.reporter.notifyDiagnostic(msg, symbol, DiagnosticSeverity.Error);
		//fileSyntaxDiagnostics.push({msg: msg, lineNumber: line, charPositionInLine: charPositionInLine })
		//log.write(`Parsing error at line ${line}:${charPositionInLine} - ${msg}`, log.severity.ERROR)
	  	//console.error(`Parsing error at line ${line}:${charPositionInLine} - ${msg}`);
	}
  }
