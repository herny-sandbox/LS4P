import * as log from './scripts/syslogs'
import * as lsp from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import * as model from './grammer/terms/model'
import * as sketch from './sketch'
//import * as javaParser from 'java-ast/dist/parser/JavaParser';
import * as pp from './grammer/ProcessingParser';
import { ParserRuleContext, Token } from 'antlr4ts';
import * as parseUtils from './astutils'
import * as parser from './parser'
import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ProcessingParser } from './grammer/ProcessingParser';
import * as symbols from 'antlr4-c3'

const fs = require('fs');
const { JavaClassFileReader } = require('java-class-tools')

export const reader = new JavaClassFileReader();

let extractionModules = [
	`${__dirname}/processing/container/core.txt`, 
	`${__dirname}/processing/container/awt.txt`, 
	`${__dirname}/processing/container/data.txt`, 
	`${__dirname}/processing/container/event.txt`, 
	`${__dirname}/processing/container/javafx.txt`, 
	`${__dirname}/processing/container/opengl.txt`
]

let extractionModuleType = [
	'core',
	'awt',
	'data',
	'event',
	'javafx',
	'opengl'
]

let currentCompletionClass = `PApplet`
let completionConstantClass = `PConstants`

let classMap = new Map()
let completeClassMap = new Map()

for(let _counter: number = 0; _counter < 6; _counter++){
	try {  
		let data = fs.readFileSync(extractionModules[_counter], 'utf-8')
		let tempSplit = data.split('\n')
		let tempCheck: string[] = []
		let _innerCounter = 0
		tempSplit.forEach(function(className: any){
			if(!className.includes('$') && className.includes('.class')){
				tempCheck[_innerCounter] = className
				_innerCounter += 1
			}
		})
		classMap.set(extractionModuleType[_counter], tempCheck)
	} catch(e) {}
}

initAllCompletionClasses()

function initAllCompletionClasses(){
	extractionModuleType.forEach(function(value){
		classMap.get(value).forEach((element: string) => {
			completeClassMap.set(element, PCompletionMethods(reader.read(`${__dirname}/processing/extractor/processing/${value}/${element}`)))
		})
	})
}

let completeCustomMap = new Map()

try{
	let data = fs.readFileSync(`${__dirname}/processing/customcontainer/custom.txt`, 'utf-8')
	let customSplitMap = data.split('\n')
	customSplitMap.forEach(function(value: string){
		if(value.includes(`.class`)){
			completeCustomMap.set(value, PCompletionMethods(reader.read(`${__dirname}/processing/custom/${value}`)))
		}
	})
} catch(e) {}

export function asCompletionItem(
	completionEntry: string, completionType: lsp.CompletionItemKind): lsp.CompletionItem {
	const item: lsp.CompletionItem = {
		label: completionEntry,
		kind: completionType,
		filterText: completionEntry
	}
	return item
}

function PCompletionMethods(classType: any): lsp.CompletionItem[] {
	let completionItemList: lsp.CompletionItem[] = []
	let _addIncValue: number = 0
	let methodSet = new Set()
	let fieldSet = new Set()
	classType.methods.forEach((method:any) => {
		const nameInConstantPool = classType.constant_pool[method.name_index];
		// const signatureInConstantPool = classType.constant_pool[method.descriptor_index];

		const name = String.fromCharCode.apply(null, nameInConstantPool.bytes);
		// const signature = string.fromCharCode.apply(null, signatureInConstantPool.bytes)

		// To avoid duplicate results
		methodSet.add(name)
	});

	classType.fields.forEach((field:any) => {
		const nameInConstantPool = classType.constant_pool[field.name_index];
		// const signatureInConstantPool = classType.constant_pool[method.descriptor_index];

		const name = String.fromCharCode.apply(null, nameInConstantPool.bytes);
		// const signature = string.fromCharCode.apply(null, signatureInConstantPool.bytes)

		// To avoid duplicate results
		fieldSet.add(name)
	});

	methodSet.forEach(function(method){
		completionItemList[_addIncValue] = asCompletionItem(`${method}()`, 
			findCompletionItemKind(2))
		_addIncValue += 1
	})

	fieldSet.forEach(function(field){
		completionItemList[_addIncValue] = asCompletionItem(`${field}`, 
			findCompletionItemKind(5))
		_addIncValue += 1
	})

	return completionItemList
}

export function findCompletionItemKind(value: number): lsp.CompletionItemKind
{
	let completionKind: lsp.CompletionItemKind = lsp.CompletionItemKind.Text
	switch (value) {
		case 1:
			completionKind = lsp.CompletionItemKind.Text
			break;
		case 2:
			completionKind = lsp.CompletionItemKind.Method
			break;
		case 3:
			completionKind = lsp.CompletionItemKind.Function
			break;
		case 4:
			completionKind = lsp.CompletionItemKind.Constructor
			break;
		case 5:
			completionKind = lsp.CompletionItemKind.Field
			break;
		case 6:
			completionKind = lsp.CompletionItemKind.Variable
			break;
		case 7:
			completionKind = lsp.CompletionItemKind.Class
			break;
		case 8:
			completionKind = lsp.CompletionItemKind.Interface
			break;
		case 9:
			completionKind = lsp.CompletionItemKind.Module
			break;
		case 10:
			completionKind = lsp.CompletionItemKind.Property
			break;
		case 11:
			completionKind = lsp.CompletionItemKind.Unit
			break;
		case 12:
			completionKind = lsp.CompletionItemKind.Value
			break;
		case 13:
			completionKind = lsp.CompletionItemKind.Enum
			break;
		case 14:
			completionKind = lsp.CompletionItemKind.Keyword
			break;
		case 15:
			completionKind = lsp.CompletionItemKind.Snippet
			break;
		case 16:
			completionKind = lsp.CompletionItemKind.Color
			break;
		case 17:
			completionKind = lsp.CompletionItemKind.File
			break;
		case 18:
			completionKind = lsp.CompletionItemKind.Reference
			break;
		case 19:
			completionKind = lsp.CompletionItemKind.Folder
			break;
		case 20:
			completionKind = lsp.CompletionItemKind.EnumMember
			break;
		case 21:
			completionKind = lsp.CompletionItemKind.Constant
			break;
		case 22:
			completionKind = lsp.CompletionItemKind.Struct
			break;
		case 23:
			completionKind = lsp.CompletionItemKind.Event
			break;
		case 24:
			completionKind = lsp.CompletionItemKind.Operator
			break;
		case 25:
			completionKind = lsp.CompletionItemKind.TypeParameter
			break;
		default:
			break;
	}
	return completionKind
}

export function decideCompletionMethods(_textDocumentParams: lsp.CompletionParams, documentText: string): lsp.CompletionItem[] {
	let resultantCompletionItem: lsp.CompletionItem[] = []
	let lineStartMethodBody: number[] = []
	let lineEndMethodBody: number[] = []
	let avoidLineAuto: number[] = []
	let _methodCounter: number = 0
	let _avoidCounter: number = 0
	let _classNameCounter: number = 0

	let tokenArray = sketch.getTokenArray();

	// line starts from `0`
	let currentLineInWorkSpace = _textDocumentParams.position.line

	tokenArray.forEach(function(node, index){

		if(node[1] instanceof pp.BlockContext && node[0].text == `{`) {
			lineStartMethodBody[_methodCounter] = node[1]._start.line
			lineEndMethodBody[_methodCounter] = node[1]._stop!.line
			_methodCounter += 1
		}

		if(node[1] instanceof pp.TypeTypeOrVoidContext || node[1] instanceof pp.PrimitiveTypeContext) {
			avoidLineAuto[_avoidCounter] = node[1]._start.line
			_avoidCounter += 1
		}

	})

	tokenArray.forEach(function(node, index){
		if(node[1] instanceof pp.ClassOrInterfaceTypeContext && tokenArray[index+1][1] instanceof pp.VariableDeclaratorIdContext){
			model.variableDeclarationContext[_classNameCounter] = [node[0], tokenArray[index+1][1]]
			_classNameCounter += 1
		}
	})

	lineStartMethodBody.forEach(function(value, index){
		lineStartMethodBody[index] = value - sketch.getLineOffset()
	})
	lineEndMethodBody.forEach(function(value, index){
		lineEndMethodBody[index] = value - sketch.getLineOffset()
	})
	avoidLineAuto.forEach(function(value, index){
		avoidLineAuto[index] = value - sketch.getLineOffset()
	})


	lineStartMethodBody.forEach(function(value, index){
		if(value <= currentLineInWorkSpace && lineEndMethodBody[index] >= currentLineInWorkSpace){
			// Default completion class members -> PApplet and PConstants
			resultantCompletionItem = completeClassMap.get(`${currentCompletionClass}.class`).concat(completeClassMap.get(`${completionConstantClass}.class`))
		}
	})

	avoidLineAuto.forEach(function(value,index){
		// since the index in workspace starts with `0` -> currentLineInWorkSpace + 2 (1st -> variable declaration, 2nd -> no autocompletion for variable names)
		// avoid auto completion while naming varaibles
		if(value == currentLineInWorkSpace + 2){
			resultantCompletionItem = []
		}
	})

	// TODO: methods to avoid auto compleion during method declaration.'

	// Produces dynamic auto completion results on the presence of Trigger Character `.`
	let currentLineSplit = documentText.split('\n')

	if(_textDocumentParams.context!.triggerCharacter == `.`){
		let tempLine = currentLineSplit[currentLineInWorkSpace].split(`.`)[0].split(` `)
		let objectName = tempLine[tempLine.length-1]
		resultantCompletionItem = completeClassMap.get(`${objectName}.class`)
	}

	if(model.variableDeclarationContext.length > 0){
		model.variableDeclarationContext.forEach(function(value, index){
			if(_textDocumentParams.context!.triggerCharacter == `.`){
				let tempLine = currentLineSplit[currentLineInWorkSpace].split(`.`)[0].split(` `)
				let objectName = tempLine[tempLine.length-1]
				if(value[1].text == objectName){
					resultantCompletionItem = completeClassMap.get(`${value[0].text}.class`)
					if(resultantCompletionItem == undefined){
						resultantCompletionItem = completeCustomMap.get(`${value[0].text}.class`)
						if(resultantCompletionItem == undefined){
							// Handle for locally declared classes
							parseUtils.constructClassParams(tokenArray)
							let tempCompletionList: lsp.CompletionItem[] = []
							let _tempCounter = 0
							parseUtils.fieldAndClass.forEach(function(fieldName,index){
								if(fieldName[0] == value[0].text){
									tempCompletionList[_tempCounter] = asCompletionItem(fieldName[1], findCompletionItemKind(5))
									_tempCounter += 1
								}
							})
							parseUtils.memberAndClass.forEach(function(methodName,index){
								if(methodName[0] == value[0].text){
									tempCompletionList[_tempCounter] = asCompletionItem(`${methodName[1]}()`, findCompletionItemKind(2))
									_tempCounter += 1
								}
							})
							resultantCompletionItem = tempCompletionList
							parseUtils.flushRecords()
						}
					}
				}
			}
		})
	}

	// Local class declaration and their dependent fields / methods for auto completion

	model.clearVaribaleDeclarationContext()
	model.clearLocalClassDeclarators()

	log.write(`AutoCompletion invoked`, log.severity.EVENT)

	return resultantCompletionItem
}

export async function collectCandidates(pdeName: string, line: number, posInLine : number, context : lsp.CompletionContext | undefined): Promise<lsp.CompletionItem[]> 
{
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return [];

	let parseContext : TerminalNode | null = parseUtils.findIdentifierAtPosition(pdeInfo.syntaxTokens, pdeInfo.linesOffset + line, posInLine);
	if(!parseContext)
		return [];

	const token: Token = parseContext.symbol;
	log.write("parse context found: "+token.text, log.severity.EVENT);

	//let core = new symbols.CodeCompletionCore(parser.currentParser);
	//core.ignoredTokens = new Set([ ProcessingParser.LPAREN ]);
	//core.preferredRules = new Set([ ProcessingParser.IDENTIFIER ]);

	let symbolTable = sketch.getSymbolTable();
	let symbolInterest : symbols.BaseSymbol | undefined = await symbolTable.symbolWithContext(parseContext);
	if(!symbolInterest)
	{
		log.write("unable to find the right matching symbol: "+token.text, log.severity.ERROR);
		return [];
	}
	//if(	symbolInterest instanceof(symbols.ClassSymbol) )
	// let candidates = core.collectCandidates(token.tokenIndex);
	log.write("matching symbol: "+symbolInterest.name, log.severity.EVENT);

	let completions : lsp.CompletionItem[] = []; 

	// if(candidates.rules.has(ProcessingParser.IDENTIFIER))
	// {
	// 	
	// 	let members : lsp.CompletionItem[] = await suggestMembers(symbolTable);
	// 	for(let child of members )
	// 		completions.push(child);
	// }
	
	// candidates.tokens.forEach((_, k) => {
	// 	if( k == ProcessingParser.IDENTIFIER)
	// 	{

	// 	}
	// 	else
	// 	{
	// 		let symbolicName : string | undefined = parser.currentParser.vocabulary.getSymbolicName(k);
	// 		if(symbolicName)
	// 			completions.push({ label: symbolicName.toLowerCase()});
	// 	}
	// });
	return completions;
}

async function suggestMembers(symbolTable: symbols.SymbolTable) : Promise<lsp.CompletionItem[]>
{
	let completions : lsp.CompletionItem[] = []; 
	let vars : symbols.VariableSymbol [] = await symbolTable.getNestedSymbolsOfType(symbols.VariableSymbol);
	for(let child of vars )
	{
		completions.push({ label: child.name, kind: lsp.CompletionItemKind.Variable})
	}
    return completions;
}
