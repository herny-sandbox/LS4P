import * as vscode from 'vscode-languageserver/node';
import * as pp from './grammer/ProcessingParser';
import { ParserRuleContext, Token } from 'antlr4ts';
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { CompilationUnitContext } from "./grammer/ProcessingParser";

export class DocumentSymbols 
{
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
		if(node instanceof pp.ClassDeclarationContext) 
		{
			//let childSymbols: vscode.DocumentSymbol [] | undefined = DocumentSymbols.ParseSymbolChilds(node.classBody());
			let ext : string = node.typeType()?.text ?? "";
			let childSymbols : vscode.DocumentSymbol [] = [];
			DocumentSymbols.generateSymbolsFrom(node.classBody(), offset, childSymbols);
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Class, node.IDENTIFIER().text, ext, childSymbols );
		}
		else if(node instanceof pp.EnumDeclarationContext)
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Enum, node.IDENTIFIER().text, "" );

		else if(node instanceof pp.InterfaceDeclarationContext)
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Interface, node.IDENTIFIER().text, "" );

		else if(node instanceof pp.ConstructorDeclarationContext)
		{
			let methodName : string = node.IDENTIFIER().text;
			methodName += "(" + DocumentSymbols.ParseParamsAsString(node.formalParameters()) + ")";
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Method, methodName, undefined );
		}
		else if(node instanceof pp.GenericConstructorDeclarationContext)
		{
			let constrContext : pp.ConstructorDeclarationContext = node.constructorDeclaration();
			let methodName : string = constrContext.IDENTIFIER().text;
			methodName += "<" + DocumentSymbols.ParseTypeParamsAsString(node.typeParameters()) + ">";
			methodName += "(" + DocumentSymbols.ParseParamsAsString(constrContext.formalParameters()) + ")";
			return DocumentSymbols.CreateSymbol(node, offset, vscode.SymbolKind.Method, methodName, undefined );
		}
		else if(node instanceof pp.MethodDeclarationContext) 
		{
			let methodName : string = DocumentSymbols.ParseMethodDeclarationAsString(node.IDENTIFIER().text, node.formalParameters());
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

	static ParseMethodDeclarationAsString(name : string, paramsContext : pp.FormalParametersContext) : string
	{
		return name + "(" + DocumentSymbols.ParseParamsAsString(paramsContext) + ")";
	}

	static ParseParamsAsString(paramsContext : pp.FormalParametersContext) : string
	{
		let result : string = "";
		let paramsList : pp.FormalParameterListContext | undefined = paramsContext.formalParameterList();
		if(!paramsList)
			return result;

		let params : pp.FormalParameterContext[] = paramsList.formalParameter();
		let lastParam : pp.LastFormalParameterContext | undefined  = paramsList.lastFormalParameter();
		let noParams : boolean = (params.length == 0) && (!lastParam);

		if(!noParams)
		{
			result += " ";
			if(params.length > 0)
			{
				result += params[0].typeType().text;
				for(let i=1; i < params.length; i++)
					result += ", " + params[i].typeType().text;
			}
			if(lastParam)
			{
				if(params.length > 0)
					result += ", ";
				result += lastParam.typeType().text;
				result += "...";
			}
			result += " ";
		}
		return result;
	}
	
	static ParseTypeParamsAsString(paramsContext : pp.TypeParametersContext) : string
	{
		let result : string = "";
		let typeParams : pp.TypeParameterContext[] = paramsContext.typeParameter();
		if(typeParams && typeParams.length > 0)
		{
			result += typeParams[0].text;
			for(let i=1; i < typeParams.length; i++)
				result += ", " + typeParams[i].text;
		}

		return result;
	}
}