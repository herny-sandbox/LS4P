import * as sketch from './sketch'
import * as parseUtils from './astutils'
import * as log from './scripts/syslogs'
import { Definition, LocationLink, Location, Range } from 'vscode-languageserver'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { TerminalNode } from 'antlr4ts/tree'
import * as symbols from 'antlr4-c3'
import { DocumentUri } from 'vscode-languageserver-textdocument'
import * as symb from './symbols'

export async function scheduleLookUpDefinition(pdeName: string, lineNumber: number, charNumber: number): Promise<Definition | null>
{
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return null;

	let symbolInterest : symbols.BaseSymbol | undefined = await parseUtils.findFromSymbolsAtPosition(pdeInfo.symbols, lineNumber+1, charNumber);
	if(!symbolInterest || !symbolInterest.context)
	{
		log.write("unable to find the symbol context for line "+(lineNumber+1)+" pos: "+charNumber, log.severity.ERROR);
		return [];
	}

	let parseNode : ParseTree | null = parseUtils.findIdentifierAtPosition(symbolInterest.context, lineNumber + 1, charNumber);
	if(!parseNode || !(parseNode instanceof TerminalNode))
		return null;

	let word : string = parseNode.text;
	let definition : symbols.BaseSymbol | undefined = await symbolInterest.resolve(word);
	if(!definition)
	{
		log.write("unable to find the symbol definition for "+ word +" line "+(lineNumber+1)+" pos: "+charNumber, log.severity.ERROR);
		return null;
	}
	if(definition instanceof symbols.TypedSymbol )
	{
		let typedSymbol : symbols.TypedSymbol = definition;
		let pdeName : string | undefined = symb.findPdeName(typedSymbol);
		
		if(typedSymbol.type && typedSymbol.context && pdeName)
		{
			let targetUri: DocumentUri = sketch.getUriFromPdeName(pdeName);
			
			let targetRange: Range = parseUtils.calcRangeFromParseTree(typedSymbol.context);
			//let targetSelectionRange: Range;
			//let originSelectionRange: Range | undefined;

			log.write("LookUpDefinition for: " + word + "(" + typedSymbol.type.name + ")" + "", log.severity.EVENT);

			return Location.create(targetUri, targetRange );
		}
	}
	// // Default Range value
	let finalDefinition: Definition | null = null
	return finalDefinition;
}
