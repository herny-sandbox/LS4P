// Generated from c:\Users\User\Documents\LS4Pv3\server\grammar\JavaClassParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `JavaClassParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface JavaClassParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `JavaClassParser.mainMethodDescriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMainMethodDescriptor?: (ctx: MainMethodDescriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.methodTypeSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodTypeSignature?: (ctx: MethodTypeSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.formalTypeParameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalTypeParameters?: (ctx: FormalTypeParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.formalTypeParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalTypeParameter?: (ctx: FormalTypeParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.classBound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassBound?: (ctx: ClassBoundContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.interfaceBound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceBound?: (ctx: InterfaceBoundContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.fieldTypeSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldTypeSignature?: (ctx: FieldTypeSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.classTypeSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassTypeSignature?: (ctx: ClassTypeSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.simpleClassTypeSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleClassTypeSignature?: (ctx: SimpleClassTypeSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.classTypeSignatureSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassTypeSignatureSuffix?: (ctx: ClassTypeSignatureSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.typeVariableSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeVariableSignature?: (ctx: TypeVariableSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.typeArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeArguments?: (ctx: TypeArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.typeArgument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeArgument?: (ctx: TypeArgumentContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.wildcardIndicator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWildcardIndicator?: (ctx: WildcardIndicatorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.methodDescriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodDescriptor?: (ctx: MethodDescriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.fieldDescriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldDescriptor?: (ctx: FieldDescriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.fieldType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldType?: (ctx: FieldTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.baseType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBaseType?: (ctx: BaseTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.objectType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectType?: (ctx: ObjectTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.className`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassName?: (ctx: ClassNameContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.arrayType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayType?: (ctx: ArrayTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.parameterDescriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterDescriptor?: (ctx: ParameterDescriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.returnDescriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnDescriptor?: (ctx: ReturnDescriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.voidDescriptor`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVoidDescriptor?: (ctx: VoidDescriptorContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.classSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassSignature?: (ctx: ClassSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.superclassSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperclassSignature?: (ctx: SuperclassSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.superinterfaceSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperinterfaceSignature?: (ctx: SuperinterfaceSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.arrayTypeSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayTypeSignature?: (ctx: ArrayTypeSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.typeSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeSignature?: (ctx: TypeSignatureContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.returnType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnType?: (ctx: ReturnTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `JavaClassParser.throwsSignature`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThrowsSignature?: (ctx: ThrowsSignatureContext) => Result;
}

