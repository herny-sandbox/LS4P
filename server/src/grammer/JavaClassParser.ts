// Generated from c:\Users\User\Documents\LS4Pv3\server\grammar\JavaClassParser.g4 by ANTLR 4.9.0-SNAPSHOT


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

import { JavaClassParserListener } from "./JavaClassParserListener";
import { JavaClassParserVisitor } from "./JavaClassParserVisitor";


export class JavaClassParser extends Parser {
	public static readonly BYTE = 1;
	public static readonly CHAR = 2;
	public static readonly DOUBLE = 3;
	public static readonly FLOAT = 4;
	public static readonly INT = 5;
	public static readonly LONG = 6;
	public static readonly SHORT = 7;
	public static readonly BOOLEAN = 8;
	public static readonly VOID = 9;
	public static readonly ARRAY_PREFIX = 10;
	public static readonly LPAREN = 11;
	public static readonly RPAREN = 12;
	public static readonly LT = 13;
	public static readonly GT = 14;
	public static readonly DOT = 15;
	public static readonly ASTERIX = 16;
	public static readonly ADD = 17;
	public static readonly SUB = 18;
	public static readonly CARET = 19;
	public static readonly COLON = 20;
	public static readonly WS = 21;
	public static readonly IDENTIFIER = 22;
	public static readonly CLASS_PREFIX = 23;
	public static readonly GEN_PREFIX = 24;
	public static readonly GEN_ID = 25;
	public static readonly GEN_SEMI = 26;
	public static readonly CLASSID = 27;
	public static readonly CLASSDIV = 28;
	public static readonly CLASSSEMI = 29;
	public static readonly RULE_mainMethodDescriptor = 0;
	public static readonly RULE_methodTypeSignature = 1;
	public static readonly RULE_formalTypeParameters = 2;
	public static readonly RULE_formalTypeParameter = 3;
	public static readonly RULE_classBound = 4;
	public static readonly RULE_interfaceBound = 5;
	public static readonly RULE_fieldTypeSignature = 6;
	public static readonly RULE_classTypeSignature = 7;
	public static readonly RULE_simpleClassTypeSignature = 8;
	public static readonly RULE_classTypeSignatureSuffix = 9;
	public static readonly RULE_typeVariableSignature = 10;
	public static readonly RULE_typeArguments = 11;
	public static readonly RULE_typeArgument = 12;
	public static readonly RULE_wildcardIndicator = 13;
	public static readonly RULE_methodDescriptor = 14;
	public static readonly RULE_fieldDescriptor = 15;
	public static readonly RULE_fieldType = 16;
	public static readonly RULE_baseType = 17;
	public static readonly RULE_objectType = 18;
	public static readonly RULE_className = 19;
	public static readonly RULE_arrayType = 20;
	public static readonly RULE_parameterDescriptor = 21;
	public static readonly RULE_returnDescriptor = 22;
	public static readonly RULE_voidDescriptor = 23;
	public static readonly RULE_classSignature = 24;
	public static readonly RULE_superclassSignature = 25;
	public static readonly RULE_superinterfaceSignature = 26;
	public static readonly RULE_arrayTypeSignature = 27;
	public static readonly RULE_typeSignature = 28;
	public static readonly RULE_returnType = 29;
	public static readonly RULE_throwsSignature = 30;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"mainMethodDescriptor", "methodTypeSignature", "formalTypeParameters", 
		"formalTypeParameter", "classBound", "interfaceBound", "fieldTypeSignature", 
		"classTypeSignature", "simpleClassTypeSignature", "classTypeSignatureSuffix", 
		"typeVariableSignature", "typeArguments", "typeArgument", "wildcardIndicator", 
		"methodDescriptor", "fieldDescriptor", "fieldType", "baseType", "objectType", 
		"className", "arrayType", "parameterDescriptor", "returnDescriptor", "voidDescriptor", 
		"classSignature", "superclassSignature", "superinterfaceSignature", "arrayTypeSignature", 
		"typeSignature", "returnType", "throwsSignature",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'B'", "'C'", "'D'", "'F'", "'I'", "'J'", "'S'", "'Z'", "'V'", 
		"'['", "'('", "')'", "'<'", "'>'", "'.'", "'*'", "'+'", "'-'", "'^'", 
		"':'", undefined, undefined, "'L'", "'T'", undefined, undefined, undefined, 
		"'/'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "BYTE", "CHAR", "DOUBLE", "FLOAT", "INT", "LONG", "SHORT", 
		"BOOLEAN", "VOID", "ARRAY_PREFIX", "LPAREN", "RPAREN", "LT", "GT", "DOT", 
		"ASTERIX", "ADD", "SUB", "CARET", "COLON", "WS", "IDENTIFIER", "CLASS_PREFIX", 
		"GEN_PREFIX", "GEN_ID", "GEN_SEMI", "CLASSID", "CLASSDIV", "CLASSSEMI",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(JavaClassParser._LITERAL_NAMES, JavaClassParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return JavaClassParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "JavaClassParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return JavaClassParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return JavaClassParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(JavaClassParser._ATN, this);
	}
	// @RuleVersion(0)
	public mainMethodDescriptor(): MainMethodDescriptorContext {
		let _localctx: MainMethodDescriptorContext = new MainMethodDescriptorContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, JavaClassParser.RULE_mainMethodDescriptor);
		try {
			this.state = 64;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 62;
				this.methodTypeSignature();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 63;
				this.methodDescriptor();
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
	public methodTypeSignature(): MethodTypeSignatureContext {
		let _localctx: MethodTypeSignatureContext = new MethodTypeSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, JavaClassParser.RULE_methodTypeSignature);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 67;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JavaClassParser.LT) {
				{
				this.state = 66;
				this.formalTypeParameters();
				}
			}

			this.state = 69;
			this.match(JavaClassParser.LPAREN);
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JavaClassParser.BYTE) | (1 << JavaClassParser.CHAR) | (1 << JavaClassParser.DOUBLE) | (1 << JavaClassParser.FLOAT) | (1 << JavaClassParser.INT) | (1 << JavaClassParser.LONG) | (1 << JavaClassParser.SHORT) | (1 << JavaClassParser.BOOLEAN) | (1 << JavaClassParser.ARRAY_PREFIX) | (1 << JavaClassParser.CLASS_PREFIX) | (1 << JavaClassParser.GEN_PREFIX))) !== 0)) {
				{
				{
				this.state = 70;
				this.typeSignature();
				}
				}
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 76;
			this.match(JavaClassParser.RPAREN);
			this.state = 77;
			this.returnType();
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JavaClassParser.CARET) {
				{
				{
				this.state = 78;
				this.throwsSignature();
				}
				}
				this.state = 83;
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
	public formalTypeParameters(): FormalTypeParametersContext {
		let _localctx: FormalTypeParametersContext = new FormalTypeParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, JavaClassParser.RULE_formalTypeParameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 84;
			this.match(JavaClassParser.LT);
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 85;
				this.formalTypeParameter();
				}
				}
				this.state = 88;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === JavaClassParser.IDENTIFIER);
			this.state = 90;
			this.match(JavaClassParser.GT);
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
	public formalTypeParameter(): FormalTypeParameterContext {
		let _localctx: FormalTypeParameterContext = new FormalTypeParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, JavaClassParser.RULE_formalTypeParameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 92;
			this.match(JavaClassParser.IDENTIFIER);
			this.state = 93;
			this.classBound();
			this.state = 97;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JavaClassParser.COLON) {
				{
				{
				this.state = 94;
				this.interfaceBound();
				}
				}
				this.state = 99;
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
	public classBound(): ClassBoundContext {
		let _localctx: ClassBoundContext = new ClassBoundContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, JavaClassParser.RULE_classBound);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			this.match(JavaClassParser.COLON);
			this.state = 102;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JavaClassParser.ARRAY_PREFIX) | (1 << JavaClassParser.CLASS_PREFIX) | (1 << JavaClassParser.GEN_PREFIX))) !== 0)) {
				{
				this.state = 101;
				this.fieldTypeSignature();
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
	public interfaceBound(): InterfaceBoundContext {
		let _localctx: InterfaceBoundContext = new InterfaceBoundContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, JavaClassParser.RULE_interfaceBound);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 104;
			this.match(JavaClassParser.COLON);
			this.state = 105;
			this.fieldTypeSignature();
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
	public fieldTypeSignature(): FieldTypeSignatureContext {
		let _localctx: FieldTypeSignatureContext = new FieldTypeSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, JavaClassParser.RULE_fieldTypeSignature);
		try {
			this.state = 110;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JavaClassParser.CLASS_PREFIX:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 107;
				this.classTypeSignature();
				}
				break;
			case JavaClassParser.ARRAY_PREFIX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 108;
				this.arrayTypeSignature();
				}
				break;
			case JavaClassParser.GEN_PREFIX:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 109;
				this.typeVariableSignature();
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
	public classTypeSignature(): ClassTypeSignatureContext {
		let _localctx: ClassTypeSignatureContext = new ClassTypeSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, JavaClassParser.RULE_classTypeSignature);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 112;
			this.match(JavaClassParser.CLASS_PREFIX);
			this.state = 113;
			this.simpleClassTypeSignature();
			this.state = 117;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JavaClassParser.DOT) {
				{
				{
				this.state = 114;
				this.classTypeSignatureSuffix();
				}
				}
				this.state = 119;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 120;
			this.match(JavaClassParser.CLASSSEMI);
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
	public simpleClassTypeSignature(): SimpleClassTypeSignatureContext {
		let _localctx: SimpleClassTypeSignatureContext = new SimpleClassTypeSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, JavaClassParser.RULE_simpleClassTypeSignature);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 122;
			this.match(JavaClassParser.CLASSID);
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JavaClassParser.CLASSDIV) {
				{
				{
				this.state = 123;
				this.match(JavaClassParser.CLASSDIV);
				this.state = 124;
				this.match(JavaClassParser.CLASSID);
				}
				}
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JavaClassParser.LT) {
				{
				this.state = 130;
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
	public classTypeSignatureSuffix(): ClassTypeSignatureSuffixContext {
		let _localctx: ClassTypeSignatureSuffixContext = new ClassTypeSignatureSuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, JavaClassParser.RULE_classTypeSignatureSuffix);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 133;
			this.match(JavaClassParser.DOT);
			this.state = 134;
			this.simpleClassTypeSignature();
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
	public typeVariableSignature(): TypeVariableSignatureContext {
		let _localctx: TypeVariableSignatureContext = new TypeVariableSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, JavaClassParser.RULE_typeVariableSignature);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 136;
			this.match(JavaClassParser.GEN_PREFIX);
			this.state = 137;
			this.match(JavaClassParser.GEN_ID);
			this.state = 138;
			this.match(JavaClassParser.GEN_SEMI);
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
		this.enterRule(_localctx, 22, JavaClassParser.RULE_typeArguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 140;
			this.match(JavaClassParser.LT);
			this.state = 142;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 141;
				this.typeArgument();
				}
				}
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JavaClassParser.ARRAY_PREFIX) | (1 << JavaClassParser.ASTERIX) | (1 << JavaClassParser.ADD) | (1 << JavaClassParser.SUB) | (1 << JavaClassParser.CLASS_PREFIX) | (1 << JavaClassParser.GEN_PREFIX))) !== 0));
			this.state = 146;
			this.match(JavaClassParser.GT);
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
		this.enterRule(_localctx, 24, JavaClassParser.RULE_typeArgument);
		let _la: number;
		try {
			this.state = 153;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JavaClassParser.ARRAY_PREFIX:
			case JavaClassParser.ADD:
			case JavaClassParser.SUB:
			case JavaClassParser.CLASS_PREFIX:
			case JavaClassParser.GEN_PREFIX:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 149;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === JavaClassParser.ADD || _la === JavaClassParser.SUB) {
					{
					this.state = 148;
					this.wildcardIndicator();
					}
				}

				this.state = 151;
				this.fieldTypeSignature();
				}
				break;
			case JavaClassParser.ASTERIX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 152;
				this.match(JavaClassParser.ASTERIX);
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
	public wildcardIndicator(): WildcardIndicatorContext {
		let _localctx: WildcardIndicatorContext = new WildcardIndicatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, JavaClassParser.RULE_wildcardIndicator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 155;
			_la = this._input.LA(1);
			if (!(_la === JavaClassParser.ADD || _la === JavaClassParser.SUB)) {
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
	public methodDescriptor(): MethodDescriptorContext {
		let _localctx: MethodDescriptorContext = new MethodDescriptorContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, JavaClassParser.RULE_methodDescriptor);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this.match(JavaClassParser.LPAREN);
			this.state = 161;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JavaClassParser.BYTE) | (1 << JavaClassParser.CHAR) | (1 << JavaClassParser.DOUBLE) | (1 << JavaClassParser.FLOAT) | (1 << JavaClassParser.INT) | (1 << JavaClassParser.LONG) | (1 << JavaClassParser.SHORT) | (1 << JavaClassParser.BOOLEAN) | (1 << JavaClassParser.ARRAY_PREFIX) | (1 << JavaClassParser.CLASS_PREFIX))) !== 0)) {
				{
				{
				this.state = 158;
				this.parameterDescriptor();
				}
				}
				this.state = 163;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 164;
			this.match(JavaClassParser.RPAREN);
			this.state = 165;
			this.returnDescriptor();
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
	public fieldDescriptor(): FieldDescriptorContext {
		let _localctx: FieldDescriptorContext = new FieldDescriptorContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, JavaClassParser.RULE_fieldDescriptor);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 167;
			this.fieldType();
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
	public fieldType(): FieldTypeContext {
		let _localctx: FieldTypeContext = new FieldTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, JavaClassParser.RULE_fieldType);
		try {
			this.state = 172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JavaClassParser.BYTE:
			case JavaClassParser.CHAR:
			case JavaClassParser.DOUBLE:
			case JavaClassParser.FLOAT:
			case JavaClassParser.INT:
			case JavaClassParser.LONG:
			case JavaClassParser.SHORT:
			case JavaClassParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 169;
				this.baseType();
				}
				break;
			case JavaClassParser.CLASS_PREFIX:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 170;
				this.objectType();
				}
				break;
			case JavaClassParser.ARRAY_PREFIX:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 171;
				this.arrayType();
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
	public baseType(): BaseTypeContext {
		let _localctx: BaseTypeContext = new BaseTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, JavaClassParser.RULE_baseType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 174;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JavaClassParser.BYTE) | (1 << JavaClassParser.CHAR) | (1 << JavaClassParser.DOUBLE) | (1 << JavaClassParser.FLOAT) | (1 << JavaClassParser.INT) | (1 << JavaClassParser.LONG) | (1 << JavaClassParser.SHORT) | (1 << JavaClassParser.BOOLEAN))) !== 0))) {
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
	public objectType(): ObjectTypeContext {
		let _localctx: ObjectTypeContext = new ObjectTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, JavaClassParser.RULE_objectType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 176;
			this.match(JavaClassParser.CLASS_PREFIX);
			this.state = 177;
			this.className();
			this.state = 178;
			this.match(JavaClassParser.CLASSSEMI);
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
	public className(): ClassNameContext {
		let _localctx: ClassNameContext = new ClassNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, JavaClassParser.RULE_className);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 180;
			this.match(JavaClassParser.CLASSID);
			this.state = 185;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JavaClassParser.CLASSDIV) {
				{
				{
				this.state = 181;
				this.match(JavaClassParser.CLASSDIV);
				this.state = 182;
				this.match(JavaClassParser.CLASSID);
				}
				}
				this.state = 187;
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
	public arrayType(): ArrayTypeContext {
		let _localctx: ArrayTypeContext = new ArrayTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, JavaClassParser.RULE_arrayType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 188;
			this.match(JavaClassParser.ARRAY_PREFIX);
			this.state = 189;
			this.fieldType();
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
	public parameterDescriptor(): ParameterDescriptorContext {
		let _localctx: ParameterDescriptorContext = new ParameterDescriptorContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, JavaClassParser.RULE_parameterDescriptor);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this.fieldType();
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
	public returnDescriptor(): ReturnDescriptorContext {
		let _localctx: ReturnDescriptorContext = new ReturnDescriptorContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, JavaClassParser.RULE_returnDescriptor);
		try {
			this.state = 195;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JavaClassParser.BYTE:
			case JavaClassParser.CHAR:
			case JavaClassParser.DOUBLE:
			case JavaClassParser.FLOAT:
			case JavaClassParser.INT:
			case JavaClassParser.LONG:
			case JavaClassParser.SHORT:
			case JavaClassParser.BOOLEAN:
			case JavaClassParser.ARRAY_PREFIX:
			case JavaClassParser.CLASS_PREFIX:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 193;
				this.fieldType();
				}
				break;
			case JavaClassParser.VOID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 194;
				this.voidDescriptor();
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
	public voidDescriptor(): VoidDescriptorContext {
		let _localctx: VoidDescriptorContext = new VoidDescriptorContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, JavaClassParser.RULE_voidDescriptor);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
			this.match(JavaClassParser.VOID);
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
	public classSignature(): ClassSignatureContext {
		let _localctx: ClassSignatureContext = new ClassSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, JavaClassParser.RULE_classSignature);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 200;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JavaClassParser.LT) {
				{
				this.state = 199;
				this.formalTypeParameters();
				}
			}

			this.state = 202;
			this.superclassSignature();
			this.state = 206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JavaClassParser.CLASS_PREFIX) {
				{
				{
				this.state = 203;
				this.superinterfaceSignature();
				}
				}
				this.state = 208;
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
	public superclassSignature(): SuperclassSignatureContext {
		let _localctx: SuperclassSignatureContext = new SuperclassSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, JavaClassParser.RULE_superclassSignature);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 209;
			this.classTypeSignature();
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
	public superinterfaceSignature(): SuperinterfaceSignatureContext {
		let _localctx: SuperinterfaceSignatureContext = new SuperinterfaceSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, JavaClassParser.RULE_superinterfaceSignature);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 211;
			this.classTypeSignature();
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
	public arrayTypeSignature(): ArrayTypeSignatureContext {
		let _localctx: ArrayTypeSignatureContext = new ArrayTypeSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, JavaClassParser.RULE_arrayTypeSignature);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 213;
			this.match(JavaClassParser.ARRAY_PREFIX);
			this.state = 214;
			this.typeSignature();
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
	public typeSignature(): TypeSignatureContext {
		let _localctx: TypeSignatureContext = new TypeSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, JavaClassParser.RULE_typeSignature);
		try {
			this.state = 218;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JavaClassParser.ARRAY_PREFIX:
			case JavaClassParser.CLASS_PREFIX:
			case JavaClassParser.GEN_PREFIX:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 216;
				this.fieldTypeSignature();
				}
				break;
			case JavaClassParser.BYTE:
			case JavaClassParser.CHAR:
			case JavaClassParser.DOUBLE:
			case JavaClassParser.FLOAT:
			case JavaClassParser.INT:
			case JavaClassParser.LONG:
			case JavaClassParser.SHORT:
			case JavaClassParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 217;
				this.baseType();
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
	public returnType(): ReturnTypeContext {
		let _localctx: ReturnTypeContext = new ReturnTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, JavaClassParser.RULE_returnType);
		try {
			this.state = 222;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JavaClassParser.BYTE:
			case JavaClassParser.CHAR:
			case JavaClassParser.DOUBLE:
			case JavaClassParser.FLOAT:
			case JavaClassParser.INT:
			case JavaClassParser.LONG:
			case JavaClassParser.SHORT:
			case JavaClassParser.BOOLEAN:
			case JavaClassParser.ARRAY_PREFIX:
			case JavaClassParser.CLASS_PREFIX:
			case JavaClassParser.GEN_PREFIX:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 220;
				this.typeSignature();
				}
				break;
			case JavaClassParser.VOID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 221;
				this.voidDescriptor();
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
	public throwsSignature(): ThrowsSignatureContext {
		let _localctx: ThrowsSignatureContext = new ThrowsSignatureContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, JavaClassParser.RULE_throwsSignature);
		try {
			this.state = 228;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 224;
				this.match(JavaClassParser.CARET);
				this.state = 225;
				this.classTypeSignature();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 226;
				this.match(JavaClassParser.CARET);
				this.state = 227;
				this.typeVariableSignature();
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

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1F\xE9\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x03\x02\x03\x02\x05\x02" +
		"C\n\x02\x03\x03\x05\x03F\n\x03\x03\x03\x03\x03\x07\x03J\n\x03\f\x03\x0E" +
		"\x03M\v\x03\x03\x03\x03\x03\x03\x03\x07\x03R\n\x03\f\x03\x0E\x03U\v\x03" +
		"\x03\x04\x03\x04\x06\x04Y\n\x04\r\x04\x0E\x04Z\x03\x04\x03\x04\x03\x05" +
		"\x03\x05\x03\x05\x07\x05b\n\x05\f\x05\x0E\x05e\v\x05\x03\x06\x03\x06\x05" +
		"\x06i\n\x06\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x05\bq\n\b\x03\t" +
		"\x03\t\x03\t\x07\tv\n\t\f\t\x0E\ty\v\t\x03\t\x03\t\x03\n\x03\n\x03\n\x07" +
		"\n\x80\n\n\f\n\x0E\n\x83\v\n\x03\n\x05\n\x86\n\n\x03\v\x03\v\x03\v\x03" +
		"\f\x03\f\x03\f\x03\f\x03\r\x03\r\x06\r\x91\n\r\r\r\x0E\r\x92\x03\r\x03" +
		"\r\x03\x0E\x05\x0E\x98\n\x0E\x03\x0E\x03\x0E\x05\x0E\x9C\n\x0E\x03\x0F" +
		"\x03\x0F\x03\x10\x03\x10\x07\x10\xA2\n\x10\f\x10\x0E\x10\xA5\v\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x12\x05\x12\xAF" +
		"\n\x12\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15" +
		"\x03\x15\x07\x15\xBA\n\x15\f\x15\x0E\x15\xBD\v\x15\x03\x16\x03\x16\x03" +
		"\x16\x03\x17\x03\x17\x03\x18\x03\x18\x05\x18\xC6\n\x18\x03\x19\x03\x19" +
		"\x03\x1A\x05\x1A\xCB\n\x1A\x03\x1A\x03\x1A\x07\x1A\xCF\n\x1A\f\x1A\x0E" +
		"\x1A\xD2\v\x1A\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D" +
		"\x03\x1E\x03\x1E\x05\x1E\xDD\n\x1E\x03\x1F\x03\x1F\x05\x1F\xE1\n\x1F\x03" +
		" \x03 \x03 \x03 \x05 \xE7\n \x03 \x02\x02\x02!\x02\x02\x04\x02\x06\x02" +
		"\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A" +
		"\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x02" +
		"4\x026\x028\x02:\x02<\x02>\x02\x02\x04\x03\x02\x13\x14\x03\x02\x03\n\x02" +
		"\xE2\x02B\x03\x02\x02\x02\x04E\x03\x02\x02\x02\x06V\x03\x02\x02\x02\b" +
		"^\x03\x02\x02\x02\nf\x03\x02\x02\x02\fj\x03\x02\x02\x02\x0Ep\x03\x02\x02" +
		"\x02\x10r\x03\x02\x02\x02\x12|\x03\x02\x02\x02\x14\x87\x03\x02\x02\x02" +
		"\x16\x8A\x03\x02\x02\x02\x18\x8E\x03\x02\x02\x02\x1A\x9B\x03\x02\x02\x02" +
		"\x1C\x9D\x03\x02\x02\x02\x1E\x9F\x03\x02\x02\x02 \xA9\x03\x02\x02\x02" +
		"\"\xAE\x03\x02\x02\x02$\xB0\x03\x02\x02\x02&\xB2\x03\x02\x02\x02(\xB6" +
		"\x03\x02\x02\x02*\xBE\x03\x02\x02\x02,\xC1\x03\x02\x02\x02.\xC5\x03\x02" +
		"\x02\x020\xC7\x03\x02\x02\x022\xCA\x03\x02\x02\x024\xD3\x03\x02\x02\x02" +
		"6\xD5\x03\x02\x02\x028\xD7\x03\x02\x02\x02:\xDC\x03\x02\x02\x02<\xE0\x03" +
		"\x02\x02\x02>\xE6\x03\x02\x02\x02@C\x05\x04\x03\x02AC\x05\x1E\x10\x02" +
		"B@\x03\x02\x02\x02BA\x03\x02\x02\x02C\x03\x03\x02\x02\x02DF\x05\x06\x04" +
		"\x02ED\x03\x02\x02\x02EF\x03\x02\x02\x02FG\x03\x02\x02\x02GK\x07\r\x02" +
		"\x02HJ\x05:\x1E\x02IH\x03\x02\x02\x02JM\x03\x02\x02\x02KI\x03\x02\x02" +
		"\x02KL\x03\x02\x02\x02LN\x03\x02\x02\x02MK\x03\x02\x02\x02NO\x07\x0E\x02" +
		"\x02OS\x05<\x1F\x02PR\x05> \x02QP\x03\x02\x02\x02RU\x03\x02\x02\x02SQ" +
		"\x03\x02\x02\x02ST\x03\x02\x02\x02T\x05\x03\x02\x02\x02US\x03\x02\x02" +
		"\x02VX\x07\x0F\x02\x02WY\x05\b\x05\x02XW\x03\x02\x02\x02YZ\x03\x02\x02" +
		"\x02ZX\x03\x02\x02\x02Z[\x03\x02\x02\x02[\\\x03\x02\x02\x02\\]\x07\x10" +
		"\x02\x02]\x07\x03\x02\x02\x02^_\x07\x18\x02\x02_c\x05\n\x06\x02`b\x05" +
		"\f\x07\x02a`\x03\x02\x02\x02be\x03\x02\x02\x02ca\x03\x02\x02\x02cd\x03" +
		"\x02\x02\x02d\t\x03\x02\x02\x02ec\x03\x02\x02\x02fh\x07\x16\x02\x02gi" +
		"\x05\x0E\b\x02hg\x03\x02\x02\x02hi\x03\x02\x02\x02i\v\x03\x02\x02\x02" +
		"jk\x07\x16\x02\x02kl\x05\x0E\b\x02l\r\x03\x02\x02\x02mq\x05\x10\t\x02" +
		"nq\x058\x1D\x02oq\x05\x16\f\x02pm\x03\x02\x02\x02pn\x03\x02\x02\x02po" +
		"\x03\x02\x02\x02q\x0F\x03\x02\x02\x02rs\x07\x19\x02\x02sw\x05\x12\n\x02" +
		"tv\x05\x14\v\x02ut\x03\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02\x02\x02" +
		"wx\x03\x02\x02\x02xz\x03\x02\x02\x02yw\x03\x02\x02\x02z{\x07\x1F\x02\x02" +
		"{\x11\x03\x02\x02\x02|\x81\x07\x1D\x02\x02}~\x07\x1E\x02\x02~\x80\x07" +
		"\x1D\x02\x02\x7F}\x03\x02\x02\x02\x80\x83\x03\x02\x02\x02\x81\x7F\x03" +
		"\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x85\x03\x02\x02\x02\x83\x81\x03" +
		"\x02\x02\x02\x84\x86\x05\x18\r\x02\x85\x84\x03\x02\x02\x02\x85\x86\x03" +
		"\x02\x02\x02\x86\x13\x03\x02\x02\x02\x87\x88\x07\x11\x02\x02\x88\x89\x05" +
		"\x12\n\x02\x89\x15\x03\x02\x02\x02\x8A\x8B\x07\x1A\x02\x02\x8B\x8C\x07" +
		"\x1B\x02\x02\x8C\x8D\x07\x1C\x02\x02\x8D\x17\x03\x02\x02\x02\x8E\x90\x07" +
		"\x0F\x02\x02\x8F\x91\x05\x1A\x0E\x02\x90\x8F\x03\x02\x02\x02\x91\x92\x03" +
		"\x02\x02\x02\x92\x90\x03\x02\x02\x02\x92\x93\x03\x02\x02\x02\x93\x94\x03" +
		"\x02\x02\x02\x94\x95\x07\x10\x02\x02\x95\x19\x03\x02\x02\x02\x96\x98\x05" +
		"\x1C\x0F\x02\x97\x96\x03\x02\x02\x02\x97\x98\x03\x02\x02\x02\x98\x99\x03" +
		"\x02\x02\x02\x99\x9C\x05\x0E\b\x02\x9A\x9C\x07\x12\x02\x02\x9B\x97\x03" +
		"\x02\x02\x02\x9B\x9A\x03\x02\x02\x02\x9C\x1B\x03\x02\x02\x02\x9D\x9E\t" +
		"\x02\x02\x02\x9E\x1D\x03\x02\x02\x02\x9F\xA3\x07\r\x02\x02\xA0\xA2\x05" +
		",\x17\x02\xA1\xA0\x03\x02\x02\x02\xA2\xA5\x03\x02\x02\x02\xA3\xA1\x03" +
		"\x02\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xA6\x03\x02\x02\x02\xA5\xA3\x03" +
		"\x02\x02\x02\xA6\xA7\x07\x0E\x02\x02\xA7\xA8\x05.\x18\x02\xA8\x1F\x03" +
		"\x02\x02\x02\xA9\xAA\x05\"\x12\x02\xAA!\x03\x02\x02\x02\xAB\xAF\x05$\x13" +
		"\x02\xAC\xAF\x05&\x14\x02\xAD\xAF\x05*\x16\x02\xAE\xAB\x03\x02\x02\x02" +
		"\xAE\xAC\x03\x02\x02\x02\xAE\xAD\x03\x02\x02\x02\xAF#\x03\x02\x02\x02" +
		"\xB0\xB1\t\x03\x02\x02\xB1%\x03\x02\x02\x02\xB2\xB3\x07\x19\x02\x02\xB3" +
		"\xB4\x05(\x15\x02\xB4\xB5\x07\x1F\x02\x02\xB5\'\x03\x02\x02\x02\xB6\xBB" +
		"\x07\x1D\x02\x02\xB7\xB8\x07\x1E\x02\x02\xB8\xBA\x07\x1D\x02\x02\xB9\xB7" +
		"\x03\x02\x02\x02\xBA\xBD\x03\x02\x02\x02\xBB\xB9\x03\x02\x02\x02\xBB\xBC" +
		"\x03\x02\x02\x02\xBC)\x03\x02\x02\x02\xBD\xBB\x03\x02\x02\x02\xBE\xBF" +
		"\x07\f\x02\x02\xBF\xC0\x05\"\x12\x02\xC0+\x03\x02\x02\x02\xC1\xC2\x05" +
		"\"\x12\x02\xC2-\x03\x02\x02\x02\xC3\xC6\x05\"\x12\x02\xC4\xC6\x050\x19" +
		"\x02\xC5\xC3\x03\x02\x02\x02\xC5\xC4\x03\x02\x02\x02\xC6/\x03\x02\x02" +
		"\x02\xC7\xC8\x07\v\x02\x02\xC81\x03\x02\x02\x02\xC9\xCB\x05\x06\x04\x02" +
		"\xCA\xC9\x03\x02\x02\x02\xCA\xCB\x03\x02\x02\x02\xCB\xCC\x03\x02\x02\x02" +
		"\xCC\xD0\x054\x1B\x02\xCD\xCF\x056\x1C\x02\xCE\xCD\x03\x02\x02\x02\xCF" +
		"\xD2\x03\x02\x02\x02\xD0\xCE\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1" +
		"3\x03\x02\x02\x02\xD2\xD0\x03\x02\x02\x02\xD3\xD4\x05\x10\t\x02\xD45\x03" +
		"\x02\x02\x02\xD5\xD6\x05\x10\t\x02\xD67\x03\x02\x02\x02\xD7\xD8\x07\f" +
		"\x02\x02\xD8\xD9\x05:\x1E\x02\xD99\x03\x02\x02\x02\xDA\xDD\x05\x0E\b\x02" +
		"\xDB\xDD\x05$\x13\x02\xDC\xDA\x03\x02\x02\x02\xDC\xDB\x03\x02\x02\x02" +
		"\xDD;\x03\x02\x02\x02\xDE\xE1\x05:\x1E\x02\xDF\xE1\x050\x19\x02\xE0\xDE" +
		"\x03\x02\x02\x02\xE0\xDF\x03\x02\x02\x02\xE1=\x03\x02\x02\x02\xE2\xE3" +
		"\x07\x15\x02\x02\xE3\xE7\x05\x10\t\x02\xE4\xE5\x07\x15\x02\x02\xE5\xE7" +
		"\x05\x16\f\x02\xE6\xE2\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE7?\x03" +
		"\x02\x02\x02\x19BEKSZchpw\x81\x85\x92\x97\x9B\xA3\xAE\xBB\xC5\xCA\xD0" +
		"\xDC\xE0\xE6";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JavaClassParser.__ATN) {
			JavaClassParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(JavaClassParser._serializedATN));
		}

		return JavaClassParser.__ATN;
	}

}

export class MainMethodDescriptorContext extends ParserRuleContext {
	public methodTypeSignature(): MethodTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, MethodTypeSignatureContext);
	}
	public methodDescriptor(): MethodDescriptorContext | undefined {
		return this.tryGetRuleContext(0, MethodDescriptorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_mainMethodDescriptor; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterMainMethodDescriptor) {
			listener.enterMainMethodDescriptor(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitMainMethodDescriptor) {
			listener.exitMainMethodDescriptor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitMainMethodDescriptor) {
			return visitor.visitMainMethodDescriptor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodTypeSignatureContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(JavaClassParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(JavaClassParser.RPAREN, 0); }
	public returnType(): ReturnTypeContext {
		return this.getRuleContext(0, ReturnTypeContext);
	}
	public formalTypeParameters(): FormalTypeParametersContext | undefined {
		return this.tryGetRuleContext(0, FormalTypeParametersContext);
	}
	public typeSignature(): TypeSignatureContext[];
	public typeSignature(i: number): TypeSignatureContext;
	public typeSignature(i?: number): TypeSignatureContext | TypeSignatureContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeSignatureContext);
		} else {
			return this.getRuleContext(i, TypeSignatureContext);
		}
	}
	public throwsSignature(): ThrowsSignatureContext[];
	public throwsSignature(i: number): ThrowsSignatureContext;
	public throwsSignature(i?: number): ThrowsSignatureContext | ThrowsSignatureContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ThrowsSignatureContext);
		} else {
			return this.getRuleContext(i, ThrowsSignatureContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_methodTypeSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterMethodTypeSignature) {
			listener.enterMethodTypeSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitMethodTypeSignature) {
			listener.exitMethodTypeSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitMethodTypeSignature) {
			return visitor.visitMethodTypeSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalTypeParametersContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(JavaClassParser.LT, 0); }
	public GT(): TerminalNode { return this.getToken(JavaClassParser.GT, 0); }
	public formalTypeParameter(): FormalTypeParameterContext[];
	public formalTypeParameter(i: number): FormalTypeParameterContext;
	public formalTypeParameter(i?: number): FormalTypeParameterContext | FormalTypeParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FormalTypeParameterContext);
		} else {
			return this.getRuleContext(i, FormalTypeParameterContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_formalTypeParameters; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterFormalTypeParameters) {
			listener.enterFormalTypeParameters(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitFormalTypeParameters) {
			listener.exitFormalTypeParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitFormalTypeParameters) {
			return visitor.visitFormalTypeParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalTypeParameterContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(JavaClassParser.IDENTIFIER, 0); }
	public classBound(): ClassBoundContext {
		return this.getRuleContext(0, ClassBoundContext);
	}
	public interfaceBound(): InterfaceBoundContext[];
	public interfaceBound(i: number): InterfaceBoundContext;
	public interfaceBound(i?: number): InterfaceBoundContext | InterfaceBoundContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceBoundContext);
		} else {
			return this.getRuleContext(i, InterfaceBoundContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_formalTypeParameter; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterFormalTypeParameter) {
			listener.enterFormalTypeParameter(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitFormalTypeParameter) {
			listener.exitFormalTypeParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitFormalTypeParameter) {
			return visitor.visitFormalTypeParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassBoundContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(JavaClassParser.COLON, 0); }
	public fieldTypeSignature(): FieldTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, FieldTypeSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_classBound; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterClassBound) {
			listener.enterClassBound(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitClassBound) {
			listener.exitClassBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitClassBound) {
			return visitor.visitClassBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceBoundContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(JavaClassParser.COLON, 0); }
	public fieldTypeSignature(): FieldTypeSignatureContext {
		return this.getRuleContext(0, FieldTypeSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_interfaceBound; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterInterfaceBound) {
			listener.enterInterfaceBound(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitInterfaceBound) {
			listener.exitInterfaceBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitInterfaceBound) {
			return visitor.visitInterfaceBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldTypeSignatureContext extends ParserRuleContext {
	public classTypeSignature(): ClassTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, ClassTypeSignatureContext);
	}
	public arrayTypeSignature(): ArrayTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, ArrayTypeSignatureContext);
	}
	public typeVariableSignature(): TypeVariableSignatureContext | undefined {
		return this.tryGetRuleContext(0, TypeVariableSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_fieldTypeSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterFieldTypeSignature) {
			listener.enterFieldTypeSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitFieldTypeSignature) {
			listener.exitFieldTypeSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitFieldTypeSignature) {
			return visitor.visitFieldTypeSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassTypeSignatureContext extends ParserRuleContext {
	public CLASS_PREFIX(): TerminalNode { return this.getToken(JavaClassParser.CLASS_PREFIX, 0); }
	public simpleClassTypeSignature(): SimpleClassTypeSignatureContext {
		return this.getRuleContext(0, SimpleClassTypeSignatureContext);
	}
	public CLASSSEMI(): TerminalNode { return this.getToken(JavaClassParser.CLASSSEMI, 0); }
	public classTypeSignatureSuffix(): ClassTypeSignatureSuffixContext[];
	public classTypeSignatureSuffix(i: number): ClassTypeSignatureSuffixContext;
	public classTypeSignatureSuffix(i?: number): ClassTypeSignatureSuffixContext | ClassTypeSignatureSuffixContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassTypeSignatureSuffixContext);
		} else {
			return this.getRuleContext(i, ClassTypeSignatureSuffixContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_classTypeSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterClassTypeSignature) {
			listener.enterClassTypeSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitClassTypeSignature) {
			listener.exitClassTypeSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitClassTypeSignature) {
			return visitor.visitClassTypeSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleClassTypeSignatureContext extends ParserRuleContext {
	public CLASSID(): TerminalNode[];
	public CLASSID(i: number): TerminalNode;
	public CLASSID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JavaClassParser.CLASSID);
		} else {
			return this.getToken(JavaClassParser.CLASSID, i);
		}
	}
	public CLASSDIV(): TerminalNode[];
	public CLASSDIV(i: number): TerminalNode;
	public CLASSDIV(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JavaClassParser.CLASSDIV);
		} else {
			return this.getToken(JavaClassParser.CLASSDIV, i);
		}
	}
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_simpleClassTypeSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterSimpleClassTypeSignature) {
			listener.enterSimpleClassTypeSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitSimpleClassTypeSignature) {
			listener.exitSimpleClassTypeSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitSimpleClassTypeSignature) {
			return visitor.visitSimpleClassTypeSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassTypeSignatureSuffixContext extends ParserRuleContext {
	public DOT(): TerminalNode { return this.getToken(JavaClassParser.DOT, 0); }
	public simpleClassTypeSignature(): SimpleClassTypeSignatureContext {
		return this.getRuleContext(0, SimpleClassTypeSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_classTypeSignatureSuffix; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterClassTypeSignatureSuffix) {
			listener.enterClassTypeSignatureSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitClassTypeSignatureSuffix) {
			listener.exitClassTypeSignatureSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitClassTypeSignatureSuffix) {
			return visitor.visitClassTypeSignatureSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeVariableSignatureContext extends ParserRuleContext {
	public GEN_PREFIX(): TerminalNode { return this.getToken(JavaClassParser.GEN_PREFIX, 0); }
	public GEN_ID(): TerminalNode { return this.getToken(JavaClassParser.GEN_ID, 0); }
	public GEN_SEMI(): TerminalNode { return this.getToken(JavaClassParser.GEN_SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_typeVariableSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterTypeVariableSignature) {
			listener.enterTypeVariableSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitTypeVariableSignature) {
			listener.exitTypeVariableSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitTypeVariableSignature) {
			return visitor.visitTypeVariableSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentsContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(JavaClassParser.LT, 0); }
	public GT(): TerminalNode { return this.getToken(JavaClassParser.GT, 0); }
	public typeArgument(): TypeArgumentContext[];
	public typeArgument(i: number): TypeArgumentContext;
	public typeArgument(i?: number): TypeArgumentContext | TypeArgumentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeArgumentContext);
		} else {
			return this.getRuleContext(i, TypeArgumentContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_typeArguments; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterTypeArguments) {
			listener.enterTypeArguments(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitTypeArguments) {
			listener.exitTypeArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitTypeArguments) {
			return visitor.visitTypeArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentContext extends ParserRuleContext {
	public fieldTypeSignature(): FieldTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, FieldTypeSignatureContext);
	}
	public wildcardIndicator(): WildcardIndicatorContext | undefined {
		return this.tryGetRuleContext(0, WildcardIndicatorContext);
	}
	public ASTERIX(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.ASTERIX, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_typeArgument; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterTypeArgument) {
			listener.enterTypeArgument(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitTypeArgument) {
			listener.exitTypeArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitTypeArgument) {
			return visitor.visitTypeArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WildcardIndicatorContext extends ParserRuleContext {
	public ADD(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.ADD, 0); }
	public SUB(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.SUB, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_wildcardIndicator; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterWildcardIndicator) {
			listener.enterWildcardIndicator(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitWildcardIndicator) {
			listener.exitWildcardIndicator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitWildcardIndicator) {
			return visitor.visitWildcardIndicator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDescriptorContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(JavaClassParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(JavaClassParser.RPAREN, 0); }
	public returnDescriptor(): ReturnDescriptorContext {
		return this.getRuleContext(0, ReturnDescriptorContext);
	}
	public parameterDescriptor(): ParameterDescriptorContext[];
	public parameterDescriptor(i: number): ParameterDescriptorContext;
	public parameterDescriptor(i?: number): ParameterDescriptorContext | ParameterDescriptorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ParameterDescriptorContext);
		} else {
			return this.getRuleContext(i, ParameterDescriptorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_methodDescriptor; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterMethodDescriptor) {
			listener.enterMethodDescriptor(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitMethodDescriptor) {
			listener.exitMethodDescriptor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitMethodDescriptor) {
			return visitor.visitMethodDescriptor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldDescriptorContext extends ParserRuleContext {
	public fieldType(): FieldTypeContext {
		return this.getRuleContext(0, FieldTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_fieldDescriptor; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterFieldDescriptor) {
			listener.enterFieldDescriptor(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitFieldDescriptor) {
			listener.exitFieldDescriptor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitFieldDescriptor) {
			return visitor.visitFieldDescriptor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldTypeContext extends ParserRuleContext {
	public baseType(): BaseTypeContext | undefined {
		return this.tryGetRuleContext(0, BaseTypeContext);
	}
	public objectType(): ObjectTypeContext | undefined {
		return this.tryGetRuleContext(0, ObjectTypeContext);
	}
	public arrayType(): ArrayTypeContext | undefined {
		return this.tryGetRuleContext(0, ArrayTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_fieldType; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterFieldType) {
			listener.enterFieldType(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitFieldType) {
			listener.exitFieldType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitFieldType) {
			return visitor.visitFieldType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BaseTypeContext extends ParserRuleContext {
	public BYTE(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.BYTE, 0); }
	public CHAR(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.CHAR, 0); }
	public DOUBLE(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.DOUBLE, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.FLOAT, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.INT, 0); }
	public LONG(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.LONG, 0); }
	public SHORT(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.SHORT, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(JavaClassParser.BOOLEAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_baseType; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterBaseType) {
			listener.enterBaseType(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitBaseType) {
			listener.exitBaseType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitBaseType) {
			return visitor.visitBaseType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjectTypeContext extends ParserRuleContext {
	public CLASS_PREFIX(): TerminalNode { return this.getToken(JavaClassParser.CLASS_PREFIX, 0); }
	public className(): ClassNameContext {
		return this.getRuleContext(0, ClassNameContext);
	}
	public CLASSSEMI(): TerminalNode { return this.getToken(JavaClassParser.CLASSSEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_objectType; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterObjectType) {
			listener.enterObjectType(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitObjectType) {
			listener.exitObjectType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitObjectType) {
			return visitor.visitObjectType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassNameContext extends ParserRuleContext {
	public CLASSID(): TerminalNode[];
	public CLASSID(i: number): TerminalNode;
	public CLASSID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JavaClassParser.CLASSID);
		} else {
			return this.getToken(JavaClassParser.CLASSID, i);
		}
	}
	public CLASSDIV(): TerminalNode[];
	public CLASSDIV(i: number): TerminalNode;
	public CLASSDIV(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JavaClassParser.CLASSDIV);
		} else {
			return this.getToken(JavaClassParser.CLASSDIV, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_className; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterClassName) {
			listener.enterClassName(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitClassName) {
			listener.exitClassName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitClassName) {
			return visitor.visitClassName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayTypeContext extends ParserRuleContext {
	public ARRAY_PREFIX(): TerminalNode { return this.getToken(JavaClassParser.ARRAY_PREFIX, 0); }
	public fieldType(): FieldTypeContext {
		return this.getRuleContext(0, FieldTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_arrayType; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterArrayType) {
			listener.enterArrayType(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitArrayType) {
			listener.exitArrayType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitArrayType) {
			return visitor.visitArrayType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDescriptorContext extends ParserRuleContext {
	public fieldType(): FieldTypeContext {
		return this.getRuleContext(0, FieldTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_parameterDescriptor; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterParameterDescriptor) {
			listener.enterParameterDescriptor(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitParameterDescriptor) {
			listener.exitParameterDescriptor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitParameterDescriptor) {
			return visitor.visitParameterDescriptor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnDescriptorContext extends ParserRuleContext {
	public fieldType(): FieldTypeContext | undefined {
		return this.tryGetRuleContext(0, FieldTypeContext);
	}
	public voidDescriptor(): VoidDescriptorContext | undefined {
		return this.tryGetRuleContext(0, VoidDescriptorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_returnDescriptor; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterReturnDescriptor) {
			listener.enterReturnDescriptor(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitReturnDescriptor) {
			listener.exitReturnDescriptor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitReturnDescriptor) {
			return visitor.visitReturnDescriptor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VoidDescriptorContext extends ParserRuleContext {
	public VOID(): TerminalNode { return this.getToken(JavaClassParser.VOID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_voidDescriptor; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterVoidDescriptor) {
			listener.enterVoidDescriptor(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitVoidDescriptor) {
			listener.exitVoidDescriptor(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitVoidDescriptor) {
			return visitor.visitVoidDescriptor(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassSignatureContext extends ParserRuleContext {
	public superclassSignature(): SuperclassSignatureContext {
		return this.getRuleContext(0, SuperclassSignatureContext);
	}
	public formalTypeParameters(): FormalTypeParametersContext | undefined {
		return this.tryGetRuleContext(0, FormalTypeParametersContext);
	}
	public superinterfaceSignature(): SuperinterfaceSignatureContext[];
	public superinterfaceSignature(i: number): SuperinterfaceSignatureContext;
	public superinterfaceSignature(i?: number): SuperinterfaceSignatureContext | SuperinterfaceSignatureContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SuperinterfaceSignatureContext);
		} else {
			return this.getRuleContext(i, SuperinterfaceSignatureContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_classSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterClassSignature) {
			listener.enterClassSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitClassSignature) {
			listener.exitClassSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitClassSignature) {
			return visitor.visitClassSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SuperclassSignatureContext extends ParserRuleContext {
	public classTypeSignature(): ClassTypeSignatureContext {
		return this.getRuleContext(0, ClassTypeSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_superclassSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterSuperclassSignature) {
			listener.enterSuperclassSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitSuperclassSignature) {
			listener.exitSuperclassSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitSuperclassSignature) {
			return visitor.visitSuperclassSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SuperinterfaceSignatureContext extends ParserRuleContext {
	public classTypeSignature(): ClassTypeSignatureContext {
		return this.getRuleContext(0, ClassTypeSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_superinterfaceSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterSuperinterfaceSignature) {
			listener.enterSuperinterfaceSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitSuperinterfaceSignature) {
			listener.exitSuperinterfaceSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitSuperinterfaceSignature) {
			return visitor.visitSuperinterfaceSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayTypeSignatureContext extends ParserRuleContext {
	public ARRAY_PREFIX(): TerminalNode { return this.getToken(JavaClassParser.ARRAY_PREFIX, 0); }
	public typeSignature(): TypeSignatureContext {
		return this.getRuleContext(0, TypeSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_arrayTypeSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterArrayTypeSignature) {
			listener.enterArrayTypeSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitArrayTypeSignature) {
			listener.exitArrayTypeSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitArrayTypeSignature) {
			return visitor.visitArrayTypeSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSignatureContext extends ParserRuleContext {
	public fieldTypeSignature(): FieldTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, FieldTypeSignatureContext);
	}
	public baseType(): BaseTypeContext | undefined {
		return this.tryGetRuleContext(0, BaseTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_typeSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterTypeSignature) {
			listener.enterTypeSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitTypeSignature) {
			listener.exitTypeSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitTypeSignature) {
			return visitor.visitTypeSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnTypeContext extends ParserRuleContext {
	public typeSignature(): TypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, TypeSignatureContext);
	}
	public voidDescriptor(): VoidDescriptorContext | undefined {
		return this.tryGetRuleContext(0, VoidDescriptorContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_returnType; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterReturnType) {
			listener.enterReturnType(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitReturnType) {
			listener.exitReturnType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitReturnType) {
			return visitor.visitReturnType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThrowsSignatureContext extends ParserRuleContext {
	public CARET(): TerminalNode { return this.getToken(JavaClassParser.CARET, 0); }
	public classTypeSignature(): ClassTypeSignatureContext | undefined {
		return this.tryGetRuleContext(0, ClassTypeSignatureContext);
	}
	public typeVariableSignature(): TypeVariableSignatureContext | undefined {
		return this.tryGetRuleContext(0, TypeVariableSignatureContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JavaClassParser.RULE_throwsSignature; }
	// @Override
	public enterRule(listener: JavaClassParserListener): void {
		if (listener.enterThrowsSignature) {
			listener.enterThrowsSignature(this);
		}
	}
	// @Override
	public exitRule(listener: JavaClassParserListener): void {
		if (listener.exitThrowsSignature) {
			listener.exitThrowsSignature(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JavaClassParserVisitor<Result>): Result {
		if (visitor.visitThrowsSignature) {
			return visitor.visitThrowsSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


