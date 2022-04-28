import * as log from './scripts/syslogs'
import * as pStandards from './grammer/terms/preprocessingsnippets'
import { parse } from 'java-ast'
import { ParseTree } from 'antlr4ts/tree/ParseTree'
import { MethodDeclarationContext } from 'java-ast/dist/parser/JavaParser';

let unProcessedTokenArray : [ParseTree, ParseTree][] = new Array();
let _unProcessedTokenCounter = -1
let behaviourType : Behaviour

export interface Behaviour{
	defaultEnabled : boolean,
	methodEnabled: boolean
}

export  function performPreProcessing(unProcessedCode: string): string{
	
	let unProcessedMethodName: RegExpExecArray | null
	// Super set that contains all the methods in the workspace
	let unProcessedMethodNameArray: RegExpExecArray[] = []
	let _unProcessedMethodNameArrayCounter = 0
	// Sub set that contains method names only inside local class declarations in the workspace
	let unProcessedClassMethodNames : string[] = []
	let _unProcessedClassMethodCounter = 0

	// let fileName = textDocument.uri.split('/')
	// pStandards.setDefaultClassName(`${fileName[fileName.length-1].substring(0,fileName[fileName.length-1].length-4)}`)

	// TODO: Handle preprocessing Properly: - Done
	// case 1 -> class and a method inside it without a method in the plain sketch
	// case 2 -> class and a method inside it with a method in the plain sketch
	// This is done by constructing parse tree even before preprocessing to find whether the method is inside a class or not

	let unProcessedWorkSpaceChildren = parse(unProcessedCode)
	unProcessedTokenArray = []
	_unProcessedTokenCounter = -1

	for(let i = 0; i < unProcessedWorkSpaceChildren.childCount; i++){
		extractTokens(unProcessedWorkSpaceChildren.children![i])
	}

	unProcessedTokenArray.forEach(function(node,index){
		if(node[1] instanceof MethodDeclarationContext){
			unProcessedClassMethodNames[_unProcessedClassMethodCounter] = node[0].text
			_unProcessedClassMethodCounter += 1
		}
	})
 
	pStandards.disableSettingsBeforeParse()

	let settingsPipelineResult = pStandards.settingsRenderPipeline(unProcessedCode)

	let unProcessedLineSplit = settingsPipelineResult.split(`\n`)
	unProcessedLineSplit.forEach(function(line){
		if(unProcessedMethodName = pStandards.methodPattern.exec(line)){
			unProcessedMethodNameArray[_unProcessedMethodNameArrayCounter] = unProcessedMethodName
			_unProcessedMethodNameArrayCounter += 1
		}
	})

	let higherOrderMethods = unProcessedMethodNameArray.filter(item => unProcessedClassMethodNames.indexOf(item[1]) < 0);
	let processedCode : string;
	if(higherOrderMethods.length > 0) {
		processedCode = pStandards.methodBehaviour(pStandards.settingsRenderPipeline(unProcessedCode))
		setBehaviours(false,true)
		log.writeLog(`[[BEHAVIOUR]] - Method Behaviour`)
	} else {
		processedCode = pStandards.setupBehaviour(pStandards.settingsRenderPipeline(unProcessedCode))
		setBehaviours(true,false)
		log.writeLog(`[[BEHAVIOUR]] - SetupDraw Behaviour`)
	}
	console.log("PreProcessing complete.!")
	return processedCode
}

/**
 * Provides the current sketch behavoir type
 * @returns Behavoir type
 */
export function getBehavoirType() : Behaviour {
	return behaviourType
}

function extractTokens(gotOne: ParseTree){
	for(let j = 0; j < gotOne.childCount; j++){
		if(gotOne.getChild(j).childCount == 0){
			_unProcessedTokenCounter +=1
			unProcessedTokenArray[_unProcessedTokenCounter] = [gotOne.getChild(j),gotOne]
		}
		extractTokens(gotOne.getChild(j))
	}
}

function setBehaviours(_b1:boolean,_b2: boolean){
	behaviourType = {
		defaultEnabled : _b1,
		methodEnabled : _b2
	}
}