import * as log from './scripts/syslogs'
import * as pStandards from './grammer/terms/preprocessingsnippets'
import * as refactoring from './codeRefactoring'
import * as parser from './parser'
import { MethodDeclarationContext } from 'java-ast/dist/parser/JavaParser';

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

	// TODO: Handle preprocessing Properly: - Done
	// case 1 -> class and a method inside it without a method in the plain sketch
	// case 2 -> class and a method inside it with a method in the plain sketch
	// This is done by constructing parse tree even before preprocessing to find whether the method is inside a class or not

	let unProcessedTokenArray = parser.parseAST(unProcessedCode)
	unProcessedTokenArray.forEach(function(node,index){
		if(node[1] instanceof MethodDeclarationContext){
			unProcessedClassMethodNames[_unProcessedClassMethodCounter] = node[0].text
			_unProcessedClassMethodCounter += 1
		}
	})
 
	refactoring.disableSettingsBeforeParse()

	let settingsPipelineResult = refactoring.settingsRenderPipeline(unProcessedCode)

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
		processedCode = pStandards.methodBehaviour(refactoring.settingsRenderPipeline(unProcessedCode))
		setBehaviours(false,true)
		log.write(`Method Behaviour`, log.severity.BEHAVOIR)
	} else {
		processedCode = pStandards.setupBehaviour(refactoring.settingsRenderPipeline(unProcessedCode))
		setBehaviours(true,false)
		log.write(`SetupDraw Behaviour`, log.severity.BEHAVOIR)
	}
	log.write("PreProcessing complete!", log.severity.SUCCES)
	return processedCode
}

/**
 * Provides the current sketch behavoir type
 * @returns Behavoir type
 */
export function getBehavoirType() : Behaviour {
	return behaviourType
}

function setBehaviours(_b1:boolean,_b2: boolean){
	behaviourType = {
		defaultEnabled : _b1,
		methodEnabled : _b2
	}
}