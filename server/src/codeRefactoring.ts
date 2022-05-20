import * as pStandards from './grammer/terms/processingStandards'

let settingsSet = new Set
let startEncountered = false

/**
 * Refactors the userscode to confirm to java code style
 * 
 * @param unProcessedCode Code to refactor
 * @returns Refactored code, ready to be inserted in a java file
 */
export function pipeLine(unProcessedCode: string): string {
	settingsSet = new Set()
	startEncountered = false
	let refactoredCode = ``
	let unprocessedLines = unProcessedCode.split(`\n`)

	unprocessedLines.forEach(function(line){
		line = addExplicitAccesModifier(line)
		line = removeComments(line)
		line = extractEnvironmentCallsInSetup(line)
		line = addFloatingIndicator(line)
		line = increaseIndent(line)
		refactoredCode += `\n${line}`
	})

	refactoredCode += addSettingsFunction()
	refactoredCode = convertCastingCalls(refactoredCode)
	
	return refactoredCode
}

/**
 * Adds one tab to the beginning of a line
 * 
 * @param line code string
 * @returns Line with increased indent
 */
function increaseIndent(line : string) : string{
	return `	${line}`
}

/**
 * Adds a public acces modifier to methodes if no other modifier was specified
 * 
 * @param line Line to check for acces modifier
 * @returns Line with a explicit public modifier
 */
function addExplicitAccesModifier(line : string) : string{ 
	if(	pStandards.methodPattern.exec(line) &&
	  	!(
			line.includes(`public`) ||
		  	line.includes(`private`) ||
			line.includes(`protected`) ||
			pStandards.ifelsePattern.exec(line)
		)
	){
		let whiteSpaceCount = line.search(/[^\\t\s]/)
		return line.substring(0, whiteSpaceCount) + 'public ' + line.substring(whiteSpaceCount);
	}

	return line
}

/**
 * Erases single and block comments
 * 
 * @param line line to check for comments
 * @returns line without comments
 */
function removeComments(line : string) : string {
	line = removeSingleComment(line)
	line = removeBlockComments(line)

	return line
}

/**
 * Erases single line comment
 * 
 * @param line line to check for single line comment
 * @returns line without comment
 */
function removeSingleComment(line : string) : string {
	return line.replace(pStandards.singleLineComment,``)
}

/**
 * Erases block line comment
 * 
 * @param line line to check for block comment
 * @returns line without comment
 */
function removeBlockComments(line : string) : string {
	
	if(pStandards.multiLineCommentComponents[0].exec(line)){
		startEncountered = true
	}
	if(startEncountered) {
		if(pStandards.multiLineCommentComponents[1].exec(line)){
			startEncountered = false
		}
		line = ``
	}

	return line
}

/**
 * Explicitily use floats instead of double using f indicator
 * 
 * @param line Line to check for floating point number
 * @returns Line with floating point indicator
 */
function addFloatingIndicator(line : string) : string{
	return line.replace(/([0-9]+\.[0-9]+)/g,'$1f')
}

/**
 * Separates environment calls from the user codes and adds them to a set. 
 * officially these calls need to be in a settings function. 
 * But for backwards compatibility putting them in setup() is still allowed.
 * The following functions are extracted:
 * size(), fullscreen(), smooth() and nosmooth().
 * @param line Line to check for environment calls
 * @returns Line without environment call
 */
function extractEnvironmentCallsInSetup(line : string) : string {
	if(	pStandards.sizePattern.exec(line) || 
		pStandards.fullScreenPattern.exec(line) || 
		pStandards.smoothPattern.exec(line) ||
		pStandards.noSmoothPatterns.exec(line))
		{
			settingsSet.add(line);
			line = ``
		}
	
	return line
}

/**
 * Creates a settings() function which includes the environment calls extracted
 * by @see extractEnvironmentCallsInSetup
 * 
 * @returns code with environment calls in a settings() function
 */
function addSettingsFunction() : string{
	let settingsContext = ``
	let index = 0
	settingsSet.forEach(function(setting : any){
		settingsContext += `${setting}`
		index ++
		if(index < settingsSet.size) {
			settingsContext += `\n`
		}
	})
	let settingsFunction = ''
	if (settingsContext != ``) {
		settingsFunction = pStandards.preprocessingSettings(settingsContext)
	}
	return settingsFunction
}

/**
 * Changes type casting like int() to the processing specifiek calls
 * 
 * @param unprocessedText code which needs checking for casting calls
 * @returns code with the correct casting calls
 */
function convertCastingCalls(unprocessedText : string) : string {
	pStandards.castingConversionTuples.forEach(function(tuple){
		unprocessedText = unprocessedText.replace(tuple[0],tuple[1])
	})

	return unprocessedText
}
