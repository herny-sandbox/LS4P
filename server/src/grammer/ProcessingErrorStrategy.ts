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
    }

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