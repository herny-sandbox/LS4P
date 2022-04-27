import {
	TextDocument,
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { ConstructorDeclarationContext, ClassDeclarationContext } from 'java-ast/dist/parser/JavaParser';
import { ErrorNode } from 'antlr4ts/tree/ErrorNode';
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import * as server from './server'
import * as parser from './parser'
import * as preProcessingClass from './preprocessing'
import * as pStandards from './grammer/terms/preprocessingsnippets'
import * as log from './scripts/syslogs'
import * as sketch from './sketch';

const fs = require('fs');

// Diagnostics report based on Error Node
export async function checkForRealtimeDiagnostics(processedTextDocument: TextDocument): Promise<void> {
	let settings = await server.getDocumentSettings(processedTextDocument.uri);
	let problems = 0;
	let errorLine : number = 0
	let errorDocName : string = ''
	let errorDocUri : string = ''

	//Create a diagnostic report per .pde file (tab)
	let fileDiagnostics = new Map<string,  Diagnostic[]>()
	let fileNames = sketch.getFileNames();
	if(fileNames) {
		fileNames.forEach(function(key : string){
			let emptyDiag : Diagnostic[] = []

			fileDiagnostics.set(key, emptyDiag)
		})
	}
	
	sketch.errorNodeLine.forEach(function(javaErrorLine, index){
		// Get the real error line number
		if (sketch.transformMap.get(javaErrorLine)) {
			errorLine = sketch.transformMap.get(javaErrorLine)!.lineNumber
			errorDocName =  sketch.transformMap.get(javaErrorLine)!.fileName
			errorDocUri = sketch.getInfo().uri+errorDocName
		}

		let diagnostics = fileDiagnostics.get(errorDocName);

		if(problems < settings.maxNumberOfProblems && diagnostics){
			problems++;
			let diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Error,
				range: {
					// Fix position Values
					start: {
						line: errorLine-1,
						character: 0
					},
					end: {
						line: errorLine-1,
						character: 200
					}
				},
				message: `Error found`,
				source: `in Source File`
			}
			if (server.hasDiagnosticRelatedInformationCapability) {
				diagnostic.relatedInformation = [
					{
						location: {
							uri: errorDocUri,
							range: Object.assign({}, diagnostic.range)
						},
						message: `${sketch.errorNodeReasons[index]}`
					}
				];
			}
			diagnostics.push(diagnostic);
			fileDiagnostics.set(errorDocName, diagnostics)
		}
	})

	//Send all diagnostic reports to the client
	for (let [file, diagnostics] of fileDiagnostics)  {
		let fileUri = sketch.getInfo().uri+file
		server.connection.sendDiagnostics({uri: fileUri, diagnostics})
	}
	
}