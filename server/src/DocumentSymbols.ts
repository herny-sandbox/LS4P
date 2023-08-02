import * as parser from './parser'
import * as vscode from 'vscode-languageserver/node';
import * as jp from 'java-ast/dist/parser/JavaParser';
import { ParserRuleContext, Token } from 'antlr4ts';
import { ParseTree } from 'antlr4ts/tree/ParseTree'

export class DocumentSymbols 
{
	static ParseSymbols(code: string) : vscode.DocumentSymbol[]
	{
		let result: vscode.DocumentSymbol [] = [];
		let context : jp.CompilationUnitContext = parser.parse(code);
		let declarations : jp.TypeDeclarationContext[] = context.typeDeclaration();
		for (let i = 0; i < declarations.length; i++)
		{
			let symbol = DocumentSymbols.TokenToSymbol(declarations[i], 0);
			if(symbol)
				result.push(symbol);
		}
		return result;
	}



	static generateSymbolsFromArray(nodes : ParseTree[], offset : number, toFill: vscode.DocumentSymbol[]) : void
	{
		for (let i = 0; i < nodes.length; i++) 
			DocumentSymbols.generateSymbolsFrom(nodes[i], offset, toFill);
	}

	static generateSymbolsFrom(node : ParseTree, offset : number,  toFill: vscode.DocumentSymbol[]) : void
	{
		let symbol = DocumentSymbols.TokenToSymbol(node, offset);
		if(symbol)
			toFill.push(symbol);
		else
		{
			for(let i =0; i < node.childCount; i++)
				DocumentSymbols.generateSymbolsFrom(node.getChild(i), offset, toFill);
		}
	}

	static TokenToSymbol(node : ParseTree, offset : number) : vscode.DocumentSymbol | undefined
	{
		if(node instanceof jp.ClassDeclarationContext) 
		{
			//let childSymbols: vscode.DocumentSymbol [] | undefined = DocumentSymbols.ParseSymbolChilds(node.classBody());
			let ext : string = node.typeType()?.text ?? "";
			let childSymbols : vscode.DocumentSymbol [] = [];
			DocumentSymbols.generateSymbolsFrom(node.classBody(), offset, childSymbols);
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Class, node.IDENTIFIER().text, ext, childSymbols );
		}
		else if(node instanceof jp.EnumDeclarationContext)
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Enum, node.IDENTIFIER().text, "" );

		else if(node instanceof jp.InterfaceDeclarationContext)
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Interface, node.IDENTIFIER().text, "" );

		else if(node instanceof jp.MethodDeclarationContext) 
		{
			let methodName : string = node.IDENTIFIER().text;
			methodName += "(";
			let params : jp.FormalParameterContext[] | undefined = node.formalParameters().formalParameterList()?.formalParameter();
			if(params && params.length > 0)
			{
				methodName += params[0].typeType().text;
				for(let i=1; i < params.length; i++)
					methodName += ", " + params[0].typeType().text;
			}
			methodName += ")";
			const res : string = node.typeTypeOrVoid().text;
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Method, methodName, res );
		}
		
		return undefined;
	}

	static ParseSymbolChilds(node : ParseTree, offset : number) : vscode.DocumentSymbol[] | undefined
	{
		let result: vscode.DocumentSymbol [] | undefined = undefined;
		for (let i = 0; i < node.childCount; i++) 
		{
			let child : ParseTree = node.getChild(i);
			let symbol = DocumentSymbols.TokenToSymbol(child, offset);
			if(symbol)
			{
				if(!result)
					result = [];
				result.push(symbol);
			}
		}
		return result;
	}

	

	static CreateSymbol(context : ParserRuleContext, offset : number, kind : vscode.SymbolKind, symbolName : string, details : string | undefined, children?: vscode.DocumentSymbol[] | undefined) : vscode.DocumentSymbol
	{
		let startLine = context.start.line;
		let endLine = context.stop?.line ?? startLine;

		startLine -= offset;
		endLine -= offset;
	
		const startPos = vscode.Position.create(startLine, context.start.charPositionInLine);
		const endPos = vscode.Position.create(endLine, context.stop?.charPositionInLine ?? startPos.character);
		const symbolRange = vscode.Range.create(startPos, endPos);
		return vscode.DocumentSymbol.create(symbolName, details, kind, symbolRange, symbolRange, children);
	}
}