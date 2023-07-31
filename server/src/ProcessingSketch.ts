import { ProcessingParser } from "./ProcessingParser";
import { ProcessingVariable, ProcessingFunction, ProcessingClass } from "./ProcessingSymbol";

export class ProcessingSketch {
  public variables: ProcessingVariable[] = [];
  public functions: ProcessingFunction[] = [];
  public classes: ProcessingClass[] = [];

  addCode(code: string, file: string) {
    // const parsedData = ProcessingParser.parse(code, file);

    // this.variables.push(...parsedData.variables);
    // this.functions.push(...parsedData.functions);
    // this.classes.push(...parsedData.classes);
  }
}