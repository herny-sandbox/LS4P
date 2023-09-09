// Generated from c:\Users\User\Documents\LS4Pv3\server\grammar\JavaClassParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { MainMethodDescriptorContext } from "./JavaClassParser";
import { MethodTypeSignatureContext } from "./JavaClassParser";
import { FormalTypeParametersContext } from "./JavaClassParser";
import { FormalTypeParameterContext } from "./JavaClassParser";
import { ClassBoundContext } from "./JavaClassParser";
import { InterfaceBoundContext } from "./JavaClassParser";
import { FieldTypeSignatureContext } from "./JavaClassParser";
import { ClassTypeSignatureContext } from "./JavaClassParser";
import { SimpleClassTypeSignatureContext } from "./JavaClassParser";
import { ClassTypeSignatureSuffixContext } from "./JavaClassParser";
import { TypeVariableSignatureContext } from "./JavaClassParser";
import { TypeArgumentsContext } from "./JavaClassParser";
import { TypeArgumentContext } from "./JavaClassParser";
import { WildcardIndicatorContext } from "./JavaClassParser";
import { MethodDescriptorContext } from "./JavaClassParser";
import { FieldDescriptorContext } from "./JavaClassParser";
import { FieldTypeContext } from "./JavaClassParser";
import { BaseTypeContext } from "./JavaClassParser";
import { ObjectTypeContext } from "./JavaClassParser";
import { ClassNameContext } from "./JavaClassParser";
import { ArrayTypeContext } from "./JavaClassParser";
import { ParameterDescriptorContext } from "./JavaClassParser";
import { ReturnDescriptorContext } from "./JavaClassParser";
import { VoidDescriptorContext } from "./JavaClassParser";
import { ClassSignatureContext } from "./JavaClassParser";
import { SuperclassSignatureContext } from "./JavaClassParser";
import { SuperinterfaceSignatureContext } from "./JavaClassParser";
import { ArrayTypeSignatureContext } from "./JavaClassParser";
import { TypeSignatureContext } from "./JavaClassParser";
import { ReturnTypeContext } from "./JavaClassParser";
import { ThrowsSignatureContext } from "./JavaClassParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `JavaClassParser`.
 */
export interface JavaClassParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `JavaClassParser.mainMethodDescriptor`.
	 * @param ctx the parse tree
	 */
	enterMainMethodDescriptor?: (ctx: MainMethodDescriptorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.mainMethodDescriptor`.
	 * @param ctx the parse tree
	 */
	exitMainMethodDescriptor?: (ctx: MainMethodDescriptorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.methodTypeSignature`.
	 * @param ctx the parse tree
	 */
	enterMethodTypeSignature?: (ctx: MethodTypeSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.methodTypeSignature`.
	 * @param ctx the parse tree
	 */
	exitMethodTypeSignature?: (ctx: MethodTypeSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.formalTypeParameters`.
	 * @param ctx the parse tree
	 */
	enterFormalTypeParameters?: (ctx: FormalTypeParametersContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.formalTypeParameters`.
	 * @param ctx the parse tree
	 */
	exitFormalTypeParameters?: (ctx: FormalTypeParametersContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.formalTypeParameter`.
	 * @param ctx the parse tree
	 */
	enterFormalTypeParameter?: (ctx: FormalTypeParameterContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.formalTypeParameter`.
	 * @param ctx the parse tree
	 */
	exitFormalTypeParameter?: (ctx: FormalTypeParameterContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.classBound`.
	 * @param ctx the parse tree
	 */
	enterClassBound?: (ctx: ClassBoundContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.classBound`.
	 * @param ctx the parse tree
	 */
	exitClassBound?: (ctx: ClassBoundContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.interfaceBound`.
	 * @param ctx the parse tree
	 */
	enterInterfaceBound?: (ctx: InterfaceBoundContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.interfaceBound`.
	 * @param ctx the parse tree
	 */
	exitInterfaceBound?: (ctx: InterfaceBoundContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.fieldTypeSignature`.
	 * @param ctx the parse tree
	 */
	enterFieldTypeSignature?: (ctx: FieldTypeSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.fieldTypeSignature`.
	 * @param ctx the parse tree
	 */
	exitFieldTypeSignature?: (ctx: FieldTypeSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.classTypeSignature`.
	 * @param ctx the parse tree
	 */
	enterClassTypeSignature?: (ctx: ClassTypeSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.classTypeSignature`.
	 * @param ctx the parse tree
	 */
	exitClassTypeSignature?: (ctx: ClassTypeSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.simpleClassTypeSignature`.
	 * @param ctx the parse tree
	 */
	enterSimpleClassTypeSignature?: (ctx: SimpleClassTypeSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.simpleClassTypeSignature`.
	 * @param ctx the parse tree
	 */
	exitSimpleClassTypeSignature?: (ctx: SimpleClassTypeSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.classTypeSignatureSuffix`.
	 * @param ctx the parse tree
	 */
	enterClassTypeSignatureSuffix?: (ctx: ClassTypeSignatureSuffixContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.classTypeSignatureSuffix`.
	 * @param ctx the parse tree
	 */
	exitClassTypeSignatureSuffix?: (ctx: ClassTypeSignatureSuffixContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.typeVariableSignature`.
	 * @param ctx the parse tree
	 */
	enterTypeVariableSignature?: (ctx: TypeVariableSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.typeVariableSignature`.
	 * @param ctx the parse tree
	 */
	exitTypeVariableSignature?: (ctx: TypeVariableSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.typeArguments`.
	 * @param ctx the parse tree
	 */
	enterTypeArguments?: (ctx: TypeArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.typeArguments`.
	 * @param ctx the parse tree
	 */
	exitTypeArguments?: (ctx: TypeArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.typeArgument`.
	 * @param ctx the parse tree
	 */
	enterTypeArgument?: (ctx: TypeArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.typeArgument`.
	 * @param ctx the parse tree
	 */
	exitTypeArgument?: (ctx: TypeArgumentContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.wildcardIndicator`.
	 * @param ctx the parse tree
	 */
	enterWildcardIndicator?: (ctx: WildcardIndicatorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.wildcardIndicator`.
	 * @param ctx the parse tree
	 */
	exitWildcardIndicator?: (ctx: WildcardIndicatorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.methodDescriptor`.
	 * @param ctx the parse tree
	 */
	enterMethodDescriptor?: (ctx: MethodDescriptorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.methodDescriptor`.
	 * @param ctx the parse tree
	 */
	exitMethodDescriptor?: (ctx: MethodDescriptorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.fieldDescriptor`.
	 * @param ctx the parse tree
	 */
	enterFieldDescriptor?: (ctx: FieldDescriptorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.fieldDescriptor`.
	 * @param ctx the parse tree
	 */
	exitFieldDescriptor?: (ctx: FieldDescriptorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.fieldType`.
	 * @param ctx the parse tree
	 */
	enterFieldType?: (ctx: FieldTypeContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.fieldType`.
	 * @param ctx the parse tree
	 */
	exitFieldType?: (ctx: FieldTypeContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.baseType`.
	 * @param ctx the parse tree
	 */
	enterBaseType?: (ctx: BaseTypeContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.baseType`.
	 * @param ctx the parse tree
	 */
	exitBaseType?: (ctx: BaseTypeContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.objectType`.
	 * @param ctx the parse tree
	 */
	enterObjectType?: (ctx: ObjectTypeContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.objectType`.
	 * @param ctx the parse tree
	 */
	exitObjectType?: (ctx: ObjectTypeContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.className`.
	 * @param ctx the parse tree
	 */
	enterClassName?: (ctx: ClassNameContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.className`.
	 * @param ctx the parse tree
	 */
	exitClassName?: (ctx: ClassNameContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.arrayType`.
	 * @param ctx the parse tree
	 */
	enterArrayType?: (ctx: ArrayTypeContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.arrayType`.
	 * @param ctx the parse tree
	 */
	exitArrayType?: (ctx: ArrayTypeContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.parameterDescriptor`.
	 * @param ctx the parse tree
	 */
	enterParameterDescriptor?: (ctx: ParameterDescriptorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.parameterDescriptor`.
	 * @param ctx the parse tree
	 */
	exitParameterDescriptor?: (ctx: ParameterDescriptorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.returnDescriptor`.
	 * @param ctx the parse tree
	 */
	enterReturnDescriptor?: (ctx: ReturnDescriptorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.returnDescriptor`.
	 * @param ctx the parse tree
	 */
	exitReturnDescriptor?: (ctx: ReturnDescriptorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.voidDescriptor`.
	 * @param ctx the parse tree
	 */
	enterVoidDescriptor?: (ctx: VoidDescriptorContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.voidDescriptor`.
	 * @param ctx the parse tree
	 */
	exitVoidDescriptor?: (ctx: VoidDescriptorContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.classSignature`.
	 * @param ctx the parse tree
	 */
	enterClassSignature?: (ctx: ClassSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.classSignature`.
	 * @param ctx the parse tree
	 */
	exitClassSignature?: (ctx: ClassSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.superclassSignature`.
	 * @param ctx the parse tree
	 */
	enterSuperclassSignature?: (ctx: SuperclassSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.superclassSignature`.
	 * @param ctx the parse tree
	 */
	exitSuperclassSignature?: (ctx: SuperclassSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.superinterfaceSignature`.
	 * @param ctx the parse tree
	 */
	enterSuperinterfaceSignature?: (ctx: SuperinterfaceSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.superinterfaceSignature`.
	 * @param ctx the parse tree
	 */
	exitSuperinterfaceSignature?: (ctx: SuperinterfaceSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.arrayTypeSignature`.
	 * @param ctx the parse tree
	 */
	enterArrayTypeSignature?: (ctx: ArrayTypeSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.arrayTypeSignature`.
	 * @param ctx the parse tree
	 */
	exitArrayTypeSignature?: (ctx: ArrayTypeSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.typeSignature`.
	 * @param ctx the parse tree
	 */
	enterTypeSignature?: (ctx: TypeSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.typeSignature`.
	 * @param ctx the parse tree
	 */
	exitTypeSignature?: (ctx: TypeSignatureContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.returnType`.
	 * @param ctx the parse tree
	 */
	enterReturnType?: (ctx: ReturnTypeContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.returnType`.
	 * @param ctx the parse tree
	 */
	exitReturnType?: (ctx: ReturnTypeContext) => void;

	/**
	 * Enter a parse tree produced by `JavaClassParser.throwsSignature`.
	 * @param ctx the parse tree
	 */
	enterThrowsSignature?: (ctx: ThrowsSignatureContext) => void;
	/**
	 * Exit a parse tree produced by `JavaClassParser.throwsSignature`.
	 * @param ctx the parse tree
	 */
	exitThrowsSignature?: (ctx: ThrowsSignatureContext) => void;
}

