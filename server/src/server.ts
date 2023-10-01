import {
	CodeLens,
	CodeLensParams,
	CompletionItem,
	CompletionParams,
	CompletionContext,
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
	TextDocumentSyncKind,

	InitializeResult
} from 'vscode-languageserver/node';
import { DidChangeWatchedFilesNotification, WatchKind } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
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
//const processingSketch = new ProcessingSketch();

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
export let hasDiagnosticRelatedInformationCapability: boolean = false;

connection.onInitialize((params: InitializeParams) => {
	let capabilities = params.capabilities;
	let initOptions = params.initializationOptions;

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
	if(initOptions)
	{
		const processingPath: string | undefined = initOptions.processingPath;
		console.log(`processingPath: ${processingPath}`);
		sketch.setProcessingPath(processingPath);
	}
	if(params.workspaceFolders && params.workspaceFolders.length > 0)
	{
		sketch.prepareSketch(params.workspaceFolders[0].uri);
		sketch.tryRecompile(false);
	}

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

	connection.client.register(DidChangeWatchedFilesNotification.type, {
		watchers: [
		  {
			globPattern: '**/*.pde', // Replace 'your-extension' with the actual file extension
			kind: WatchKind.Change | WatchKind.Create | WatchKind.Delete, // You can specify other kinds of events as needed
		  },
		],
	  });

	if (hasWorkspaceFolderCapability) {



		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			log.write('Workspace folder change event received.', log.severity.EVENT);
		});
	}
});

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// Settings Section
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
interface ExampleSettings {
	maxNumberOfProblems: number;
}

const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

let documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	// log.write(`Config change event occured`, log.severity.EVENT);
	// if (change.settings && change.settings.processing) {
    //     const processingPath : string = change.settings.processing.path;
	// 	const maxNumberOfProblems : number = change.settings.processing.maxNumberOfProblems;
    //     // Now you can use mySettingValue in your server logic
    //     // ...
	// 	log.write(`Config change event occured, processingPath: ${processingPath}`, log.severity.EVENT);
	// 	log.write(`Config change event occured, maxNumberOfProblems: ${maxNumberOfProblems}`, log.severity.EVENT);
    // }
	// if (hasConfigurationCapability) {
	// 	documentSettings.clear();
	// } else {
	// 	globalSettings = <ExampleSettings>(
	// 		(change.settings.processing || defaultSettings)
	// 	);
	// }

	//documents.all().forEach(diagnostics.checkForRealtimeDiagnostics);
});

// export function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
// 	if (!hasConfigurationCapability) {
// 		return Promise.resolve(globalSettings);
// 	}
// 	let result = documentSettings.get(resource);
// 	if (!result) {
// 		result = connection.workspace.getConfiguration({
// 			scopeUri: resource,
// 			section: 'languageServerExample'
// 		});
// 		documentSettings.set(resource, result);
// 	}
// 	return result;
// }

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// DidOpen/DidClose/DidChange Document
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

//export let latestChangesInTextDoc: TextDocument

documents.onDidOpen((event: { document: TextDocument; }) => {
	//log.write(`File Open / Tab switching occured`, log.severity.EVENT);
	//const pdeName : string = path.basename(sketch.getPathFromUri(event.document.uri));
	//sketch.updatePdeContent(pdeName, event.document.getText(), event.document.lineCount );
});

documents.onDidClose((e: { document: { uri: string; }; }) => {
	// log.write(`File Closed`, log.severity.EVENT);
	// const pdeName : string = path.basename(sketch.getPathFromUri(e.document.uri));
	// let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	// if(!pdeInfo)
	// 	return;

	// pdeInfo.syntaxTokens = null;
});

//let sketchRefreshInProgress = false

documents.onDidChangeContent((change: { document: TextDocument; }) => {
	// Not an actual change? we skip it since we already have it
	if(change.document.version == 1)
		return;

	log.write(`Content changed`, log.severity.EVENT);

	//if( document instanceof FullTextDocument )
	const pdeName : string = path.basename(sketch.getPathFromUri(change.document.uri));
	sketch.updatePdeContent(pdeName, change.document.getText(), change.document.lineCount);
	sketch.tryRecompile(true);
});


// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------


// async function notifySketchChanged() 
// {
// 	log.write(`notifySketchChanged`, log.severity.EVENT)
// 	sketchRefreshInProgress = true
// 	await sleep(300);

// 	sketch.rebuildReferences();
// 	//sketch.startPreprocessing();
// 	//diagnostics.checkForSyntaxDiagnostics(globalSettings.maxNumberOfProblems);
// 	//try
// 	//{
// 		//sketch.build();
// 		//diagnostics.checkForRealtimeDiagnostics(globalSettings.maxNumberOfProblems);
// 	//}catch(Exception){}
// 	sketchRefreshInProgress = false
// }

// function sleep(ms: number) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

connection.onDidChangeWatchedFiles(_change => {
	log.write('Files in workspace have changed', log.severity.EVENT);

	for (let i = 0; i < _change.changes.length; i++) 
	{
		const change = _change.changes[i];
		
		switch (change.type) {
		  case FileChangeType.Created:
			sketch.addPdeToSketch(change.uri)
			sketch.tryRecompile(true);
			break;
		  case FileChangeType.Deleted:
			sketch.removePdeFromSketch(change.uri)
			sketch.tryRecompile(true);
			break;
		  case FileChangeType.Changed:
			sketch.UpdatePdeFromSketch(change.uri);
			sketch.tryRecompile(true);
			break;
		  default:
			// do nothing
			break;
		}
	}
});

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// SYMBOL DEFINITION & REFERENCES
// ================================================================================================

// Implementation for `goto definition` goes here
connection.onDefinition( async (params: TextDocumentPositionParams): Promise<Definition | null> => {
		const pdeName : string = path.basename(sketch.getPathFromUri(params.textDocument.uri));
		let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
		if(!pdeInfo || !pdeInfo.syntaxTokens)
			return null;

		await waitForCodeRebuild(pdeInfo);		
		
		return definition.scheduleLookUpDefinition(pdeInfo, params.position.line+1, params.position.character);
	}
)

// Implementation for finding references
connection.onReferences( async (params: ReferenceParams): Promise<Location[] | null> => {
		// _referenceParams.position.line, _referenceParams.position.character -> lineNumber, column from the arguments sent along with the command in the code lens
		const pdeName : string = path.basename(sketch.getPathFromUri(params.textDocument.uri));
		let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
		if(!pdeInfo || !pdeInfo.syntaxTokens)
			return null;

		await waitForCodeRebuild(pdeInfo);

		return reference.scheduleLookUpReference(pdeInfo, params.position.line+1, params.position.character)
	}
)

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// CODE LENS
// ================================================================================================

// Refresh codeLens for every change in the input stream
// Implementation of `code-lens` goes here
connection.onCodeLens( (_codeLensParams: CodeLensParams): CodeLens[] | null => {
		//return lens.scheduleLookUpLens(_codeLensParams)
		return null
	}
)

// Implementation for Renaming References - WIP
connection.onRenameRequest( (_renameParams: RenameParams): WorkspaceEdit | null => {
		return null
	}
)

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// CODE COMPLETION
// ================================================================================================

// Perform auto-completion -> Deligated tp `completion.ts`
connection.onCompletion( async (params: CompletionParams): Promise<CompletionItem[]> => 
{
	const pdeName : string = path.basename(sketch.getPathFromUri(params.textDocument.uri));
	const line : number = params.position.line;
	const posInLine : number = params.position.character;
	const context : CompletionContext | undefined = params.context;

	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return [];

	await waitForCodeRebuild(pdeInfo);

	return await completion.collectCandidates(pdeInfo, line+1, posInLine, context?.triggerKind??1)
});

// Completion Resolved suspended for now -> TODO: Refactoring required with real data points
connection.onCompletionResolve( async (item: CompletionItem): Promise<CompletionItem> => 
{
	return completion.fillCompletionItemDetails(item);
});


// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================


// Implementation for Hover request
connection.onHover( async(params: TextDocumentPositionParams): Promise<Hover | null> => 
{
	//let hoverResult: Hover | null = null;
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
	//return hoverResult;
	const pdeName : string = path.basename(sketch.getPathFromUri(params.textDocument.uri));
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo)
		return null;

	await waitForCodeRebuild(pdeInfo);

	return hover.scheduleHoverInfo(pdeInfo, params.position.line+1, params.position.character);
});

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// When the client requests document symbols
connection.onDocumentSymbol(async (params: DocumentSymbolParams) => 
{
	const pdeName : string = path.basename(sketch.getPathFromUri(params.textDocument.uri));
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo)
		return null;

	await waitForCodeRebuild(pdeInfo);

	let offset : number = pdeInfo.linesOffset;
	let tokens = pdeInfo.syntaxTokens;
	if(!tokens)
		return null;

	log.write("Preparing to show document symbols for: "+pdeName, log.severity.BEHAVIOR);
	let result: DocumentSymbol [] = [];
	DocumentSymbols.generateSymbolsFrom(tokens, 0, result);
	return result;
});


documents.listen(connection);
connection.listen();


async function waitForCodeRebuild(pdeInfo: sketch.PdeContentInfo) : Promise<void> {
	while( pdeInfo.isBeingRebuilt() ) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
}
