// ProcessingSymbol.ts
export class ProcessingSymbol {
	constructor(
	  public name: string,
	  public file: string,
	  public position: number
	) {}
  }

export class ProcessingVariable extends ProcessingSymbol {
	constructor(
	  name: string,
	  public type: string,
	  file: string,
	  position: number
	) {
	  super(name, file, position);
	}
  }
  
export class ProcessingFunction extends ProcessingSymbol {
	constructor(
	  name: string,
	  public parameters: string[],
	  file: string,
	  position: number
	) {
	  super(name, file, position);
	}
  }
  
export class ProcessingClass extends ProcessingSymbol {
	public functions: ProcessingFunction[] = [];
  
	constructor(name: string, file: string, position: number) {
	  super(name, file, position);
	}
  }