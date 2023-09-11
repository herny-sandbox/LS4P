import { BaseSymbol, NamespaceSymbol } from "antlr4-c3";



export class PNamespaceSymbol extends NamespaceSymbol 
{
	static delimiter : string = ".";
    constructor(name: string, inline?: boolean, attributes?: string[])
	{
        super(name, inline, attributes);
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