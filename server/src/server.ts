import {
	CodeLens,
	CodeLensParams,
	CompletionItem,
	CompletionParams,
	TextDocumentPositionParams,
	Definition,
	DidChangeConfigurationNotification,
	FileChangeType,
	Hover,
	InitializeParams,
	Location,
	ReferenceParams,
	RenameParams,
	WorkspaceEdit,
	createConnection,
	ProposedFeatures,
	DocumentSymbolParams,
	DocumentSymbol,
	TextDocuments,
	TextDocumentsConfiguration,
	TextDocumentSyncKind,
	InitializeResult
} from 'vscode-languageserver/node';

import { TextDocument } from 'vscode-languageserver-textdocument';
import { ProcessingSketch } from "./ProcessingSketch";
import { DocumentSymbols } from "./DocumentSymbols";

import * as completion from './completion';
import * as definition from './definition';
import * as diagnostics from './diagnostics';
import * as hover from './hover';
import * as reference from './references';
import * as log from './scripts/syslogs';
import * as sketch from './sketch';
import * as path from 'path';

export let connection = createConnection(ProposedFeatures.all);
const processingSketch = new ProcessingSketch();

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
export let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;

	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	if(params.workspaceFolders && params.workspaceFolders.length > 0)
		sketch.prepareSketch(params.workspaceFolders[0].uri);

	const result: InitializeResult = 
	  {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ['.']
			},
		  	hoverProvider: true,
			definitionProvider: true,
			codeLensProvider: {
				resolveProvider: true
			},
			referencesProvider: true,
			renameProvider: true,
			documentSymbolProvider: true
		}
	  };
	  if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
		  workspaceFolders: {
			supported: true
		  }
		};
	  }
	  return result;
});

connection.onInitialized(() => {
	log.write(`Server initialized`, log.severity.SUCCES)
	if (hasConfigurationCapability) {
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			log.write('Workspace folder change event received.', log.severity.EVENT);
		});
	}
	documents.all().forEach(AddPdeDoc);
});

function AddPdeDoc(value: TextDocument, index: number, array: TextDocument[])
{
	processingSketch.addCode(value.getText(), value.uri);
}

interface ExampleSettings {
	maxNumberOfProblems: number;
}

const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

let documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	log.write(`Config change event occured`, log.severity.EVENT)
	if (hasConfigurationCapability) {
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.languageServerExample || defaultSettings)
		);
	}

	documents.all().forEach(diagnostics.checkForRealtimeDiagnostics);
});

export function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
	if (!hasConfigurationCapability) {
		return Promise.resolve(globalSettings);
	}
	let result = documentSettings.get(resource);
	if (!result) {
		result = connection.workspace.getConfiguration({
			scopeUri: resource,
			section: 'languageServerExample'
		});
		documentSettings.set(resource, result);
	}
	return result;
}

export let latestChangesInTextDoc: TextDocument

documents.onDidOpen((event: { document: TextDocument; }) => {
	log.write(`File Open / Tab switching occured`, log.severity.EVENT)
	latestChangesInTextDoc = event.document
	//sketch.build(event.document)
	//diagnostics.checkForRealtimeDiagnostics(event.document)
});

documents.onDidClose((e: { document: { uri: string; }; }) => {
	log.write(`File Closed`, log.severity.EVENT)
	documentSettings.delete(e.document.uri);
});

let bufferInProgress = false

documents.onDidChangeContent((change: { document: TextDocument; }) => {
	log.write(`Content changed`, log.severity.EVENT)
	latestChangesInTextDoc = change.document
	if (!bufferInProgress)
		initPreProcessDiagnostics()
});


async function initPreProcessDiagnostics() 
{
	log.write(`initPreProcessDiagnostics`, log.severity.EVENT)
	bufferInProgress = true
	//await sleep(300);
	//sketch.build(latestChangesInTextDoc)
	//diagnostics.checkForRealtimeDiagnostics(latestChangesInTextDoc)
	bufferInProgress = false
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

connection.onDidChangeWatchedFiles(_change => {
	log.write('Files in workspace have changed', log.severity.EVENT);

	for (let i = 0; i < _change.changes.length; i++) 
	{
		const change = _change.changes[i];
		
		switch (change.type) {
		  case FileChangeType.Created:
			sketch.addTab(change.uri)
			break;
		  case FileChangeType.Deleted:
			sketch.removeTab(change.uri)
			break;
		  default:
			// do nothing
			break;
		}
	}
});

// Implementation for `goto definition` goes here
connection.onDefinition(
	(_textDocumentParams: TextDocumentPositionParams): Definition | null => {
		return definition.scheduleLookUpDefinition(_textDocumentParams.textDocument.uri, _textDocumentParams.position.line, _textDocumentParams.position.character)
	}
)

// Implementation for finding references
connection.onReferences(
	(_referenceParams: ReferenceParams): Location[] | null => {
		// _referenceParams.position.line, _referenceParams.position.character -> lineNumber, column from the arguments sent along with the command in the code lens
		return reference.scheduleLookUpReference(_referenceParams)
	}
)

// Refresh codeLens for every change in the input stream
// Implementation of `code-lens` goes here
connection.onCodeLens(
	(_codeLensParams: CodeLensParams): CodeLens[] | null => {
		// return lens.scheduleLookUpLens(_codeLensParams)
		return null
	}
)

// Implementation for Renaming References - WIP
connection.onRenameRequest(
	(_renameParams: RenameParams): WorkspaceEdit | null => {
		return null
	}
)

// Perform auto-completion -> Deligated tp `completion.ts`
connection.onCompletion(
	(_textDocumentParams: CompletionParams): CompletionItem[] => {
		return completion.decideCompletionMethods(_textDocumentParams, latestChangesInTextDoc)
	}
);

// Completion Resolved suspended for now -> TODO: Refactoring required with real data points
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		// use `item.label`
		item.detail = 'Field Details';
		item.documentation = 'Hover to know Field Details';
		return item;
	}
);

// Implementation for Hover request
connection.onHover(	(params: TextDocumentPositionParams): Hover | null => 
{
	let hoverResult: Hover | null = null;
	//let compileErrors : sketch.CompileError[] = sketch.getCompileErrors();
	
	// if (compileErrors.length == 0) {
	// 	hoverResult = hover.scheduleHover(params)
	// } else {
	// 	compileErrors.forEach(function (compileError) {
	// 		let errorLine = compileError.lineNumber
	// 		hoverResult = hover.scheduleHover(params, errorLine)
	// 	})
	// }
	//log.write("Hover Invoked, result: "+hoverResult?.contents, log.severity.EVENT)
	return hoverResult
});

// When the client requests document symbols
connection.onDocumentSymbol((params: DocumentSymbolParams) => 
{
	const pdeName : string = path.basename(sketch.getPathFromUri(params.textDocument.uri));
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo)
		return null;

	let offset : number = pdeInfo.compiledLineStart;
	let tokens = pdeInfo.tokens;
	if(!tokens)
		return null;

	log.write("Preparing to show document symbols for: "+params.textDocument.uri, log.severity.EVENT);
	let result: DocumentSymbol [] = [];
	DocumentSymbols.generateSymbolsFromArray(tokens, offset, result);
	return result;
});


documents.listen(connection);
connection.listen();
