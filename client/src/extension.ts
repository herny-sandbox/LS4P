import * as path from 'path';
import * as vscode from 'vscode';
import * as childProcess from 'child_process';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) 
{
	console.log("Processing Client activation");
	let serverModule = context.asAbsolutePath( path.join('server', 'out', 'server.js') );
	
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }; // '--inspect-brk=6009'] };

	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	const config : vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
	//config.inspect
	const userProcessingPath: string = config.get('processing.path', "");
	console.log(`Processing path: ${userProcessingPath}`)
	
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'Processing' }],
		initializationOptions: {
			processingPath: userProcessingPath, // Pass your string here
		},
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	client = new LanguageClient(
		'processingLanguageServer',
		'Processing Language Server',
		serverOptions,
		clientOptions
	);

	let disposable = vscode.commands.registerCommand('extension.processing', () => {
		// Running the Sketch entered in Extension Host
		vscode.window.showInformationMessage(`Running Processing Sketch.!`);
		try{
			// exec(`mkdir client/out/class`)
			let workspacePath = vscode.workspace.workspaceFolders[0];
			childProcess.exec(`cp -a ${workspacePath}/** ${__dirname}/class`)
			childProcess.exec(`cp ${__dirname.substring(0,__dirname.length-11)}/server/out/compile/** ${__dirname}/class`)
			childProcess.exec(`cd ${__dirname.substring(0,__dirname.length-11)}/client/out/class ; java -classpath ${__dirname.substring(0,__dirname.length-11)}/server/src/processing/jar/core.jar: ProcessingDefault`)
		} catch(e) {
			vscode.window.showInformationMessage(`Error occured while running sketch.!`);
		}

	});

	let referenceDisposable = vscode.commands.registerCommand('processing.command.findReferences', (...args: any[]) => {
		vscode.commands.executeCommand('editor.action.findReferences', vscode.Uri.file(args[0].uri.substring(7,args[0].uri.length)), new vscode.Position(args[0].lineNumber,args[0].column));
	})

	//context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: 'Processing' }, yourDocumentSymbolProvider));
	context.subscriptions.push(disposable);
	context.subscriptions.push(referenceDisposable)

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
