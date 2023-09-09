parser grammar JavaClassParser;

// import Java grammar
options { tokenVocab=JavaClassLexer; }

mainMethodDescriptor
    : methodTypeSignature
    | methodDescriptor
    ;

methodTypeSignature
    : formalTypeParameters? LPAREN typeSignature* RPAREN returnType throwsSignature*
	;

formalTypeParameters
    : LT formalTypeParameter+ GT
	;

formalTypeParameter
	: IDENTIFIER classBound interfaceBound*
	;

classBound
    : COLON fieldTypeSignature?
	;

interfaceBound
    : COLON fieldTypeSignature
	;

fieldTypeSignature
	: classTypeSignature
    | arrayTypeSignature
    | typeVariableSignature
	;

classTypeSignature
    : CLASS_PREFIX simpleClassTypeSignature classTypeSignatureSuffix* CLASSSEMI
	;

simpleClassTypeSignature
    : CLASSID (CLASSDIV CLASSID)* typeArguments?
	;

classTypeSignatureSuffix
    : DOT simpleClassTypeSignature
	;

typeVariableSignature
    : GEN_PREFIX GEN_ID GEN_SEMI
	;

typeArguments
    : LT typeArgument+ GT
	;

typeArgument
    : wildcardIndicator? fieldTypeSignature
    | ASTERIX
	;

wildcardIndicator
    : ADD
    | SUB
	;

methodDescriptor
    : LPAREN parameterDescriptor* RPAREN returnDescriptor
	;

fieldDescriptor
    : fieldType
	;

fieldType
    : baseType
    | objectType
    | arrayType
	;

baseType
    : BYTE
    | CHAR
    | DOUBLE
    | FLOAT
    | INT
    | LONG
    | SHORT
    | BOOLEAN
	;

objectType
    : CLASS_PREFIX className CLASSSEMI
	;

className
    : CLASSID ( CLASSDIV CLASSID )*
    ;

arrayType
    : ARRAY_PREFIX fieldType
	;

parameterDescriptor
    : fieldType
	;

returnDescriptor
    : fieldType
    | voidDescriptor
	;

voidDescriptor
    : VOID
	;

classSignature
    : formalTypeParameters? superclassSignature superinterfaceSignature*
	;

superclassSignature
    : classTypeSignature
	;

superinterfaceSignature
    : classTypeSignature
	;


arrayTypeSignature
    : ARRAY_PREFIX typeSignature
	;

typeSignature
    : fieldTypeSignature
    | baseType
	;

returnType
    : typeSignature
    | voidDescriptor
	;

throwsSignature
    : CARET classTypeSignature
    | CARET typeVariableSignature
	;
