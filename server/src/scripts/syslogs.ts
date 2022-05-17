const exec = require('child_process').exec
const logPath = `${__dirname.substring(0, __dirname.length - 8)}/logs/syslogs.log`
export enum severity {
	NONE,
	INFO,
	BEHAVOIR,
	EVENT,
	SUCCES,
	WARNING,
	ERROR
}

type errorWithMessage = {
	message: string
}

export async function write(message: string | unknown, logLevel : severity = severity.NONE) {
	let datetime = new Date().toISOString().slice(0,22)
	let _message;

	if (typeof message === 'string') {
		_message = message
	}
	else {
		_message = getErrorMessage(message)
	}
	
	let logLevelString = ''
	let logEntry = ''
	if (logLevel > 0) {
		logLevelString = `[${severityToString(logLevel)}]`
		logEntry = `${datetime} - ${logLevelString} ${_message}`
	}
	else {
		logEntry = `${datetime} - ${_message}`
	}
	
	exec(`echo ${logEntry} >> ${logPath}`)

	if (logLevel == 3 || logLevel == 4 ) {
		console.log(`${logEntry}`)
	}
	else if (logLevel == 5) {
		console.warn(`${logEntry}`)
	}
	else if (logLevel == 6) {
		console.error(`${logEntry}`)
	}
}

function severityToString(logLevel : severity) : string {
	switch (logLevel) {
		case severity.NONE:
			return ""

		case severity.INFO:
			return "INFO"

		case severity.BEHAVOIR:
			return "BEHAVOIR"
		
		case severity.EVENT:
			return "EVENT"
		
		case severity.SUCCES:
			return "SUCCES"

		case severity.WARNING:
			return "WARNING"

		case severity.ERROR:
			return "ERROR"

		default:
			return ""
	}
}

function getErrorMessage(error: unknown) {
	return extractMessage(error).message
}

function extractMessage(maybeError: unknown) : errorWithMessage{
	if (isErrorWithMessage(maybeError)) return maybeError

	try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError))
	}
}

function isErrorWithMessage(error: unknown): error is errorWithMessage {
	return (
	  typeof error === 'object' &&
	  error !== null &&
	  'message' in error &&
	  typeof (error as Record<string, unknown>).message === 'string'
	)
  }