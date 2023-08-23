import * as log from '../scripts/syslogs'

import { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';
import { Diagnostic, DiagnosticSeverity,} from 'vscode-languageserver';

export interface ParseDiagnosticError
{
	lineNumber: number;
	charPositionInLine: number;
	msg: string;
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

export class ProcessingErrorListener implements ANTLRErrorListener<any> 
{
	syntaxError<T>(
	  recognizer: Recognizer<T, any>,
	  offendingSymbol: T | undefined,
	  line: number,
	  charPositionInLine: number,
	  msg: string,
	  e: RecognitionException | undefined ): void 
	{
		//log.write("ERROR !!!!");
		fileSyntaxDiagnostics.push({msg: msg, lineNumber: line, charPositionInLine: charPositionInLine })
		//log.write(`Parsing error at line ${line}:${charPositionInLine} - ${msg}`, log.severity.ERROR)
	  	//console.error(`Parsing error at line ${line}:${charPositionInLine} - ${msg}`);
	}
  }
