// ProcessingParser.ts
import * as ast from 'java-ast';
//import * as P from "parsimmon";
import * as vscode from 'vscode-languageserver/node';
//import { ProcessingClass, ProcessingFunction, ProcessingVariable } from "./ProcessingSymbol";


export class ProcessingParser 
{
	// private static variableParser: P.Parser<ProcessingVariable> = P.seqMap(
	// 	P.regexp(/[a-zA-Z_]\w*/),
	// 	P.optWhitespace.then(P.string(":")).then(P.optWhitespace).then(P.regexp(/[a-zA-Z_]\w*/)),
	// 	(name, type) => new ProcessingVariable(name, type, "", 0)
	// );
	
	// private static functionParser: P.Parser<ProcessingFunction> = P.seqMap(
	// 	P.string("void").then(P.optWhitespace).then(P.regexp(/[a-zA-Z_]\w*/)),
	// 	P.optWhitespace
	// 	  .then(P.string("("))
	// 	  .then(P.optWhitespace)
	// 	  .then(P.sepBy(P.regexp(/[a-zA-Z_]\w*/), P.string(",")))
	// 	  .skip(P.optWhitespace)
	// 	  .skip(P.string(")")),
	// 	(name, parameters) => new ProcessingFunction(name, parameters, "", 0)
	// );
	
	// private static classParser: P.Parser<ProcessingClass> = P.seqMap(
	// 	P.string("class").then(P.optWhitespace).then(P.regexp(/[a-zA-Z_]\w*/)),
	// 	(name) => new ProcessingClass(name, "", 0)
	// );
	
	// static parse(code: string, file: string): {
	// 	variables: ProcessingVariable[];
	// 	functions: ProcessingFunction[];
	// 	classes: ProcessingClass[];
	// } {
	// 	const variableNames: ProcessingVariable[] = [];
	// 	const functionNames: ProcessingFunction[] = [];
	// 	const classNames: ProcessingClass[] = [];
	
	// 	const parser = P.alt(
	// 	  this.variableParser.map((variable) => variableNames.push(variable)),
	// 	  this.functionParser.map((func) => functionNames.push(func)),
	// 	  this.classParser.map((cls) => classNames.push(cls))
	// 	).many();
	
	// 	parser.parse(code);
	
	// 	return { variables: variableNames, functions: functionNames, classes: classNames };
	// }

	static ParseSymbols(code: string): vscode.DocumentSymbol[] 
	{
		try {
			const symbols: vscode.DocumentSymbol[] = [];
			// Parse the .pde code into an abstract syntax tree (AST)
			const root : ast.ParseTree = ast.parse(code);
			// Traverse the AST to extract DocumentSymbols
			if(root)
				ProcessingParser.Traverse(root, symbols);
	
			return symbols;
		} catch (error) {
			console.error('Error parsing the code:', error);
			return [];
		}
	}

	private static Traverse(node: ast.ParseTree, symbols: vscode.DocumentSymbol[]): void
	{
		// If the node is a class or interface declaration
		if (node instanceof  ast.ClassDeclarationContext)
		{
			const className = node.IDENTIFIER().text;

			const startPos = vscode.Position.create(node.start.line, node.start.charPositionInLine);
			const endPos = vscode.Position.create(node.stop?.line ?? startPos.line, node.stop?.charPositionInLine ?? startPos.character);
			const symbolRange = vscode.Range.create(startPos, endPos);
			const symbol = vscode.DocumentSymbol.create(className, undefined, vscode.SymbolKind.Class, symbolRange, symbolRange);
			
			symbols.push(symbol);
		}
		else if (node instanceof  ast.InterfaceDeclarationContext)
		{

		}

		// Recursively traverse child nodes
		for (let i = 0; i < node.childCount; i++) 
		{
			const child : ast.ParseTree = node.getChild(i, ast.CompilationUnitContext);
			if(child)
				ProcessingParser.Traverse(child, symbols);
		}
	}
}
