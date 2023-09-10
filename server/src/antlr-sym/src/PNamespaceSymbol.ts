import { BaseSymbol, NamespaceSymbol } from "antlr4-c3";



export class PNamespaceSymbol extends NamespaceSymbol 
{
	static delimiter : string = ".";
    constructor(name: string, inline?: boolean, attributes?: string[])
	{
        super(name, inline, attributes);
    }

	resolveSync(name: string, localOnly?: boolean | undefined): BaseSymbol | undefined 
	{
		let thisQualifiedName = this.qualifiedName();
		// if(this.name=="core")
		// 	console.log(`[${this.name}] resolveSync(${name}, ${localOnly}) `);
		if(this.name == name)
			return this;
		if(name.startsWith(thisQualifiedName))
		{
			let subname = name.substring(thisQualifiedName.length+PNamespaceSymbol.delimiter.length);
			return super.resolveSync(subname, localOnly);
		}
		else if( name.startsWith(this.name) )
		{
			let subname = name.substring(this.name.length+PNamespaceSymbol.delimiter.length);
			return super.resolveSync(subname, localOnly);
		}
	}
}