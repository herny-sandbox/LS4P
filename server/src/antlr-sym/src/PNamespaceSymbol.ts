import { BaseSymbol, NamespaceSymbol, INamespaceSymbol } from "antlr4-c3";
import { PComponentSymbol } from "./PComponentSymbol"


export class PNamespaceSymbol extends PComponentSymbol  implements INamespaceSymbol
{
	readonly inline: boolean;
    readonly attributes: string[];
    
	static delimiter : string = ".";
    constructor(name: string, inline: boolean=false, attributes: string[]=[])
	{
        super(name);
		this.inline = inline;
		this.attributes = attributes;
    }

	public containsName(fullname:string) : boolean
	{
		return fullname?.startsWith(this.name);
	}

	public consumeName(fullname:string|undefined) : string | undefined
	{
		if(!fullname)
			return undefined;
		return fullname.substring(this.name.length+1);
	}

	// resolveSync(name: string, localOnly?: boolean | undefined): BaseSymbol | undefined 
	// {
	// 	let thisQualifiedName = this.qualifiedName();
	// 	// if(this.name=="core")
	// 	// 	console.log(`[${this.name}] resolveSync(${name}, ${localOnly}) `);
	// 	if(this.name == name)
	// 		return this;
	// 	if(name.startsWith(thisQualifiedName))
	// 	{
	// 		let subname = name.substring(thisQualifiedName.length+PNamespaceSymbol.delimiter.length);
	// 		return super.resolveSync(subname, localOnly);
	// 	}
	// 	else if( name.startsWith(this.name) )
	// 	{
	// 		let subname = name.substring(this.name.length+PNamespaceSymbol.delimiter.length);
	// 		return super.resolveSync(subname, localOnly);
	// 	}
	// 	else if(name.indexOf(PNamespaceSymbol.delimiter) < 0 && localOnly ) // The search is just for a child?
	// 	{
	// 		return super.resolveSync(name, localOnly);
	// 	}
	// }
}