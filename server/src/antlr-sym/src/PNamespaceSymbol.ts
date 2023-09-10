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
		//console.log(`[${this.name}] trying to resolve: ${name}`);
		if(this.name == name)
			return this;
		if( !name.startsWith(this.name) )
			return;
		let subname = name.substring(this.name.length+PNamespaceSymbol.delimiter.length);
		return super.resolveSync(subname, localOnly);
	}
}