import { DefaultErrorStrategy, RecognitionException, Token, CommonToken, Recognizer, TokenStream, Parser } from 'antlr4ts';
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ProcessingParser } from "./ProcessingParser";
import { IntervalSet } from "antlr4ts/misc/IntervalSet";
import { IDiagnosticReporter } from './ProcessingErrorListener'
import * as ls from 'vscode-languageserver';

let recoveryTokens = new IntervalSet();
//recoveryTokens.add(ProcessingLexer.SEMI, ProcessingLexer.RBRACE, ProcessingLexer.EOF)

export class ProcessingErrorStrategy extends DefaultErrorStrategy 
{
	reporter:IDiagnosticReporter|undefined;

    constructor(reporter:IDiagnosticReporter|undefined) {
        super();
		this.reporter=reporter;
    }

	recover(recognizer: ProcessingParser, e: RecognitionException): void {
    //     let input = recognizer.inputStream;
    //     let tokens = recognizer.getExpectedTokens();

    //     // Check if the error is due to a missing semicolon
    //     if (this.isMissingSemicolonError(e)) {
    //         console.error('Missing semicolon error detected.');
    //         // Handle missing semicolon error differently (e.g., add a semicolon)
    //         this.handleMissingSemicolon(tokens);
    //         return;
    //     }

        // Handle other syntax errors using the default recovery strategy
        super.recover(recognizer, e);
    }

	// // Custom logic to check for missing semicolon error
	// private isMissingSemicolonError(e: RecognitionException): boolean {
	// 	const offendingToken = e.getOffendingToken();
	// 	// Add your logic to detect missing semicolon error here
	// 	// For example, you can check if the offending token is of a certain type or context
	// 	// Return true if it's a missing semicolon error, false otherwise
	// 	return false;
	// }

	// // Custom logic to handle missing semicolon error
	// private handleMissingSemicolon(tokens: Token[]): void {
	// 	// Add your logic to handle missing semicolon error here
	// 	// For example, you can insert a semicolon token into the token stream
	// 	// to recover from the error
	// }

	reportMissingToken(recognizer: Parser) 
	{
        if (this.inErrorRecoveryMode(recognizer))
            return;
        
        this.beginErrorCondition(recognizer);
        let t = recognizer.currentToken;
        let expecting = this.getExpectedTokens(recognizer);
        let msg = "missing " + expecting.toStringVocabulary(recognizer.vocabulary) +
            " at " + this.getTokenErrorDisplay(t);
        
		let initLine = t.line;
		let initPos = t.charPositionInLine;
		let range : ls.Range | undefined;
		if(recognizer instanceof ProcessingParser)
		{
			initLine = recognizer.ruleContext._start.line-1;
			initPos = recognizer.ruleContext._start.charPositionInLine + recognizer.ruleContext.text.length+1;
		}
			
		range = ls.Range.create(initLine, initPos, t.line, t.charPositionInLine)
		if(this.reporter)
			this.reporter.notifyDiagnosticRange(msg, range, ls.DiagnosticSeverity.Error);
    }

    // sync(recognizer: Recognizer<Token, ParserATNSimulator>): void 
	// {
    //     // Override the sync method to disable synchronization
    // }
}