// Generated from c:\Users\User\Documents\LS4Pv3\server\grammar\ProcessingParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ProcessingParserListener } from "./ProcessingParserListener";
import { ProcessingParserVisitor } from "./ProcessingParserVisitor";


export class ProcessingParser extends Parser {
	public static readonly ABSTRACT = 1;
	public static readonly ASSERT = 2;
	public static readonly BOOLEAN = 3;
	public static readonly BREAK = 4;
	public static readonly BYTE = 5;
	public static readonly CASE = 6;
	public static readonly CATCH = 7;
	public static readonly CHAR = 8;
	public static readonly CLASS = 9;
	public static readonly CONST = 10;
	public static readonly COLOR = 11;
	public static readonly CONTINUE = 12;
	public static readonly DEFAULT = 13;
	public static readonly DO = 14;
	public static readonly DOUBLE = 15;
	public static readonly ELSE = 16;
	public static readonly ENUM = 17;
	public static readonly EXTENDS = 18;
	public static readonly FINAL = 19;
	public static readonly FINALLY = 20;
	public static readonly FLOAT = 21;
	public static readonly FOR = 22;
	public static readonly IF = 23;
	public static readonly GOTO = 24;
	public static readonly IMPLEMENTS = 25;
	public static readonly IMPORT = 26;
	public static readonly INSTANCEOF = 27;
	public static readonly INT = 28;
	public static readonly INTERFACE = 29;
	public static readonly LONG = 30;
	public static readonly NATIVE = 31;
	public static readonly NEW = 32;
	public static readonly PACKAGE = 33;
	public static readonly PRIVATE = 34;
	public static readonly PROTECTED = 35;
	public static readonly PUBLIC = 36;
	public static readonly RETURN = 37;
	public static readonly SHORT = 38;
	public static readonly STATIC = 39;
	public static readonly STRICTFP = 40;
	public static readonly SUPER = 41;
	public static readonly SWITCH = 42;
	public static readonly SYNCHRONIZED = 43;
	public static readonly THIS = 44;
	public static readonly THROW = 45;
	public static readonly THROWS = 46;
	public static readonly TRANSIENT = 47;
	public static readonly TRY = 48;
	public static readonly VAR = 49;
	public static readonly VOID = 50;
	public static readonly VOLATILE = 51;
	public static readonly WHILE = 52;
	public static readonly DECIMAL_LITERAL = 53;
	public static readonly HEX_LITERAL = 54;
	public static readonly OCT_LITERAL = 55;
	public static readonly BINARY_LITERAL = 56;
	public static readonly FLOAT_LITERAL = 57;
	public static readonly HEX_FLOAT_LITERAL = 58;
	public static readonly BOOL_LITERAL = 59;
	public static readonly CHAR_LITERAL = 60;
	public static readonly STRING_LITERAL = 61;
	public static readonly MULTI_STRING_LIT = 62;
	public static readonly NULL_LITERAL = 63;
	public static readonly LPAREN = 64;
	public static readonly RPAREN = 65;
	public static readonly LBRACE = 66;
	public static readonly RBRACE = 67;
	public static readonly LBRACK = 68;
	public static readonly RBRACK = 69;
	public static readonly SEMI = 70;
	public static readonly COMMA = 71;
	public static readonly DOT = 72;
	public static readonly ASSIGN = 73;
	public static readonly GT = 74;
	public static readonly LT = 75;
	public static readonly BANG = 76;
	public static readonly TILDE = 77;
	public static readonly QUESTION = 78;
	public static readonly COLON = 79;
	public static readonly EQUAL = 80;
	public static readonly LE = 81;
	public static readonly GE = 82;
	public static readonly NOTEQUAL = 83;
	public static readonly AND = 84;
	public static readonly OR = 85;
	public static readonly INC = 86;
	public static readonly DEC = 87;
	public static readonly ADD = 88;
	public static readonly SUB = 89;
	public static readonly MUL = 90;
	public static readonly DIV = 91;
	public static readonly BITAND = 92;
	public static readonly BITOR = 93;
	public static readonly CARET = 94;
	public static readonly MOD = 95;
	public static readonly ADD_ASSIGN = 96;
	public static readonly SUB_ASSIGN = 97;
	public static readonly MUL_ASSIGN = 98;
	public static readonly DIV_ASSIGN = 99;
	public static readonly AND_ASSIGN = 100;
	public static readonly OR_ASSIGN = 101;
	public static readonly XOR_ASSIGN = 102;
	public static readonly MOD_ASSIGN = 103;
	public static readonly LSHIFT_ASSIGN = 104;
	public static readonly RSHIFT_ASSIGN = 105;
	public static readonly URSHIFT_ASSIGN = 106;
	public static readonly ARROW = 107;
	public static readonly COLONCOLON = 108;
	public static readonly AT = 109;
	public static readonly ELLIPSIS = 110;
	public static readonly WS = 111;
	public static readonly COMMENT = 112;
	public static readonly LINE_COMMENT = 113;
	public static readonly HexColorLiteral = 114;
	public static readonly IDENTIFIER = 115;
	public static readonly RULE_processingSketch = 0;
	public static readonly RULE_compilationUnit = 1;
	public static readonly RULE_packageDeclaration = 2;
	public static readonly RULE_importDeclaration = 3;
	public static readonly RULE_typeDeclaration = 4;
	public static readonly RULE_modifier = 5;
	public static readonly RULE_classOrInterfaceModifier = 6;
	public static readonly RULE_variableModifier = 7;
	public static readonly RULE_classDeclaration = 8;
	public static readonly RULE_typeParameters = 9;
	public static readonly RULE_typeParameter = 10;
	public static readonly RULE_typeBound = 11;
	public static readonly RULE_enumDeclaration = 12;
	public static readonly RULE_enumConstants = 13;
	public static readonly RULE_enumConstant = 14;
	public static readonly RULE_enumBodyDeclarations = 15;
	public static readonly RULE_interfaceDeclaration = 16;
	public static readonly RULE_classBody = 17;
	public static readonly RULE_interfaceBody = 18;
	public static readonly RULE_classBodyDeclaration = 19;
	public static readonly RULE_memberDeclaration = 20;
	public static readonly RULE_methodDeclaration = 21;
	public static readonly RULE_methodBody = 22;
	public static readonly RULE_typeTypeOrVoid = 23;
	public static readonly RULE_genericMethodDeclaration = 24;
	public static readonly RULE_genericConstructorDeclaration = 25;
	public static readonly RULE_constructorDeclaration = 26;
	public static readonly RULE_fieldDeclaration = 27;
	public static readonly RULE_interfaceBodyDeclaration = 28;
	public static readonly RULE_interfaceMemberDeclaration = 29;
	public static readonly RULE_constDeclaration = 30;
	public static readonly RULE_constantDeclarator = 31;
	public static readonly RULE_interfaceMethodDeclaration = 32;
	public static readonly RULE_interfaceMethodModifier = 33;
	public static readonly RULE_genericInterfaceMethodDeclaration = 34;
	public static readonly RULE_variableDeclarators = 35;
	public static readonly RULE_variableDeclarator = 36;
	public static readonly RULE_variableInitializer = 37;
	public static readonly RULE_arrayInitializer = 38;
	public static readonly RULE_classOrInterfaceType = 39;
	public static readonly RULE_typeArgument = 40;
	public static readonly RULE_qualifiedNameList = 41;
	public static readonly RULE_formalParameters = 42;
	public static readonly RULE_formalParameterList = 43;
	public static readonly RULE_formalParameter = 44;
	public static readonly RULE_lastFormalParameter = 45;
	public static readonly RULE_baseStringLiteral = 46;
	public static readonly RULE_multilineStringLiteral = 47;
	public static readonly RULE_stringLiteral = 48;
	public static readonly RULE_integerLiteral = 49;
	public static readonly RULE_floatLiteral = 50;
	public static readonly RULE_annotation = 51;
	public static readonly RULE_elementValuePairs = 52;
	public static readonly RULE_elementValuePair = 53;
	public static readonly RULE_elementValue = 54;
	public static readonly RULE_elementValueArrayInitializer = 55;
	public static readonly RULE_annotationTypeDeclaration = 56;
	public static readonly RULE_annotationTypeBody = 57;
	public static readonly RULE_annotationTypeElementDeclaration = 58;
	public static readonly RULE_annotationTypeElementRest = 59;
	public static readonly RULE_annotationMethodOrConstantRest = 60;
	public static readonly RULE_annotationMethodRest = 61;
	public static readonly RULE_annotationConstantRest = 62;
	public static readonly RULE_defaultValue = 63;
	public static readonly RULE_block = 64;
	public static readonly RULE_blockStatement = 65;
	public static readonly RULE_localVariableDeclaration = 66;
	public static readonly RULE_localTypeDeclaration = 67;
	public static readonly RULE_statement = 68;
	public static readonly RULE_catchClause = 69;
	public static readonly RULE_catchType = 70;
	public static readonly RULE_finallyBlock = 71;
	public static readonly RULE_resourceSpecification = 72;
	public static readonly RULE_resources = 73;
	public static readonly RULE_resource = 74;
	public static readonly RULE_switchBlockStatementGroup = 75;
	public static readonly RULE_switchLabel = 76;
	public static readonly RULE_forLoop = 77;
	public static readonly RULE_forControl = 78;
	public static readonly RULE_forInit = 79;
	public static readonly RULE_enhancedForControl = 80;
	public static readonly RULE_parExpression = 81;
	public static readonly RULE_expressionList = 82;
	public static readonly RULE_expression = 83;
	public static readonly RULE_lambdaExpression = 84;
	public static readonly RULE_lambdaParameters = 85;
	public static readonly RULE_lambdaBody = 86;
	public static readonly RULE_primary = 87;
	public static readonly RULE_classType = 88;
	public static readonly RULE_creator = 89;
	public static readonly RULE_createdName = 90;
	public static readonly RULE_innerCreator = 91;
	public static readonly RULE_arrayCreatorRest = 92;
	public static readonly RULE_classCreatorRest = 93;
	public static readonly RULE_explicitGenericInvocation = 94;
	public static readonly RULE_typeArgumentsOrDiamond = 95;
	public static readonly RULE_nonWildcardTypeArgumentsOrDiamond = 96;
	public static readonly RULE_nonWildcardTypeArguments = 97;
	public static readonly RULE_typeList = 98;
	public static readonly RULE_typeType = 99;
	public static readonly RULE_typeArguments = 100;
	public static readonly RULE_superSuffix = 101;
	public static readonly RULE_explicitGenericInvocationSuffix = 102;
	public static readonly RULE_arguments = 103;
	public static readonly RULE_javaProcessingSketch = 104;
	public static readonly RULE_staticProcessingSketch = 105;
	public static readonly RULE_activeProcessingSketch = 106;
	public static readonly RULE_warnMixedModes = 107;
	public static readonly RULE_variableDeclaratorId = 108;
	public static readonly RULE_warnTypeAsVariableName = 109;
	public static readonly RULE_methodCall = 110;
	public static readonly RULE_functionWithPrimitiveTypeName = 111;
	public static readonly RULE_primitiveType = 112;
	public static readonly RULE_colorPrimitiveType = 113;
	public static readonly RULE_qualifiedName = 114;
	public static readonly RULE_literal = 115;
	public static readonly RULE_hexColorLiteral = 116;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"processingSketch", "compilationUnit", "packageDeclaration", "importDeclaration", 
		"typeDeclaration", "modifier", "classOrInterfaceModifier", "variableModifier", 
		"classDeclaration", "typeParameters", "typeParameter", "typeBound", "enumDeclaration", 
		"enumConstants", "enumConstant", "enumBodyDeclarations", "interfaceDeclaration", 
		"classBody", "interfaceBody", "classBodyDeclaration", "memberDeclaration", 
		"methodDeclaration", "methodBody", "typeTypeOrVoid", "genericMethodDeclaration", 
		"genericConstructorDeclaration", "constructorDeclaration", "fieldDeclaration", 
		"interfaceBodyDeclaration", "interfaceMemberDeclaration", "constDeclaration", 
		"constantDeclarator", "interfaceMethodDeclaration", "interfaceMethodModifier", 
		"genericInterfaceMethodDeclaration", "variableDeclarators", "variableDeclarator", 
		"variableInitializer", "arrayInitializer", "classOrInterfaceType", "typeArgument", 
		"qualifiedNameList", "formalParameters", "formalParameterList", "formalParameter", 
		"lastFormalParameter", "baseStringLiteral", "multilineStringLiteral", 
		"stringLiteral", "integerLiteral", "floatLiteral", "annotation", "elementValuePairs", 
		"elementValuePair", "elementValue", "elementValueArrayInitializer", "annotationTypeDeclaration", 
		"annotationTypeBody", "annotationTypeElementDeclaration", "annotationTypeElementRest", 
		"annotationMethodOrConstantRest", "annotationMethodRest", "annotationConstantRest", 
		"defaultValue", "block", "blockStatement", "localVariableDeclaration", 
		"localTypeDeclaration", "statement", "catchClause", "catchType", "finallyBlock", 
		"resourceSpecification", "resources", "resource", "switchBlockStatementGroup", 
		"switchLabel", "forLoop", "forControl", "forInit", "enhancedForControl", 
		"parExpression", "expressionList", "expression", "lambdaExpression", "lambdaParameters", 
		"lambdaBody", "primary", "classType", "creator", "createdName", "innerCreator", 
		"arrayCreatorRest", "classCreatorRest", "explicitGenericInvocation", "typeArgumentsOrDiamond", 
		"nonWildcardTypeArgumentsOrDiamond", "nonWildcardTypeArguments", "typeList", 
		"typeType", "typeArguments", "superSuffix", "explicitGenericInvocationSuffix", 
		"arguments", "javaProcessingSketch", "staticProcessingSketch", "activeProcessingSketch", 
		"warnMixedModes", "variableDeclaratorId", "warnTypeAsVariableName", "methodCall", 
		"functionWithPrimitiveTypeName", "primitiveType", "colorPrimitiveType", 
		"qualifiedName", "literal", "hexColorLiteral",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'abstract'", "'assert'", "'boolean'", "'break'", "'byte'", 
		"'case'", "'catch'", "'char'", "'class'", "'const'", "'color'", "'continue'", 
		"'default'", "'do'", "'double'", "'else'", "'enum'", "'extends'", "'final'", 
		"'finally'", "'float'", "'for'", "'if'", "'goto'", "'implements'", "'import'", 
		"'instanceof'", "'int'", "'interface'", "'long'", "'native'", "'new'", 
		"'package'", "'private'", "'protected'", "'public'", "'return'", "'short'", 
		"'static'", "'strictfp'", "'super'", "'switch'", "'synchronized'", "'this'", 
		"'throw'", "'throws'", "'transient'", "'try'", "'var'", "'void'", "'volatile'", 
		"'while'", undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "'null'", "'('", "')'", "'{'", 
		"'}'", "'['", "']'", "';'", "','", "'.'", "'='", "'>'", "'<'", "'!'", 
		"'~'", "'?'", "':'", "'=='", "'<='", "'>='", "'!='", "'&&'", "'||'", "'++'", 
		"'--'", "'+'", "'-'", "'*'", "'/'", "'&'", "'|'", "'^'", "'%'", "'+='", 
		"'-='", "'*='", "'/='", "'&='", "'|='", "'^='", "'%='", "'<<='", "'>>='", 
		"'>>>='", "'->'", "'::'", "'@'", "'...'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ABSTRACT", "ASSERT", "BOOLEAN", "BREAK", "BYTE", "CASE", "CATCH", 
		"CHAR", "CLASS", "CONST", "COLOR", "CONTINUE", "DEFAULT", "DO", "DOUBLE", 
		"ELSE", "ENUM", "EXTENDS", "FINAL", "FINALLY", "FLOAT", "FOR", "IF", "GOTO", 
		"IMPLEMENTS", "IMPORT", "INSTANCEOF", "INT", "INTERFACE", "LONG", "NATIVE", 
		"NEW", "PACKAGE", "PRIVATE", "PROTECTED", "PUBLIC", "RETURN", "SHORT", 
		"STATIC", "STRICTFP", "SUPER", "SWITCH", "SYNCHRONIZED", "THIS", "THROW", 
		"THROWS", "TRANSIENT", "TRY", "VAR", "VOID", "VOLATILE", "WHILE", "DECIMAL_LITERAL", 
		"HEX_LITERAL", "OCT_LITERAL", "BINARY_LITERAL", "FLOAT_LITERAL", "HEX_FLOAT_LITERAL", 
		"BOOL_LITERAL", "CHAR_LITERAL", "STRING_LITERAL", "MULTI_STRING_LIT", 
		"NULL_LITERAL", "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACK", "RBRACK", 
		"SEMI", "COMMA", "DOT", "ASSIGN", "GT", "LT", "BANG", "TILDE", "QUESTION", 
		"COLON", "EQUAL", "LE", "GE", "NOTEQUAL", "AND", "OR", "INC", "DEC", "ADD", 
		"SUB", "MUL", "DIV", "BITAND", "BITOR", "CARET", "MOD", "ADD_ASSIGN", 
		"SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", "XOR_ASSIGN", 
		"MOD_ASSIGN", "LSHIFT_ASSIGN", "RSHIFT_ASSIGN", "URSHIFT_ASSIGN", "ARROW", 
		"COLONCOLON", "AT", "ELLIPSIS", "WS", "COMMENT", "LINE_COMMENT", "HexColorLiteral", 
		"IDENTIFIER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ProcessingParser._LITERAL_NAMES, ProcessingParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ProcessingParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ProcessingParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return ProcessingParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ProcessingParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ProcessingParser._ATN, this);
	}
	// @RuleVersion(0)
	public processingSketch(): ProcessingSketchContext {
		let _localctx: ProcessingSketchContext = new ProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ProcessingParser.RULE_processingSketch);
		try {
			this.state = 237;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 234;
				this.staticProcessingSketch();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 235;
				this.javaProcessingSketch();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 236;
				this.activeProcessingSketch();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compilationUnit(): CompilationUnitContext {
		let _localctx: CompilationUnitContext = new CompilationUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ProcessingParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 240;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 239;
				this.packageDeclaration();
				}
				break;
			}
			this.state = 245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.IMPORT) {
				{
				{
				this.state = 242;
				this.importDeclaration();
				}
				}
				this.state = 247;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 251;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.INTERFACE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.AT) {
				{
				{
				this.state = 248;
				this.typeDeclaration();
				}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 254;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public packageDeclaration(): PackageDeclarationContext {
		let _localctx: PackageDeclarationContext = new PackageDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ProcessingParser.RULE_packageDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 259;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 256;
				this.annotation();
				}
				}
				this.state = 261;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 262;
			this.match(ProcessingParser.PACKAGE);
			this.state = 263;
			this.qualifiedName();
			this.state = 264;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importDeclaration(): ImportDeclarationContext {
		let _localctx: ImportDeclarationContext = new ImportDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ProcessingParser.RULE_importDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this.match(ProcessingParser.IMPORT);
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.STATIC) {
				{
				this.state = 267;
				this.match(ProcessingParser.STATIC);
				}
			}

			this.state = 270;
			this.qualifiedName();
			this.state = 273;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.DOT) {
				{
				this.state = 271;
				this.match(ProcessingParser.DOT);
				this.state = 272;
				this.match(ProcessingParser.MUL);
				}
			}

			this.state = 275;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeDeclaration(): TypeDeclarationContext {
		let _localctx: TypeDeclarationContext = new TypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ProcessingParser.RULE_typeDeclaration);
		try {
			let _alt: number;
			this.state = 290;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.CLASS:
			case ProcessingParser.ENUM:
			case ProcessingParser.FINAL:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 280;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 277;
						this.classOrInterfaceModifier();
						}
						}
					}
					this.state = 282;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
				}
				this.state = 287;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.CLASS:
					{
					this.state = 283;
					this.classDeclaration();
					}
					break;
				case ProcessingParser.ENUM:
					{
					this.state = 284;
					this.enumDeclaration();
					}
					break;
				case ProcessingParser.INTERFACE:
					{
					this.state = 285;
					this.interfaceDeclaration();
					}
					break;
				case ProcessingParser.AT:
					{
					this.state = 286;
					this.annotationTypeDeclaration();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 289;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public modifier(): ModifierContext {
		let _localctx: ModifierContext = new ModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ProcessingParser.RULE_modifier);
		try {
			this.state = 297;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.FINAL:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 292;
				this.classOrInterfaceModifier();
				}
				break;
			case ProcessingParser.NATIVE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 293;
				this.match(ProcessingParser.NATIVE);
				}
				break;
			case ProcessingParser.SYNCHRONIZED:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 294;
				this.match(ProcessingParser.SYNCHRONIZED);
				}
				break;
			case ProcessingParser.TRANSIENT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 295;
				this.match(ProcessingParser.TRANSIENT);
				}
				break;
			case ProcessingParser.VOLATILE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 296;
				this.match(ProcessingParser.VOLATILE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext {
		let _localctx: ClassOrInterfaceModifierContext = new ClassOrInterfaceModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ProcessingParser.RULE_classOrInterfaceModifier);
		try {
			this.state = 307;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 299;
				this.annotation();
				}
				break;
			case ProcessingParser.PUBLIC:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 300;
				this.match(ProcessingParser.PUBLIC);
				}
				break;
			case ProcessingParser.PROTECTED:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 301;
				this.match(ProcessingParser.PROTECTED);
				}
				break;
			case ProcessingParser.PRIVATE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 302;
				this.match(ProcessingParser.PRIVATE);
				}
				break;
			case ProcessingParser.STATIC:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 303;
				this.match(ProcessingParser.STATIC);
				}
				break;
			case ProcessingParser.ABSTRACT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 304;
				this.match(ProcessingParser.ABSTRACT);
				}
				break;
			case ProcessingParser.FINAL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 305;
				this.match(ProcessingParser.FINAL);
				}
				break;
			case ProcessingParser.STRICTFP:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 306;
				this.match(ProcessingParser.STRICTFP);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableModifier(): VariableModifierContext {
		let _localctx: VariableModifierContext = new VariableModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ProcessingParser.RULE_variableModifier);
		try {
			this.state = 311;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.FINAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 309;
				this.match(ProcessingParser.FINAL);
				}
				break;
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 310;
				this.annotation();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classDeclaration(): ClassDeclarationContext {
		let _localctx: ClassDeclarationContext = new ClassDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ProcessingParser.RULE_classDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 313;
			this.match(ProcessingParser.CLASS);
			this.state = 314;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 315;
				this.typeParameters();
				}
			}

			this.state = 320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.EXTENDS) {
				{
				this.state = 318;
				this.match(ProcessingParser.EXTENDS);
				this.state = 319;
				this.typeType();
				}
			}

			this.state = 324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.IMPLEMENTS) {
				{
				this.state = 322;
				this.match(ProcessingParser.IMPLEMENTS);
				this.state = 323;
				this.typeList();
				}
			}

			this.state = 326;
			this.classBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeParameters(): TypeParametersContext {
		let _localctx: TypeParametersContext = new TypeParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ProcessingParser.RULE_typeParameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 328;
			this.match(ProcessingParser.LT);
			this.state = 329;
			this.typeParameter();
			this.state = 334;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 330;
				this.match(ProcessingParser.COMMA);
				this.state = 331;
				this.typeParameter();
				}
				}
				this.state = 336;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 337;
			this.match(ProcessingParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeParameter(): TypeParameterContext {
		let _localctx: TypeParameterContext = new TypeParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ProcessingParser.RULE_typeParameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 339;
				this.annotation();
				}
				}
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 345;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 348;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.EXTENDS) {
				{
				this.state = 346;
				this.match(ProcessingParser.EXTENDS);
				this.state = 347;
				this.typeBound();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeBound(): TypeBoundContext {
		let _localctx: TypeBoundContext = new TypeBoundContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ProcessingParser.RULE_typeBound);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 350;
			this.typeType();
			this.state = 355;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.BITAND) {
				{
				{
				this.state = 351;
				this.match(ProcessingParser.BITAND);
				this.state = 352;
				this.typeType();
				}
				}
				this.state = 357;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumDeclaration(): EnumDeclarationContext {
		let _localctx: EnumDeclarationContext = new EnumDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ProcessingParser.RULE_enumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 358;
			this.match(ProcessingParser.ENUM);
			this.state = 359;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 362;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.IMPLEMENTS) {
				{
				this.state = 360;
				this.match(ProcessingParser.IMPLEMENTS);
				this.state = 361;
				this.typeList();
				}
			}

			this.state = 364;
			this.match(ProcessingParser.LBRACE);
			this.state = 366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				this.state = 365;
				this.enumConstants();
				}
			}

			this.state = 369;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.COMMA) {
				{
				this.state = 368;
				this.match(ProcessingParser.COMMA);
				}
			}

			this.state = 372;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.SEMI) {
				{
				this.state = 371;
				this.enumBodyDeclarations();
				}
			}

			this.state = 374;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumConstants(): EnumConstantsContext {
		let _localctx: EnumConstantsContext = new EnumConstantsContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ProcessingParser.RULE_enumConstants);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 376;
			this.enumConstant();
			this.state = 381;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 377;
					this.match(ProcessingParser.COMMA);
					this.state = 378;
					this.enumConstant();
					}
					}
				}
				this.state = 383;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumConstant(): EnumConstantContext {
		let _localctx: EnumConstantContext = new EnumConstantContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ProcessingParser.RULE_enumConstant);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 387;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 384;
				this.annotation();
				}
				}
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 390;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 392;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LPAREN) {
				{
				this.state = 391;
				this.arguments();
				}
			}

			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LBRACE) {
				{
				this.state = 394;
				this.classBody();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumBodyDeclarations(): EnumBodyDeclarationsContext {
		let _localctx: EnumBodyDeclarationsContext = new EnumBodyDeclarationsContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ProcessingParser.RULE_enumBodyDeclarations);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 397;
			this.match(ProcessingParser.SEMI);
			this.state = 401;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ProcessingParser.LBRACE - 66)) | (1 << (ProcessingParser.SEMI - 66)) | (1 << (ProcessingParser.LT - 66)))) !== 0) || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 398;
				this.classBodyDeclaration();
				}
				}
				this.state = 403;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceDeclaration(): InterfaceDeclarationContext {
		let _localctx: InterfaceDeclarationContext = new InterfaceDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ProcessingParser.RULE_interfaceDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this.match(ProcessingParser.INTERFACE);
			this.state = 405;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 407;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 406;
				this.typeParameters();
				}
			}

			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.EXTENDS) {
				{
				this.state = 409;
				this.match(ProcessingParser.EXTENDS);
				this.state = 410;
				this.typeList();
				}
			}

			this.state = 413;
			this.interfaceBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classBody(): ClassBodyContext {
		let _localctx: ClassBodyContext = new ClassBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ProcessingParser.RULE_classBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 415;
			this.match(ProcessingParser.LBRACE);
			this.state = 419;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ProcessingParser.LBRACE - 66)) | (1 << (ProcessingParser.SEMI - 66)) | (1 << (ProcessingParser.LT - 66)))) !== 0) || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 416;
				this.classBodyDeclaration();
				}
				}
				this.state = 421;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 422;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceBody(): InterfaceBodyContext {
		let _localctx: InterfaceBodyContext = new InterfaceBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ProcessingParser.RULE_interfaceBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 424;
			this.match(ProcessingParser.LBRACE);
			this.state = 428;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DEFAULT) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.LT || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 425;
				this.interfaceBodyDeclaration();
				}
				}
				this.state = 430;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 431;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classBodyDeclaration(): ClassBodyDeclarationContext {
		let _localctx: ClassBodyDeclarationContext = new ClassBodyDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ProcessingParser.RULE_classBodyDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.state = 446;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 433;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 434;
				this.importDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 436;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.STATIC) {
					{
					this.state = 435;
					this.match(ProcessingParser.STATIC);
					}
				}

				this.state = 438;
				this.block();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 442;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 439;
						this.modifier();
						}
						}
					}
					this.state = 444;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
				}
				this.state = 445;
				this.memberDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public memberDeclaration(): MemberDeclarationContext {
		let _localctx: MemberDeclarationContext = new MemberDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ProcessingParser.RULE_memberDeclaration);
		try {
			this.state = 457;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 448;
				this.methodDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 449;
				this.genericMethodDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 450;
				this.fieldDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 451;
				this.constructorDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 452;
				this.genericConstructorDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 453;
				this.interfaceDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 454;
				this.annotationTypeDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 455;
				this.classDeclaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 456;
				this.enumDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodDeclaration(): MethodDeclarationContext {
		let _localctx: MethodDeclarationContext = new MethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ProcessingParser.RULE_methodDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 459;
			this.typeTypeOrVoid();
			this.state = 460;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 461;
			this.formalParameters();
			this.state = 466;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 462;
				this.match(ProcessingParser.LBRACK);
				this.state = 463;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 468;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 471;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.THROWS) {
				{
				this.state = 469;
				this.match(ProcessingParser.THROWS);
				this.state = 470;
				this.qualifiedNameList();
				}
			}

			this.state = 473;
			this.methodBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodBody(): MethodBodyContext {
		let _localctx: MethodBodyContext = new MethodBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ProcessingParser.RULE_methodBody);
		try {
			this.state = 477;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LBRACE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 475;
				this.block();
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 476;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeTypeOrVoid(): TypeTypeOrVoidContext {
		let _localctx: TypeTypeOrVoidContext = new TypeTypeOrVoidContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ProcessingParser.RULE_typeTypeOrVoid);
		try {
			this.state = 481;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.VAR:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 479;
				this.typeType();
				}
				break;
			case ProcessingParser.VOID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 480;
				this.match(ProcessingParser.VOID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericMethodDeclaration(): GenericMethodDeclarationContext {
		let _localctx: GenericMethodDeclarationContext = new GenericMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ProcessingParser.RULE_genericMethodDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 483;
			this.typeParameters();
			this.state = 484;
			this.methodDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericConstructorDeclaration(): GenericConstructorDeclarationContext {
		let _localctx: GenericConstructorDeclarationContext = new GenericConstructorDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ProcessingParser.RULE_genericConstructorDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 486;
			this.typeParameters();
			this.state = 487;
			this.constructorDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constructorDeclaration(): ConstructorDeclarationContext {
		let _localctx: ConstructorDeclarationContext = new ConstructorDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ProcessingParser.RULE_constructorDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 489;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 490;
			this.formalParameters();
			this.state = 493;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.THROWS) {
				{
				this.state = 491;
				this.match(ProcessingParser.THROWS);
				this.state = 492;
				this.qualifiedNameList();
				}
			}

			this.state = 495;
			_localctx._constructorBody = this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldDeclaration(): FieldDeclarationContext {
		let _localctx: FieldDeclarationContext = new FieldDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ProcessingParser.RULE_fieldDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 497;
			this.typeType();
			this.state = 498;
			this.variableDeclarators();
			this.state = 499;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceBodyDeclaration(): InterfaceBodyDeclarationContext {
		let _localctx: InterfaceBodyDeclarationContext = new InterfaceBodyDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ProcessingParser.RULE_interfaceBodyDeclaration);
		try {
			let _alt: number;
			this.state = 509;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.CLASS:
			case ProcessingParser.COLOR:
			case ProcessingParser.DEFAULT:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.ENUM:
			case ProcessingParser.FINAL:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.LONG:
			case ProcessingParser.NATIVE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.SHORT:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.SYNCHRONIZED:
			case ProcessingParser.TRANSIENT:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.VOLATILE:
			case ProcessingParser.LT:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 504;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 501;
						this.modifier();
						}
						}
					}
					this.state = 506;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				}
				this.state = 507;
				this.interfaceMemberDeclaration();
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 508;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext {
		let _localctx: InterfaceMemberDeclarationContext = new InterfaceMemberDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ProcessingParser.RULE_interfaceMemberDeclaration);
		try {
			this.state = 518;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 511;
				this.constDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 512;
				this.interfaceMethodDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 513;
				this.genericInterfaceMethodDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 514;
				this.interfaceDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 515;
				this.annotationTypeDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 516;
				this.classDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 517;
				this.enumDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constDeclaration(): ConstDeclarationContext {
		let _localctx: ConstDeclarationContext = new ConstDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ProcessingParser.RULE_constDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 520;
			this.typeType();
			this.state = 521;
			this.constantDeclarator();
			this.state = 526;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 522;
				this.match(ProcessingParser.COMMA);
				this.state = 523;
				this.constantDeclarator();
				}
				}
				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 529;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constantDeclarator(): ConstantDeclaratorContext {
		let _localctx: ConstantDeclaratorContext = new ConstantDeclaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ProcessingParser.RULE_constantDeclarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 531;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 536;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 532;
				this.match(ProcessingParser.LBRACK);
				this.state = 533;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 538;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 539;
			this.match(ProcessingParser.ASSIGN);
			this.state = 540;
			this.variableInitializer();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
		let _localctx: InterfaceMethodDeclarationContext = new InterfaceMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ProcessingParser.RULE_interfaceMethodDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 545;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 542;
					this.interfaceMethodModifier();
					}
					}
				}
				this.state = 547;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			}
			this.state = 558;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 548;
				this.typeTypeOrVoid();
				}
				break;
			case ProcessingParser.LT:
				{
				this.state = 549;
				this.typeParameters();
				this.state = 553;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 550;
						this.annotation();
						}
						}
					}
					this.state = 555;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
				}
				this.state = 556;
				this.typeTypeOrVoid();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 560;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 561;
			this.formalParameters();
			this.state = 566;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 562;
				this.match(ProcessingParser.LBRACK);
				this.state = 563;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 568;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 571;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.THROWS) {
				{
				this.state = 569;
				this.match(ProcessingParser.THROWS);
				this.state = 570;
				this.qualifiedNameList();
				}
			}

			this.state = 573;
			this.methodBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceMethodModifier(): InterfaceMethodModifierContext {
		let _localctx: InterfaceMethodModifierContext = new InterfaceMethodModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ProcessingParser.RULE_interfaceMethodModifier);
		try {
			this.state = 581;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 575;
				this.annotation();
				}
				break;
			case ProcessingParser.PUBLIC:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 576;
				this.match(ProcessingParser.PUBLIC);
				}
				break;
			case ProcessingParser.ABSTRACT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 577;
				this.match(ProcessingParser.ABSTRACT);
				}
				break;
			case ProcessingParser.DEFAULT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 578;
				this.match(ProcessingParser.DEFAULT);
				}
				break;
			case ProcessingParser.STATIC:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 579;
				this.match(ProcessingParser.STATIC);
				}
				break;
			case ProcessingParser.STRICTFP:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 580;
				this.match(ProcessingParser.STRICTFP);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext {
		let _localctx: GenericInterfaceMethodDeclarationContext = new GenericInterfaceMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, ProcessingParser.RULE_genericInterfaceMethodDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 583;
			this.typeParameters();
			this.state = 584;
			this.interfaceMethodDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclarators(): VariableDeclaratorsContext {
		let _localctx: VariableDeclaratorsContext = new VariableDeclaratorsContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, ProcessingParser.RULE_variableDeclarators);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 586;
			this.variableDeclarator();
			this.state = 591;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 587;
				this.match(ProcessingParser.COMMA);
				this.state = 588;
				this.variableDeclarator();
				}
				}
				this.state = 593;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclarator(): VariableDeclaratorContext {
		let _localctx: VariableDeclaratorContext = new VariableDeclaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, ProcessingParser.RULE_variableDeclarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 594;
			this.variableDeclaratorId();
			this.state = 597;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.ASSIGN) {
				{
				this.state = 595;
				this.match(ProcessingParser.ASSIGN);
				this.state = 596;
				this.variableInitializer();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableInitializer(): VariableInitializerContext {
		let _localctx: VariableInitializerContext = new VariableInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, ProcessingParser.RULE_variableInitializer);
		try {
			this.state = 601;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LBRACE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 599;
				this.arrayInitializer();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.NEW:
			case ProcessingParser.SHORT:
			case ProcessingParser.SUPER:
			case ProcessingParser.THIS:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
			case ProcessingParser.BOOL_LITERAL:
			case ProcessingParser.CHAR_LITERAL:
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
			case ProcessingParser.NULL_LITERAL:
			case ProcessingParser.LPAREN:
			case ProcessingParser.LT:
			case ProcessingParser.BANG:
			case ProcessingParser.TILDE:
			case ProcessingParser.INC:
			case ProcessingParser.DEC:
			case ProcessingParser.ADD:
			case ProcessingParser.SUB:
			case ProcessingParser.AT:
			case ProcessingParser.HexColorLiteral:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 600;
				this.expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayInitializer(): ArrayInitializerContext {
		let _localctx: ArrayInitializerContext = new ArrayInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ProcessingParser.RULE_arrayInitializer);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 603;
			this.match(ProcessingParser.LBRACE);
			this.state = 615;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 604;
				this.variableInitializer();
				this.state = 609;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 605;
						this.match(ProcessingParser.COMMA);
						this.state = 606;
						this.variableInitializer();
						}
						}
					}
					this.state = 611;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
				}
				this.state = 613;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.COMMA) {
					{
					this.state = 612;
					this.match(ProcessingParser.COMMA);
					}
				}

				}
			}

			this.state = 617;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classOrInterfaceType(): ClassOrInterfaceTypeContext {
		let _localctx: ClassOrInterfaceTypeContext = new ClassOrInterfaceTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, ProcessingParser.RULE_classOrInterfaceType);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 619;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 621;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				{
				this.state = 620;
				this.typeArguments();
				}
				break;
			}
			this.state = 630;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 61, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 623;
					this.match(ProcessingParser.DOT);
					this.state = 624;
					this.match(ProcessingParser.IDENTIFIER);
					this.state = 626;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
					case 1:
						{
						this.state = 625;
						this.typeArguments();
						}
						break;
					}
					}
					}
				}
				this.state = 632;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 61, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeArgument(): TypeArgumentContext {
		let _localctx: TypeArgumentContext = new TypeArgumentContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, ProcessingParser.RULE_typeArgument);
		let _la: number;
		try {
			this.state = 639;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.VAR:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 633;
				this.typeType();
				}
				break;
			case ProcessingParser.QUESTION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 634;
				this.match(ProcessingParser.QUESTION);
				this.state = 637;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.EXTENDS || _la === ProcessingParser.SUPER) {
					{
					this.state = 635;
					_la = this._input.LA(1);
					if (!(_la === ProcessingParser.EXTENDS || _la === ProcessingParser.SUPER)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 636;
					this.typeType();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedNameList(): QualifiedNameListContext {
		let _localctx: QualifiedNameListContext = new QualifiedNameListContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, ProcessingParser.RULE_qualifiedNameList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 641;
			this.qualifiedName();
			this.state = 646;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 642;
				this.match(ProcessingParser.COMMA);
				this.state = 643;
				this.qualifiedName();
				}
				}
				this.state = 648;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameters(): FormalParametersContext {
		let _localctx: FormalParametersContext = new FormalParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, ProcessingParser.RULE_formalParameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 649;
			this.match(ProcessingParser.LPAREN);
			this.state = 651;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || _la === ProcessingParser.SHORT || _la === ProcessingParser.VAR || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				this.state = 650;
				this.formalParameterList();
				}
			}

			this.state = 653;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameterList(): FormalParameterListContext {
		let _localctx: FormalParameterListContext = new FormalParameterListContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, ProcessingParser.RULE_formalParameterList);
		let _la: number;
		try {
			let _alt: number;
			this.state = 668;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 655;
				this.formalParameter();
				this.state = 660;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 656;
						this.match(ProcessingParser.COMMA);
						this.state = 657;
						this.formalParameter();
						}
						}
					}
					this.state = 662;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
				}
				this.state = 665;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.COMMA) {
					{
					this.state = 663;
					this.match(ProcessingParser.COMMA);
					this.state = 664;
					this.lastFormalParameter();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 667;
				this.lastFormalParameter();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameter(): FormalParameterContext {
		let _localctx: FormalParameterContext = new FormalParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, ProcessingParser.RULE_formalParameter);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 673;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 69, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 670;
					this.variableModifier();
					}
					}
				}
				this.state = 675;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 69, this._ctx);
			}
			this.state = 676;
			this.typeType();
			this.state = 677;
			this.variableDeclaratorId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lastFormalParameter(): LastFormalParameterContext {
		let _localctx: LastFormalParameterContext = new LastFormalParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, ProcessingParser.RULE_lastFormalParameter);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 682;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 70, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 679;
					this.variableModifier();
					}
					}
				}
				this.state = 684;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 70, this._ctx);
			}
			this.state = 685;
			this.typeType();
			this.state = 686;
			this.match(ProcessingParser.ELLIPSIS);
			this.state = 687;
			this.variableDeclaratorId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public baseStringLiteral(): BaseStringLiteralContext {
		let _localctx: BaseStringLiteralContext = new BaseStringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, ProcessingParser.RULE_baseStringLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 689;
			this.match(ProcessingParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multilineStringLiteral(): MultilineStringLiteralContext {
		let _localctx: MultilineStringLiteralContext = new MultilineStringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, ProcessingParser.RULE_multilineStringLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 691;
			this.match(ProcessingParser.MULTI_STRING_LIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringLiteral(): StringLiteralContext {
		let _localctx: StringLiteralContext = new StringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, ProcessingParser.RULE_stringLiteral);
		try {
			this.state = 695;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 693;
				this.baseStringLiteral();
				}
				break;
			case ProcessingParser.MULTI_STRING_LIT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 694;
				this.multilineStringLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public integerLiteral(): IntegerLiteralContext {
		let _localctx: IntegerLiteralContext = new IntegerLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, ProcessingParser.RULE_integerLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			_la = this._input.LA(1);
			if (!(((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (ProcessingParser.DECIMAL_LITERAL - 53)) | (1 << (ProcessingParser.HEX_LITERAL - 53)) | (1 << (ProcessingParser.OCT_LITERAL - 53)) | (1 << (ProcessingParser.BINARY_LITERAL - 53)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public floatLiteral(): FloatLiteralContext {
		let _localctx: FloatLiteralContext = new FloatLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, ProcessingParser.RULE_floatLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 699;
			_la = this._input.LA(1);
			if (!(_la === ProcessingParser.FLOAT_LITERAL || _la === ProcessingParser.HEX_FLOAT_LITERAL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation(): AnnotationContext {
		let _localctx: AnnotationContext = new AnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, ProcessingParser.RULE_annotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 701;
			this.match(ProcessingParser.AT);
			this.state = 702;
			this.qualifiedName();
			this.state = 709;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LPAREN) {
				{
				this.state = 703;
				this.match(ProcessingParser.LPAREN);
				this.state = 706;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 72, this._ctx) ) {
				case 1:
					{
					this.state = 704;
					this.elementValuePairs();
					}
					break;

				case 2:
					{
					this.state = 705;
					this.elementValue();
					}
					break;
				}
				this.state = 708;
				this.match(ProcessingParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValuePairs(): ElementValuePairsContext {
		let _localctx: ElementValuePairsContext = new ElementValuePairsContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, ProcessingParser.RULE_elementValuePairs);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 711;
			this.elementValuePair();
			this.state = 716;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 712;
				this.match(ProcessingParser.COMMA);
				this.state = 713;
				this.elementValuePair();
				}
				}
				this.state = 718;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValuePair(): ElementValuePairContext {
		let _localctx: ElementValuePairContext = new ElementValuePairContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, ProcessingParser.RULE_elementValuePair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 719;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 720;
			this.match(ProcessingParser.ASSIGN);
			this.state = 721;
			this.elementValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValue(): ElementValueContext {
		let _localctx: ElementValueContext = new ElementValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, ProcessingParser.RULE_elementValue);
		try {
			this.state = 726;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 75, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 723;
				this.expression(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 724;
				this.annotation();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 725;
				this.elementValueArrayInitializer();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValueArrayInitializer(): ElementValueArrayInitializerContext {
		let _localctx: ElementValueArrayInitializerContext = new ElementValueArrayInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, ProcessingParser.RULE_elementValueArrayInitializer);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 728;
			this.match(ProcessingParser.LBRACE);
			this.state = 737;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 729;
				this.elementValue();
				this.state = 734;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 76, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 730;
						this.match(ProcessingParser.COMMA);
						this.state = 731;
						this.elementValue();
						}
						}
					}
					this.state = 736;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 76, this._ctx);
				}
				}
			}

			this.state = 740;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.COMMA) {
				{
				this.state = 739;
				this.match(ProcessingParser.COMMA);
				}
			}

			this.state = 742;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
		let _localctx: AnnotationTypeDeclarationContext = new AnnotationTypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, ProcessingParser.RULE_annotationTypeDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			this.match(ProcessingParser.AT);
			this.state = 745;
			this.match(ProcessingParser.INTERFACE);
			this.state = 746;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 747;
			this.annotationTypeBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeBody(): AnnotationTypeBodyContext {
		let _localctx: AnnotationTypeBodyContext = new AnnotationTypeBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, ProcessingParser.RULE_annotationTypeBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 749;
			this.match(ProcessingParser.LBRACE);
			this.state = 753;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 750;
				this.annotationTypeElementDeclaration();
				}
				}
				this.state = 755;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 756;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeElementDeclaration(): AnnotationTypeElementDeclarationContext {
		let _localctx: AnnotationTypeElementDeclarationContext = new AnnotationTypeElementDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, ProcessingParser.RULE_annotationTypeElementDeclaration);
		try {
			let _alt: number;
			this.state = 766;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.CLASS:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.ENUM:
			case ProcessingParser.FINAL:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.LONG:
			case ProcessingParser.NATIVE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.SHORT:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.SYNCHRONIZED:
			case ProcessingParser.TRANSIENT:
			case ProcessingParser.VAR:
			case ProcessingParser.VOLATILE:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 761;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 80, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 758;
						this.modifier();
						}
						}
					}
					this.state = 763;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 80, this._ctx);
				}
				this.state = 764;
				this.annotationTypeElementRest();
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 765;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeElementRest(): AnnotationTypeElementRestContext {
		let _localctx: AnnotationTypeElementRestContext = new AnnotationTypeElementRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, ProcessingParser.RULE_annotationTypeElementRest);
		try {
			this.state = 788;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 86, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 768;
				this.typeType();
				this.state = 769;
				this.annotationMethodOrConstantRest();
				this.state = 770;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 772;
				this.classDeclaration();
				this.state = 774;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 82, this._ctx) ) {
				case 1:
					{
					this.state = 773;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 776;
				this.interfaceDeclaration();
				this.state = 778;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
				case 1:
					{
					this.state = 777;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 780;
				this.enumDeclaration();
				this.state = 782;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 84, this._ctx) ) {
				case 1:
					{
					this.state = 781;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 784;
				this.annotationTypeDeclaration();
				this.state = 786;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 85, this._ctx) ) {
				case 1:
					{
					this.state = 785;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext {
		let _localctx: AnnotationMethodOrConstantRestContext = new AnnotationMethodOrConstantRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, ProcessingParser.RULE_annotationMethodOrConstantRest);
		try {
			this.state = 792;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 87, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 790;
				this.annotationMethodRest();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 791;
				this.annotationConstantRest();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationMethodRest(): AnnotationMethodRestContext {
		let _localctx: AnnotationMethodRestContext = new AnnotationMethodRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, ProcessingParser.RULE_annotationMethodRest);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 794;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 795;
			this.match(ProcessingParser.LPAREN);
			this.state = 796;
			this.match(ProcessingParser.RPAREN);
			this.state = 798;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.DEFAULT) {
				{
				this.state = 797;
				this.defaultValue();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationConstantRest(): AnnotationConstantRestContext {
		let _localctx: AnnotationConstantRestContext = new AnnotationConstantRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, ProcessingParser.RULE_annotationConstantRest);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 800;
			this.variableDeclarators();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public defaultValue(): DefaultValueContext {
		let _localctx: DefaultValueContext = new DefaultValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, ProcessingParser.RULE_defaultValue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 802;
			this.match(ProcessingParser.DEFAULT);
			this.state = 803;
			this.elementValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, ProcessingParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 805;
			this.match(ProcessingParser.LBRACE);
			this.state = 809;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				{
				this.state = 806;
				this.blockStatement();
				}
				}
				this.state = 811;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 812;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public blockStatement(): BlockStatementContext {
		let _localctx: BlockStatementContext = new BlockStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, ProcessingParser.RULE_blockStatement);
		try {
			this.state = 819;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 90, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 814;
				this.localVariableDeclaration();
				this.state = 815;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 817;
				this.statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 818;
				this.localTypeDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public localVariableDeclaration(): LocalVariableDeclarationContext {
		let _localctx: LocalVariableDeclarationContext = new LocalVariableDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, ProcessingParser.RULE_localVariableDeclaration);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 824;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 91, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 821;
					this.variableModifier();
					}
					}
				}
				this.state = 826;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 91, this._ctx);
			}
			this.state = 827;
			this.typeType();
			this.state = 828;
			this.variableDeclarators();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public localTypeDeclaration(): LocalTypeDeclarationContext {
		let _localctx: LocalTypeDeclarationContext = new LocalTypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, ProcessingParser.RULE_localTypeDeclaration);
		let _la: number;
		try {
			this.state = 841;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.CLASS:
			case ProcessingParser.FINAL:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 833;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.ABSTRACT || _la === ProcessingParser.FINAL || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)))) !== 0) || _la === ProcessingParser.AT) {
					{
					{
					this.state = 830;
					this.classOrInterfaceModifier();
					}
					}
					this.state = 835;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 838;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.CLASS:
					{
					this.state = 836;
					this.classDeclaration();
					}
					break;
				case ProcessingParser.INTERFACE:
					{
					this.state = 837;
					this.interfaceDeclaration();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 840;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, ProcessingParser.RULE_statement);
		let _la: number;
		try {
			let _alt: number;
			this.state = 942;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 107, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 843;
				_localctx._blockLabel = this.block();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 844;
				this.match(ProcessingParser.ASSERT);
				this.state = 845;
				this.expression(0);
				this.state = 848;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.COLON) {
					{
					this.state = 846;
					this.match(ProcessingParser.COLON);
					this.state = 847;
					this.expression(0);
					}
				}

				this.state = 850;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 852;
				this.match(ProcessingParser.IF);
				this.state = 853;
				this.parExpression();
				this.state = 854;
				this.statement();
				this.state = 857;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 96, this._ctx) ) {
				case 1:
					{
					this.state = 855;
					this.match(ProcessingParser.ELSE);
					this.state = 856;
					this.statement();
					}
					break;
				}
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 859;
				this.forLoop();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 860;
				this.match(ProcessingParser.WHILE);
				this.state = 861;
				this.parExpression();
				this.state = 862;
				this.statement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 864;
				this.match(ProcessingParser.DO);
				this.state = 865;
				this.statement();
				this.state = 866;
				this.match(ProcessingParser.WHILE);
				this.state = 867;
				this.parExpression();
				this.state = 868;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 870;
				this.match(ProcessingParser.TRY);
				this.state = 871;
				this.block();
				this.state = 881;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.CATCH:
					{
					this.state = 873;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					do {
						{
						{
						this.state = 872;
						this.catchClause();
						}
						}
						this.state = 875;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					} while (_la === ProcessingParser.CATCH);
					this.state = 878;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ProcessingParser.FINALLY) {
						{
						this.state = 877;
						this.finallyBlock();
						}
					}

					}
					break;
				case ProcessingParser.FINALLY:
					{
					this.state = 880;
					this.finallyBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 883;
				this.match(ProcessingParser.TRY);
				this.state = 884;
				this.resourceSpecification();
				this.state = 885;
				this.block();
				this.state = 889;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.CATCH) {
					{
					{
					this.state = 886;
					this.catchClause();
					}
					}
					this.state = 891;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 893;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.FINALLY) {
					{
					this.state = 892;
					this.finallyBlock();
					}
				}

				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 895;
				this.match(ProcessingParser.SWITCH);
				this.state = 896;
				this.parExpression();
				this.state = 897;
				this.match(ProcessingParser.LBRACE);
				this.state = 901;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 102, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 898;
						this.switchBlockStatementGroup();
						}
						}
					}
					this.state = 903;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 102, this._ctx);
				}
				this.state = 907;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.CASE || _la === ProcessingParser.DEFAULT) {
					{
					{
					this.state = 904;
					this.switchLabel();
					}
					}
					this.state = 909;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 910;
				this.match(ProcessingParser.RBRACE);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 912;
				this.match(ProcessingParser.SYNCHRONIZED);
				this.state = 913;
				this.parExpression();
				this.state = 914;
				this.block();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 916;
				this.match(ProcessingParser.RETURN);
				this.state = 918;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 917;
					this.expression(0);
					}
				}

				this.state = 920;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 921;
				this.match(ProcessingParser.THROW);
				this.state = 922;
				this.expression(0);
				this.state = 923;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 925;
				this.match(ProcessingParser.BREAK);
				this.state = 927;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.IDENTIFIER) {
					{
					this.state = 926;
					this.match(ProcessingParser.IDENTIFIER);
					}
				}

				this.state = 929;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 930;
				this.match(ProcessingParser.CONTINUE);
				this.state = 932;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.IDENTIFIER) {
					{
					this.state = 931;
					this.match(ProcessingParser.IDENTIFIER);
					}
				}

				this.state = 934;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 935;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 936;
				_localctx._statementExpression = this.expression(0);
				this.state = 937;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 939;
				_localctx._identifierLabel = this.match(ProcessingParser.IDENTIFIER);
				this.state = 940;
				this.match(ProcessingParser.COLON);
				this.state = 941;
				this.statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public catchClause(): CatchClauseContext {
		let _localctx: CatchClauseContext = new CatchClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, ProcessingParser.RULE_catchClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 944;
			this.match(ProcessingParser.CATCH);
			this.state = 945;
			this.match(ProcessingParser.LPAREN);
			this.state = 949;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.FINAL || _la === ProcessingParser.AT) {
				{
				{
				this.state = 946;
				this.variableModifier();
				}
				}
				this.state = 951;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 952;
			this.catchType();
			this.state = 953;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 954;
			this.match(ProcessingParser.RPAREN);
			this.state = 955;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public catchType(): CatchTypeContext {
		let _localctx: CatchTypeContext = new CatchTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, ProcessingParser.RULE_catchType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 957;
			this.qualifiedName();
			this.state = 962;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.BITOR) {
				{
				{
				this.state = 958;
				this.match(ProcessingParser.BITOR);
				this.state = 959;
				this.qualifiedName();
				}
				}
				this.state = 964;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public finallyBlock(): FinallyBlockContext {
		let _localctx: FinallyBlockContext = new FinallyBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, ProcessingParser.RULE_finallyBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 965;
			this.match(ProcessingParser.FINALLY);
			this.state = 966;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resourceSpecification(): ResourceSpecificationContext {
		let _localctx: ResourceSpecificationContext = new ResourceSpecificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, ProcessingParser.RULE_resourceSpecification);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 968;
			this.match(ProcessingParser.LPAREN);
			this.state = 969;
			this.resources();
			this.state = 971;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.SEMI) {
				{
				this.state = 970;
				this.match(ProcessingParser.SEMI);
				}
			}

			this.state = 973;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resources(): ResourcesContext {
		let _localctx: ResourcesContext = new ResourcesContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, ProcessingParser.RULE_resources);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 975;
			this.resource();
			this.state = 980;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 111, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 976;
					this.match(ProcessingParser.SEMI);
					this.state = 977;
					this.resource();
					}
					}
				}
				this.state = 982;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 111, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resource(): ResourceContext {
		let _localctx: ResourceContext = new ResourceContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, ProcessingParser.RULE_resource);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 986;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.FINAL || _la === ProcessingParser.AT) {
				{
				{
				this.state = 983;
				this.variableModifier();
				}
				}
				this.state = 988;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 989;
			this.classOrInterfaceType();
			this.state = 990;
			this.variableDeclaratorId();
			this.state = 991;
			this.match(ProcessingParser.ASSIGN);
			this.state = 992;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchBlockStatementGroup(): SwitchBlockStatementGroupContext {
		let _localctx: SwitchBlockStatementGroupContext = new SwitchBlockStatementGroupContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, ProcessingParser.RULE_switchBlockStatementGroup);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 995;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 994;
				this.switchLabel();
				}
				}
				this.state = 997;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ProcessingParser.CASE || _la === ProcessingParser.DEFAULT);
			this.state = 1000;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 999;
				this.blockStatement();
				}
				}
				this.state = 1002;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchLabel(): SwitchLabelContext {
		let _localctx: SwitchLabelContext = new SwitchLabelContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, ProcessingParser.RULE_switchLabel);
		try {
			this.state = 1012;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.CASE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1004;
				this.match(ProcessingParser.CASE);
				this.state = 1007;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 115, this._ctx) ) {
				case 1:
					{
					this.state = 1005;
					_localctx._constantExpression = this.expression(0);
					}
					break;

				case 2:
					{
					this.state = 1006;
					_localctx._enumConstantName = this.match(ProcessingParser.IDENTIFIER);
					}
					break;
				}
				this.state = 1009;
				this.match(ProcessingParser.COLON);
				}
				break;
			case ProcessingParser.DEFAULT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1010;
				this.match(ProcessingParser.DEFAULT);
				this.state = 1011;
				this.match(ProcessingParser.COLON);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forLoop(): ForLoopContext {
		let _localctx: ForLoopContext = new ForLoopContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, ProcessingParser.RULE_forLoop);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1014;
			this.match(ProcessingParser.FOR);
			this.state = 1015;
			this.match(ProcessingParser.LPAREN);
			this.state = 1016;
			this.forControl();
			this.state = 1017;
			this.match(ProcessingParser.RPAREN);
			this.state = 1018;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forControl(): ForControlContext {
		let _localctx: ForControlContext = new ForControlContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, ProcessingParser.RULE_forControl);
		let _la: number;
		try {
			this.state = 1032;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 120, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1020;
				this.enhancedForControl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1022;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1021;
					this.forInit();
					}
				}

				this.state = 1024;
				this.match(ProcessingParser.SEMI);
				this.state = 1026;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1025;
					this.expression(0);
					}
				}

				this.state = 1028;
				this.match(ProcessingParser.SEMI);
				this.state = 1030;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1029;
					_localctx._forUpdate = this.expressionList();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forInit(): ForInitContext {
		let _localctx: ForInitContext = new ForInitContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, ProcessingParser.RULE_forInit);
		try {
			this.state = 1036;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 121, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1034;
				this.localVariableDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1035;
				this.expressionList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enhancedForControl(): EnhancedForControlContext {
		let _localctx: EnhancedForControlContext = new EnhancedForControlContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, ProcessingParser.RULE_enhancedForControl);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1041;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 122, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1038;
					this.variableModifier();
					}
					}
				}
				this.state = 1043;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 122, this._ctx);
			}
			this.state = 1044;
			this.typeType();
			this.state = 1045;
			this.variableDeclaratorId();
			this.state = 1046;
			this.match(ProcessingParser.COLON);
			this.state = 1047;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parExpression(): ParExpressionContext {
		let _localctx: ParExpressionContext = new ParExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, ProcessingParser.RULE_parExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1049;
			this.match(ProcessingParser.LPAREN);
			this.state = 1050;
			this.expression(0);
			this.state = 1051;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, ProcessingParser.RULE_expressionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1053;
			this.expression(0);
			this.state = 1058;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 1054;
				this.match(ProcessingParser.COMMA);
				this.state = 1055;
				this.expression(0);
				}
				}
				this.state = 1060;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 166;
		this.enterRecursionRule(_localctx, 166, ProcessingParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1092;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 127, this._ctx) ) {
			case 1:
				{
				this.state = 1062;
				this.primary();
				}
				break;

			case 2:
				{
				this.state = 1063;
				this.methodCall();
				}
				break;

			case 3:
				{
				this.state = 1064;
				this.match(ProcessingParser.NEW);
				this.state = 1065;
				this.creator();
				}
				break;

			case 4:
				{
				this.state = 1066;
				this.match(ProcessingParser.LPAREN);
				this.state = 1067;
				this.typeType();
				this.state = 1068;
				this.match(ProcessingParser.RPAREN);
				this.state = 1069;
				this.expression(21);
				}
				break;

			case 5:
				{
				this.state = 1071;
				_localctx._prefix = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & ((1 << (ProcessingParser.INC - 86)) | (1 << (ProcessingParser.DEC - 86)) | (1 << (ProcessingParser.ADD - 86)) | (1 << (ProcessingParser.SUB - 86)))) !== 0))) {
					_localctx._prefix = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1072;
				this.expression(19);
				}
				break;

			case 6:
				{
				this.state = 1073;
				_localctx._prefix = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === ProcessingParser.BANG || _la === ProcessingParser.TILDE)) {
					_localctx._prefix = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1074;
				this.expression(18);
				}
				break;

			case 7:
				{
				this.state = 1075;
				this.lambdaExpression();
				}
				break;

			case 8:
				{
				this.state = 1076;
				this.typeType();
				this.state = 1077;
				this.match(ProcessingParser.COLONCOLON);
				this.state = 1083;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.LT:
				case ProcessingParser.IDENTIFIER:
					{
					this.state = 1079;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ProcessingParser.LT) {
						{
						this.state = 1078;
						this.typeArguments();
						}
					}

					this.state = 1081;
					this.match(ProcessingParser.IDENTIFIER);
					}
					break;
				case ProcessingParser.NEW:
					{
					this.state = 1082;
					this.match(ProcessingParser.NEW);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 9:
				{
				this.state = 1085;
				this.classType();
				this.state = 1086;
				this.match(ProcessingParser.COLONCOLON);
				this.state = 1088;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.LT) {
					{
					this.state = 1087;
					this.typeArguments();
					}
				}

				this.state = 1090;
				this.match(ProcessingParser.NEW);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1174;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 133, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1172;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 132, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1094;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 1095;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & ((1 << (ProcessingParser.MUL - 90)) | (1 << (ProcessingParser.DIV - 90)) | (1 << (ProcessingParser.MOD - 90)))) !== 0))) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1096;
						this.expression(18);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1097;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 1098;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === ProcessingParser.ADD || _la === ProcessingParser.SUB)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1099;
						this.expression(17);
						}
						break;

					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1100;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 1108;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 128, this._ctx) ) {
						case 1:
							{
							this.state = 1101;
							this.match(ProcessingParser.LT);
							this.state = 1102;
							this.match(ProcessingParser.LT);
							}
							break;

						case 2:
							{
							this.state = 1103;
							this.match(ProcessingParser.GT);
							this.state = 1104;
							this.match(ProcessingParser.GT);
							this.state = 1105;
							this.match(ProcessingParser.GT);
							}
							break;

						case 3:
							{
							this.state = 1106;
							this.match(ProcessingParser.GT);
							this.state = 1107;
							this.match(ProcessingParser.GT);
							}
							break;
						}
						this.state = 1110;
						this.expression(16);
						}
						break;

					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1111;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 1112;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & ((1 << (ProcessingParser.GT - 74)) | (1 << (ProcessingParser.LT - 74)) | (1 << (ProcessingParser.LE - 74)) | (1 << (ProcessingParser.GE - 74)))) !== 0))) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1113;
						this.expression(15);
						}
						break;

					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1114;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 1115;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === ProcessingParser.EQUAL || _la === ProcessingParser.NOTEQUAL)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1116;
						this.expression(13);
						}
						break;

					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1117;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 1118;
						_localctx._bop = this.match(ProcessingParser.BITAND);
						this.state = 1119;
						this.expression(12);
						}
						break;

					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1120;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 1121;
						_localctx._bop = this.match(ProcessingParser.CARET);
						this.state = 1122;
						this.expression(11);
						}
						break;

					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1123;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 1124;
						_localctx._bop = this.match(ProcessingParser.BITOR);
						this.state = 1125;
						this.expression(10);
						}
						break;

					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1126;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 1127;
						_localctx._bop = this.match(ProcessingParser.AND);
						this.state = 1128;
						this.expression(9);
						}
						break;

					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1129;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 1130;
						_localctx._bop = this.match(ProcessingParser.OR);
						this.state = 1131;
						this.expression(8);
						}
						break;

					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1132;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 1133;
						_localctx._bop = this.match(ProcessingParser.QUESTION);
						this.state = 1134;
						this.expression(0);
						this.state = 1135;
						this.match(ProcessingParser.COLON);
						this.state = 1136;
						this.expression(7);
						}
						break;

					case 12:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1138;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 1139;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & ((1 << (ProcessingParser.ASSIGN - 73)) | (1 << (ProcessingParser.ADD_ASSIGN - 73)) | (1 << (ProcessingParser.SUB_ASSIGN - 73)) | (1 << (ProcessingParser.MUL_ASSIGN - 73)) | (1 << (ProcessingParser.DIV_ASSIGN - 73)) | (1 << (ProcessingParser.AND_ASSIGN - 73)) | (1 << (ProcessingParser.OR_ASSIGN - 73)) | (1 << (ProcessingParser.XOR_ASSIGN - 73)) | (1 << (ProcessingParser.MOD_ASSIGN - 73)) | (1 << (ProcessingParser.LSHIFT_ASSIGN - 73)))) !== 0) || _la === ProcessingParser.RSHIFT_ASSIGN || _la === ProcessingParser.URSHIFT_ASSIGN)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1140;
						this.expression(5);
						}
						break;

					case 13:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1141;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 1142;
						_localctx._bop = this.match(ProcessingParser.DOT);
						this.state = 1154;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 130, this._ctx) ) {
						case 1:
							{
							this.state = 1143;
							this.match(ProcessingParser.IDENTIFIER);
							}
							break;

						case 2:
							{
							this.state = 1144;
							this.methodCall();
							}
							break;

						case 3:
							{
							this.state = 1145;
							this.match(ProcessingParser.THIS);
							}
							break;

						case 4:
							{
							this.state = 1146;
							this.match(ProcessingParser.NEW);
							this.state = 1148;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (_la === ProcessingParser.LT) {
								{
								this.state = 1147;
								this.nonWildcardTypeArguments();
								}
							}

							this.state = 1150;
							this.innerCreator();
							}
							break;

						case 5:
							{
							this.state = 1151;
							this.match(ProcessingParser.SUPER);
							this.state = 1152;
							this.superSuffix();
							}
							break;

						case 6:
							{
							this.state = 1153;
							this.explicitGenericInvocation();
							}
							break;
						}
						}
						break;

					case 14:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1156;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 1157;
						this.match(ProcessingParser.LBRACK);
						this.state = 1158;
						this.expression(0);
						this.state = 1159;
						this.match(ProcessingParser.RBRACK);
						}
						break;

					case 15:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1161;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 1162;
						_localctx._postfix = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === ProcessingParser.INC || _la === ProcessingParser.DEC)) {
							_localctx._postfix = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						break;

					case 16:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1163;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 1164;
						_localctx._bop = this.match(ProcessingParser.INSTANCEOF);
						this.state = 1165;
						this.typeType();
						}
						break;

					case 17:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1166;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 1167;
						this.match(ProcessingParser.COLONCOLON);
						this.state = 1169;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === ProcessingParser.LT) {
							{
							this.state = 1168;
							this.typeArguments();
							}
						}

						this.state = 1171;
						this.match(ProcessingParser.IDENTIFIER);
						}
						break;
					}
					}
				}
				this.state = 1176;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 133, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaExpression(): LambdaExpressionContext {
		let _localctx: LambdaExpressionContext = new LambdaExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, ProcessingParser.RULE_lambdaExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1177;
			this.lambdaParameters();
			this.state = 1178;
			this.match(ProcessingParser.ARROW);
			this.state = 1179;
			this.lambdaBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaParameters(): LambdaParametersContext {
		let _localctx: LambdaParametersContext = new LambdaParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, ProcessingParser.RULE_lambdaParameters);
		let _la: number;
		try {
			this.state = 1197;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 136, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1181;
				this.match(ProcessingParser.IDENTIFIER);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1182;
				this.match(ProcessingParser.LPAREN);
				this.state = 1184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || _la === ProcessingParser.SHORT || _la === ProcessingParser.VAR || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
					{
					this.state = 1183;
					this.formalParameterList();
					}
				}

				this.state = 1186;
				this.match(ProcessingParser.RPAREN);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1187;
				this.match(ProcessingParser.LPAREN);
				this.state = 1188;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1193;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.COMMA) {
					{
					{
					this.state = 1189;
					this.match(ProcessingParser.COMMA);
					this.state = 1190;
					this.match(ProcessingParser.IDENTIFIER);
					}
					}
					this.state = 1195;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1196;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaBody(): LambdaBodyContext {
		let _localctx: LambdaBodyContext = new LambdaBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, ProcessingParser.RULE_lambdaBody);
		try {
			this.state = 1201;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.NEW:
			case ProcessingParser.SHORT:
			case ProcessingParser.SUPER:
			case ProcessingParser.THIS:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
			case ProcessingParser.BOOL_LITERAL:
			case ProcessingParser.CHAR_LITERAL:
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
			case ProcessingParser.NULL_LITERAL:
			case ProcessingParser.LPAREN:
			case ProcessingParser.LT:
			case ProcessingParser.BANG:
			case ProcessingParser.TILDE:
			case ProcessingParser.INC:
			case ProcessingParser.DEC:
			case ProcessingParser.ADD:
			case ProcessingParser.SUB:
			case ProcessingParser.AT:
			case ProcessingParser.HexColorLiteral:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1199;
				this.expression(0);
				}
				break;
			case ProcessingParser.LBRACE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1200;
				this.block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, ProcessingParser.RULE_primary);
		try {
			this.state = 1221;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 139, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1203;
				this.match(ProcessingParser.LPAREN);
				this.state = 1204;
				this.expression(0);
				this.state = 1205;
				this.match(ProcessingParser.RPAREN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1207;
				this.match(ProcessingParser.THIS);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1208;
				this.match(ProcessingParser.SUPER);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1209;
				this.literal();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1210;
				this.match(ProcessingParser.IDENTIFIER);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1211;
				this.typeTypeOrVoid();
				this.state = 1212;
				this.match(ProcessingParser.DOT);
				this.state = 1213;
				this.match(ProcessingParser.CLASS);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1215;
				this.nonWildcardTypeArguments();
				this.state = 1219;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.SUPER:
				case ProcessingParser.IDENTIFIER:
					{
					this.state = 1216;
					this.explicitGenericInvocationSuffix();
					}
					break;
				case ProcessingParser.THIS:
					{
					this.state = 1217;
					this.match(ProcessingParser.THIS);
					this.state = 1218;
					this.arguments();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classType(): ClassTypeContext {
		let _localctx: ClassTypeContext = new ClassTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, ProcessingParser.RULE_classType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1226;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 140, this._ctx) ) {
			case 1:
				{
				this.state = 1223;
				this.classOrInterfaceType();
				this.state = 1224;
				this.match(ProcessingParser.DOT);
				}
				break;
			}
			this.state = 1231;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 1228;
				this.annotation();
				}
				}
				this.state = 1233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1234;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 1236;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 1235;
				this.typeArguments();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public creator(): CreatorContext {
		let _localctx: CreatorContext = new CreatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, ProcessingParser.RULE_creator);
		try {
			this.state = 1247;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1238;
				this.nonWildcardTypeArguments();
				this.state = 1239;
				this.createdName();
				this.state = 1240;
				this.classCreatorRest();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1242;
				this.createdName();
				this.state = 1245;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.LBRACK:
					{
					this.state = 1243;
					this.arrayCreatorRest();
					}
					break;
				case ProcessingParser.LPAREN:
					{
					this.state = 1244;
					this.classCreatorRest();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createdName(): CreatedNameContext {
		let _localctx: CreatedNameContext = new CreatedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, ProcessingParser.RULE_createdName);
		let _la: number;
		try {
			this.state = 1264;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1249;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1251;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.LT) {
					{
					this.state = 1250;
					this.typeArgumentsOrDiamond();
					}
				}

				this.state = 1260;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.DOT) {
					{
					{
					this.state = 1253;
					this.match(ProcessingParser.DOT);
					this.state = 1254;
					this.match(ProcessingParser.IDENTIFIER);
					this.state = 1256;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ProcessingParser.LT) {
						{
						this.state = 1255;
						this.typeArgumentsOrDiamond();
						}
					}

					}
					}
					this.state = 1262;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1263;
				this.primitiveType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public innerCreator(): InnerCreatorContext {
		let _localctx: InnerCreatorContext = new InnerCreatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, ProcessingParser.RULE_innerCreator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1266;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 1268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 1267;
				this.nonWildcardTypeArgumentsOrDiamond();
				}
			}

			this.state = 1270;
			this.classCreatorRest();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayCreatorRest(): ArrayCreatorRestContext {
		let _localctx: ArrayCreatorRestContext = new ArrayCreatorRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, ProcessingParser.RULE_arrayCreatorRest);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1272;
			this.match(ProcessingParser.LBRACK);
			this.state = 1300;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.RBRACK:
				{
				this.state = 1273;
				this.match(ProcessingParser.RBRACK);
				this.state = 1278;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.LBRACK) {
					{
					{
					this.state = 1274;
					this.match(ProcessingParser.LBRACK);
					this.state = 1275;
					this.match(ProcessingParser.RBRACK);
					}
					}
					this.state = 1280;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1281;
				this.arrayInitializer();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.NEW:
			case ProcessingParser.SHORT:
			case ProcessingParser.SUPER:
			case ProcessingParser.THIS:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
			case ProcessingParser.BOOL_LITERAL:
			case ProcessingParser.CHAR_LITERAL:
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
			case ProcessingParser.NULL_LITERAL:
			case ProcessingParser.LPAREN:
			case ProcessingParser.LT:
			case ProcessingParser.BANG:
			case ProcessingParser.TILDE:
			case ProcessingParser.INC:
			case ProcessingParser.DEC:
			case ProcessingParser.ADD:
			case ProcessingParser.SUB:
			case ProcessingParser.AT:
			case ProcessingParser.HexColorLiteral:
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 1282;
				this.expression(0);
				this.state = 1283;
				this.match(ProcessingParser.RBRACK);
				this.state = 1290;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 151, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1284;
						this.match(ProcessingParser.LBRACK);
						this.state = 1285;
						this.expression(0);
						this.state = 1286;
						this.match(ProcessingParser.RBRACK);
						}
						}
					}
					this.state = 1292;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 151, this._ctx);
				}
				this.state = 1297;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 152, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1293;
						this.match(ProcessingParser.LBRACK);
						this.state = 1294;
						this.match(ProcessingParser.RBRACK);
						}
						}
					}
					this.state = 1299;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 152, this._ctx);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classCreatorRest(): ClassCreatorRestContext {
		let _localctx: ClassCreatorRestContext = new ClassCreatorRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, ProcessingParser.RULE_classCreatorRest);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1302;
			this.arguments();
			this.state = 1304;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 154, this._ctx) ) {
			case 1:
				{
				this.state = 1303;
				this.classBody();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explicitGenericInvocation(): ExplicitGenericInvocationContext {
		let _localctx: ExplicitGenericInvocationContext = new ExplicitGenericInvocationContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, ProcessingParser.RULE_explicitGenericInvocation);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1306;
			this.nonWildcardTypeArguments();
			this.state = 1307;
			this.explicitGenericInvocationSuffix();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext {
		let _localctx: TypeArgumentsOrDiamondContext = new TypeArgumentsOrDiamondContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, ProcessingParser.RULE_typeArgumentsOrDiamond);
		try {
			this.state = 1312;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 155, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1309;
				this.match(ProcessingParser.LT);
				this.state = 1310;
				this.match(ProcessingParser.GT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1311;
				this.typeArguments();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext {
		let _localctx: NonWildcardTypeArgumentsOrDiamondContext = new NonWildcardTypeArgumentsOrDiamondContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, ProcessingParser.RULE_nonWildcardTypeArgumentsOrDiamond);
		try {
			this.state = 1317;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 156, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1314;
				this.match(ProcessingParser.LT);
				this.state = 1315;
				this.match(ProcessingParser.GT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1316;
				this.nonWildcardTypeArguments();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
		let _localctx: NonWildcardTypeArgumentsContext = new NonWildcardTypeArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, ProcessingParser.RULE_nonWildcardTypeArguments);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1319;
			this.match(ProcessingParser.LT);
			this.state = 1320;
			this.typeList();
			this.state = 1321;
			this.match(ProcessingParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeList(): TypeListContext {
		let _localctx: TypeListContext = new TypeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, ProcessingParser.RULE_typeList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1323;
			this.typeType();
			this.state = 1328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 1324;
				this.match(ProcessingParser.COMMA);
				this.state = 1325;
				this.typeType();
				}
				}
				this.state = 1330;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeType(): TypeTypeContext {
		let _localctx: TypeTypeContext = new TypeTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, ProcessingParser.RULE_typeType);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1332;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.AT) {
				{
				this.state = 1331;
				this.annotation();
				}
			}

			this.state = 1337;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 1334;
				this.classOrInterfaceType();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
				{
				this.state = 1335;
				this.primitiveType();
				}
				break;
			case ProcessingParser.VAR:
				{
				this.state = 1336;
				this.match(ProcessingParser.VAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1343;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 160, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1339;
					this.match(ProcessingParser.LBRACK);
					this.state = 1340;
					this.match(ProcessingParser.RBRACK);
					}
					}
				}
				this.state = 1345;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 160, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeArguments(): TypeArgumentsContext {
		let _localctx: TypeArgumentsContext = new TypeArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, ProcessingParser.RULE_typeArguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1346;
			this.match(ProcessingParser.LT);
			this.state = 1347;
			this.typeArgument();
			this.state = 1352;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 1348;
				this.match(ProcessingParser.COMMA);
				this.state = 1349;
				this.typeArgument();
				}
				}
				this.state = 1354;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1355;
			this.match(ProcessingParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public superSuffix(): SuperSuffixContext {
		let _localctx: SuperSuffixContext = new SuperSuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, ProcessingParser.RULE_superSuffix);
		try {
			this.state = 1363;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1357;
				this.arguments();
				}
				break;
			case ProcessingParser.DOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1358;
				this.match(ProcessingParser.DOT);
				this.state = 1359;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1361;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 162, this._ctx) ) {
				case 1:
					{
					this.state = 1360;
					this.arguments();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
		let _localctx: ExplicitGenericInvocationSuffixContext = new ExplicitGenericInvocationSuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, ProcessingParser.RULE_explicitGenericInvocationSuffix);
		try {
			this.state = 1369;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.SUPER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1365;
				this.match(ProcessingParser.SUPER);
				this.state = 1366;
				this.superSuffix();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1367;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1368;
				this.arguments();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let _localctx: ArgumentsContext = new ArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, ProcessingParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1371;
			this.match(ProcessingParser.LPAREN);
			this.state = 1373;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 1372;
				this.expressionList();
				}
			}

			this.state = 1375;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public javaProcessingSketch(): JavaProcessingSketchContext {
		let _localctx: JavaProcessingSketchContext = new JavaProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, ProcessingParser.RULE_javaProcessingSketch);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1378;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 166, this._ctx) ) {
			case 1:
				{
				this.state = 1377;
				this.packageDeclaration();
				}
				break;
			}
			this.state = 1383;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.IMPORT) {
				{
				{
				this.state = 1380;
				this.importDeclaration();
				}
				}
				this.state = 1385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1387;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1386;
				this.typeDeclaration();
				}
				}
				this.state = 1389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.INTERFACE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.AT);
			this.state = 1391;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticProcessingSketch(): StaticProcessingSketchContext {
		let _localctx: StaticProcessingSketchContext = new StaticProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, ProcessingParser.RULE_staticProcessingSketch);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1398;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 1396;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 169, this._ctx) ) {
				case 1:
					{
					this.state = 1393;
					this.importDeclaration();
					}
					break;

				case 2:
					{
					this.state = 1394;
					this.blockStatement();
					}
					break;

				case 3:
					{
					this.state = 1395;
					this.typeDeclaration();
					}
					break;
				}
				}
				this.state = 1400;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1401;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public activeProcessingSketch(): ActiveProcessingSketchContext {
		let _localctx: ActiveProcessingSketchContext = new ActiveProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, ProcessingParser.RULE_activeProcessingSketch);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1407;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ProcessingParser.LBRACE - 66)) | (1 << (ProcessingParser.SEMI - 66)) | (1 << (ProcessingParser.LT - 66)))) !== 0) || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				this.state = 1405;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 171, this._ctx) ) {
				case 1:
					{
					this.state = 1403;
					this.importDeclaration();
					}
					break;

				case 2:
					{
					this.state = 1404;
					this.classBodyDeclaration();
					}
					break;
				}
				}
				this.state = 1409;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1410;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public warnMixedModes(): WarnMixedModesContext {
		let _localctx: WarnMixedModesContext = new WarnMixedModesContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, ProcessingParser.RULE_warnMixedModes);
		let _la: number;
		try {
			let _alt: number;
			this.state = 1448;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 181, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1417;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 174, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						this.state = 1415;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 173, this._ctx) ) {
						case 1:
							{
							this.state = 1412;
							this.importDeclaration();
							}
							break;

						case 2:
							{
							this.state = 1413;
							this.classBodyDeclaration();
							}
							break;

						case 3:
							{
							this.state = 1414;
							this.blockStatement();
							}
							break;
						}
						}
					}
					this.state = 1419;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 174, this._ctx);
				}
				this.state = 1420;
				this.blockStatement();
				this.state = 1421;
				this.classBodyDeclaration();
				this.state = 1427;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRANSIENT - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.VOLATILE - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1425;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 175, this._ctx) ) {
					case 1:
						{
						this.state = 1422;
						this.importDeclaration();
						}
						break;

					case 2:
						{
						this.state = 1423;
						this.classBodyDeclaration();
						}
						break;

					case 3:
						{
						this.state = 1424;
						this.blockStatement();
						}
						break;
					}
					}
					this.state = 1429;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1435;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 178, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						this.state = 1433;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 177, this._ctx) ) {
						case 1:
							{
							this.state = 1430;
							this.importDeclaration();
							}
							break;

						case 2:
							{
							this.state = 1431;
							this.classBodyDeclaration();
							}
							break;

						case 3:
							{
							this.state = 1432;
							this.blockStatement();
							}
							break;
						}
						}
					}
					this.state = 1437;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 178, this._ctx);
				}
				this.state = 1438;
				this.classBodyDeclaration();
				this.state = 1439;
				this.blockStatement();
				this.state = 1445;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRANSIENT - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.VOLATILE - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1443;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 179, this._ctx) ) {
					case 1:
						{
						this.state = 1440;
						this.importDeclaration();
						}
						break;

					case 2:
						{
						this.state = 1441;
						this.classBodyDeclaration();
						}
						break;

					case 3:
						{
						this.state = 1442;
						this.blockStatement();
						}
						break;
					}
					}
					this.state = 1447;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		let _localctx: VariableDeclaratorIdContext = new VariableDeclaratorIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, ProcessingParser.RULE_variableDeclaratorId);
		let _la: number;
		try {
			this.state = 1459;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1450;
				this.warnTypeAsVariableName();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1451;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1456;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.LBRACK) {
					{
					{
					this.state = 1452;
					this.match(ProcessingParser.LBRACK);
					this.state = 1453;
					this.match(ProcessingParser.RBRACK);
					}
					}
					this.state = 1458;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public warnTypeAsVariableName(): WarnTypeAsVariableNameContext {
		let _localctx: WarnTypeAsVariableNameContext = new WarnTypeAsVariableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, ProcessingParser.RULE_warnTypeAsVariableName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1461;
			_localctx._primitiveType = this.primitiveType();
			this.state = 1466;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 1462;
				this.match(ProcessingParser.LBRACK);
				this.state = 1463;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 1468;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}

			    this.notifyErrorListeners("Type names are not allowed as variable names: "+(_localctx._primitiveType != null ? this._input.getTextFromRange(_localctx._primitiveType._start, _localctx._primitiveType._stop) : undefined));
			      
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodCall(): MethodCallContext {
		let _localctx: MethodCallContext = new MethodCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, ProcessingParser.RULE_methodCall);
		let _la: number;
		try {
			this.state = 1490;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1471;
				this.functionWithPrimitiveTypeName();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1472;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1473;
				this.match(ProcessingParser.LPAREN);
				this.state = 1475;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1474;
					this.expressionList();
					}
				}

				this.state = 1477;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			case ProcessingParser.THIS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1478;
				this.match(ProcessingParser.THIS);
				this.state = 1479;
				this.match(ProcessingParser.LPAREN);
				this.state = 1481;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1480;
					this.expressionList();
					}
				}

				this.state = 1483;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			case ProcessingParser.SUPER:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1484;
				this.match(ProcessingParser.SUPER);
				this.state = 1485;
				this.match(ProcessingParser.LPAREN);
				this.state = 1487;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1486;
					this.expressionList();
					}
				}

				this.state = 1489;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionWithPrimitiveTypeName(): FunctionWithPrimitiveTypeNameContext {
		let _localctx: FunctionWithPrimitiveTypeNameContext = new FunctionWithPrimitiveTypeNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, ProcessingParser.RULE_functionWithPrimitiveTypeName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1492;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 1493;
			this.match(ProcessingParser.LPAREN);
			this.state = 1495;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 1494;
				this.expressionList();
				}
			}

			this.state = 1497;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primitiveType(): PrimitiveTypeContext {
		let _localctx: PrimitiveTypeContext = new PrimitiveTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, ProcessingParser.RULE_primitiveType);
		try {
			this.state = 1508;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1499;
				this.match(ProcessingParser.BOOLEAN);
				}
				break;
			case ProcessingParser.CHAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1500;
				this.match(ProcessingParser.CHAR);
				}
				break;
			case ProcessingParser.BYTE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1501;
				this.match(ProcessingParser.BYTE);
				}
				break;
			case ProcessingParser.SHORT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1502;
				this.match(ProcessingParser.SHORT);
				}
				break;
			case ProcessingParser.INT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1503;
				this.match(ProcessingParser.INT);
				}
				break;
			case ProcessingParser.LONG:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1504;
				this.match(ProcessingParser.LONG);
				}
				break;
			case ProcessingParser.FLOAT:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1505;
				this.match(ProcessingParser.FLOAT);
				}
				break;
			case ProcessingParser.DOUBLE:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1506;
				this.match(ProcessingParser.DOUBLE);
				}
				break;
			case ProcessingParser.COLOR:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1507;
				this.colorPrimitiveType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public colorPrimitiveType(): ColorPrimitiveTypeContext {
		let _localctx: ColorPrimitiveTypeContext = new ColorPrimitiveTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, ProcessingParser.RULE_colorPrimitiveType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1510;
			this.match(ProcessingParser.COLOR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedName(): QualifiedNameContext {
		let _localctx: QualifiedNameContext = new QualifiedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, ProcessingParser.RULE_qualifiedName);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1514;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 1512;
				this.match(ProcessingParser.IDENTIFIER);
				}
				break;
			case ProcessingParser.COLOR:
				{
				this.state = 1513;
				this.colorPrimitiveType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1523;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 193, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1516;
					this.match(ProcessingParser.DOT);
					this.state = 1519;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case ProcessingParser.IDENTIFIER:
						{
						this.state = 1517;
						this.match(ProcessingParser.IDENTIFIER);
						}
						break;
					case ProcessingParser.COLOR:
						{
						this.state = 1518;
						this.colorPrimitiveType();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 1525;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 193, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, ProcessingParser.RULE_literal);
		try {
			this.state = 1533;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1526;
				this.integerLiteral();
				}
				break;
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1527;
				this.floatLiteral();
				}
				break;
			case ProcessingParser.CHAR_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1528;
				this.match(ProcessingParser.CHAR_LITERAL);
				}
				break;
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1529;
				this.stringLiteral();
				}
				break;
			case ProcessingParser.BOOL_LITERAL:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1530;
				this.match(ProcessingParser.BOOL_LITERAL);
				}
				break;
			case ProcessingParser.NULL_LITERAL:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1531;
				this.match(ProcessingParser.NULL_LITERAL);
				}
				break;
			case ProcessingParser.HexColorLiteral:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1532;
				this.hexColorLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public hexColorLiteral(): HexColorLiteralContext {
		let _localctx: HexColorLiteralContext = new HexColorLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, ProcessingParser.RULE_hexColorLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1535;
			this.match(ProcessingParser.HexColorLiteral);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 83:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 17);

		case 1:
			return this.precpred(this._ctx, 16);

		case 2:
			return this.precpred(this._ctx, 15);

		case 3:
			return this.precpred(this._ctx, 14);

		case 4:
			return this.precpred(this._ctx, 12);

		case 5:
			return this.precpred(this._ctx, 11);

		case 6:
			return this.precpred(this._ctx, 10);

		case 7:
			return this.precpred(this._ctx, 9);

		case 8:
			return this.precpred(this._ctx, 8);

		case 9:
			return this.precpred(this._ctx, 7);

		case 10:
			return this.precpred(this._ctx, 6);

		case 11:
			return this.precpred(this._ctx, 5);

		case 12:
			return this.precpred(this._ctx, 25);

		case 13:
			return this.precpred(this._ctx, 24);

		case 14:
			return this.precpred(this._ctx, 20);

		case 15:
			return this.precpred(this._ctx, 13);

		case 16:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03u\u0604\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x03\x02\x03\x02\x03\x02\x05\x02\xF0" +
		"\n\x02\x03\x03\x05\x03\xF3\n\x03\x03\x03\x07\x03\xF6\n\x03\f\x03\x0E\x03" +
		"\xF9\v\x03\x03\x03\x07\x03\xFC\n\x03\f\x03\x0E\x03\xFF\v\x03\x03\x03\x03" +
		"\x03\x03\x04\x07\x04\u0104\n\x04\f\x04\x0E\x04\u0107\v\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x05\x03\x05\x05\x05\u010F\n\x05\x03\x05\x03\x05" +
		"\x03\x05\x05\x05\u0114\n\x05\x03\x05\x03\x05\x03\x06\x07\x06\u0119\n\x06" +
		"\f\x06\x0E\x06\u011C\v\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06\u0122" +
		"\n\x06\x03\x06\x05\x06\u0125\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x05\x07\u012C\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x05\b\u0136\n\b\x03\t\x03\t\x05\t\u013A\n\t\x03\n\x03\n\x03\n\x05\n" +
		"\u013F\n\n\x03\n\x03\n\x05\n\u0143\n\n\x03\n\x03\n\x05\n\u0147\n\n\x03" +
		"\n\x03\n\x03\v\x03\v\x03\v\x03\v\x07\v\u014F\n\v\f\v\x0E\v\u0152\v\v\x03" +
		"\v\x03\v\x03\f\x07\f\u0157\n\f\f\f\x0E\f\u015A\v\f\x03\f\x03\f\x03\f\x05" +
		"\f\u015F\n\f\x03\r\x03\r\x03\r\x07\r\u0164\n\r\f\r\x0E\r\u0167\v\r\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u016D\n\x0E\x03\x0E\x03\x0E\x05\x0E" +
		"\u0171\n\x0E\x03\x0E\x05\x0E\u0174\n\x0E\x03\x0E\x05\x0E\u0177\n\x0E\x03" +
		"\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x07\x0F\u017E\n\x0F\f\x0F\x0E\x0F" +
		"\u0181\v\x0F\x03\x10\x07\x10\u0184\n\x10\f\x10\x0E\x10\u0187\v\x10\x03" +
		"\x10\x03\x10\x05\x10\u018B\n\x10\x03\x10\x05\x10\u018E\n\x10\x03\x11\x03" +
		"\x11\x07\x11\u0192\n\x11\f\x11\x0E\x11\u0195\v\x11\x03\x12\x03\x12\x03" +
		"\x12\x05\x12\u019A\n\x12\x03\x12\x03\x12\x05\x12\u019E\n\x12\x03\x12\x03" +
		"\x12\x03\x13\x03\x13\x07\x13\u01A4\n\x13\f\x13\x0E\x13\u01A7\v\x13\x03" +
		"\x13\x03\x13\x03\x14\x03\x14\x07\x14\u01AD\n\x14\f\x14\x0E\x14\u01B0\v" +
		"\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x05\x15\u01B7\n\x15\x03\x15" +
		"\x03\x15\x07\x15\u01BB\n\x15\f\x15\x0E\x15\u01BE\v\x15\x03\x15\x05\x15" +
		"\u01C1\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x05\x16\u01CC\n\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x07\x17\u01D3\n\x17\f\x17\x0E\x17\u01D6\v\x17\x03\x17\x03\x17\x05\x17" +
		"\u01DA\n\x17\x03\x17\x03\x17\x03\x18\x03\x18\x05\x18\u01E0\n\x18\x03\x19" +
		"\x03\x19\x05\x19\u01E4\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03" +
		"\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u01F0\n\x1C\x03\x1C\x03\x1C" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E\x07\x1E\u01F9\n\x1E\f\x1E\x0E" +
		"\x1E\u01FC\v\x1E\x03\x1E\x03\x1E\x05\x1E\u0200\n\x1E\x03\x1F\x03\x1F\x03" +
		"\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0209\n\x1F\x03 \x03 \x03" +
		" \x03 \x07 \u020F\n \f \x0E \u0212\v \x03 \x03 \x03!\x03!\x03!\x07!\u0219" +
		"\n!\f!\x0E!\u021C\v!\x03!\x03!\x03!\x03\"\x07\"\u0222\n\"\f\"\x0E\"\u0225" +
		"\v\"\x03\"\x03\"\x03\"\x07\"\u022A\n\"\f\"\x0E\"\u022D\v\"\x03\"\x03\"" +
		"\x05\"\u0231\n\"\x03\"\x03\"\x03\"\x03\"\x07\"\u0237\n\"\f\"\x0E\"\u023A" +
		"\v\"\x03\"\x03\"\x05\"\u023E\n\"\x03\"\x03\"\x03#\x03#\x03#\x03#\x03#" +
		"\x03#\x05#\u0248\n#\x03$\x03$\x03$\x03%\x03%\x03%\x07%\u0250\n%\f%\x0E" +
		"%\u0253\v%\x03&\x03&\x03&\x05&\u0258\n&\x03\'\x03\'\x05\'\u025C\n\'\x03" +
		"(\x03(\x03(\x03(\x07(\u0262\n(\f(\x0E(\u0265\v(\x03(\x05(\u0268\n(\x05" +
		"(\u026A\n(\x03(\x03(\x03)\x03)\x05)\u0270\n)\x03)\x03)\x03)\x05)\u0275" +
		"\n)\x07)\u0277\n)\f)\x0E)\u027A\v)\x03*\x03*\x03*\x03*\x05*\u0280\n*\x05" +
		"*\u0282\n*\x03+\x03+\x03+\x07+\u0287\n+\f+\x0E+\u028A\v+\x03,\x03,\x05" +
		",\u028E\n,\x03,\x03,\x03-\x03-\x03-\x07-\u0295\n-\f-\x0E-\u0298\v-\x03" +
		"-\x03-\x05-\u029C\n-\x03-\x05-\u029F\n-\x03.\x07.\u02A2\n.\f.\x0E.\u02A5" +
		"\v.\x03.\x03.\x03.\x03/\x07/\u02AB\n/\f/\x0E/\u02AE\v/\x03/\x03/\x03/" +
		"\x03/\x030\x030\x031\x031\x032\x032\x052\u02BA\n2\x033\x033\x034\x034" +
		"\x035\x035\x035\x035\x035\x055\u02C5\n5\x035\x055\u02C8\n5\x036\x036\x03" +
		"6\x076\u02CD\n6\f6\x0E6\u02D0\v6\x037\x037\x037\x037\x038\x038\x038\x05" +
		"8\u02D9\n8\x039\x039\x039\x039\x079\u02DF\n9\f9\x0E9\u02E2\v9\x059\u02E4" +
		"\n9\x039\x059\u02E7\n9\x039\x039\x03:\x03:\x03:\x03:\x03:\x03;\x03;\x07" +
		";\u02F2\n;\f;\x0E;\u02F5\v;\x03;\x03;\x03<\x07<\u02FA\n<\f<\x0E<\u02FD" +
		"\v<\x03<\x03<\x05<\u0301\n<\x03=\x03=\x03=\x03=\x03=\x03=\x05=\u0309\n" +
		"=\x03=\x03=\x05=\u030D\n=\x03=\x03=\x05=\u0311\n=\x03=\x03=\x05=\u0315" +
		"\n=\x05=\u0317\n=\x03>\x03>\x05>\u031B\n>\x03?\x03?\x03?\x03?\x05?\u0321" +
		"\n?\x03@\x03@\x03A\x03A\x03A\x03B\x03B\x07B\u032A\nB\fB\x0EB\u032D\vB" +
		"\x03B\x03B\x03C\x03C\x03C\x03C\x03C\x05C\u0336\nC\x03D\x07D\u0339\nD\f" +
		"D\x0ED\u033C\vD\x03D\x03D\x03D\x03E\x07E\u0342\nE\fE\x0EE\u0345\vE\x03" +
		"E\x03E\x05E\u0349\nE\x03E\x05E\u034C\nE\x03F\x03F\x03F\x03F\x03F\x05F" +
		"\u0353\nF\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x05F\u035C\nF\x03F\x03F\x03" +
		"F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x06F\u036C\n" +
		"F\rF\x0EF\u036D\x03F\x05F\u0371\nF\x03F\x05F\u0374\nF\x03F\x03F\x03F\x03" +
		"F\x07F\u037A\nF\fF\x0EF\u037D\vF\x03F\x05F\u0380\nF\x03F\x03F\x03F\x03" +
		"F\x07F\u0386\nF\fF\x0EF\u0389\vF\x03F\x07F\u038C\nF\fF\x0EF\u038F\vF\x03" +
		"F\x03F\x03F\x03F\x03F\x03F\x03F\x03F\x05F\u0399\nF\x03F\x03F\x03F\x03" +
		"F\x03F\x03F\x03F\x05F\u03A2\nF\x03F\x03F\x03F\x05F\u03A7\nF\x03F\x03F" +
		"\x03F\x03F\x03F\x03F\x03F\x03F\x05F\u03B1\nF\x03G\x03G\x03G\x07G\u03B6" +
		"\nG\fG\x0EG\u03B9\vG\x03G\x03G\x03G\x03G\x03G\x03H\x03H\x03H\x07H\u03C3" +
		"\nH\fH\x0EH\u03C6\vH\x03I\x03I\x03I\x03J\x03J\x03J\x05J\u03CE\nJ\x03J" +
		"\x03J\x03K\x03K\x03K\x07K\u03D5\nK\fK\x0EK\u03D8\vK\x03L\x07L\u03DB\n" +
		"L\fL\x0EL\u03DE\vL\x03L\x03L\x03L\x03L\x03L\x03M\x06M\u03E6\nM\rM\x0E" +
		"M\u03E7\x03M\x06M\u03EB\nM\rM\x0EM\u03EC\x03N\x03N\x03N\x05N\u03F2\nN" +
		"\x03N\x03N\x03N\x05N\u03F7\nN\x03O\x03O\x03O\x03O\x03O\x03O\x03P\x03P" +
		"\x05P\u0401\nP\x03P\x03P\x05P\u0405\nP\x03P\x03P\x05P\u0409\nP\x05P\u040B" +
		"\nP\x03Q\x03Q\x05Q\u040F\nQ\x03R\x07R\u0412\nR\fR\x0ER\u0415\vR\x03R\x03" +
		"R\x03R\x03R\x03R\x03S\x03S\x03S\x03S\x03T\x03T\x03T\x07T\u0423\nT\fT\x0E" +
		"T\u0426\vT\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03" +
		"U\x03U\x03U\x03U\x03U\x03U\x03U\x05U\u043A\nU\x03U\x03U\x05U\u043E\nU" +
		"\x03U\x03U\x03U\x05U\u0443\nU\x03U\x03U\x05U\u0447\nU\x03U\x03U\x03U\x03" +
		"U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x05U\u0457\nU\x03" +
		"U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03" +
		"U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03" +
		"U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x05U\u047F\nU\x03U\x03" +
		"U\x03U\x03U\x05U\u0485\nU\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03" +
		"U\x03U\x03U\x03U\x03U\x05U\u0494\nU\x03U\x07U\u0497\nU\fU\x0EU\u049A\v" +
		"U\x03V\x03V\x03V\x03V\x03W\x03W\x03W\x05W\u04A3\nW\x03W\x03W\x03W\x03" +
		"W\x03W\x07W\u04AA\nW\fW\x0EW\u04AD\vW\x03W\x05W\u04B0\nW\x03X\x03X\x05" +
		"X\u04B4\nX\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03Y\x03" +
		"Y\x03Y\x03Y\x03Y\x03Y\x05Y\u04C6\nY\x05Y\u04C8\nY\x03Z\x03Z\x03Z\x05Z" +
		"\u04CD\nZ\x03Z\x07Z\u04D0\nZ\fZ\x0EZ\u04D3\vZ\x03Z\x03Z\x05Z\u04D7\nZ" +
		"\x03[\x03[\x03[\x03[\x03[\x03[\x03[\x05[\u04E0\n[\x05[\u04E2\n[\x03\\" +
		"\x03\\\x05\\\u04E6\n\\\x03\\\x03\\\x03\\\x05\\\u04EB\n\\\x07\\\u04ED\n" +
		"\\\f\\\x0E\\\u04F0\v\\\x03\\\x05\\\u04F3\n\\\x03]\x03]\x05]\u04F7\n]\x03" +
		"]\x03]\x03^\x03^\x03^\x03^\x07^\u04FF\n^\f^\x0E^\u0502\v^\x03^\x03^\x03" +
		"^\x03^\x03^\x03^\x03^\x07^\u050B\n^\f^\x0E^\u050E\v^\x03^\x03^\x07^\u0512" +
		"\n^\f^\x0E^\u0515\v^\x05^\u0517\n^\x03_\x03_\x05_\u051B\n_\x03`\x03`\x03" +
		"`\x03a\x03a\x03a\x05a\u0523\na\x03b\x03b\x03b\x05b\u0528\nb\x03c\x03c" +
		"\x03c\x03c\x03d\x03d\x03d\x07d\u0531\nd\fd\x0Ed\u0534\vd\x03e\x05e\u0537" +
		"\ne\x03e\x03e\x03e\x05e\u053C\ne\x03e\x03e\x07e\u0540\ne\fe\x0Ee\u0543" +
		"\ve\x03f\x03f\x03f\x03f\x07f\u0549\nf\ff\x0Ef\u054C\vf\x03f\x03f\x03g" +
		"\x03g\x03g\x03g\x05g\u0554\ng\x05g\u0556\ng\x03h\x03h\x03h\x03h\x05h\u055C" +
		"\nh\x03i\x03i\x05i\u0560\ni\x03i\x03i\x03j\x05j\u0565\nj\x03j\x07j\u0568" +
		"\nj\fj\x0Ej\u056B\vj\x03j\x06j\u056E\nj\rj\x0Ej\u056F\x03j\x03j\x03k\x03" +
		"k\x03k\x07k\u0577\nk\fk\x0Ek\u057A\vk\x03k\x03k\x03l\x03l\x07l\u0580\n" +
		"l\fl\x0El\u0583\vl\x03l\x03l\x03m\x03m\x03m\x07m\u058A\nm\fm\x0Em\u058D" +
		"\vm\x03m\x03m\x03m\x03m\x03m\x07m\u0594\nm\fm\x0Em\u0597\vm\x03m\x03m" +
		"\x03m\x07m\u059C\nm\fm\x0Em\u059F\vm\x03m\x03m\x03m\x03m\x03m\x07m\u05A6" +
		"\nm\fm\x0Em\u05A9\vm\x05m\u05AB\nm\x03n\x03n\x03n\x03n\x07n\u05B1\nn\f" +
		"n\x0En\u05B4\vn\x05n\u05B6\nn\x03o\x03o\x03o\x07o\u05BB\no\fo\x0Eo\u05BE" +
		"\vo\x03o\x03o\x03p\x03p\x03p\x03p\x05p\u05C6\np\x03p\x03p\x03p\x03p\x05" +
		"p\u05CC\np\x03p\x03p\x03p\x03p\x05p\u05D2\np\x03p\x05p\u05D5\np\x03q\x03" +
		"q\x03q\x05q\u05DA\nq\x03q\x03q\x03r\x03r\x03r\x03r\x03r\x03r\x03r\x03" +
		"r\x03r\x05r\u05E7\nr\x03s\x03s\x03t\x03t\x05t\u05ED\nt\x03t\x03t\x03t" +
		"\x05t\u05F2\nt\x07t\u05F4\nt\ft\x0Et\u05F7\vt\x03u\x03u\x03u\x03u\x03" +
		"u\x03u\x03u\x05u\u0600\nu\x03v\x03v\x03v\x02\x02\x03\xA8w\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02." +
		"\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02B\x02D\x02F\x02H\x02" +
		"J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02" +
		"f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02z\x02|\x02~\x02\x80" +
		"\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92" +
		"\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E\x02\xA0\x02\xA2\x02\xA4" +
		"\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\xB0\x02\xB2\x02\xB4\x02\xB6" +
		"\x02\xB8\x02\xBA\x02\xBC\x02\xBE\x02\xC0\x02\xC2\x02\xC4\x02\xC6\x02\xC8" +
		"\x02\xCA\x02\xCC\x02\xCE\x02\xD0\x02\xD2\x02\xD4\x02\xD6\x02\xD8\x02\xDA" +
		"\x02\xDC\x02\xDE\x02\xE0\x02\xE2\x02\xE4\x02\xE6\x02\xE8\x02\xEA\x02\x02" +
		"\x0E\x04\x02\x14\x14++\x03\x027:\x03\x02;<\x03\x02X[\x03\x02NO\x04\x02" +
		"\\]aa\x03\x02Z[\x04\x02LMST\x04\x02RRUU\x04\x02KKbl\x03\x02XY\b\x02\x05" +
		"\x05\x07\x07\n\n\r\r\x17\x17\x1E\x1E\x02\u06B9\x02\xEF\x03\x02\x02\x02" +
		"\x04\xF2\x03\x02\x02\x02\x06\u0105\x03\x02\x02\x02\b\u010C\x03\x02\x02" +
		"\x02\n\u0124\x03\x02\x02\x02\f\u012B\x03\x02\x02\x02\x0E\u0135\x03\x02" +
		"\x02\x02\x10\u0139\x03\x02\x02\x02\x12\u013B\x03\x02\x02\x02\x14\u014A" +
		"\x03\x02\x02\x02\x16\u0158\x03\x02\x02\x02\x18\u0160\x03\x02\x02\x02\x1A" +
		"\u0168\x03\x02\x02\x02\x1C\u017A\x03\x02\x02\x02\x1E\u0185\x03\x02\x02" +
		"\x02 \u018F\x03\x02\x02\x02\"\u0196\x03\x02\x02\x02$\u01A1\x03\x02\x02" +
		"\x02&\u01AA\x03\x02\x02\x02(\u01C0\x03\x02\x02\x02*\u01CB\x03\x02\x02" +
		"\x02,\u01CD\x03\x02\x02\x02.\u01DF\x03\x02\x02\x020\u01E3\x03\x02\x02" +
		"\x022\u01E5\x03\x02\x02\x024\u01E8\x03\x02\x02\x026\u01EB\x03\x02\x02" +
		"\x028\u01F3\x03\x02\x02\x02:\u01FF\x03\x02\x02\x02<\u0208\x03\x02\x02" +
		"\x02>\u020A\x03\x02\x02\x02@\u0215\x03\x02\x02\x02B\u0223\x03\x02\x02" +
		"\x02D\u0247\x03\x02\x02\x02F\u0249\x03\x02\x02\x02H\u024C\x03\x02\x02" +
		"\x02J\u0254\x03\x02\x02\x02L\u025B\x03\x02\x02\x02N\u025D\x03\x02\x02" +
		"\x02P\u026D\x03\x02\x02\x02R\u0281\x03\x02\x02\x02T\u0283\x03\x02\x02" +
		"\x02V\u028B\x03\x02\x02\x02X\u029E\x03\x02\x02\x02Z\u02A3\x03\x02\x02" +
		"\x02\\\u02AC\x03\x02\x02\x02^\u02B3\x03\x02\x02\x02`\u02B5\x03\x02\x02" +
		"\x02b\u02B9\x03\x02\x02\x02d\u02BB\x03\x02\x02\x02f\u02BD\x03\x02\x02" +
		"\x02h\u02BF\x03\x02\x02\x02j\u02C9\x03\x02\x02\x02l\u02D1\x03\x02\x02" +
		"\x02n\u02D8\x03\x02\x02\x02p\u02DA\x03\x02\x02\x02r\u02EA\x03\x02\x02" +
		"\x02t\u02EF\x03\x02\x02\x02v\u0300\x03\x02\x02\x02x\u0316\x03\x02\x02" +
		"\x02z\u031A\x03\x02\x02\x02|\u031C\x03\x02\x02\x02~\u0322\x03\x02\x02" +
		"\x02\x80\u0324\x03\x02\x02\x02\x82\u0327\x03\x02\x02\x02\x84\u0335\x03" +
		"\x02\x02\x02\x86\u033A\x03\x02\x02\x02\x88\u034B\x03\x02\x02\x02\x8A\u03B0" +
		"\x03\x02\x02\x02\x8C\u03B2\x03\x02\x02\x02\x8E\u03BF\x03\x02\x02\x02\x90" +
		"\u03C7\x03\x02\x02\x02\x92\u03CA\x03\x02\x02\x02\x94\u03D1\x03\x02\x02" +
		"\x02\x96\u03DC\x03\x02\x02\x02\x98\u03E5\x03\x02\x02\x02\x9A\u03F6\x03" +
		"\x02\x02\x02\x9C\u03F8\x03\x02\x02\x02\x9E\u040A\x03\x02\x02\x02\xA0\u040E" +
		"\x03\x02\x02\x02\xA2\u0413\x03\x02\x02\x02\xA4\u041B\x03\x02\x02\x02\xA6" +
		"\u041F\x03\x02\x02\x02\xA8\u0446\x03\x02\x02\x02\xAA\u049B\x03\x02\x02" +
		"\x02\xAC\u04AF\x03\x02\x02\x02\xAE\u04B3\x03\x02\x02\x02\xB0\u04C7\x03" +
		"\x02\x02\x02\xB2\u04CC\x03\x02\x02\x02\xB4\u04E1\x03\x02\x02\x02\xB6\u04F2" +
		"\x03\x02\x02\x02\xB8\u04F4\x03\x02\x02\x02\xBA\u04FA\x03\x02\x02\x02\xBC" +
		"\u0518\x03\x02\x02\x02\xBE\u051C\x03\x02\x02\x02\xC0\u0522\x03\x02\x02" +
		"\x02\xC2\u0527\x03\x02\x02\x02\xC4\u0529\x03\x02\x02\x02\xC6\u052D\x03" +
		"\x02\x02\x02\xC8\u0536\x03\x02\x02\x02\xCA\u0544\x03\x02\x02\x02\xCC\u0555" +
		"\x03\x02\x02\x02\xCE\u055B\x03\x02\x02\x02\xD0\u055D\x03\x02\x02\x02\xD2" +
		"\u0564\x03\x02\x02\x02\xD4\u0578\x03\x02\x02\x02\xD6\u0581\x03\x02\x02" +
		"\x02\xD8\u05AA\x03\x02\x02\x02\xDA\u05B5\x03\x02\x02\x02\xDC\u05B7\x03" +
		"\x02\x02\x02\xDE\u05D4\x03\x02\x02\x02\xE0\u05D6\x03\x02\x02\x02\xE2\u05E6" +
		"\x03\x02\x02\x02\xE4\u05E8\x03\x02\x02\x02\xE6\u05EC\x03\x02\x02\x02\xE8" +
		"\u05FF\x03\x02\x02\x02\xEA\u0601\x03\x02\x02\x02\xEC\xF0\x05\xD4k\x02" +
		"\xED\xF0\x05\xD2j\x02\xEE\xF0\x05\xD6l\x02\xEF\xEC\x03\x02\x02\x02\xEF" +
		"\xED\x03\x02\x02\x02\xEF\xEE\x03\x02\x02\x02\xF0\x03\x03\x02\x02\x02\xF1" +
		"\xF3\x05\x06\x04\x02\xF2\xF1\x03\x02\x02\x02\xF2\xF3\x03\x02\x02\x02\xF3" +
		"\xF7\x03\x02\x02\x02\xF4\xF6\x05\b\x05\x02\xF5\xF4\x03\x02\x02\x02\xF6" +
		"\xF9\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8" +
		"\xFD\x03\x02\x02\x02\xF9\xF7\x03\x02\x02\x02\xFA\xFC\x05\n\x06\x02\xFB" +
		"\xFA\x03\x02\x02\x02\xFC\xFF\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD" +
		"\xFE\x03\x02\x02\x02\xFE\u0100\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02" +
		"\u0100\u0101\x07\x02\x02\x03\u0101\x05\x03\x02\x02\x02\u0102\u0104\x05" +
		"h5\x02\u0103\u0102\x03\x02\x02\x02\u0104\u0107\x03\x02\x02\x02\u0105\u0103" +
		"\x03\x02\x02\x02\u0105\u0106\x03\x02\x02\x02\u0106\u0108\x03\x02\x02\x02" +
		"\u0107\u0105\x03\x02\x02\x02\u0108\u0109\x07#\x02\x02\u0109\u010A\x05" +
		"\xE6t\x02\u010A\u010B\x07H\x02\x02\u010B\x07\x03\x02\x02\x02\u010C\u010E" +
		"\x07\x1C\x02\x02\u010D\u010F\x07)\x02\x02\u010E\u010D\x03\x02\x02\x02" +
		"\u010E\u010F\x03\x02\x02\x02\u010F\u0110\x03\x02\x02\x02\u0110\u0113\x05" +
		"\xE6t\x02\u0111\u0112\x07J\x02\x02\u0112\u0114\x07\\\x02\x02\u0113\u0111" +
		"\x03\x02\x02\x02\u0113\u0114\x03\x02\x02\x02\u0114\u0115\x03\x02\x02\x02" +
		"\u0115\u0116\x07H\x02\x02\u0116\t\x03\x02\x02\x02\u0117\u0119\x05\x0E" +
		"\b\x02\u0118\u0117\x03\x02\x02\x02\u0119\u011C\x03\x02\x02\x02\u011A\u0118" +
		"\x03\x02\x02\x02\u011A\u011B\x03\x02\x02\x02\u011B\u0121\x03\x02\x02\x02" +
		"\u011C\u011A\x03\x02\x02\x02\u011D\u0122\x05\x12\n\x02\u011E\u0122\x05" +
		"\x1A\x0E\x02\u011F\u0122\x05\"\x12\x02\u0120\u0122\x05r:\x02\u0121\u011D" +
		"\x03\x02\x02\x02\u0121\u011E\x03\x02\x02\x02\u0121\u011F\x03\x02\x02\x02" +
		"\u0121\u0120\x03\x02\x02\x02\u0122\u0125\x03\x02\x02\x02\u0123\u0125\x07" +
		"H\x02\x02\u0124\u011A\x03\x02\x02\x02\u0124\u0123\x03\x02\x02\x02\u0125" +
		"\v\x03\x02\x02\x02\u0126\u012C\x05\x0E\b\x02\u0127\u012C\x07!\x02\x02" +
		"\u0128\u012C\x07-\x02\x02\u0129\u012C\x071\x02\x02\u012A\u012C\x075\x02" +
		"\x02\u012B\u0126\x03\x02\x02\x02\u012B\u0127\x03\x02\x02\x02\u012B\u0128" +
		"\x03\x02\x02\x02\u012B\u0129\x03\x02\x02\x02\u012B\u012A\x03\x02\x02\x02" +
		"\u012C\r\x03\x02\x02\x02\u012D\u0136\x05h5\x02\u012E\u0136\x07&\x02\x02" +
		"\u012F\u0136\x07%\x02\x02\u0130\u0136\x07$\x02\x02\u0131\u0136\x07)\x02" +
		"\x02\u0132\u0136\x07\x03\x02\x02\u0133\u0136\x07\x15\x02\x02\u0134\u0136" +
		"\x07*\x02\x02\u0135\u012D\x03\x02\x02\x02\u0135\u012E\x03\x02\x02\x02" +
		"\u0135\u012F\x03\x02\x02\x02\u0135\u0130\x03\x02\x02\x02\u0135\u0131\x03" +
		"\x02\x02\x02\u0135\u0132\x03\x02\x02\x02\u0135\u0133\x03\x02\x02\x02\u0135" +
		"\u0134\x03\x02\x02\x02\u0136\x0F\x03\x02\x02\x02\u0137\u013A\x07\x15\x02" +
		"\x02\u0138\u013A\x05h5\x02\u0139\u0137\x03\x02\x02\x02\u0139\u0138\x03" +
		"\x02\x02\x02\u013A\x11\x03\x02\x02\x02\u013B\u013C\x07\v\x02\x02\u013C" +
		"\u013E\x07u\x02\x02\u013D\u013F\x05\x14\v\x02\u013E\u013D";
	private static readonly _serializedATNSegment1: string =
		"\x03\x02\x02\x02\u013E\u013F\x03\x02\x02\x02\u013F\u0142\x03\x02\x02\x02" +
		"\u0140\u0141\x07\x14\x02\x02\u0141\u0143\x05\xC8e\x02\u0142\u0140\x03" +
		"\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0146\x03\x02\x02\x02\u0144" +
		"\u0145\x07\x1B\x02\x02\u0145\u0147\x05\xC6d\x02\u0146\u0144\x03\x02\x02" +
		"\x02\u0146\u0147\x03\x02\x02\x02\u0147\u0148\x03\x02\x02\x02\u0148\u0149" +
		"\x05$\x13\x02\u0149\x13\x03\x02\x02\x02\u014A\u014B\x07M\x02\x02\u014B" +
		"\u0150\x05\x16\f\x02\u014C\u014D\x07I\x02\x02\u014D\u014F\x05\x16\f\x02" +
		"\u014E\u014C\x03\x02\x02\x02\u014F\u0152\x03\x02\x02\x02\u0150\u014E\x03" +
		"\x02\x02\x02\u0150\u0151\x03\x02\x02\x02\u0151\u0153\x03\x02\x02\x02\u0152" +
		"\u0150\x03\x02\x02\x02\u0153\u0154\x07L\x02\x02\u0154\x15\x03\x02\x02" +
		"\x02\u0155\u0157\x05h5\x02\u0156\u0155\x03\x02\x02\x02\u0157\u015A\x03" +
		"\x02\x02\x02\u0158\u0156\x03\x02\x02\x02\u0158\u0159\x03\x02\x02\x02\u0159" +
		"\u015B\x03\x02\x02\x02\u015A\u0158\x03\x02\x02\x02\u015B\u015E\x07u\x02" +
		"\x02\u015C\u015D\x07\x14\x02\x02\u015D\u015F\x05\x18\r\x02\u015E\u015C" +
		"\x03\x02\x02\x02\u015E\u015F\x03\x02\x02\x02\u015F\x17\x03\x02\x02\x02" +
		"\u0160\u0165\x05\xC8e\x02\u0161\u0162\x07^\x02\x02\u0162\u0164\x05\xC8" +
		"e\x02\u0163\u0161\x03\x02\x02\x02\u0164\u0167\x03\x02\x02\x02\u0165\u0163" +
		"\x03\x02\x02\x02\u0165\u0166\x03\x02\x02\x02\u0166\x19\x03\x02\x02\x02" +
		"\u0167\u0165\x03\x02\x02\x02\u0168\u0169\x07\x13\x02\x02\u0169\u016C\x07" +
		"u\x02\x02\u016A\u016B\x07\x1B\x02\x02\u016B\u016D\x05\xC6d\x02\u016C\u016A" +
		"\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D\u016E\x03\x02\x02\x02" +
		"\u016E\u0170\x07D\x02\x02\u016F\u0171\x05\x1C\x0F\x02\u0170\u016F\x03" +
		"\x02\x02\x02\u0170\u0171\x03\x02\x02\x02\u0171\u0173\x03\x02\x02\x02\u0172" +
		"\u0174\x07I\x02\x02\u0173\u0172\x03\x02\x02\x02\u0173\u0174\x03\x02\x02" +
		"\x02\u0174\u0176\x03\x02\x02\x02\u0175\u0177\x05 \x11\x02\u0176\u0175" +
		"\x03\x02\x02\x02\u0176\u0177\x03\x02\x02\x02\u0177\u0178\x03\x02\x02\x02" +
		"\u0178\u0179\x07E\x02\x02\u0179\x1B\x03\x02\x02\x02\u017A\u017F\x05\x1E" +
		"\x10\x02\u017B\u017C\x07I\x02\x02\u017C\u017E\x05\x1E\x10\x02\u017D\u017B" +
		"\x03\x02\x02\x02\u017E\u0181\x03\x02\x02\x02\u017F\u017D\x03\x02\x02\x02" +
		"\u017F\u0180\x03\x02\x02\x02\u0180\x1D\x03\x02\x02\x02\u0181\u017F\x03" +
		"\x02\x02\x02\u0182\u0184\x05h5\x02\u0183\u0182\x03\x02\x02\x02\u0184\u0187" +
		"\x03\x02\x02\x02\u0185\u0183\x03\x02\x02\x02\u0185\u0186\x03\x02\x02\x02" +
		"\u0186\u0188\x03\x02\x02\x02\u0187\u0185\x03\x02\x02\x02\u0188\u018A\x07" +
		"u\x02\x02\u0189\u018B\x05\xD0i\x02\u018A\u0189\x03\x02\x02\x02\u018A\u018B" +
		"\x03\x02\x02\x02\u018B\u018D\x03\x02\x02\x02\u018C\u018E\x05$\x13\x02" +
		"\u018D\u018C\x03\x02\x02\x02\u018D\u018E\x03\x02\x02\x02\u018E\x1F\x03" +
		"\x02\x02\x02\u018F\u0193\x07H\x02\x02\u0190\u0192\x05(\x15\x02\u0191\u0190" +
		"\x03\x02\x02\x02\u0192\u0195\x03\x02\x02\x02\u0193\u0191\x03\x02\x02\x02" +
		"\u0193\u0194\x03\x02\x02\x02\u0194!\x03\x02\x02\x02\u0195\u0193\x03\x02" +
		"\x02\x02\u0196\u0197\x07\x1F\x02\x02\u0197\u0199\x07u\x02\x02\u0198\u019A" +
		"\x05\x14\v\x02\u0199\u0198\x03\x02\x02\x02\u0199\u019A\x03\x02\x02\x02" +
		"\u019A\u019D\x03\x02\x02\x02\u019B\u019C\x07\x14\x02\x02\u019C\u019E\x05" +
		"\xC6d\x02\u019D\u019B\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02\u019E" +
		"\u019F\x03\x02\x02\x02\u019F\u01A0\x05&\x14\x02\u01A0#\x03\x02\x02\x02" +
		"\u01A1\u01A5\x07D\x02\x02\u01A2\u01A4\x05(\x15\x02\u01A3\u01A2\x03\x02" +
		"\x02\x02\u01A4\u01A7\x03\x02\x02\x02\u01A5\u01A3\x03\x02\x02\x02\u01A5" +
		"\u01A6\x03\x02\x02\x02\u01A6\u01A8\x03\x02\x02\x02\u01A7\u01A5\x03\x02" +
		"\x02\x02\u01A8\u01A9\x07E\x02\x02\u01A9%\x03\x02\x02\x02\u01AA\u01AE\x07" +
		"D\x02\x02\u01AB\u01AD\x05:\x1E\x02\u01AC\u01AB\x03\x02\x02\x02\u01AD\u01B0" +
		"\x03\x02\x02\x02\u01AE\u01AC\x03\x02\x02\x02\u01AE\u01AF\x03\x02\x02\x02" +
		"\u01AF\u01B1\x03\x02\x02\x02\u01B0\u01AE\x03\x02\x02\x02\u01B1\u01B2\x07" +
		"E\x02\x02\u01B2\'\x03\x02\x02\x02\u01B3\u01C1\x07H\x02\x02\u01B4\u01C1" +
		"\x05\b\x05\x02\u01B5\u01B7\x07)\x02\x02\u01B6\u01B5\x03\x02\x02\x02\u01B6" +
		"\u01B7\x03\x02\x02\x02\u01B7\u01B8\x03\x02\x02\x02\u01B8\u01C1\x05\x82" +
		"B\x02\u01B9\u01BB\x05\f\x07\x02\u01BA\u01B9\x03\x02\x02\x02\u01BB\u01BE" +
		"\x03\x02\x02\x02\u01BC\u01BA\x03\x02\x02\x02\u01BC\u01BD\x03\x02\x02\x02" +
		"\u01BD\u01BF\x03\x02\x02\x02\u01BE\u01BC\x03\x02\x02\x02\u01BF\u01C1\x05" +
		"*\x16\x02\u01C0\u01B3\x03\x02\x02\x02\u01C0\u01B4\x03\x02\x02\x02\u01C0" +
		"\u01B6\x03\x02\x02\x02\u01C0\u01BC\x03\x02\x02\x02\u01C1)\x03\x02\x02" +
		"\x02\u01C2\u01CC\x05,\x17\x02\u01C3\u01CC\x052\x1A\x02\u01C4\u01CC\x05" +
		"8\x1D\x02\u01C5\u01CC\x056\x1C\x02\u01C6\u01CC\x054\x1B\x02\u01C7\u01CC" +
		"\x05\"\x12\x02\u01C8\u01CC\x05r:\x02\u01C9\u01CC\x05\x12\n\x02\u01CA\u01CC" +
		"\x05\x1A\x0E\x02\u01CB\u01C2\x03\x02\x02\x02\u01CB\u01C3\x03\x02\x02\x02" +
		"\u01CB\u01C4\x03\x02\x02\x02\u01CB\u01C5\x03\x02\x02\x02\u01CB\u01C6\x03" +
		"\x02\x02\x02\u01CB\u01C7\x03\x02\x02\x02\u01CB\u01C8\x03\x02\x02\x02\u01CB" +
		"\u01C9\x03\x02\x02\x02\u01CB\u01CA\x03\x02\x02\x02\u01CC+\x03\x02\x02" +
		"\x02\u01CD\u01CE\x050\x19\x02\u01CE\u01CF\x07u\x02\x02\u01CF\u01D4\x05" +
		"V,\x02\u01D0\u01D1\x07F\x02\x02\u01D1\u01D3\x07G\x02\x02\u01D2\u01D0\x03" +
		"\x02\x02\x02\u01D3\u01D6\x03\x02\x02\x02\u01D4\u01D2\x03\x02\x02\x02\u01D4" +
		"\u01D5\x03\x02\x02\x02\u01D5\u01D9\x03\x02\x02\x02\u01D6\u01D4\x03\x02" +
		"\x02\x02\u01D7\u01D8\x070\x02\x02\u01D8\u01DA\x05T+\x02\u01D9\u01D7\x03" +
		"\x02\x02\x02\u01D9\u01DA\x03\x02\x02\x02\u01DA\u01DB\x03\x02\x02\x02\u01DB" +
		"\u01DC\x05.\x18\x02\u01DC-\x03\x02\x02\x02\u01DD\u01E0\x05\x82B\x02\u01DE" +
		"\u01E0\x07H\x02\x02\u01DF\u01DD\x03\x02\x02\x02\u01DF\u01DE\x03\x02\x02" +
		"\x02\u01E0/\x03\x02\x02\x02\u01E1\u01E4\x05\xC8e\x02\u01E2\u01E4\x074" +
		"\x02\x02\u01E3\u01E1\x03\x02\x02\x02\u01E3\u01E2\x03\x02\x02\x02\u01E4" +
		"1\x03\x02\x02\x02\u01E5\u01E6\x05\x14\v\x02\u01E6\u01E7\x05,\x17\x02\u01E7" +
		"3\x03\x02\x02\x02\u01E8\u01E9\x05\x14\v\x02\u01E9\u01EA\x056\x1C\x02\u01EA" +
		"5\x03\x02\x02\x02\u01EB\u01EC\x07u\x02\x02\u01EC\u01EF\x05V,\x02\u01ED" +
		"\u01EE\x070\x02\x02\u01EE\u01F0\x05T+\x02\u01EF\u01ED\x03\x02\x02\x02" +
		"\u01EF\u01F0\x03\x02\x02\x02\u01F0\u01F1\x03\x02\x02\x02\u01F1\u01F2\x05" +
		"\x82B\x02\u01F27\x03\x02\x02\x02\u01F3\u01F4\x05\xC8e\x02\u01F4\u01F5" +
		"\x05H%\x02\u01F5\u01F6\x07H\x02\x02\u01F69\x03\x02\x02\x02\u01F7\u01F9" +
		"\x05\f\x07\x02\u01F8\u01F7\x03\x02\x02\x02\u01F9\u01FC\x03\x02\x02\x02" +
		"\u01FA\u01F8\x03\x02\x02\x02\u01FA\u01FB\x03\x02\x02\x02\u01FB\u01FD\x03" +
		"\x02\x02\x02\u01FC\u01FA\x03\x02\x02\x02\u01FD\u0200\x05<\x1F\x02\u01FE" +
		"\u0200\x07H\x02\x02\u01FF\u01FA\x03\x02\x02\x02\u01FF\u01FE\x03\x02\x02" +
		"\x02\u0200;\x03\x02\x02\x02\u0201\u0209\x05> \x02\u0202\u0209\x05B\"\x02" +
		"\u0203\u0209\x05F$\x02\u0204\u0209\x05\"\x12\x02\u0205\u0209\x05r:\x02" +
		"\u0206\u0209\x05\x12\n\x02\u0207\u0209\x05\x1A\x0E\x02\u0208\u0201\x03" +
		"\x02\x02\x02\u0208\u0202\x03\x02\x02\x02\u0208\u0203\x03\x02\x02\x02\u0208" +
		"\u0204\x03\x02\x02\x02\u0208\u0205\x03\x02\x02\x02\u0208\u0206\x03\x02" +
		"\x02\x02\u0208\u0207\x03\x02\x02\x02\u0209=\x03\x02\x02\x02\u020A\u020B" +
		"\x05\xC8e\x02\u020B\u0210\x05@!\x02\u020C\u020D\x07I\x02\x02\u020D\u020F" +
		"\x05@!\x02\u020E\u020C\x03\x02\x02\x02\u020F\u0212\x03\x02\x02\x02\u0210" +
		"\u020E\x03\x02\x02\x02\u0210\u0211\x03\x02\x02\x02\u0211\u0213\x03\x02" +
		"\x02\x02\u0212\u0210\x03\x02\x02\x02\u0213\u0214\x07H\x02\x02\u0214?\x03" +
		"\x02\x02\x02\u0215\u021A\x07u\x02\x02\u0216\u0217\x07F\x02\x02\u0217\u0219" +
		"\x07G\x02\x02\u0218\u0216\x03\x02\x02\x02\u0219\u021C\x03\x02\x02\x02" +
		"\u021A\u0218\x03\x02\x02\x02\u021A\u021B\x03\x02\x02\x02\u021B\u021D\x03" +
		"\x02\x02\x02\u021C\u021A\x03\x02\x02\x02\u021D\u021E\x07K\x02\x02\u021E" +
		"\u021F\x05L\'\x02\u021FA\x03\x02\x02\x02\u0220\u0222\x05D#\x02\u0221\u0220" +
		"\x03\x02\x02\x02\u0222\u0225\x03\x02\x02\x02\u0223\u0221\x03\x02\x02\x02" +
		"\u0223\u0224\x03\x02\x02\x02\u0224\u0230\x03\x02\x02\x02\u0225\u0223\x03" +
		"\x02\x02\x02\u0226\u0231\x050\x19\x02\u0227\u022B\x05\x14\v\x02\u0228" +
		"\u022A\x05h5\x02\u0229\u0228\x03\x02\x02\x02\u022A\u022D\x03\x02\x02\x02" +
		"\u022B\u0229\x03\x02\x02\x02\u022B\u022C\x03\x02\x02\x02\u022C\u022E\x03" +
		"\x02\x02\x02\u022D\u022B\x03\x02\x02\x02\u022E\u022F\x050\x19\x02\u022F" +
		"\u0231\x03\x02\x02\x02\u0230\u0226\x03\x02\x02\x02\u0230\u0227\x03\x02" +
		"\x02\x02\u0231\u0232\x03\x02\x02\x02\u0232\u0233\x07u\x02\x02\u0233\u0238" +
		"\x05V,\x02\u0234\u0235\x07F\x02\x02\u0235\u0237\x07G\x02\x02\u0236\u0234" +
		"\x03\x02\x02\x02\u0237\u023A\x03\x02\x02\x02\u0238\u0236\x03\x02\x02\x02" +
		"\u0238\u0239\x03\x02\x02\x02\u0239\u023D\x03\x02\x02\x02\u023A\u0238\x03" +
		"\x02\x02\x02\u023B\u023C\x070\x02\x02\u023C\u023E\x05T+\x02\u023D\u023B" +
		"\x03\x02\x02\x02\u023D\u023E\x03\x02\x02\x02\u023E\u023F\x03\x02\x02\x02" +
		"\u023F\u0240\x05.\x18\x02\u0240C\x03\x02\x02\x02\u0241\u0248\x05h5\x02" +
		"\u0242\u0248\x07&\x02\x02\u0243\u0248\x07\x03\x02\x02\u0244\u0248\x07" +
		"\x0F\x02\x02\u0245\u0248\x07)\x02\x02\u0246\u0248\x07*\x02\x02\u0247\u0241" +
		"\x03\x02\x02\x02\u0247\u0242\x03\x02\x02\x02\u0247\u0243\x03\x02\x02\x02" +
		"\u0247\u0244\x03\x02\x02\x02\u0247\u0245\x03\x02\x02\x02\u0247\u0246\x03" +
		"\x02\x02\x02\u0248E\x03\x02\x02\x02\u0249\u024A\x05\x14\v\x02\u024A\u024B" +
		"\x05B\"\x02\u024BG\x03\x02\x02\x02\u024C\u0251\x05J&\x02\u024D\u024E\x07" +
		"I\x02\x02\u024E\u0250\x05J&\x02\u024F\u024D\x03\x02\x02\x02\u0250\u0253" +
		"\x03\x02\x02\x02\u0251\u024F\x03\x02\x02\x02\u0251\u0252\x03\x02\x02\x02" +
		"\u0252I\x03\x02\x02\x02\u0253\u0251\x03\x02\x02\x02\u0254\u0257\x05\xDA" +
		"n\x02\u0255\u0256\x07K\x02\x02\u0256\u0258\x05L\'\x02\u0257\u0255\x03" +
		"\x02\x02\x02\u0257\u0258\x03\x02\x02\x02\u0258K\x03\x02\x02\x02\u0259" +
		"\u025C\x05N(\x02\u025A\u025C\x05\xA8U\x02\u025B\u0259\x03\x02\x02\x02" +
		"\u025B\u025A\x03\x02\x02\x02\u025CM\x03\x02\x02\x02\u025D\u0269\x07D\x02" +
		"\x02\u025E\u0263\x05L\'\x02\u025F\u0260\x07I\x02\x02\u0260\u0262\x05L" +
		"\'\x02\u0261\u025F\x03\x02\x02\x02\u0262\u0265\x03\x02\x02\x02\u0263\u0261" +
		"\x03\x02\x02\x02\u0263\u0264\x03\x02\x02\x02\u0264\u0267\x03\x02\x02\x02" +
		"\u0265\u0263\x03\x02\x02\x02\u0266\u0268\x07I\x02\x02\u0267\u0266\x03" +
		"\x02\x02\x02\u0267\u0268\x03\x02\x02\x02\u0268\u026A\x03\x02\x02\x02\u0269" +
		"\u025E\x03\x02\x02\x02\u0269\u026A\x03\x02\x02\x02\u026A\u026B\x03\x02" +
		"\x02\x02\u026B\u026C\x07E\x02\x02\u026CO\x03\x02\x02\x02\u026D\u026F\x07" +
		"u\x02\x02\u026E\u0270\x05\xCAf\x02\u026F\u026E\x03\x02\x02\x02\u026F\u0270" +
		"\x03\x02\x02\x02\u0270\u0278\x03\x02\x02\x02\u0271\u0272\x07J\x02\x02" +
		"\u0272\u0274\x07u\x02\x02\u0273\u0275\x05\xCAf\x02\u0274\u0273\x03\x02" +
		"\x02\x02\u0274\u0275\x03\x02\x02\x02\u0275\u0277\x03\x02\x02\x02\u0276" +
		"\u0271\x03\x02\x02\x02\u0277\u027A\x03\x02\x02\x02\u0278\u0276\x03\x02" +
		"\x02\x02\u0278\u0279\x03\x02\x02\x02\u0279Q\x03\x02\x02\x02\u027A\u0278" +
		"\x03\x02\x02\x02\u027B\u0282\x05\xC8e\x02\u027C\u027F\x07P\x02\x02\u027D" +
		"\u027E\t\x02\x02\x02\u027E\u0280\x05\xC8e\x02\u027F\u027D\x03\x02\x02" +
		"\x02\u027F\u0280\x03\x02\x02\x02\u0280\u0282\x03\x02\x02\x02\u0281\u027B" +
		"\x03\x02\x02\x02\u0281\u027C\x03\x02\x02\x02\u0282S\x03\x02\x02\x02\u0283" +
		"\u0288\x05\xE6t\x02\u0284\u0285\x07I\x02\x02\u0285\u0287\x05\xE6t\x02" +
		"\u0286\u0284\x03\x02\x02\x02\u0287\u028A\x03\x02\x02\x02\u0288\u0286\x03" +
		"\x02\x02\x02\u0288\u0289\x03\x02\x02\x02\u0289U\x03\x02\x02\x02\u028A" +
		"\u0288\x03\x02\x02\x02\u028B\u028D\x07B\x02\x02\u028C\u028E\x05X-\x02" +
		"\u028D\u028C\x03\x02\x02\x02\u028D\u028E\x03\x02\x02\x02\u028E\u028F\x03" +
		"\x02\x02\x02\u028F\u0290\x07C\x02\x02\u0290W\x03\x02\x02\x02\u0291\u0296" +
		"\x05Z.\x02\u0292\u0293\x07I\x02\x02\u0293\u0295\x05Z.\x02\u0294\u0292" +
		"\x03\x02\x02\x02\u0295\u0298\x03\x02\x02\x02\u0296\u0294\x03\x02\x02\x02" +
		"\u0296\u0297\x03\x02\x02\x02\u0297\u029B\x03\x02\x02\x02\u0298\u0296\x03" +
		"\x02\x02\x02\u0299\u029A\x07I\x02\x02\u029A\u029C\x05\\/\x02\u029B\u0299" +
		"\x03\x02\x02\x02\u029B\u029C\x03\x02\x02\x02\u029C\u029F\x03\x02\x02\x02" +
		"\u029D\u029F\x05\\/\x02\u029E\u0291\x03\x02\x02\x02\u029E\u029D\x03\x02" +
		"\x02\x02\u029FY\x03\x02\x02\x02\u02A0\u02A2\x05\x10\t\x02\u02A1\u02A0" +
		"\x03\x02\x02\x02\u02A2\u02A5\x03\x02\x02\x02\u02A3\u02A1\x03\x02\x02\x02" +
		"\u02A3\u02A4\x03\x02\x02\x02\u02A4\u02A6\x03\x02\x02\x02\u02A5\u02A3\x03" +
		"\x02\x02\x02\u02A6\u02A7\x05\xC8e\x02\u02A7\u02A8\x05\xDAn\x02\u02A8[" +
		"\x03\x02\x02\x02\u02A9\u02AB\x05\x10\t\x02\u02AA\u02A9\x03\x02\x02\x02" +
		"\u02AB\u02AE\x03\x02\x02\x02\u02AC\u02AA\x03\x02\x02\x02\u02AC\u02AD\x03" +
		"\x02\x02\x02\u02AD\u02AF\x03\x02\x02\x02\u02AE\u02AC\x03\x02\x02\x02\u02AF" +
		"\u02B0\x05\xC8e\x02\u02B0\u02B1\x07p\x02\x02\u02B1\u02B2\x05\xDAn\x02" +
		"\u02B2]\x03\x02\x02\x02\u02B3\u02B4\x07?\x02\x02\u02B4_\x03\x02\x02\x02" +
		"\u02B5\u02B6\x07@\x02\x02\u02B6a\x03\x02\x02\x02\u02B7\u02BA\x05^0\x02" +
		"\u02B8\u02BA\x05`1\x02\u02B9\u02B7\x03\x02\x02\x02\u02B9\u02B8\x03\x02" +
		"\x02\x02\u02BAc\x03\x02\x02\x02\u02BB\u02BC\t\x03\x02\x02\u02BCe\x03\x02" +
		"\x02\x02\u02BD\u02BE\t\x04\x02\x02\u02BEg\x03\x02\x02\x02\u02BF\u02C0" +
		"\x07o\x02\x02\u02C0\u02C7\x05\xE6t\x02\u02C1\u02C4\x07B\x02\x02\u02C2" +
		"\u02C5\x05j6\x02\u02C3\u02C5\x05n8\x02\u02C4\u02C2\x03\x02\x02\x02\u02C4" +
		"\u02C3\x03\x02\x02\x02\u02C4\u02C5\x03\x02\x02\x02\u02C5\u02C6\x03\x02" +
		"\x02\x02\u02C6\u02C8\x07C\x02\x02\u02C7\u02C1\x03\x02\x02\x02\u02C7\u02C8" +
		"\x03\x02\x02\x02\u02C8i\x03\x02\x02\x02\u02C9\u02CE\x05l7\x02\u02CA\u02CB" +
		"\x07I\x02\x02\u02CB\u02CD\x05l7\x02\u02CC\u02CA\x03\x02\x02\x02\u02CD" +
		"\u02D0\x03\x02\x02\x02\u02CE\u02CC\x03\x02\x02\x02\u02CE\u02CF\x03\x02" +
		"\x02\x02\u02CFk\x03\x02\x02\x02\u02D0\u02CE\x03\x02\x02\x02\u02D1\u02D2" +
		"\x07u\x02\x02\u02D2\u02D3\x07K\x02\x02\u02D3\u02D4\x05n8\x02\u02D4m\x03" +
		"\x02\x02\x02\u02D5\u02D9\x05\xA8U\x02\u02D6\u02D9\x05h5\x02\u02D7\u02D9" +
		"\x05p9\x02\u02D8\u02D5\x03\x02\x02\x02\u02D8\u02D6\x03\x02\x02\x02\u02D8" +
		"\u02D7\x03\x02\x02\x02\u02D9o\x03\x02\x02\x02\u02DA\u02E3\x07D\x02\x02" +
		"\u02DB\u02E0\x05n8\x02\u02DC\u02DD\x07I\x02\x02\u02DD\u02DF\x05n8\x02" +
		"\u02DE\u02DC\x03\x02\x02\x02\u02DF\u02E2\x03\x02\x02\x02\u02E0\u02DE\x03" +
		"\x02\x02\x02\u02E0\u02E1\x03\x02\x02\x02\u02E1\u02E4\x03\x02\x02\x02\u02E2" +
		"\u02E0\x03\x02\x02\x02\u02E3\u02DB\x03\x02\x02\x02\u02E3\u02E4\x03\x02" +
		"\x02\x02\u02E4\u02E6\x03\x02\x02\x02\u02E5\u02E7\x07I\x02\x02\u02E6\u02E5" +
		"\x03\x02\x02\x02\u02E6\u02E7\x03\x02\x02\x02\u02E7\u02E8\x03\x02\x02\x02" +
		"\u02E8\u02E9\x07E\x02\x02\u02E9q\x03\x02\x02\x02\u02EA\u02EB\x07o\x02" +
		"\x02\u02EB\u02EC\x07\x1F\x02\x02\u02EC\u02ED\x07u\x02\x02\u02ED\u02EE" +
		"\x05t;\x02\u02EEs\x03\x02\x02\x02\u02EF\u02F3\x07D\x02\x02\u02F0\u02F2" +
		"\x05v<\x02\u02F1\u02F0\x03\x02\x02\x02\u02F2\u02F5\x03\x02\x02\x02\u02F3" +
		"\u02F1\x03\x02\x02\x02\u02F3\u02F4\x03\x02\x02\x02\u02F4\u02F6\x03\x02" +
		"\x02\x02\u02F5\u02F3\x03\x02\x02\x02\u02F6\u02F7\x07E\x02\x02\u02F7u\x03" +
		"\x02\x02\x02\u02F8\u02FA\x05\f\x07\x02\u02F9\u02F8\x03\x02\x02\x02\u02FA" +
		"\u02FD\x03\x02\x02\x02\u02FB\u02F9\x03\x02\x02\x02\u02FB\u02FC\x03\x02" +
		"\x02\x02\u02FC\u02FE\x03\x02\x02\x02\u02FD\u02FB\x03\x02\x02\x02\u02FE" +
		"\u0301\x05x=\x02\u02FF\u0301\x07H\x02\x02\u0300\u02FB\x03\x02\x02\x02" +
		"\u0300\u02FF\x03\x02\x02\x02\u0301w\x03\x02\x02\x02\u0302\u0303\x05\xC8" +
		"e\x02\u0303\u0304\x05z>\x02\u0304\u0305\x07H\x02\x02\u0305\u0317\x03\x02" +
		"\x02\x02\u0306\u0308\x05\x12\n\x02\u0307\u0309\x07H\x02\x02\u0308\u0307" +
		"\x03\x02\x02\x02\u0308\u0309\x03\x02\x02\x02\u0309\u0317\x03\x02\x02\x02" +
		"\u030A\u030C\x05\"\x12\x02\u030B\u030D\x07H\x02\x02\u030C\u030B\x03\x02" +
		"\x02\x02\u030C\u030D\x03\x02\x02\x02\u030D\u0317\x03\x02\x02\x02\u030E" +
		"\u0310\x05\x1A\x0E\x02\u030F\u0311\x07H\x02\x02\u0310\u030F\x03\x02\x02" +
		"\x02\u0310\u0311\x03\x02\x02\x02\u0311\u0317\x03\x02\x02\x02\u0312\u0314" +
		"\x05r:\x02\u0313\u0315\x07H\x02\x02\u0314\u0313\x03\x02\x02\x02\u0314" +
		"\u0315\x03\x02\x02\x02\u0315\u0317\x03\x02\x02\x02\u0316\u0302\x03\x02" +
		"\x02\x02\u0316\u0306\x03\x02\x02\x02\u0316\u030A\x03\x02\x02\x02\u0316" +
		"\u030E\x03\x02\x02\x02\u0316\u0312\x03\x02\x02\x02\u0317y\x03\x02\x02" +
		"\x02\u0318\u031B\x05|?\x02\u0319\u031B\x05~@\x02\u031A\u0318\x03\x02\x02" +
		"\x02\u031A\u0319\x03\x02\x02\x02\u031B{\x03\x02\x02\x02\u031C\u031D\x07" +
		"u\x02\x02\u031D\u031E\x07B\x02\x02\u031E\u0320\x07C\x02\x02\u031F\u0321" +
		"\x05\x80A\x02\u0320\u031F\x03\x02\x02\x02\u0320\u0321\x03\x02\x02\x02" +
		"\u0321}\x03\x02\x02\x02\u0322\u0323\x05H%\x02\u0323\x7F\x03\x02\x02\x02" +
		"\u0324\u0325\x07\x0F\x02\x02\u0325\u0326\x05n8\x02\u0326\x81\x03\x02\x02" +
		"\x02\u0327\u032B\x07D\x02\x02\u0328\u032A\x05\x84C\x02\u0329\u0328\x03" +
		"\x02\x02\x02\u032A\u032D\x03\x02\x02\x02\u032B\u0329\x03\x02\x02\x02\u032B" +
		"\u032C\x03\x02\x02\x02\u032C\u032E\x03\x02\x02\x02\u032D\u032B\x03\x02" +
		"\x02\x02\u032E\u032F\x07E\x02\x02\u032F\x83\x03\x02\x02\x02\u0330\u0331" +
		"\x05\x86D\x02\u0331\u0332\x07H\x02\x02\u0332\u0336\x03\x02\x02\x02\u0333" +
		"\u0336\x05\x8AF\x02\u0334\u0336\x05\x88E\x02\u0335\u0330\x03\x02\x02\x02" +
		"\u0335\u0333\x03\x02\x02\x02\u0335\u0334\x03\x02\x02\x02\u0336\x85\x03" +
		"\x02\x02\x02\u0337\u0339\x05\x10\t\x02\u0338\u0337\x03\x02\x02\x02\u0339" +
		"\u033C\x03\x02\x02\x02\u033A\u0338\x03\x02\x02\x02\u033A\u033B\x03\x02" +
		"\x02\x02\u033B\u033D\x03\x02\x02\x02\u033C\u033A\x03\x02\x02\x02\u033D" +
		"\u033E\x05\xC8e\x02\u033E\u033F\x05H%\x02\u033F\x87\x03\x02\x02\x02\u0340" +
		"\u0342\x05\x0E\b\x02\u0341\u0340\x03\x02\x02\x02\u0342\u0345\x03\x02\x02" +
		"\x02\u0343\u0341\x03\x02\x02\x02\u0343\u0344\x03\x02\x02\x02\u0344\u0348" +
		"\x03\x02\x02\x02\u0345\u0343\x03\x02\x02\x02\u0346\u0349\x05\x12\n\x02" +
		"\u0347\u0349\x05\"\x12\x02\u0348\u0346\x03\x02\x02\x02\u0348\u0347\x03" +
		"\x02\x02\x02\u0349\u034C\x03\x02\x02\x02\u034A\u034C\x07H\x02\x02\u034B" +
		"\u0343\x03\x02\x02\x02\u034B\u034A\x03\x02\x02\x02\u034C\x89\x03\x02\x02" +
		"\x02\u034D\u03B1\x05\x82B\x02\u034E\u034F\x07\x04\x02\x02\u034F\u0352" +
		"\x05\xA8U\x02\u0350\u0351\x07Q\x02\x02\u0351\u0353\x05\xA8U\x02\u0352" +
		"\u0350\x03\x02\x02\x02\u0352\u0353\x03\x02\x02\x02\u0353\u0354\x03\x02" +
		"\x02\x02\u0354\u0355\x07H\x02\x02\u0355\u03B1\x03\x02\x02\x02\u0356\u0357" +
		"\x07\x19\x02\x02\u0357\u0358\x05\xA4S\x02\u0358\u035B\x05\x8AF\x02\u0359" +
		"\u035A\x07\x12\x02\x02\u035A\u035C\x05\x8AF\x02\u035B\u0359\x03\x02\x02" +
		"\x02\u035B\u035C\x03\x02\x02\x02\u035C\u03B1\x03\x02\x02\x02\u035D\u03B1" +
		"\x05\x9CO\x02\u035E\u035F\x076\x02\x02\u035F\u0360\x05\xA4S\x02\u0360" +
		"\u0361\x05\x8AF\x02\u0361\u03B1\x03\x02\x02\x02\u0362\u0363\x07\x10\x02" +
		"\x02\u0363\u0364\x05\x8AF\x02\u0364\u0365\x076\x02\x02\u0365\u0366\x05" +
		"\xA4S\x02\u0366\u0367\x07H\x02\x02\u0367\u03B1\x03\x02\x02\x02\u0368\u0369" +
		"\x072\x02\x02\u0369\u0373\x05\x82B\x02\u036A\u036C\x05\x8CG\x02\u036B" +
		"\u036A\x03\x02\x02\x02\u036C\u036D\x03\x02\x02\x02\u036D\u036B\x03\x02" +
		"\x02\x02\u036D\u036E\x03\x02\x02\x02\u036E\u0370\x03\x02\x02\x02\u036F" +
		"\u0371\x05\x90I\x02\u0370\u036F\x03\x02\x02\x02\u0370\u0371\x03\x02\x02" +
		"\x02\u0371\u0374\x03\x02\x02\x02\u0372\u0374\x05\x90I\x02\u0373\u036B" +
		"\x03\x02\x02\x02\u0373\u0372\x03\x02\x02\x02\u0374\u03B1\x03\x02\x02\x02" +
		"\u0375\u0376\x072\x02\x02\u0376\u0377\x05\x92J\x02\u0377\u037B\x05\x82" +
		"B\x02\u0378\u037A\x05\x8CG\x02\u0379\u0378\x03\x02\x02\x02\u037A\u037D" +
		"\x03\x02\x02\x02\u037B\u0379\x03\x02\x02\x02\u037B\u037C\x03\x02\x02\x02" +
		"\u037C\u037F\x03\x02\x02\x02\u037D\u037B\x03\x02\x02\x02\u037E\u0380\x05" +
		"\x90I\x02\u037F\u037E\x03\x02\x02\x02\u037F\u0380\x03\x02\x02\x02\u0380" +
		"\u03B1\x03\x02\x02\x02\u0381\u0382\x07,\x02\x02\u0382\u0383\x05\xA4S\x02" +
		"\u0383\u0387\x07D\x02\x02\u0384\u0386\x05\x98M\x02\u0385\u0384\x03\x02" +
		"\x02\x02\u0386\u0389\x03\x02\x02\x02\u0387\u0385\x03\x02\x02\x02\u0387" +
		"\u0388\x03\x02\x02\x02\u0388\u038D\x03\x02\x02\x02\u0389\u0387\x03\x02" +
		"\x02\x02\u038A\u038C\x05\x9AN\x02\u038B\u038A\x03\x02\x02\x02\u038C\u038F" +
		"\x03\x02\x02\x02\u038D\u038B\x03\x02\x02\x02\u038D\u038E\x03\x02\x02\x02" +
		"\u038E\u0390\x03\x02\x02\x02\u038F\u038D\x03\x02\x02\x02\u0390\u0391\x07" +
		"E\x02\x02\u0391\u03B1\x03\x02\x02\x02\u0392\u0393\x07-\x02\x02\u0393\u0394" +
		"\x05\xA4S\x02\u0394\u0395\x05\x82B\x02\u0395\u03B1\x03\x02\x02\x02\u0396" +
		"\u0398\x07\'\x02\x02\u0397\u0399\x05\xA8U\x02\u0398\u0397\x03\x02\x02" +
		"\x02\u0398\u0399\x03\x02\x02\x02\u0399\u039A\x03\x02\x02\x02\u039A\u03B1" +
		"\x07H\x02\x02\u039B\u039C\x07/\x02\x02\u039C\u039D\x05\xA8U\x02\u039D" +
		"\u039E\x07H\x02\x02\u039E\u03B1\x03\x02\x02\x02\u039F\u03A1\x07\x06\x02" +
		"\x02\u03A0\u03A2\x07u\x02\x02\u03A1\u03A0\x03\x02\x02\x02\u03A1\u03A2" +
		"\x03\x02\x02\x02\u03A2\u03A3\x03\x02\x02\x02\u03A3\u03B1\x07H\x02\x02" +
		"\u03A4\u03A6\x07\x0E\x02\x02\u03A5\u03A7\x07u\x02\x02\u03A6\u03A5\x03" +
		"\x02\x02\x02\u03A6\u03A7\x03\x02\x02\x02\u03A7\u03A8\x03\x02\x02\x02\u03A8" +
		"\u03B1\x07H\x02\x02\u03A9\u03B1\x07H\x02\x02\u03AA\u03AB\x05\xA8U\x02" +
		"\u03AB\u03AC\x07H\x02\x02\u03AC\u03B1\x03\x02\x02\x02\u03AD\u03AE\x07" +
		"u\x02\x02\u03AE\u03AF\x07Q\x02\x02\u03AF\u03B1\x05\x8AF\x02\u03B0\u034D" +
		"\x03\x02\x02\x02\u03B0\u034E\x03\x02\x02\x02\u03B0\u0356\x03\x02\x02\x02" +
		"\u03B0\u035D\x03\x02\x02\x02\u03B0\u035E\x03\x02\x02\x02\u03B0\u0362\x03" +
		"\x02\x02\x02\u03B0\u0368\x03\x02\x02\x02\u03B0\u0375\x03\x02\x02\x02\u03B0" +
		"\u0381\x03\x02\x02\x02\u03B0\u0392\x03\x02\x02\x02\u03B0\u0396\x03\x02" +
		"\x02\x02\u03B0\u039B\x03\x02\x02\x02\u03B0\u039F\x03\x02\x02\x02\u03B0" +
		"\u03A4\x03\x02\x02\x02\u03B0\u03A9\x03\x02\x02\x02\u03B0\u03AA\x03\x02" +
		"\x02\x02\u03B0\u03AD\x03\x02\x02\x02\u03B1\x8B\x03\x02\x02\x02\u03B2\u03B3" +
		"\x07\t\x02\x02\u03B3\u03B7\x07B\x02\x02\u03B4\u03B6\x05\x10\t\x02\u03B5" +
		"\u03B4\x03\x02\x02\x02\u03B6\u03B9\x03\x02\x02\x02\u03B7\u03B5\x03\x02" +
		"\x02\x02\u03B7\u03B8\x03\x02\x02\x02\u03B8\u03BA\x03\x02\x02\x02\u03B9" +
		"\u03B7\x03\x02\x02\x02\u03BA\u03BB\x05\x8EH\x02\u03BB\u03BC\x07u\x02\x02" +
		"\u03BC\u03BD\x07C\x02\x02\u03BD\u03BE\x05\x82B\x02\u03BE\x8D\x03\x02\x02" +
		"\x02\u03BF\u03C4\x05\xE6t\x02\u03C0\u03C1\x07_\x02\x02\u03C1\u03C3\x05" +
		"\xE6t\x02\u03C2\u03C0\x03\x02\x02\x02\u03C3\u03C6\x03\x02\x02\x02\u03C4" +
		"\u03C2\x03\x02\x02\x02\u03C4\u03C5\x03\x02\x02\x02\u03C5\x8F\x03\x02\x02" +
		"\x02\u03C6\u03C4\x03\x02\x02\x02\u03C7\u03C8\x07\x16\x02\x02\u03C8\u03C9" +
		"\x05\x82B\x02\u03C9\x91\x03\x02\x02\x02\u03CA\u03CB\x07B\x02\x02\u03CB" +
		"\u03CD\x05\x94K\x02\u03CC\u03CE\x07H\x02\x02\u03CD\u03CC\x03\x02\x02\x02" +
		"\u03CD\u03CE\x03\x02\x02\x02\u03CE\u03CF\x03\x02\x02\x02\u03CF\u03D0\x07" +
		"C\x02\x02\u03D0\x93\x03\x02\x02\x02\u03D1\u03D6\x05\x96L\x02\u03D2\u03D3" +
		"\x07H\x02\x02\u03D3\u03D5\x05\x96L\x02\u03D4\u03D2\x03\x02\x02\x02\u03D5" +
		"\u03D8\x03\x02\x02\x02\u03D6\u03D4\x03\x02\x02\x02\u03D6\u03D7\x03\x02" +
		"\x02\x02\u03D7\x95\x03\x02\x02\x02\u03D8\u03D6\x03\x02\x02\x02\u03D9\u03DB" +
		"\x05\x10\t\x02\u03DA\u03D9\x03\x02\x02\x02\u03DB\u03DE\x03\x02\x02\x02" +
		"\u03DC\u03DA\x03\x02\x02\x02\u03DC\u03DD\x03\x02\x02\x02\u03DD\u03DF\x03" +
		"\x02\x02\x02\u03DE\u03DC\x03\x02\x02\x02\u03DF\u03E0\x05P)\x02\u03E0\u03E1" +
		"\x05\xDAn\x02\u03E1\u03E2\x07K\x02\x02\u03E2\u03E3\x05\xA8U\x02\u03E3" +
		"\x97\x03\x02\x02\x02\u03E4\u03E6\x05\x9AN\x02\u03E5\u03E4\x03\x02\x02" +
		"\x02\u03E6\u03E7\x03\x02\x02\x02\u03E7\u03E5\x03\x02\x02\x02\u03E7\u03E8" +
		"\x03\x02\x02\x02\u03E8\u03EA\x03\x02\x02\x02\u03E9\u03EB\x05\x84C\x02" +
		"\u03EA\u03E9\x03\x02\x02\x02\u03EB\u03EC\x03\x02\x02\x02\u03EC\u03EA\x03" +
		"\x02\x02\x02\u03EC\u03ED\x03\x02\x02\x02\u03ED\x99\x03\x02\x02\x02\u03EE" +
		"\u03F1\x07\b\x02\x02\u03EF\u03F2\x05\xA8U\x02\u03F0\u03F2\x07u\x02\x02" +
		"\u03F1\u03EF\x03\x02\x02\x02\u03F1\u03F0\x03\x02";
	private static readonly _serializedATNSegment2: string =
		"\x02\x02\u03F2\u03F3\x03\x02\x02\x02\u03F3\u03F7\x07Q\x02\x02\u03F4\u03F5" +
		"\x07\x0F\x02\x02\u03F5\u03F7\x07Q\x02\x02\u03F6\u03EE\x03\x02\x02\x02" +
		"\u03F6\u03F4\x03\x02\x02\x02\u03F7\x9B\x03\x02\x02\x02\u03F8\u03F9\x07" +
		"\x18\x02\x02\u03F9\u03FA\x07B\x02\x02\u03FA\u03FB\x05\x9EP\x02\u03FB\u03FC" +
		"\x07C\x02\x02\u03FC\u03FD\x05\x8AF\x02\u03FD\x9D\x03\x02\x02\x02\u03FE" +
		"\u040B\x05\xA2R\x02\u03FF\u0401\x05\xA0Q\x02\u0400\u03FF\x03\x02\x02\x02" +
		"\u0400\u0401\x03\x02\x02\x02\u0401\u0402\x03\x02\x02\x02\u0402\u0404\x07" +
		"H\x02\x02\u0403\u0405\x05\xA8U\x02\u0404\u0403\x03\x02\x02\x02\u0404\u0405" +
		"\x03\x02\x02\x02\u0405\u0406\x03\x02\x02\x02\u0406\u0408\x07H\x02\x02" +
		"\u0407\u0409\x05\xA6T\x02\u0408\u0407\x03\x02\x02\x02\u0408\u0409\x03" +
		"\x02\x02\x02\u0409\u040B\x03\x02\x02\x02\u040A\u03FE\x03\x02\x02\x02\u040A" +
		"\u0400\x03\x02\x02\x02\u040B\x9F\x03\x02\x02\x02\u040C\u040F\x05\x86D" +
		"\x02\u040D\u040F\x05\xA6T\x02\u040E\u040C\x03\x02\x02\x02\u040E\u040D" +
		"\x03\x02\x02\x02\u040F\xA1\x03\x02\x02\x02\u0410\u0412\x05\x10\t\x02\u0411" +
		"\u0410\x03\x02\x02\x02\u0412\u0415\x03\x02\x02\x02\u0413\u0411\x03\x02" +
		"\x02\x02\u0413\u0414\x03\x02\x02\x02\u0414\u0416\x03\x02\x02\x02\u0415" +
		"\u0413\x03\x02\x02\x02\u0416\u0417\x05\xC8e\x02\u0417\u0418\x05\xDAn\x02" +
		"\u0418\u0419\x07Q\x02\x02\u0419\u041A\x05\xA8U\x02\u041A\xA3\x03\x02\x02" +
		"\x02\u041B\u041C\x07B\x02\x02\u041C\u041D\x05\xA8U\x02\u041D\u041E\x07" +
		"C\x02\x02\u041E\xA5\x03\x02\x02\x02\u041F\u0424\x05\xA8U\x02\u0420\u0421" +
		"\x07I\x02\x02\u0421\u0423\x05\xA8U\x02\u0422\u0420\x03\x02\x02\x02\u0423" +
		"\u0426\x03\x02\x02\x02\u0424\u0422\x03\x02\x02\x02\u0424\u0425\x03\x02" +
		"\x02\x02\u0425\xA7\x03\x02\x02\x02\u0426\u0424\x03\x02\x02\x02\u0427\u0428" +
		"\bU\x01\x02\u0428\u0447\x05\xB0Y\x02\u0429\u0447\x05\xDEp\x02\u042A\u042B" +
		"\x07\"\x02\x02\u042B\u0447\x05\xB4[\x02\u042C\u042D\x07B\x02\x02\u042D" +
		"\u042E\x05\xC8e\x02\u042E\u042F\x07C\x02\x02\u042F\u0430\x05\xA8U\x17" +
		"\u0430\u0447\x03\x02\x02\x02\u0431\u0432\t\x05\x02\x02\u0432\u0447\x05" +
		"\xA8U\x15\u0433\u0434\t\x06\x02\x02\u0434\u0447\x05\xA8U\x14\u0435\u0447" +
		"\x05\xAAV\x02\u0436\u0437\x05\xC8e\x02\u0437\u043D\x07n\x02\x02\u0438" +
		"\u043A\x05\xCAf\x02\u0439\u0438\x03\x02\x02\x02\u0439\u043A\x03\x02\x02" +
		"\x02\u043A\u043B\x03\x02\x02\x02\u043B\u043E\x07u\x02\x02\u043C\u043E" +
		"\x07\"\x02\x02\u043D\u0439\x03\x02\x02\x02\u043D\u043C\x03\x02\x02\x02" +
		"\u043E\u0447\x03\x02\x02\x02\u043F\u0440\x05\xB2Z\x02\u0440\u0442\x07" +
		"n\x02\x02\u0441\u0443\x05\xCAf\x02\u0442\u0441\x03\x02\x02\x02\u0442\u0443" +
		"\x03\x02\x02\x02\u0443\u0444\x03\x02\x02\x02\u0444\u0445\x07\"\x02\x02" +
		"\u0445\u0447\x03\x02\x02\x02\u0446\u0427\x03\x02\x02\x02\u0446\u0429\x03" +
		"\x02\x02\x02\u0446\u042A\x03\x02\x02\x02\u0446\u042C\x03\x02\x02\x02\u0446" +
		"\u0431\x03\x02\x02\x02\u0446\u0433\x03\x02\x02\x02\u0446\u0435\x03\x02" +
		"\x02\x02\u0446\u0436\x03\x02\x02\x02\u0446\u043F\x03\x02\x02\x02\u0447" +
		"\u0498\x03\x02\x02\x02\u0448\u0449\f\x13\x02\x02\u0449\u044A\t\x07\x02" +
		"\x02\u044A\u0497\x05\xA8U\x14\u044B\u044C\f\x12\x02\x02\u044C\u044D\t" +
		"\b\x02\x02\u044D\u0497\x05\xA8U\x13\u044E\u0456\f\x11\x02\x02\u044F\u0450" +
		"\x07M\x02\x02\u0450\u0457\x07M\x02\x02\u0451\u0452\x07L\x02\x02\u0452" +
		"\u0453\x07L\x02\x02\u0453\u0457\x07L\x02\x02\u0454\u0455\x07L\x02\x02" +
		"\u0455\u0457\x07L\x02\x02\u0456\u044F\x03\x02\x02\x02\u0456\u0451\x03" +
		"\x02\x02\x02\u0456\u0454\x03\x02\x02\x02\u0457\u0458\x03\x02\x02\x02\u0458" +
		"\u0497\x05\xA8U\x12\u0459\u045A\f\x10\x02\x02\u045A\u045B\t\t\x02\x02" +
		"\u045B\u0497\x05\xA8U\x11\u045C\u045D\f\x0E\x02\x02\u045D\u045E\t\n\x02" +
		"\x02\u045E\u0497\x05\xA8U\x0F\u045F\u0460\f\r\x02\x02\u0460\u0461\x07" +
		"^\x02\x02\u0461\u0497\x05\xA8U\x0E\u0462\u0463\f\f\x02\x02\u0463\u0464" +
		"\x07`\x02\x02\u0464\u0497\x05\xA8U\r\u0465\u0466\f\v\x02\x02\u0466\u0467" +
		"\x07_\x02\x02\u0467\u0497\x05\xA8U\f\u0468\u0469\f\n\x02\x02\u0469\u046A" +
		"\x07V\x02\x02\u046A\u0497\x05\xA8U\v\u046B\u046C\f\t\x02\x02\u046C\u046D" +
		"\x07W\x02\x02\u046D\u0497\x05\xA8U\n\u046E\u046F\f\b\x02\x02\u046F\u0470" +
		"\x07P\x02\x02\u0470\u0471\x05\xA8U\x02\u0471\u0472\x07Q\x02\x02\u0472" +
		"\u0473\x05\xA8U\t\u0473\u0497\x03\x02\x02\x02\u0474\u0475\f\x07\x02\x02" +
		"\u0475\u0476\t\v\x02\x02\u0476\u0497\x05\xA8U\x07\u0477\u0478\f\x1B\x02" +
		"\x02\u0478\u0484\x07J\x02\x02\u0479\u0485\x07u\x02\x02\u047A\u0485\x05" +
		"\xDEp\x02\u047B\u0485\x07.\x02\x02\u047C\u047E\x07\"\x02\x02\u047D\u047F" +
		"\x05\xC4c\x02\u047E\u047D\x03\x02\x02\x02\u047E\u047F\x03\x02\x02\x02" +
		"\u047F\u0480\x03\x02\x02\x02\u0480\u0485\x05\xB8]\x02\u0481\u0482\x07" +
		"+\x02\x02\u0482\u0485\x05\xCCg\x02\u0483\u0485\x05\xBE`\x02\u0484\u0479" +
		"\x03\x02\x02\x02\u0484\u047A\x03\x02\x02\x02\u0484\u047B\x03\x02\x02\x02" +
		"\u0484\u047C\x03\x02\x02\x02\u0484\u0481\x03\x02\x02\x02\u0484\u0483\x03" +
		"\x02\x02\x02\u0485\u0497\x03\x02\x02\x02\u0486\u0487\f\x1A\x02\x02\u0487" +
		"\u0488\x07F\x02\x02\u0488\u0489\x05\xA8U\x02\u0489\u048A\x07G\x02\x02" +
		"\u048A\u0497\x03\x02\x02\x02\u048B\u048C\f\x16\x02\x02\u048C\u0497\t\f" +
		"\x02\x02\u048D\u048E\f\x0F\x02\x02\u048E\u048F\x07\x1D\x02\x02\u048F\u0497" +
		"\x05\xC8e\x02\u0490\u0491\f\x05\x02\x02\u0491\u0493\x07n\x02\x02\u0492" +
		"\u0494\x05\xCAf\x02\u0493\u0492\x03\x02\x02\x02\u0493\u0494\x03\x02\x02" +
		"\x02\u0494\u0495\x03\x02\x02\x02\u0495\u0497\x07u\x02\x02\u0496\u0448" +
		"\x03\x02\x02\x02\u0496\u044B\x03\x02\x02\x02\u0496\u044E\x03\x02\x02\x02" +
		"\u0496\u0459\x03\x02\x02\x02\u0496\u045C\x03\x02\x02\x02\u0496\u045F\x03" +
		"\x02\x02\x02\u0496\u0462\x03\x02\x02\x02\u0496\u0465\x03\x02\x02\x02\u0496" +
		"\u0468\x03\x02\x02\x02\u0496\u046B\x03\x02\x02\x02\u0496\u046E\x03\x02" +
		"\x02\x02\u0496\u0474\x03\x02\x02\x02\u0496\u0477\x03\x02\x02\x02\u0496" +
		"\u0486\x03\x02\x02\x02\u0496\u048B\x03\x02\x02\x02\u0496\u048D\x03\x02" +
		"\x02\x02\u0496\u0490\x03\x02\x02\x02\u0497\u049A\x03\x02\x02\x02\u0498" +
		"\u0496\x03\x02\x02\x02\u0498\u0499\x03\x02\x02\x02\u0499\xA9\x03\x02\x02" +
		"\x02\u049A\u0498\x03\x02\x02\x02\u049B\u049C\x05\xACW\x02\u049C\u049D" +
		"\x07m\x02\x02\u049D\u049E\x05\xAEX\x02\u049E\xAB\x03\x02\x02\x02\u049F" +
		"\u04B0\x07u\x02\x02\u04A0\u04A2\x07B\x02\x02\u04A1\u04A3\x05X-\x02\u04A2" +
		"\u04A1\x03\x02\x02\x02\u04A2\u04A3\x03\x02\x02\x02\u04A3\u04A4\x03\x02" +
		"\x02\x02\u04A4\u04B0\x07C\x02\x02\u04A5\u04A6\x07B\x02\x02\u04A6\u04AB" +
		"\x07u\x02\x02\u04A7\u04A8\x07I\x02\x02\u04A8\u04AA\x07u\x02\x02\u04A9" +
		"\u04A7\x03\x02\x02\x02\u04AA\u04AD\x03\x02\x02\x02\u04AB\u04A9\x03\x02" +
		"\x02\x02\u04AB\u04AC\x03\x02\x02\x02\u04AC\u04AE\x03\x02\x02\x02\u04AD" +
		"\u04AB\x03\x02\x02\x02\u04AE\u04B0\x07C\x02\x02\u04AF\u049F\x03\x02\x02" +
		"\x02\u04AF\u04A0\x03\x02\x02\x02\u04AF\u04A5\x03\x02\x02\x02\u04B0\xAD" +
		"\x03\x02\x02\x02\u04B1\u04B4\x05\xA8U\x02\u04B2\u04B4\x05\x82B\x02\u04B3" +
		"\u04B1\x03\x02\x02\x02\u04B3\u04B2\x03\x02\x02\x02\u04B4\xAF\x03\x02\x02" +
		"\x02\u04B5\u04B6\x07B\x02\x02\u04B6\u04B7\x05\xA8U\x02\u04B7\u04B8\x07" +
		"C\x02\x02\u04B8\u04C8\x03\x02\x02\x02\u04B9\u04C8\x07.\x02\x02\u04BA\u04C8" +
		"\x07+\x02\x02\u04BB\u04C8\x05\xE8u\x02\u04BC\u04C8\x07u\x02\x02\u04BD" +
		"\u04BE\x050\x19\x02\u04BE\u04BF\x07J\x02\x02\u04BF\u04C0\x07\v\x02\x02" +
		"\u04C0\u04C8\x03\x02\x02\x02\u04C1\u04C5\x05\xC4c\x02\u04C2\u04C6\x05" +
		"\xCEh\x02\u04C3\u04C4\x07.\x02\x02\u04C4\u04C6\x05\xD0i\x02\u04C5\u04C2" +
		"\x03\x02\x02\x02\u04C5\u04C3\x03\x02\x02\x02\u04C6\u04C8\x03\x02\x02\x02" +
		"\u04C7\u04B5\x03\x02\x02\x02\u04C7\u04B9\x03\x02\x02\x02\u04C7\u04BA\x03" +
		"\x02\x02\x02\u04C7\u04BB\x03\x02\x02\x02\u04C7\u04BC\x03\x02\x02\x02\u04C7" +
		"\u04BD\x03\x02\x02\x02\u04C7\u04C1\x03\x02\x02\x02\u04C8\xB1\x03\x02\x02" +
		"\x02\u04C9\u04CA\x05P)\x02\u04CA\u04CB\x07J\x02\x02\u04CB\u04CD\x03\x02" +
		"\x02\x02\u04CC\u04C9\x03\x02\x02\x02\u04CC\u04CD\x03\x02\x02\x02\u04CD" +
		"\u04D1\x03\x02\x02\x02\u04CE\u04D0\x05h5\x02\u04CF\u04CE\x03\x02\x02\x02" +
		"\u04D0\u04D3\x03\x02\x02\x02\u04D1\u04CF\x03\x02\x02\x02\u04D1\u04D2\x03" +
		"\x02\x02\x02\u04D2\u04D4\x03\x02\x02\x02\u04D3\u04D1\x03\x02\x02\x02\u04D4" +
		"\u04D6\x07u\x02\x02\u04D5\u04D7\x05\xCAf\x02\u04D6\u04D5\x03\x02\x02\x02" +
		"\u04D6\u04D7\x03\x02\x02\x02\u04D7\xB3\x03\x02\x02\x02\u04D8\u04D9\x05" +
		"\xC4c\x02\u04D9\u04DA\x05\xB6\\\x02\u04DA\u04DB\x05\xBC_\x02\u04DB\u04E2" +
		"\x03\x02\x02\x02\u04DC\u04DF\x05\xB6\\\x02\u04DD\u04E0\x05\xBA^\x02\u04DE" +
		"\u04E0\x05\xBC_\x02\u04DF\u04DD\x03\x02\x02\x02\u04DF\u04DE\x03\x02\x02" +
		"\x02\u04E0\u04E2\x03\x02\x02\x02\u04E1\u04D8\x03\x02\x02\x02\u04E1\u04DC" +
		"\x03\x02\x02\x02\u04E2\xB5\x03\x02\x02\x02\u04E3\u04E5\x07u\x02\x02\u04E4" +
		"\u04E6\x05\xC0a\x02\u04E5\u04E4\x03\x02\x02\x02\u04E5\u04E6\x03\x02\x02" +
		"\x02\u04E6\u04EE\x03\x02\x02\x02\u04E7\u04E8\x07J\x02\x02\u04E8\u04EA" +
		"\x07u\x02\x02\u04E9\u04EB\x05\xC0a\x02\u04EA\u04E9\x03\x02\x02\x02\u04EA" +
		"\u04EB\x03\x02\x02\x02\u04EB\u04ED\x03\x02\x02\x02\u04EC\u04E7\x03\x02" +
		"\x02\x02\u04ED\u04F0\x03\x02\x02\x02\u04EE\u04EC\x03\x02\x02\x02\u04EE" +
		"\u04EF\x03\x02\x02\x02\u04EF\u04F3\x03\x02\x02\x02\u04F0\u04EE\x03\x02" +
		"\x02\x02\u04F1\u04F3\x05\xE2r\x02\u04F2\u04E3\x03\x02\x02\x02\u04F2\u04F1" +
		"\x03\x02\x02\x02\u04F3\xB7\x03\x02\x02\x02\u04F4\u04F6\x07u\x02\x02\u04F5" +
		"\u04F7\x05\xC2b\x02\u04F6\u04F5\x03\x02\x02\x02\u04F6\u04F7\x03\x02\x02" +
		"\x02\u04F7\u04F8\x03\x02\x02\x02\u04F8\u04F9\x05\xBC_\x02\u04F9\xB9\x03" +
		"\x02\x02\x02\u04FA\u0516\x07F\x02\x02\u04FB\u0500\x07G\x02\x02\u04FC\u04FD" +
		"\x07F\x02\x02\u04FD\u04FF\x07G\x02\x02\u04FE\u04FC\x03\x02\x02\x02\u04FF" +
		"\u0502\x03\x02\x02\x02\u0500\u04FE\x03\x02\x02\x02\u0500\u0501\x03\x02" +
		"\x02\x02\u0501\u0503\x03\x02\x02\x02\u0502\u0500\x03\x02\x02\x02\u0503" +
		"\u0517\x05N(\x02\u0504\u0505\x05\xA8U\x02\u0505\u050C\x07G\x02\x02\u0506" +
		"\u0507\x07F\x02\x02\u0507\u0508\x05\xA8U\x02\u0508\u0509\x07G\x02\x02" +
		"\u0509\u050B\x03\x02\x02\x02\u050A\u0506\x03\x02\x02\x02\u050B\u050E\x03" +
		"\x02\x02\x02\u050C\u050A\x03\x02\x02\x02\u050C\u050D\x03\x02\x02\x02\u050D" +
		"\u0513\x03\x02\x02\x02\u050E\u050C\x03\x02\x02\x02\u050F\u0510\x07F\x02" +
		"\x02\u0510\u0512\x07G\x02\x02\u0511\u050F\x03\x02\x02\x02\u0512\u0515" +
		"\x03\x02\x02\x02\u0513\u0511\x03\x02\x02\x02\u0513\u0514\x03\x02\x02\x02" +
		"\u0514\u0517\x03\x02\x02\x02\u0515\u0513\x03\x02\x02\x02\u0516\u04FB\x03" +
		"\x02\x02\x02\u0516\u0504\x03\x02\x02\x02\u0517\xBB\x03\x02\x02\x02\u0518" +
		"\u051A\x05\xD0i\x02\u0519\u051B\x05$\x13\x02\u051A\u0519\x03\x02\x02\x02" +
		"\u051A\u051B\x03\x02\x02\x02\u051B\xBD\x03\x02\x02\x02\u051C\u051D\x05" +
		"\xC4c\x02\u051D\u051E\x05\xCEh\x02\u051E\xBF\x03\x02\x02\x02\u051F\u0520" +
		"\x07M\x02\x02\u0520\u0523\x07L\x02\x02\u0521\u0523\x05\xCAf\x02\u0522" +
		"\u051F\x03\x02\x02\x02\u0522\u0521\x03\x02\x02\x02\u0523\xC1\x03\x02\x02" +
		"\x02\u0524\u0525\x07M\x02\x02\u0525\u0528\x07L\x02\x02\u0526\u0528\x05" +
		"\xC4c\x02\u0527\u0524\x03\x02\x02\x02\u0527\u0526\x03\x02\x02\x02\u0528" +
		"\xC3\x03\x02\x02\x02\u0529\u052A\x07M\x02\x02\u052A\u052B\x05\xC6d\x02" +
		"\u052B\u052C\x07L\x02\x02\u052C\xC5\x03\x02\x02\x02\u052D\u0532\x05\xC8" +
		"e\x02\u052E\u052F\x07I\x02\x02\u052F\u0531\x05\xC8e\x02\u0530\u052E\x03" +
		"\x02\x02\x02\u0531\u0534\x03\x02\x02\x02\u0532\u0530\x03\x02\x02\x02\u0532" +
		"\u0533\x03\x02\x02\x02\u0533\xC7\x03\x02\x02\x02\u0534\u0532\x03\x02\x02" +
		"\x02\u0535\u0537\x05h5\x02\u0536\u0535\x03\x02\x02\x02\u0536\u0537\x03" +
		"\x02\x02\x02\u0537\u053B\x03\x02\x02\x02\u0538\u053C\x05P)\x02\u0539\u053C" +
		"\x05\xE2r\x02\u053A\u053C\x073\x02\x02\u053B\u0538\x03\x02\x02\x02\u053B" +
		"\u0539\x03\x02\x02\x02\u053B\u053A\x03\x02\x02\x02\u053C\u0541\x03\x02" +
		"\x02\x02\u053D\u053E\x07F\x02\x02\u053E\u0540\x07G\x02\x02\u053F\u053D" +
		"\x03\x02\x02\x02\u0540\u0543\x03\x02\x02\x02\u0541\u053F\x03\x02\x02\x02" +
		"\u0541\u0542\x03\x02\x02\x02\u0542\xC9\x03\x02\x02\x02\u0543\u0541\x03" +
		"\x02\x02\x02\u0544\u0545\x07M\x02\x02\u0545\u054A\x05R*\x02\u0546\u0547" +
		"\x07I\x02\x02\u0547\u0549\x05R*\x02\u0548\u0546\x03\x02\x02\x02\u0549" +
		"\u054C\x03\x02\x02\x02\u054A\u0548\x03\x02\x02\x02\u054A\u054B\x03\x02" +
		"\x02\x02\u054B\u054D\x03\x02\x02\x02\u054C\u054A\x03\x02\x02\x02\u054D" +
		"\u054E\x07L\x02\x02\u054E\xCB\x03\x02\x02\x02\u054F\u0556\x05\xD0i\x02" +
		"\u0550\u0551\x07J\x02\x02\u0551\u0553\x07u\x02\x02\u0552\u0554\x05\xD0" +
		"i\x02\u0553\u0552\x03\x02\x02\x02\u0553\u0554\x03\x02\x02\x02\u0554\u0556" +
		"\x03\x02\x02\x02\u0555\u054F\x03\x02\x02\x02\u0555\u0550\x03\x02\x02\x02" +
		"\u0556\xCD\x03\x02\x02\x02\u0557\u0558\x07+\x02\x02\u0558\u055C\x05\xCC" +
		"g\x02\u0559\u055A\x07u\x02\x02\u055A\u055C\x05\xD0i\x02\u055B\u0557\x03" +
		"\x02\x02\x02\u055B\u0559\x03\x02\x02\x02\u055C\xCF\x03\x02\x02\x02\u055D" +
		"\u055F\x07B\x02\x02\u055E\u0560\x05\xA6T\x02\u055F\u055E\x03\x02\x02\x02" +
		"\u055F\u0560\x03\x02\x02\x02\u0560\u0561\x03\x02\x02\x02\u0561\u0562\x07" +
		"C\x02\x02\u0562\xD1\x03\x02\x02\x02\u0563\u0565\x05\x06\x04\x02\u0564" +
		"\u0563\x03\x02\x02\x02\u0564\u0565\x03\x02\x02\x02\u0565\u0569\x03\x02" +
		"\x02\x02\u0566\u0568\x05\b\x05\x02\u0567\u0566\x03\x02\x02\x02\u0568\u056B" +
		"\x03\x02\x02\x02\u0569\u0567\x03\x02\x02\x02\u0569\u056A\x03\x02\x02\x02" +
		"\u056A\u056D\x03\x02\x02\x02\u056B\u0569\x03\x02\x02\x02\u056C\u056E\x05" +
		"\n\x06\x02\u056D\u056C\x03\x02\x02\x02\u056E\u056F\x03\x02\x02\x02\u056F" +
		"\u056D\x03\x02\x02\x02\u056F\u0570\x03\x02\x02\x02\u0570\u0571\x03\x02" +
		"\x02\x02\u0571\u0572\x07\x02\x02\x03\u0572\xD3\x03\x02\x02\x02\u0573\u0577" +
		"\x05\b\x05\x02\u0574\u0577\x05\x84C\x02\u0575\u0577\x05\n\x06\x02\u0576" +
		"\u0573\x03\x02\x02\x02\u0576\u0574\x03\x02\x02\x02\u0576\u0575\x03\x02" +
		"\x02\x02\u0577\u057A\x03\x02\x02\x02\u0578\u0576\x03\x02\x02\x02\u0578" +
		"\u0579\x03\x02\x02\x02\u0579\u057B\x03\x02\x02\x02\u057A\u0578\x03\x02" +
		"\x02\x02\u057B\u057C\x07\x02\x02\x03\u057C\xD5\x03\x02\x02\x02\u057D\u0580" +
		"\x05\b\x05\x02\u057E\u0580\x05(\x15\x02\u057F\u057D\x03\x02\x02\x02\u057F" +
		"\u057E\x03\x02\x02\x02\u0580\u0583\x03\x02\x02\x02\u0581\u057F\x03\x02" +
		"\x02\x02\u0581\u0582\x03\x02\x02\x02\u0582\u0584\x03\x02\x02\x02\u0583" +
		"\u0581\x03\x02\x02\x02\u0584\u0585\x07\x02\x02\x03\u0585\xD7\x03\x02\x02" +
		"\x02\u0586\u058A\x05\b\x05\x02\u0587\u058A\x05(\x15\x02\u0588\u058A\x05" +
		"\x84C\x02\u0589\u0586\x03\x02\x02\x02\u0589\u0587\x03\x02\x02\x02\u0589" +
		"\u0588\x03\x02\x02\x02\u058A\u058D\x03\x02\x02\x02\u058B\u0589\x03\x02" +
		"\x02\x02\u058B\u058C\x03\x02\x02\x02\u058C\u058E\x03\x02\x02\x02\u058D" +
		"\u058B\x03\x02\x02\x02\u058E\u058F\x05\x84C\x02\u058F\u0595\x05(\x15\x02" +
		"\u0590\u0594\x05\b\x05\x02\u0591\u0594\x05(\x15\x02\u0592\u0594\x05\x84" +
		"C\x02\u0593\u0590\x03\x02\x02\x02\u0593\u0591\x03\x02\x02\x02\u0593\u0592" +
		"\x03\x02\x02\x02\u0594\u0597\x03\x02\x02\x02\u0595\u0593\x03\x02\x02\x02" +
		"\u0595\u0596\x03\x02\x02\x02\u0596\u05AB\x03\x02\x02\x02\u0597\u0595\x03" +
		"\x02\x02\x02\u0598\u059C\x05\b\x05\x02\u0599\u059C\x05(\x15\x02\u059A" +
		"\u059C\x05\x84C\x02\u059B\u0598\x03\x02\x02\x02\u059B\u0599\x03\x02\x02" +
		"\x02\u059B\u059A\x03\x02\x02\x02\u059C\u059F\x03\x02\x02\x02\u059D\u059B" +
		"\x03\x02\x02\x02\u059D\u059E\x03\x02\x02\x02\u059E\u05A0\x03\x02\x02\x02" +
		"\u059F\u059D\x03\x02\x02\x02\u05A0\u05A1\x05(\x15\x02\u05A1\u05A7\x05" +
		"\x84C\x02\u05A2\u05A6\x05\b\x05\x02\u05A3\u05A6\x05(\x15\x02\u05A4\u05A6" +
		"\x05\x84C\x02\u05A5\u05A2\x03\x02\x02\x02\u05A5\u05A3\x03\x02\x02\x02" +
		"\u05A5\u05A4\x03\x02\x02\x02\u05A6\u05A9\x03\x02\x02\x02\u05A7\u05A5\x03" +
		"\x02\x02\x02\u05A7\u05A8\x03\x02\x02\x02\u05A8\u05AB\x03\x02\x02\x02\u05A9" +
		"\u05A7\x03\x02\x02\x02\u05AA\u058B\x03\x02\x02\x02\u05AA\u059D\x03\x02" +
		"\x02\x02\u05AB\xD9\x03\x02\x02\x02\u05AC\u05B6\x05\xDCo\x02\u05AD\u05B2" +
		"\x07u\x02\x02\u05AE\u05AF\x07F\x02\x02\u05AF\u05B1\x07G\x02\x02\u05B0" +
		"\u05AE\x03\x02\x02\x02\u05B1\u05B4\x03\x02\x02\x02\u05B2\u05B0\x03\x02" +
		"\x02\x02\u05B2\u05B3\x03\x02\x02\x02\u05B3\u05B6\x03\x02\x02\x02\u05B4" +
		"\u05B2\x03\x02\x02\x02\u05B5\u05AC\x03\x02\x02\x02\u05B5\u05AD\x03\x02" +
		"\x02\x02\u05B6\xDB\x03\x02\x02\x02\u05B7\u05BC\x05\xE2r\x02\u05B8\u05B9" +
		"\x07F\x02\x02\u05B9\u05BB\x07G\x02\x02\u05BA\u05B8\x03\x02\x02\x02\u05BB" +
		"\u05BE\x03\x02\x02\x02\u05BC\u05BA\x03\x02\x02\x02\u05BC\u05BD\x03\x02" +
		"\x02\x02\u05BD\u05BF\x03\x02\x02\x02\u05BE\u05BC\x03\x02\x02\x02\u05BF" +
		"\u05C0\bo\x01\x02\u05C0\xDD\x03\x02\x02\x02\u05C1\u05D5\x05\xE0q\x02\u05C2" +
		"\u05C3\x07u\x02\x02\u05C3\u05C5\x07B\x02\x02\u05C4\u05C6\x05\xA6T\x02" +
		"\u05C5\u05C4\x03\x02\x02\x02\u05C5\u05C6\x03\x02\x02\x02\u05C6\u05C7\x03" +
		"\x02\x02\x02\u05C7\u05D5\x07C\x02\x02\u05C8\u05C9\x07.\x02\x02\u05C9\u05CB" +
		"\x07B\x02\x02\u05CA\u05CC\x05\xA6T\x02\u05CB\u05CA\x03\x02\x02\x02\u05CB" +
		"\u05CC\x03\x02\x02\x02\u05CC\u05CD\x03\x02\x02\x02\u05CD\u05D5\x07C\x02" +
		"\x02\u05CE\u05CF\x07+\x02\x02\u05CF\u05D1\x07B\x02\x02\u05D0\u05D2\x05" +
		"\xA6T\x02\u05D1\u05D0\x03\x02\x02\x02\u05D1\u05D2\x03\x02\x02\x02\u05D2" +
		"\u05D3\x03\x02\x02\x02\u05D3\u05D5\x07C\x02\x02\u05D4\u05C1\x03\x02\x02" +
		"\x02\u05D4\u05C2\x03\x02\x02\x02\u05D4\u05C8\x03\x02\x02\x02\u05D4\u05CE" +
		"\x03\x02\x02\x02\u05D5\xDF\x03\x02\x02\x02\u05D6\u05D7\t\r\x02\x02\u05D7" +
		"\u05D9\x07B\x02\x02\u05D8\u05DA\x05\xA6T\x02\u05D9\u05D8\x03\x02\x02\x02" +
		"\u05D9\u05DA\x03\x02\x02\x02\u05DA\u05DB\x03\x02\x02\x02\u05DB\u05DC\x07" +
		"C\x02\x02\u05DC\xE1\x03\x02\x02\x02\u05DD\u05E7\x07\x05\x02\x02\u05DE" +
		"\u05E7\x07\n\x02\x02\u05DF\u05E7\x07\x07\x02\x02\u05E0\u05E7\x07(\x02" +
		"\x02\u05E1\u05E7\x07\x1E\x02\x02\u05E2\u05E7\x07 \x02\x02\u05E3\u05E7" +
		"\x07\x17\x02\x02\u05E4\u05E7\x07\x11\x02\x02\u05E5\u05E7\x05\xE4s\x02" +
		"\u05E6\u05DD\x03\x02\x02\x02\u05E6\u05DE\x03\x02\x02\x02\u05E6\u05DF\x03" +
		"\x02\x02\x02\u05E6\u05E0\x03\x02\x02\x02\u05E6\u05E1\x03\x02\x02\x02\u05E6" +
		"\u05E2\x03\x02\x02\x02\u05E6\u05E3\x03\x02\x02\x02\u05E6\u05E4\x03\x02" +
		"\x02\x02\u05E6\u05E5\x03\x02\x02\x02\u05E7\xE3\x03\x02\x02\x02\u05E8\u05E9" +
		"\x07\r\x02\x02\u05E9\xE5\x03\x02\x02\x02\u05EA\u05ED\x07u\x02\x02\u05EB" +
		"\u05ED\x05\xE4s\x02\u05EC\u05EA\x03\x02\x02\x02\u05EC\u05EB\x03\x02\x02" +
		"\x02\u05ED\u05F5\x03\x02\x02\x02\u05EE\u05F1\x07J\x02\x02\u05EF\u05F2" +
		"\x07u\x02\x02\u05F0\u05F2\x05\xE4s\x02\u05F1\u05EF\x03\x02\x02\x02\u05F1" +
		"\u05F0\x03\x02\x02\x02\u05F2\u05F4\x03\x02\x02\x02\u05F3\u05EE\x03\x02" +
		"\x02\x02\u05F4\u05F7\x03\x02\x02\x02\u05F5\u05F3\x03\x02\x02\x02\u05F5" +
		"\u05F6\x03\x02\x02\x02\u05F6\xE7\x03\x02\x02\x02\u05F7\u05F5\x03\x02\x02" +
		"\x02\u05F8\u0600\x05d3\x02\u05F9\u0600\x05f4\x02\u05FA\u0600\x07>\x02" +
		"\x02\u05FB\u0600\x05b2\x02\u05FC\u0600\x07=\x02\x02\u05FD\u0600\x07A\x02" +
		"\x02\u05FE\u0600\x05\xEAv\x02\u05FF\u05F8\x03\x02\x02\x02\u05FF\u05F9" +
		"\x03\x02\x02\x02\u05FF\u05FA\x03\x02\x02\x02\u05FF\u05FB\x03\x02\x02\x02" +
		"\u05FF\u05FC\x03\x02\x02\x02\u05FF\u05FD\x03\x02\x02\x02\u05FF\u05FE\x03" +
		"\x02\x02\x02\u0600\xE9\x03\x02\x02\x02\u0601\u0602\x07t\x02\x02\u0602" +
		"\xEB\x03\x02\x02\x02\xC5\xEF\xF2\xF7\xFD\u0105\u010E\u0113\u011A\u0121" +
		"\u0124\u012B\u0135\u0139\u013E\u0142\u0146\u0150\u0158\u015E\u0165\u016C" +
		"\u0170\u0173\u0176\u017F\u0185\u018A\u018D\u0193\u0199\u019D\u01A5\u01AE" +
		"\u01B6\u01BC\u01C0\u01CB\u01D4\u01D9\u01DF\u01E3\u01EF\u01FA\u01FF\u0208" +
		"\u0210\u021A\u0223\u022B\u0230\u0238\u023D\u0247\u0251\u0257\u025B\u0263" +
		"\u0267\u0269\u026F\u0274\u0278\u027F\u0281\u0288\u028D\u0296\u029B\u029E" +
		"\u02A3\u02AC\u02B9\u02C4\u02C7\u02CE\u02D8\u02E0\u02E3\u02E6\u02F3\u02FB" +
		"\u0300\u0308\u030C\u0310\u0314\u0316\u031A\u0320\u032B\u0335\u033A\u0343" +
		"\u0348\u034B\u0352\u035B\u036D\u0370\u0373\u037B\u037F\u0387\u038D\u0398" +
		"\u03A1\u03A6\u03B0\u03B7\u03C4\u03CD\u03D6\u03DC\u03E7\u03EC\u03F1\u03F6" +
		"\u0400\u0404\u0408\u040A\u040E\u0413\u0424\u0439\u043D\u0442\u0446\u0456" +
		"\u047E\u0484\u0493\u0496\u0498\u04A2\u04AB\u04AF\u04B3\u04C5\u04C7\u04CC" +
		"\u04D1\u04D6\u04DF\u04E1\u04E5\u04EA\u04EE\u04F2\u04F6\u0500\u050C\u0513" +
		"\u0516\u051A\u0522\u0527\u0532\u0536\u053B\u0541\u054A\u0553\u0555\u055B" +
		"\u055F\u0564\u0569\u056F\u0576\u0578\u057F\u0581\u0589\u058B\u0593\u0595" +
		"\u059B\u059D\u05A5\u05A7\u05AA\u05B2\u05B5\u05BC\u05C5\u05CB\u05D1\u05D4" +
		"\u05D9\u05E6\u05EC\u05F1\u05F5\u05FF";
	public static readonly _serializedATN: string = Utils.join(
		[
			ProcessingParser._serializedATNSegment0,
			ProcessingParser._serializedATNSegment1,
			ProcessingParser._serializedATNSegment2,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ProcessingParser.__ATN) {
			ProcessingParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ProcessingParser._serializedATN));
		}

		return ProcessingParser.__ATN;
	}

}

export class ProcessingSketchContext extends ParserRuleContext {
	public staticProcessingSketch(): StaticProcessingSketchContext | undefined {
		return this.tryGetRuleContext(0, StaticProcessingSketchContext);
	}
	public javaProcessingSketch(): JavaProcessingSketchContext | undefined {
		return this.tryGetRuleContext(0, JavaProcessingSketchContext);
	}
	public activeProcessingSketch(): ActiveProcessingSketchContext | undefined {
		return this.tryGetRuleContext(0, ActiveProcessingSketchContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_processingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterProcessingSketch) {
			listener.enterProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitProcessingSketch) {
			listener.exitProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitProcessingSketch) {
			return visitor.visitProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompilationUnitContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public packageDeclaration(): PackageDeclarationContext | undefined {
		return this.tryGetRuleContext(0, PackageDeclarationContext);
	}
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext[];
	public typeDeclaration(i: number): TypeDeclarationContext;
	public typeDeclaration(i?: number): TypeDeclarationContext | TypeDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDeclarationContext);
		} else {
			return this.getRuleContext(i, TypeDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_compilationUnit; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCompilationUnit) {
			listener.enterCompilationUnit(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCompilationUnit) {
			listener.exitCompilationUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCompilationUnit) {
			return visitor.visitCompilationUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PackageDeclarationContext extends ParserRuleContext {
	public PACKAGE(): TerminalNode { return this.getToken(ProcessingParser.PACKAGE, 0); }
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_packageDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterPackageDeclaration) {
			listener.enterPackageDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitPackageDeclaration) {
			listener.exitPackageDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitPackageDeclaration) {
			return visitor.visitPackageDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclarationContext extends ParserRuleContext {
	public IMPORT(): TerminalNode { return this.getToken(ProcessingParser.IMPORT, 0); }
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MUL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_importDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterImportDeclaration) {
			listener.enterImportDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitImportDeclaration) {
			listener.exitImportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitImportDeclaration) {
			return visitor.visitImportDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeDeclarationContext extends ParserRuleContext {
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext[];
	public classOrInterfaceModifier(i: number): ClassOrInterfaceModifierContext;
	public classOrInterfaceModifier(i?: number): ClassOrInterfaceModifierContext | ClassOrInterfaceModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassOrInterfaceModifierContext);
		} else {
			return this.getRuleContext(i, ClassOrInterfaceModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeDeclaration) {
			listener.enterTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeDeclaration) {
			listener.exitTypeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeDeclaration) {
			return visitor.visitTypeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModifierContext extends ParserRuleContext {
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext | undefined {
		return this.tryGetRuleContext(0, ClassOrInterfaceModifierContext);
	}
	public NATIVE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NATIVE, 0); }
	public SYNCHRONIZED(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SYNCHRONIZED, 0); }
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.TRANSIENT, 0); }
	public VOLATILE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.VOLATILE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_modifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterModifier) {
			listener.enterModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitModifier) {
			listener.exitModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitModifier) {
			return visitor.visitModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassOrInterfaceModifierContext extends ParserRuleContext {
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public PUBLIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PUBLIC, 0); }
	public PROTECTED(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PROTECTED, 0); }
	public PRIVATE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PRIVATE, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ABSTRACT, 0); }
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FINAL, 0); }
	public STRICTFP(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STRICTFP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classOrInterfaceModifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassOrInterfaceModifier) {
			listener.enterClassOrInterfaceModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassOrInterfaceModifier) {
			listener.exitClassOrInterfaceModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassOrInterfaceModifier) {
			return visitor.visitClassOrInterfaceModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableModifierContext extends ParserRuleContext {
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FINAL, 0); }
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableModifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableModifier) {
			listener.enterVariableModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableModifier) {
			listener.exitVariableModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableModifier) {
			return visitor.visitVariableModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassDeclarationContext extends ParserRuleContext {
	public CLASS(): TerminalNode { return this.getToken(ProcessingParser.CLASS, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public classBody(): ClassBodyContext {
		return this.getRuleContext(0, ClassBodyContext);
	}
	public typeParameters(): TypeParametersContext | undefined {
		return this.tryGetRuleContext(0, TypeParametersContext);
	}
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public IMPLEMENTS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IMPLEMENTS, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassDeclaration) {
			listener.enterClassDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassDeclaration) {
			listener.exitClassDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassDeclaration) {
			return visitor.visitClassDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParametersContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(ProcessingParser.LT, 0); }
	public typeParameter(): TypeParameterContext[];
	public typeParameter(i: number): TypeParameterContext;
	public typeParameter(i?: number): TypeParameterContext | TypeParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeParameterContext);
		} else {
			return this.getRuleContext(i, TypeParameterContext);
		}
	}
	public GT(): TerminalNode { return this.getToken(ProcessingParser.GT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeParameters; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeParameters) {
			listener.enterTypeParameters(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeParameters) {
			listener.exitTypeParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeParameters) {
			return visitor.visitTypeParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParameterContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public typeBound(): TypeBoundContext | undefined {
		return this.tryGetRuleContext(0, TypeBoundContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeParameter; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeParameter) {
			listener.enterTypeParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeParameter) {
			listener.exitTypeParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeParameter) {
			return visitor.visitTypeParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeBoundContext extends ParserRuleContext {
	public typeType(): TypeTypeContext[];
	public typeType(i: number): TypeTypeContext;
	public typeType(i?: number): TypeTypeContext | TypeTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeTypeContext);
		} else {
			return this.getRuleContext(i, TypeTypeContext);
		}
	}
	public BITAND(): TerminalNode[];
	public BITAND(i: number): TerminalNode;
	public BITAND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.BITAND);
		} else {
			return this.getToken(ProcessingParser.BITAND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeBound; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeBound) {
			listener.enterTypeBound(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeBound) {
			listener.exitTypeBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeBound) {
			return visitor.visitTypeBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumDeclarationContext extends ParserRuleContext {
	public ENUM(): TerminalNode { return this.getToken(ProcessingParser.ENUM, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public IMPLEMENTS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IMPLEMENTS, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	public enumConstants(): EnumConstantsContext | undefined {
		return this.tryGetRuleContext(0, EnumConstantsContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COMMA, 0); }
	public enumBodyDeclarations(): EnumBodyDeclarationsContext | undefined {
		return this.tryGetRuleContext(0, EnumBodyDeclarationsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumDeclaration) {
			listener.enterEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumDeclaration) {
			listener.exitEnumDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumDeclaration) {
			return visitor.visitEnumDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumConstantsContext extends ParserRuleContext {
	public enumConstant(): EnumConstantContext[];
	public enumConstant(i: number): EnumConstantContext;
	public enumConstant(i?: number): EnumConstantContext | EnumConstantContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumConstantContext);
		} else {
			return this.getRuleContext(i, EnumConstantContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumConstants; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumConstants) {
			listener.enterEnumConstants(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumConstants) {
			listener.exitEnumConstants(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumConstants) {
			return visitor.visitEnumConstants(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumConstantContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	public classBody(): ClassBodyContext | undefined {
		return this.tryGetRuleContext(0, ClassBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumConstant; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumConstant) {
			listener.enterEnumConstant(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumConstant) {
			listener.exitEnumConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumConstant) {
			return visitor.visitEnumConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumBodyDeclarationsContext extends ParserRuleContext {
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumBodyDeclarations; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumBodyDeclarations) {
			listener.enterEnumBodyDeclarations(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumBodyDeclarations) {
			listener.exitEnumBodyDeclarations(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumBodyDeclarations) {
			return visitor.visitEnumBodyDeclarations(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceDeclarationContext extends ParserRuleContext {
	public INTERFACE(): TerminalNode { return this.getToken(ProcessingParser.INTERFACE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public interfaceBody(): InterfaceBodyContext {
		return this.getRuleContext(0, InterfaceBodyContext);
	}
	public typeParameters(): TypeParametersContext | undefined {
		return this.tryGetRuleContext(0, TypeParametersContext);
	}
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceDeclaration) {
			listener.enterInterfaceDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceDeclaration) {
			listener.exitInterfaceDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceDeclaration) {
			return visitor.visitInterfaceDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassBodyContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassBody) {
			listener.enterClassBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassBody) {
			listener.exitClassBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassBody) {
			return visitor.visitClassBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceBodyContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public interfaceBodyDeclaration(): InterfaceBodyDeclarationContext[];
	public interfaceBodyDeclaration(i: number): InterfaceBodyDeclarationContext;
	public interfaceBodyDeclaration(i?: number): InterfaceBodyDeclarationContext | InterfaceBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, InterfaceBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceBody) {
			listener.enterInterfaceBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceBody) {
			listener.exitInterfaceBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceBody) {
			return visitor.visitInterfaceBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassBodyDeclarationContext extends ParserRuleContext {
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public importDeclaration(): ImportDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ImportDeclarationContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public memberDeclaration(): MemberDeclarationContext | undefined {
		return this.tryGetRuleContext(0, MemberDeclarationContext);
	}
	public modifier(): ModifierContext[];
	public modifier(i: number): ModifierContext;
	public modifier(i?: number): ModifierContext | ModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModifierContext);
		} else {
			return this.getRuleContext(i, ModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classBodyDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassBodyDeclaration) {
			listener.enterClassBodyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassBodyDeclaration) {
			listener.exitClassBodyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassBodyDeclaration) {
			return visitor.visitClassBodyDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MemberDeclarationContext extends ParserRuleContext {
	public methodDeclaration(): MethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, MethodDeclarationContext);
	}
	public genericMethodDeclaration(): GenericMethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericMethodDeclarationContext);
	}
	public fieldDeclaration(): FieldDeclarationContext | undefined {
		return this.tryGetRuleContext(0, FieldDeclarationContext);
	}
	public constructorDeclaration(): ConstructorDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ConstructorDeclarationContext);
	}
	public genericConstructorDeclaration(): GenericConstructorDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericConstructorDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_memberDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMemberDeclaration) {
			listener.enterMemberDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMemberDeclaration) {
			listener.exitMemberDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMemberDeclaration) {
			return visitor.visitMemberDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDeclarationContext extends ParserRuleContext {
	public typeTypeOrVoid(): TypeTypeOrVoidContext {
		return this.getRuleContext(0, TypeTypeOrVoidContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public formalParameters(): FormalParametersContext {
		return this.getRuleContext(0, FormalParametersContext);
	}
	public methodBody(): MethodBodyContext {
		return this.getRuleContext(0, MethodBodyContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	public THROWS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROWS, 0); }
	public qualifiedNameList(): QualifiedNameListContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_methodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMethodDeclaration) {
			listener.enterMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMethodDeclaration) {
			listener.exitMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMethodDeclaration) {
			return visitor.visitMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodBodyContext extends ParserRuleContext {
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_methodBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMethodBody) {
			listener.enterMethodBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMethodBody) {
			listener.exitMethodBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMethodBody) {
			return visitor.visitMethodBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeTypeOrVoidContext extends ParserRuleContext {
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public VOID(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.VOID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeTypeOrVoid; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeTypeOrVoid) {
			listener.enterTypeTypeOrVoid(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeTypeOrVoid) {
			listener.exitTypeTypeOrVoid(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeTypeOrVoid) {
			return visitor.visitTypeTypeOrVoid(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericMethodDeclarationContext extends ParserRuleContext {
	public typeParameters(): TypeParametersContext {
		return this.getRuleContext(0, TypeParametersContext);
	}
	public methodDeclaration(): MethodDeclarationContext {
		return this.getRuleContext(0, MethodDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_genericMethodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterGenericMethodDeclaration) {
			listener.enterGenericMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitGenericMethodDeclaration) {
			listener.exitGenericMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitGenericMethodDeclaration) {
			return visitor.visitGenericMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericConstructorDeclarationContext extends ParserRuleContext {
	public typeParameters(): TypeParametersContext {
		return this.getRuleContext(0, TypeParametersContext);
	}
	public constructorDeclaration(): ConstructorDeclarationContext {
		return this.getRuleContext(0, ConstructorDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_genericConstructorDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterGenericConstructorDeclaration) {
			listener.enterGenericConstructorDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitGenericConstructorDeclaration) {
			listener.exitGenericConstructorDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitGenericConstructorDeclaration) {
			return visitor.visitGenericConstructorDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstructorDeclarationContext extends ParserRuleContext {
	public _constructorBody!: BlockContext;
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public formalParameters(): FormalParametersContext {
		return this.getRuleContext(0, FormalParametersContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public THROWS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROWS, 0); }
	public qualifiedNameList(): QualifiedNameListContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_constructorDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterConstructorDeclaration) {
			listener.enterConstructorDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitConstructorDeclaration) {
			listener.exitConstructorDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitConstructorDeclaration) {
			return visitor.visitConstructorDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldDeclarationContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclarators(): VariableDeclaratorsContext {
		return this.getRuleContext(0, VariableDeclaratorsContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_fieldDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFieldDeclaration) {
			listener.enterFieldDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFieldDeclaration) {
			listener.exitFieldDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFieldDeclaration) {
			return visitor.visitFieldDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceBodyDeclarationContext extends ParserRuleContext {
	public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceMemberDeclarationContext);
	}
	public modifier(): ModifierContext[];
	public modifier(i: number): ModifierContext;
	public modifier(i?: number): ModifierContext | ModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModifierContext);
		} else {
			return this.getRuleContext(i, ModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceBodyDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceBodyDeclaration) {
			listener.enterInterfaceBodyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceBodyDeclaration) {
			listener.exitInterfaceBodyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceBodyDeclaration) {
			return visitor.visitInterfaceBodyDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMemberDeclarationContext extends ParserRuleContext {
	public constDeclaration(): ConstDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ConstDeclarationContext);
	}
	public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceMethodDeclarationContext);
	}
	public genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericInterfaceMethodDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceMemberDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceMemberDeclaration) {
			listener.enterInterfaceMemberDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceMemberDeclaration) {
			listener.exitInterfaceMemberDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceMemberDeclaration) {
			return visitor.visitInterfaceMemberDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstDeclarationContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public constantDeclarator(): ConstantDeclaratorContext[];
	public constantDeclarator(i: number): ConstantDeclaratorContext;
	public constantDeclarator(i?: number): ConstantDeclaratorContext | ConstantDeclaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConstantDeclaratorContext);
		} else {
			return this.getRuleContext(i, ConstantDeclaratorContext);
		}
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_constDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterConstDeclaration) {
			listener.enterConstDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitConstDeclaration) {
			listener.exitConstDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitConstDeclaration) {
			return visitor.visitConstDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantDeclaratorContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(ProcessingParser.ASSIGN, 0); }
	public variableInitializer(): VariableInitializerContext {
		return this.getRuleContext(0, VariableInitializerContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_constantDeclarator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterConstantDeclarator) {
			listener.enterConstantDeclarator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitConstantDeclarator) {
			listener.exitConstantDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitConstantDeclarator) {
			return visitor.visitConstantDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMethodDeclarationContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public formalParameters(): FormalParametersContext {
		return this.getRuleContext(0, FormalParametersContext);
	}
	public methodBody(): MethodBodyContext {
		return this.getRuleContext(0, MethodBodyContext);
	}
	public typeTypeOrVoid(): TypeTypeOrVoidContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeOrVoidContext);
	}
	public typeParameters(): TypeParametersContext | undefined {
		return this.tryGetRuleContext(0, TypeParametersContext);
	}
	public interfaceMethodModifier(): InterfaceMethodModifierContext[];
	public interfaceMethodModifier(i: number): InterfaceMethodModifierContext;
	public interfaceMethodModifier(i?: number): InterfaceMethodModifierContext | InterfaceMethodModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceMethodModifierContext);
		} else {
			return this.getRuleContext(i, InterfaceMethodModifierContext);
		}
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	public THROWS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROWS, 0); }
	public qualifiedNameList(): QualifiedNameListContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameListContext);
	}
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceMethodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceMethodDeclaration) {
			listener.enterInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceMethodDeclaration) {
			listener.exitInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceMethodDeclaration) {
			return visitor.visitInterfaceMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMethodModifierContext extends ParserRuleContext {
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public PUBLIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PUBLIC, 0); }
	public ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ABSTRACT, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DEFAULT, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public STRICTFP(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STRICTFP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceMethodModifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceMethodModifier) {
			listener.enterInterfaceMethodModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceMethodModifier) {
			listener.exitInterfaceMethodModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceMethodModifier) {
			return visitor.visitInterfaceMethodModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericInterfaceMethodDeclarationContext extends ParserRuleContext {
	public typeParameters(): TypeParametersContext {
		return this.getRuleContext(0, TypeParametersContext);
	}
	public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
		return this.getRuleContext(0, InterfaceMethodDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_genericInterfaceMethodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterGenericInterfaceMethodDeclaration) {
			listener.enterGenericInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitGenericInterfaceMethodDeclaration) {
			listener.exitGenericInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitGenericInterfaceMethodDeclaration) {
			return visitor.visitGenericInterfaceMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclaratorsContext extends ParserRuleContext {
	public variableDeclarator(): VariableDeclaratorContext[];
	public variableDeclarator(i: number): VariableDeclaratorContext;
	public variableDeclarator(i?: number): VariableDeclaratorContext | VariableDeclaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableDeclaratorContext);
		} else {
			return this.getRuleContext(i, VariableDeclaratorContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableDeclarators; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableDeclarators) {
			listener.enterVariableDeclarators(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableDeclarators) {
			listener.exitVariableDeclarators(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclarators) {
			return visitor.visitVariableDeclarators(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclaratorContext extends ParserRuleContext {
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ASSIGN, 0); }
	public variableInitializer(): VariableInitializerContext | undefined {
		return this.tryGetRuleContext(0, VariableInitializerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableDeclarator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableDeclarator) {
			listener.enterVariableDeclarator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableDeclarator) {
			listener.exitVariableDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclarator) {
			return visitor.visitVariableDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableInitializerContext extends ParserRuleContext {
	public arrayInitializer(): ArrayInitializerContext | undefined {
		return this.tryGetRuleContext(0, ArrayInitializerContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableInitializer; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableInitializer) {
			listener.enterVariableInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableInitializer) {
			listener.exitVariableInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableInitializer) {
			return visitor.visitVariableInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayInitializerContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public variableInitializer(): VariableInitializerContext[];
	public variableInitializer(i: number): VariableInitializerContext;
	public variableInitializer(i?: number): VariableInitializerContext | VariableInitializerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableInitializerContext);
		} else {
			return this.getRuleContext(i, VariableInitializerContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_arrayInitializer; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterArrayInitializer) {
			listener.enterArrayInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitArrayInitializer) {
			listener.exitArrayInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitArrayInitializer) {
			return visitor.visitArrayInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassOrInterfaceTypeContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.IDENTIFIER);
		} else {
			return this.getToken(ProcessingParser.IDENTIFIER, i);
		}
	}
	public typeArguments(): TypeArgumentsContext[];
	public typeArguments(i: number): TypeArgumentsContext;
	public typeArguments(i?: number): TypeArgumentsContext | TypeArgumentsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeArgumentsContext);
		} else {
			return this.getRuleContext(i, TypeArgumentsContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.DOT);
		} else {
			return this.getToken(ProcessingParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classOrInterfaceType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassOrInterfaceType) {
			listener.enterClassOrInterfaceType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassOrInterfaceType) {
			listener.exitClassOrInterfaceType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassOrInterfaceType) {
			return visitor.visitClassOrInterfaceType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentContext extends ParserRuleContext {
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public QUESTION(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.QUESTION, 0); }
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeArgument; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeArgument) {
			listener.enterTypeArgument(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeArgument) {
			listener.exitTypeArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeArgument) {
			return visitor.visitTypeArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameListContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext[];
	public qualifiedName(i: number): QualifiedNameContext;
	public qualifiedName(i?: number): QualifiedNameContext | QualifiedNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifiedNameContext);
		} else {
			return this.getRuleContext(i, QualifiedNameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_qualifiedNameList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterQualifiedNameList) {
			listener.enterQualifiedNameList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitQualifiedNameList) {
			listener.exitQualifiedNameList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitQualifiedNameList) {
			return visitor.visitQualifiedNameList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParametersContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_formalParameters; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFormalParameters) {
			listener.enterFormalParameters(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFormalParameters) {
			listener.exitFormalParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFormalParameters) {
			return visitor.visitFormalParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterListContext extends ParserRuleContext {
	public formalParameter(): FormalParameterContext[];
	public formalParameter(i: number): FormalParameterContext;
	public formalParameter(i?: number): FormalParameterContext | FormalParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FormalParameterContext);
		} else {
			return this.getRuleContext(i, FormalParameterContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	public lastFormalParameter(): LastFormalParameterContext | undefined {
		return this.tryGetRuleContext(0, LastFormalParameterContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_formalParameterList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFormalParameterList) {
			listener.enterFormalParameterList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFormalParameterList) {
			listener.exitFormalParameterList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFormalParameterList) {
			return visitor.visitFormalParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_formalParameter; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFormalParameter) {
			listener.enterFormalParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFormalParameter) {
			listener.exitFormalParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFormalParameter) {
			return visitor.visitFormalParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LastFormalParameterContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public ELLIPSIS(): TerminalNode { return this.getToken(ProcessingParser.ELLIPSIS, 0); }
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lastFormalParameter; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLastFormalParameter) {
			listener.enterLastFormalParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLastFormalParameter) {
			listener.exitLastFormalParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLastFormalParameter) {
			return visitor.visitLastFormalParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BaseStringLiteralContext extends ParserRuleContext {
	public STRING_LITERAL(): TerminalNode { return this.getToken(ProcessingParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_baseStringLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterBaseStringLiteral) {
			listener.enterBaseStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitBaseStringLiteral) {
			listener.exitBaseStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitBaseStringLiteral) {
			return visitor.visitBaseStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultilineStringLiteralContext extends ParserRuleContext {
	public MULTI_STRING_LIT(): TerminalNode { return this.getToken(ProcessingParser.MULTI_STRING_LIT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_multilineStringLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMultilineStringLiteral) {
			listener.enterMultilineStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMultilineStringLiteral) {
			listener.exitMultilineStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMultilineStringLiteral) {
			return visitor.visitMultilineStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringLiteralContext extends ParserRuleContext {
	public baseStringLiteral(): BaseStringLiteralContext | undefined {
		return this.tryGetRuleContext(0, BaseStringLiteralContext);
	}
	public multilineStringLiteral(): MultilineStringLiteralContext | undefined {
		return this.tryGetRuleContext(0, MultilineStringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_stringLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterStringLiteral) {
			listener.enterStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitStringLiteral) {
			listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerLiteralContext extends ParserRuleContext {
	public DECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DECIMAL_LITERAL, 0); }
	public HEX_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.HEX_LITERAL, 0); }
	public OCT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.OCT_LITERAL, 0); }
	public BINARY_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BINARY_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_integerLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterIntegerLiteral) {
			listener.enterIntegerLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitIntegerLiteral) {
			listener.exitIntegerLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitIntegerLiteral) {
			return visitor.visitIntegerLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FloatLiteralContext extends ParserRuleContext {
	public FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FLOAT_LITERAL, 0); }
	public HEX_FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.HEX_FLOAT_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_floatLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFloatLiteral) {
			listener.enterFloatLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFloatLiteral) {
			listener.exitFloatLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFloatLiteral) {
			return visitor.visitFloatLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationContext extends ParserRuleContext {
	public AT(): TerminalNode { return this.getToken(ProcessingParser.AT, 0); }
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public elementValuePairs(): ElementValuePairsContext | undefined {
		return this.tryGetRuleContext(0, ElementValuePairsContext);
	}
	public elementValue(): ElementValueContext | undefined {
		return this.tryGetRuleContext(0, ElementValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotation; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotation) {
			listener.enterAnnotation(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotation) {
			listener.exitAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotation) {
			return visitor.visitAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValuePairsContext extends ParserRuleContext {
	public elementValuePair(): ElementValuePairContext[];
	public elementValuePair(i: number): ElementValuePairContext;
	public elementValuePair(i?: number): ElementValuePairContext | ElementValuePairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElementValuePairContext);
		} else {
			return this.getRuleContext(i, ElementValuePairContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValuePairs; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValuePairs) {
			listener.enterElementValuePairs(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValuePairs) {
			listener.exitElementValuePairs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValuePairs) {
			return visitor.visitElementValuePairs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValuePairContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(ProcessingParser.ASSIGN, 0); }
	public elementValue(): ElementValueContext {
		return this.getRuleContext(0, ElementValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValuePair; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValuePair) {
			listener.enterElementValuePair(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValuePair) {
			listener.exitElementValuePair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValuePair) {
			return visitor.visitElementValuePair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValueContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public elementValueArrayInitializer(): ElementValueArrayInitializerContext | undefined {
		return this.tryGetRuleContext(0, ElementValueArrayInitializerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValue; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValue) {
			listener.enterElementValue(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValue) {
			listener.exitElementValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValue) {
			return visitor.visitElementValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValueArrayInitializerContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public elementValue(): ElementValueContext[];
	public elementValue(i: number): ElementValueContext;
	public elementValue(i?: number): ElementValueContext | ElementValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElementValueContext);
		} else {
			return this.getRuleContext(i, ElementValueContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValueArrayInitializer; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValueArrayInitializer) {
			listener.enterElementValueArrayInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValueArrayInitializer) {
			listener.exitElementValueArrayInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValueArrayInitializer) {
			return visitor.visitElementValueArrayInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeDeclarationContext extends ParserRuleContext {
	public AT(): TerminalNode { return this.getToken(ProcessingParser.AT, 0); }
	public INTERFACE(): TerminalNode { return this.getToken(ProcessingParser.INTERFACE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public annotationTypeBody(): AnnotationTypeBodyContext {
		return this.getRuleContext(0, AnnotationTypeBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeDeclaration) {
			listener.enterAnnotationTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeDeclaration) {
			listener.exitAnnotationTypeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeDeclaration) {
			return visitor.visitAnnotationTypeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeBodyContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public annotationTypeElementDeclaration(): AnnotationTypeElementDeclarationContext[];
	public annotationTypeElementDeclaration(i: number): AnnotationTypeElementDeclarationContext;
	public annotationTypeElementDeclaration(i?: number): AnnotationTypeElementDeclarationContext | AnnotationTypeElementDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationTypeElementDeclarationContext);
		} else {
			return this.getRuleContext(i, AnnotationTypeElementDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeBody) {
			listener.enterAnnotationTypeBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeBody) {
			listener.exitAnnotationTypeBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeBody) {
			return visitor.visitAnnotationTypeBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeElementDeclarationContext extends ParserRuleContext {
	public annotationTypeElementRest(): AnnotationTypeElementRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeElementRestContext);
	}
	public modifier(): ModifierContext[];
	public modifier(i: number): ModifierContext;
	public modifier(i?: number): ModifierContext | ModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModifierContext);
		} else {
			return this.getRuleContext(i, ModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeElementDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeElementDeclaration) {
			listener.enterAnnotationTypeElementDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeElementDeclaration) {
			listener.exitAnnotationTypeElementDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeElementDeclaration) {
			return visitor.visitAnnotationTypeElementDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeElementRestContext extends ParserRuleContext {
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationMethodOrConstantRestContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeElementRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeElementRest) {
			listener.enterAnnotationTypeElementRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeElementRest) {
			listener.exitAnnotationTypeElementRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeElementRest) {
			return visitor.visitAnnotationTypeElementRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationMethodOrConstantRestContext extends ParserRuleContext {
	public annotationMethodRest(): AnnotationMethodRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationMethodRestContext);
	}
	public annotationConstantRest(): AnnotationConstantRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationConstantRestContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationMethodOrConstantRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationMethodOrConstantRest) {
			listener.enterAnnotationMethodOrConstantRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationMethodOrConstantRest) {
			listener.exitAnnotationMethodOrConstantRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationMethodOrConstantRest) {
			return visitor.visitAnnotationMethodOrConstantRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationMethodRestContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public defaultValue(): DefaultValueContext | undefined {
		return this.tryGetRuleContext(0, DefaultValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationMethodRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationMethodRest) {
			listener.enterAnnotationMethodRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationMethodRest) {
			listener.exitAnnotationMethodRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationMethodRest) {
			return visitor.visitAnnotationMethodRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationConstantRestContext extends ParserRuleContext {
	public variableDeclarators(): VariableDeclaratorsContext {
		return this.getRuleContext(0, VariableDeclaratorsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationConstantRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationConstantRest) {
			listener.enterAnnotationConstantRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationConstantRest) {
			listener.exitAnnotationConstantRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationConstantRest) {
			return visitor.visitAnnotationConstantRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefaultValueContext extends ParserRuleContext {
	public DEFAULT(): TerminalNode { return this.getToken(ProcessingParser.DEFAULT, 0); }
	public elementValue(): ElementValueContext {
		return this.getRuleContext(0, ElementValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_defaultValue; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterDefaultValue) {
			listener.enterDefaultValue(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitDefaultValue) {
			listener.exitDefaultValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitDefaultValue) {
			return visitor.visitDefaultValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_block; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockStatementContext extends ParserRuleContext {
	public localVariableDeclaration(): LocalVariableDeclarationContext | undefined {
		return this.tryGetRuleContext(0, LocalVariableDeclarationContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public statement(): StatementContext | undefined {
		return this.tryGetRuleContext(0, StatementContext);
	}
	public localTypeDeclaration(): LocalTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, LocalTypeDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_blockStatement; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterBlockStatement) {
			listener.enterBlockStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitBlockStatement) {
			listener.exitBlockStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitBlockStatement) {
			return visitor.visitBlockStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalVariableDeclarationContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclarators(): VariableDeclaratorsContext {
		return this.getRuleContext(0, VariableDeclaratorsContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_localVariableDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLocalVariableDeclaration) {
			listener.enterLocalVariableDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLocalVariableDeclaration) {
			listener.exitLocalVariableDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLocalVariableDeclaration) {
			return visitor.visitLocalVariableDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalTypeDeclarationContext extends ParserRuleContext {
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext[];
	public classOrInterfaceModifier(i: number): ClassOrInterfaceModifierContext;
	public classOrInterfaceModifier(i?: number): ClassOrInterfaceModifierContext | ClassOrInterfaceModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassOrInterfaceModifierContext);
		} else {
			return this.getRuleContext(i, ClassOrInterfaceModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_localTypeDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLocalTypeDeclaration) {
			listener.enterLocalTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLocalTypeDeclaration) {
			listener.exitLocalTypeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLocalTypeDeclaration) {
			return visitor.visitLocalTypeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public _blockLabel!: BlockContext;
	public _statementExpression!: ExpressionContext;
	public _identifierLabel!: Token;
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public ASSERT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ASSERT, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLON, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IF, 0); }
	public parExpression(): ParExpressionContext | undefined {
		return this.tryGetRuleContext(0, ParExpressionContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ELSE, 0); }
	public forLoop(): ForLoopContext | undefined {
		return this.tryGetRuleContext(0, ForLoopContext);
	}
	public WHILE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.WHILE, 0); }
	public DO(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DO, 0); }
	public TRY(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.TRY, 0); }
	public finallyBlock(): FinallyBlockContext | undefined {
		return this.tryGetRuleContext(0, FinallyBlockContext);
	}
	public catchClause(): CatchClauseContext[];
	public catchClause(i: number): CatchClauseContext;
	public catchClause(i?: number): CatchClauseContext | CatchClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CatchClauseContext);
		} else {
			return this.getRuleContext(i, CatchClauseContext);
		}
	}
	public resourceSpecification(): ResourceSpecificationContext | undefined {
		return this.tryGetRuleContext(0, ResourceSpecificationContext);
	}
	public SWITCH(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SWITCH, 0); }
	public LBRACE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RBRACE, 0); }
	public switchBlockStatementGroup(): SwitchBlockStatementGroupContext[];
	public switchBlockStatementGroup(i: number): SwitchBlockStatementGroupContext;
	public switchBlockStatementGroup(i?: number): SwitchBlockStatementGroupContext | SwitchBlockStatementGroupContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchBlockStatementGroupContext);
		} else {
			return this.getRuleContext(i, SwitchBlockStatementGroupContext);
		}
	}
	public switchLabel(): SwitchLabelContext[];
	public switchLabel(i: number): SwitchLabelContext;
	public switchLabel(i?: number): SwitchLabelContext | SwitchLabelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchLabelContext);
		} else {
			return this.getRuleContext(i, SwitchLabelContext);
		}
	}
	public SYNCHRONIZED(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SYNCHRONIZED, 0); }
	public RETURN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RETURN, 0); }
	public THROW(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROW, 0); }
	public BREAK(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BREAK, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public CONTINUE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CONTINUE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_statement; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CatchClauseContext extends ParserRuleContext {
	public CATCH(): TerminalNode { return this.getToken(ProcessingParser.CATCH, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public catchType(): CatchTypeContext {
		return this.getRuleContext(0, CatchTypeContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_catchClause; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCatchClause) {
			listener.enterCatchClause(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCatchClause) {
			listener.exitCatchClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCatchClause) {
			return visitor.visitCatchClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CatchTypeContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext[];
	public qualifiedName(i: number): QualifiedNameContext;
	public qualifiedName(i?: number): QualifiedNameContext | QualifiedNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifiedNameContext);
		} else {
			return this.getRuleContext(i, QualifiedNameContext);
		}
	}
	public BITOR(): TerminalNode[];
	public BITOR(i: number): TerminalNode;
	public BITOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.BITOR);
		} else {
			return this.getToken(ProcessingParser.BITOR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_catchType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCatchType) {
			listener.enterCatchType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCatchType) {
			listener.exitCatchType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCatchType) {
			return visitor.visitCatchType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FinallyBlockContext extends ParserRuleContext {
	public FINALLY(): TerminalNode { return this.getToken(ProcessingParser.FINALLY, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_finallyBlock; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFinallyBlock) {
			listener.enterFinallyBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFinallyBlock) {
			listener.exitFinallyBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFinallyBlock) {
			return visitor.visitFinallyBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceSpecificationContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public resources(): ResourcesContext {
		return this.getRuleContext(0, ResourcesContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_resourceSpecification; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterResourceSpecification) {
			listener.enterResourceSpecification(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitResourceSpecification) {
			listener.exitResourceSpecification(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitResourceSpecification) {
			return visitor.visitResourceSpecification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourcesContext extends ParserRuleContext {
	public resource(): ResourceContext[];
	public resource(i: number): ResourceContext;
	public resource(i?: number): ResourceContext | ResourceContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ResourceContext);
		} else {
			return this.getRuleContext(i, ResourceContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.SEMI);
		} else {
			return this.getToken(ProcessingParser.SEMI, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_resources; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterResources) {
			listener.enterResources(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitResources) {
			listener.exitResources(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitResources) {
			return visitor.visitResources(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceContext extends ParserRuleContext {
	public classOrInterfaceType(): ClassOrInterfaceTypeContext {
		return this.getRuleContext(0, ClassOrInterfaceTypeContext);
	}
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(ProcessingParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_resource; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterResource) {
			listener.enterResource(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitResource) {
			listener.exitResource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitResource) {
			return visitor.visitResource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchBlockStatementGroupContext extends ParserRuleContext {
	public switchLabel(): SwitchLabelContext[];
	public switchLabel(i: number): SwitchLabelContext;
	public switchLabel(i?: number): SwitchLabelContext | SwitchLabelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchLabelContext);
		} else {
			return this.getRuleContext(i, SwitchLabelContext);
		}
	}
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_switchBlockStatementGroup; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterSwitchBlockStatementGroup) {
			listener.enterSwitchBlockStatementGroup(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitSwitchBlockStatementGroup) {
			listener.exitSwitchBlockStatementGroup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitSwitchBlockStatementGroup) {
			return visitor.visitSwitchBlockStatementGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchLabelContext extends ParserRuleContext {
	public _constantExpression!: ExpressionContext;
	public _enumConstantName!: Token;
	public CASE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CASE, 0); }
	public COLON(): TerminalNode { return this.getToken(ProcessingParser.COLON, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DEFAULT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_switchLabel; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterSwitchLabel) {
			listener.enterSwitchLabel(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitSwitchLabel) {
			listener.exitSwitchLabel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitSwitchLabel) {
			return visitor.visitSwitchLabel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForLoopContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(ProcessingParser.FOR, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public forControl(): ForControlContext {
		return this.getRuleContext(0, ForControlContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_forLoop; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterForLoop) {
			listener.enterForLoop(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitForLoop) {
			listener.exitForLoop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitForLoop) {
			return visitor.visitForLoop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForControlContext extends ParserRuleContext {
	public _forUpdate!: ExpressionListContext;
	public enhancedForControl(): EnhancedForControlContext | undefined {
		return this.tryGetRuleContext(0, EnhancedForControlContext);
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.SEMI);
		} else {
			return this.getToken(ProcessingParser.SEMI, i);
		}
	}
	public forInit(): ForInitContext | undefined {
		return this.tryGetRuleContext(0, ForInitContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_forControl; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterForControl) {
			listener.enterForControl(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitForControl) {
			listener.exitForControl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitForControl) {
			return visitor.visitForControl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInitContext extends ParserRuleContext {
	public localVariableDeclaration(): LocalVariableDeclarationContext | undefined {
		return this.tryGetRuleContext(0, LocalVariableDeclarationContext);
	}
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_forInit; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterForInit) {
			listener.enterForInit(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitForInit) {
			listener.exitForInit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitForInit) {
			return visitor.visitForInit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnhancedForControlContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public COLON(): TerminalNode { return this.getToken(ProcessingParser.COLON, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enhancedForControl; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnhancedForControl) {
			listener.enterEnhancedForControl(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnhancedForControl) {
			listener.exitEnhancedForControl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnhancedForControl) {
			return visitor.visitEnhancedForControl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParExpressionContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_parExpression; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterParExpression) {
			listener.enterParExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitParExpression) {
			listener.exitParExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitParExpression) {
			return visitor.visitParExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_expressionList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExpressionList) {
			listener.enterExpressionList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExpressionList) {
			listener.exitExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public _prefix!: Token;
	public _bop!: Token;
	public _postfix!: Token;
	public primary(): PrimaryContext | undefined {
		return this.tryGetRuleContext(0, PrimaryContext);
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public methodCall(): MethodCallContext | undefined {
		return this.tryGetRuleContext(0, MethodCallContext);
	}
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THIS, 0); }
	public NEW(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NEW, 0); }
	public innerCreator(): InnerCreatorContext | undefined {
		return this.tryGetRuleContext(0, InnerCreatorContext);
	}
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	public superSuffix(): SuperSuffixContext | undefined {
		return this.tryGetRuleContext(0, SuperSuffixContext);
	}
	public explicitGenericInvocation(): ExplicitGenericInvocationContext | undefined {
		return this.tryGetRuleContext(0, ExplicitGenericInvocationContext);
	}
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public LBRACK(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LBRACK, 0); }
	public RBRACK(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RBRACK, 0); }
	public creator(): CreatorContext | undefined {
		return this.tryGetRuleContext(0, CreatorContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public INC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INC, 0); }
	public DEC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DEC, 0); }
	public ADD(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ADD, 0); }
	public SUB(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUB, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.TILDE, 0); }
	public BANG(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BANG, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MOD, 0); }
	public LT(): TerminalNode[];
	public LT(i: number): TerminalNode;
	public LT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LT);
		} else {
			return this.getToken(ProcessingParser.LT, i);
		}
	}
	public GT(): TerminalNode[];
	public GT(i: number): TerminalNode;
	public GT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.GT);
		} else {
			return this.getToken(ProcessingParser.GT, i);
		}
	}
	public LE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LE, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.GE, 0); }
	public INSTANCEOF(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INSTANCEOF, 0); }
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EQUAL, 0); }
	public NOTEQUAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NOTEQUAL, 0); }
	public BITAND(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BITAND, 0); }
	public CARET(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CARET, 0); }
	public BITOR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BITOR, 0); }
	public AND(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.OR, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLON, 0); }
	public QUESTION(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.QUESTION, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ASSIGN, 0); }
	public ADD_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ADD_ASSIGN, 0); }
	public SUB_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUB_ASSIGN, 0); }
	public MUL_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MUL_ASSIGN, 0); }
	public DIV_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DIV_ASSIGN, 0); }
	public AND_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.AND_ASSIGN, 0); }
	public OR_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.OR_ASSIGN, 0); }
	public XOR_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.XOR_ASSIGN, 0); }
	public RSHIFT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RSHIFT_ASSIGN, 0); }
	public URSHIFT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.URSHIFT_ASSIGN, 0); }
	public LSHIFT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LSHIFT_ASSIGN, 0); }
	public MOD_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MOD_ASSIGN, 0); }
	public lambdaExpression(): LambdaExpressionContext | undefined {
		return this.tryGetRuleContext(0, LambdaExpressionContext);
	}
	public COLONCOLON(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLONCOLON, 0); }
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	public classType(): ClassTypeContext | undefined {
		return this.tryGetRuleContext(0, ClassTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_expression; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaExpressionContext extends ParserRuleContext {
	public lambdaParameters(): LambdaParametersContext {
		return this.getRuleContext(0, LambdaParametersContext);
	}
	public ARROW(): TerminalNode { return this.getToken(ProcessingParser.ARROW, 0); }
	public lambdaBody(): LambdaBodyContext {
		return this.getRuleContext(0, LambdaBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lambdaExpression; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLambdaExpression) {
			listener.enterLambdaExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLambdaExpression) {
			listener.exitLambdaExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLambdaExpression) {
			return visitor.visitLambdaExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaParametersContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.IDENTIFIER);
		} else {
			return this.getToken(ProcessingParser.IDENTIFIER, i);
		}
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lambdaParameters; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLambdaParameters) {
			listener.enterLambdaParameters(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLambdaParameters) {
			listener.exitLambdaParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLambdaParameters) {
			return visitor.visitLambdaParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaBodyContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lambdaBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLambdaBody) {
			listener.enterLambdaBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLambdaBody) {
			listener.exitLambdaBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLambdaBody) {
			return visitor.visitLambdaBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THIS, 0); }
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public typeTypeOrVoid(): TypeTypeOrVoidContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeOrVoidContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CLASS, 0); }
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext | undefined {
		return this.tryGetRuleContext(0, ExplicitGenericInvocationSuffixContext);
	}
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_primary; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterPrimary) {
			listener.enterPrimary(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitPrimary) {
			listener.exitPrimary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitPrimary) {
			return visitor.visitPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassTypeContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public classOrInterfaceType(): ClassOrInterfaceTypeContext | undefined {
		return this.tryGetRuleContext(0, ClassOrInterfaceTypeContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassType) {
			listener.enterClassType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassType) {
			listener.exitClassType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassType) {
			return visitor.visitClassType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreatorContext extends ParserRuleContext {
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public createdName(): CreatedNameContext {
		return this.getRuleContext(0, CreatedNameContext);
	}
	public classCreatorRest(): ClassCreatorRestContext | undefined {
		return this.tryGetRuleContext(0, ClassCreatorRestContext);
	}
	public arrayCreatorRest(): ArrayCreatorRestContext | undefined {
		return this.tryGetRuleContext(0, ArrayCreatorRestContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_creator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCreator) {
			listener.enterCreator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCreator) {
			listener.exitCreator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCreator) {
			return visitor.visitCreator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreatedNameContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.IDENTIFIER);
		} else {
			return this.getToken(ProcessingParser.IDENTIFIER, i);
		}
	}
	public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext[];
	public typeArgumentsOrDiamond(i: number): TypeArgumentsOrDiamondContext;
	public typeArgumentsOrDiamond(i?: number): TypeArgumentsOrDiamondContext | TypeArgumentsOrDiamondContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeArgumentsOrDiamondContext);
		} else {
			return this.getRuleContext(i, TypeArgumentsOrDiamondContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.DOT);
		} else {
			return this.getToken(ProcessingParser.DOT, i);
		}
	}
	public primitiveType(): PrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, PrimitiveTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_createdName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCreatedName) {
			listener.enterCreatedName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCreatedName) {
			listener.exitCreatedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCreatedName) {
			return visitor.visitCreatedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerCreatorContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public classCreatorRest(): ClassCreatorRestContext {
		return this.getRuleContext(0, ClassCreatorRestContext);
	}
	public nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsOrDiamondContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_innerCreator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInnerCreator) {
			listener.enterInnerCreator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInnerCreator) {
			listener.exitInnerCreator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInnerCreator) {
			return visitor.visitInnerCreator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayCreatorRestContext extends ParserRuleContext {
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	public arrayInitializer(): ArrayInitializerContext | undefined {
		return this.tryGetRuleContext(0, ArrayInitializerContext);
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_arrayCreatorRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterArrayCreatorRest) {
			listener.enterArrayCreatorRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitArrayCreatorRest) {
			listener.exitArrayCreatorRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitArrayCreatorRest) {
			return visitor.visitArrayCreatorRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassCreatorRestContext extends ParserRuleContext {
	public arguments(): ArgumentsContext {
		return this.getRuleContext(0, ArgumentsContext);
	}
	public classBody(): ClassBodyContext | undefined {
		return this.tryGetRuleContext(0, ClassBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classCreatorRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassCreatorRest) {
			listener.enterClassCreatorRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassCreatorRest) {
			listener.exitClassCreatorRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassCreatorRest) {
			return visitor.visitClassCreatorRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplicitGenericInvocationContext extends ParserRuleContext {
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
		return this.getRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
		return this.getRuleContext(0, ExplicitGenericInvocationSuffixContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_explicitGenericInvocation; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExplicitGenericInvocation) {
			listener.enterExplicitGenericInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExplicitGenericInvocation) {
			listener.exitExplicitGenericInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExplicitGenericInvocation) {
			return visitor.visitExplicitGenericInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentsOrDiamondContext extends ParserRuleContext {
	public LT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.GT, 0); }
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeArgumentsOrDiamond; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeArgumentsOrDiamond) {
			listener.enterTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeArgumentsOrDiamond) {
			listener.exitTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeArgumentsOrDiamond) {
			return visitor.visitTypeArgumentsOrDiamond(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonWildcardTypeArgumentsOrDiamondContext extends ParserRuleContext {
	public LT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.GT, 0); }
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_nonWildcardTypeArgumentsOrDiamond; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterNonWildcardTypeArgumentsOrDiamond) {
			listener.enterNonWildcardTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitNonWildcardTypeArgumentsOrDiamond) {
			listener.exitNonWildcardTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitNonWildcardTypeArgumentsOrDiamond) {
			return visitor.visitNonWildcardTypeArgumentsOrDiamond(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonWildcardTypeArgumentsContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(ProcessingParser.LT, 0); }
	public typeList(): TypeListContext {
		return this.getRuleContext(0, TypeListContext);
	}
	public GT(): TerminalNode { return this.getToken(ProcessingParser.GT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_nonWildcardTypeArguments; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterNonWildcardTypeArguments) {
			listener.enterNonWildcardTypeArguments(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitNonWildcardTypeArguments) {
			listener.exitNonWildcardTypeArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitNonWildcardTypeArguments) {
			return visitor.visitNonWildcardTypeArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeListContext extends ParserRuleContext {
	public typeType(): TypeTypeContext[];
	public typeType(i: number): TypeTypeContext;
	public typeType(i?: number): TypeTypeContext | TypeTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeTypeContext);
		} else {
			return this.getRuleContext(i, TypeTypeContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeList) {
			listener.enterTypeList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeList) {
			listener.exitTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeTypeContext extends ParserRuleContext {
	public classOrInterfaceType(): ClassOrInterfaceTypeContext | undefined {
		return this.tryGetRuleContext(0, ClassOrInterfaceTypeContext);
	}
	public primitiveType(): PrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, PrimitiveTypeContext);
	}
	public VAR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.VAR, 0); }
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeType) {
			listener.enterTypeType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeType) {
			listener.exitTypeType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeType) {
			return visitor.visitTypeType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentsContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(ProcessingParser.LT, 0); }
	public typeArgument(): TypeArgumentContext[];
	public typeArgument(i: number): TypeArgumentContext;
	public typeArgument(i?: number): TypeArgumentContext | TypeArgumentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeArgumentContext);
		} else {
			return this.getRuleContext(i, TypeArgumentContext);
		}
	}
	public GT(): TerminalNode { return this.getToken(ProcessingParser.GT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeArguments; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeArguments) {
			listener.enterTypeArguments(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeArguments) {
			listener.exitTypeArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeArguments) {
			return visitor.visitTypeArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SuperSuffixContext extends ParserRuleContext {
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_superSuffix; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterSuperSuffix) {
			listener.enterSuperSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitSuperSuffix) {
			listener.exitSuperSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitSuperSuffix) {
			return visitor.visitSuperSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplicitGenericInvocationSuffixContext extends ParserRuleContext {
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	public superSuffix(): SuperSuffixContext | undefined {
		return this.tryGetRuleContext(0, SuperSuffixContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_explicitGenericInvocationSuffix; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExplicitGenericInvocationSuffix) {
			listener.enterExplicitGenericInvocationSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExplicitGenericInvocationSuffix) {
			listener.exitExplicitGenericInvocationSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExplicitGenericInvocationSuffix) {
			return visitor.visitExplicitGenericInvocationSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_arguments; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterArguments) {
			listener.enterArguments(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitArguments) {
			listener.exitArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JavaProcessingSketchContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public packageDeclaration(): PackageDeclarationContext | undefined {
		return this.tryGetRuleContext(0, PackageDeclarationContext);
	}
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext[];
	public typeDeclaration(i: number): TypeDeclarationContext;
	public typeDeclaration(i?: number): TypeDeclarationContext | TypeDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDeclarationContext);
		} else {
			return this.getRuleContext(i, TypeDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_javaProcessingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterJavaProcessingSketch) {
			listener.enterJavaProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitJavaProcessingSketch) {
			listener.exitJavaProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitJavaProcessingSketch) {
			return visitor.visitJavaProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StaticProcessingSketchContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext[];
	public typeDeclaration(i: number): TypeDeclarationContext;
	public typeDeclaration(i?: number): TypeDeclarationContext | TypeDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDeclarationContext);
		} else {
			return this.getRuleContext(i, TypeDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_staticProcessingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterStaticProcessingSketch) {
			listener.enterStaticProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitStaticProcessingSketch) {
			listener.exitStaticProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitStaticProcessingSketch) {
			return visitor.visitStaticProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActiveProcessingSketchContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_activeProcessingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterActiveProcessingSketch) {
			listener.enterActiveProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitActiveProcessingSketch) {
			listener.exitActiveProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitActiveProcessingSketch) {
			return visitor.visitActiveProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WarnMixedModesContext extends ParserRuleContext {
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_warnMixedModes; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterWarnMixedModes) {
			listener.enterWarnMixedModes(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitWarnMixedModes) {
			listener.exitWarnMixedModes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitWarnMixedModes) {
			return visitor.visitWarnMixedModes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclaratorIdContext extends ParserRuleContext {
	public warnTypeAsVariableName(): WarnTypeAsVariableNameContext | undefined {
		return this.tryGetRuleContext(0, WarnTypeAsVariableNameContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableDeclaratorId; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableDeclaratorId) {
			listener.enterVariableDeclaratorId(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableDeclaratorId) {
			listener.exitVariableDeclaratorId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclaratorId) {
			return visitor.visitVariableDeclaratorId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WarnTypeAsVariableNameContext extends ParserRuleContext {
	public _primitiveType!: PrimitiveTypeContext;
	public primitiveType(): PrimitiveTypeContext {
		return this.getRuleContext(0, PrimitiveTypeContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_warnTypeAsVariableName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterWarnTypeAsVariableName) {
			listener.enterWarnTypeAsVariableName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitWarnTypeAsVariableName) {
			listener.exitWarnTypeAsVariableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitWarnTypeAsVariableName) {
			return visitor.visitWarnTypeAsVariableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodCallContext extends ParserRuleContext {
	public functionWithPrimitiveTypeName(): FunctionWithPrimitiveTypeNameContext | undefined {
		return this.tryGetRuleContext(0, FunctionWithPrimitiveTypeNameContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THIS, 0); }
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_methodCall; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMethodCall) {
			listener.enterMethodCall(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMethodCall) {
			listener.exitMethodCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMethodCall) {
			return visitor.visitMethodCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionWithPrimitiveTypeNameContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BOOLEAN, 0); }
	public BYTE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BYTE, 0); }
	public CHAR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CHAR, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FLOAT, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INT, 0); }
	public COLOR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLOR, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_functionWithPrimitiveTypeName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFunctionWithPrimitiveTypeName) {
			listener.enterFunctionWithPrimitiveTypeName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFunctionWithPrimitiveTypeName) {
			listener.exitFunctionWithPrimitiveTypeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFunctionWithPrimitiveTypeName) {
			return visitor.visitFunctionWithPrimitiveTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimitiveTypeContext extends ParserRuleContext {
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BOOLEAN, 0); }
	public CHAR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CHAR, 0); }
	public BYTE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BYTE, 0); }
	public SHORT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SHORT, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INT, 0); }
	public LONG(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LONG, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FLOAT, 0); }
	public DOUBLE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOUBLE, 0); }
	public colorPrimitiveType(): ColorPrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, ColorPrimitiveTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_primitiveType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterPrimitiveType) {
			listener.enterPrimitiveType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitPrimitiveType) {
			listener.exitPrimitiveType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitPrimitiveType) {
			return visitor.visitPrimitiveType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColorPrimitiveTypeContext extends ParserRuleContext {
	public COLOR(): TerminalNode { return this.getToken(ProcessingParser.COLOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_colorPrimitiveType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterColorPrimitiveType) {
			listener.enterColorPrimitiveType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitColorPrimitiveType) {
			listener.exitColorPrimitiveType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitColorPrimitiveType) {
			return visitor.visitColorPrimitiveType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.IDENTIFIER);
		} else {
			return this.getToken(ProcessingParser.IDENTIFIER, i);
		}
	}
	public colorPrimitiveType(): ColorPrimitiveTypeContext[];
	public colorPrimitiveType(i: number): ColorPrimitiveTypeContext;
	public colorPrimitiveType(i?: number): ColorPrimitiveTypeContext | ColorPrimitiveTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColorPrimitiveTypeContext);
		} else {
			return this.getRuleContext(i, ColorPrimitiveTypeContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.DOT);
		} else {
			return this.getToken(ProcessingParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_qualifiedName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterQualifiedName) {
			listener.enterQualifiedName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitQualifiedName) {
			listener.exitQualifiedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitQualifiedName) {
			return visitor.visitQualifiedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public floatLiteral(): FloatLiteralContext | undefined {
		return this.tryGetRuleContext(0, FloatLiteralContext);
	}
	public CHAR_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CHAR_LITERAL, 0); }
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public BOOL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BOOL_LITERAL, 0); }
	public NULL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NULL_LITERAL, 0); }
	public hexColorLiteral(): HexColorLiteralContext | undefined {
		return this.tryGetRuleContext(0, HexColorLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_literal; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HexColorLiteralContext extends ParserRuleContext {
	public HexColorLiteral(): TerminalNode { return this.getToken(ProcessingParser.HexColorLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_hexColorLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterHexColorLiteral) {
			listener.enterHexColorLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitHexColorLiteral) {
			listener.exitHexColorLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitHexColorLiteral) {
			return visitor.visitHexColorLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


