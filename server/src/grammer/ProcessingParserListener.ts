// Generated from c:\Users\User\Documents\LS4Pv3\server\grammar\ProcessingParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProcessingSketchContext } from "./ProcessingParser";
import { CompilationUnitContext } from "./ProcessingParser";
import { PackageDeclarationContext } from "./ProcessingParser";
import { ImportDeclarationContext } from "./ProcessingParser";
import { TypeDeclarationContext } from "./ProcessingParser";
import { ModifierContext } from "./ProcessingParser";
import { ClassOrInterfaceModifierContext } from "./ProcessingParser";
import { VariableModifierContext } from "./ProcessingParser";
import { ClassDeclarationContext } from "./ProcessingParser";
import { TypeParametersContext } from "./ProcessingParser";
import { TypeParameterContext } from "./ProcessingParser";
import { TypeBoundContext } from "./ProcessingParser";
import { EnumDeclarationContext } from "./ProcessingParser";
import { EnumConstantsContext } from "./ProcessingParser";
import { EnumConstantContext } from "./ProcessingParser";
import { EnumBodyDeclarationsContext } from "./ProcessingParser";
import { InterfaceDeclarationContext } from "./ProcessingParser";
import { ClassBodyContext } from "./ProcessingParser";
import { InterfaceBodyContext } from "./ProcessingParser";
import { ClassBodyDeclarationContext } from "./ProcessingParser";
import { MemberDeclarationContext } from "./ProcessingParser";
import { MethodDeclarationContext } from "./ProcessingParser";
import { MethodBodyContext } from "./ProcessingParser";
import { TypeTypeOrVoidContext } from "./ProcessingParser";
import { GenericMethodDeclarationContext } from "./ProcessingParser";
import { GenericConstructorDeclarationContext } from "./ProcessingParser";
import { ConstructorDeclarationContext } from "./ProcessingParser";
import { FieldDeclarationContext } from "./ProcessingParser";
import { InterfaceBodyDeclarationContext } from "./ProcessingParser";
import { InterfaceMemberDeclarationContext } from "./ProcessingParser";
import { ConstDeclarationContext } from "./ProcessingParser";
import { ConstantDeclaratorContext } from "./ProcessingParser";
import { InterfaceMethodDeclarationContext } from "./ProcessingParser";
import { InterfaceMethodModifierContext } from "./ProcessingParser";
import { GenericInterfaceMethodDeclarationContext } from "./ProcessingParser";
import { VariableDeclaratorsContext } from "./ProcessingParser";
import { VariableDeclaratorContext } from "./ProcessingParser";
import { VariableInitializerContext } from "./ProcessingParser";
import { ArrayInitializerContext } from "./ProcessingParser";
import { ClassOrInterfaceTypeContext } from "./ProcessingParser";
import { ClassOrInterfaceIdentifierContext } from "./ProcessingParser";
import { TypeArgumentContext } from "./ProcessingParser";
import { QualifiedNameListContext } from "./ProcessingParser";
import { FormalParametersContext } from "./ProcessingParser";
import { FormalParameterListContext } from "./ProcessingParser";
import { FormalParameterContext } from "./ProcessingParser";
import { LastFormalParameterContext } from "./ProcessingParser";
import { BaseStringLiteralContext } from "./ProcessingParser";
import { MultilineStringLiteralContext } from "./ProcessingParser";
import { StringLiteralContext } from "./ProcessingParser";
import { IntegerLiteralContext } from "./ProcessingParser";
import { FloatLiteralContext } from "./ProcessingParser";
import { AnnotationContext } from "./ProcessingParser";
import { ElementValuePairsContext } from "./ProcessingParser";
import { ElementValuePairContext } from "./ProcessingParser";
import { ElementValueContext } from "./ProcessingParser";
import { ElementValueArrayInitializerContext } from "./ProcessingParser";
import { AnnotationTypeDeclarationContext } from "./ProcessingParser";
import { AnnotationTypeBodyContext } from "./ProcessingParser";
import { AnnotationTypeElementDeclarationContext } from "./ProcessingParser";
import { AnnotationTypeElementRestContext } from "./ProcessingParser";
import { AnnotationMethodOrConstantRestContext } from "./ProcessingParser";
import { AnnotationMethodRestContext } from "./ProcessingParser";
import { AnnotationConstantRestContext } from "./ProcessingParser";
import { DefaultValueContext } from "./ProcessingParser";
import { BlockContext } from "./ProcessingParser";
import { BlockStatementContext } from "./ProcessingParser";
import { LocalVariableDeclarationContext } from "./ProcessingParser";
import { LocalTypeDeclarationContext } from "./ProcessingParser";
import { StatementContext } from "./ProcessingParser";
import { CatchClauseContext } from "./ProcessingParser";
import { CatchTypeContext } from "./ProcessingParser";
import { FinallyBlockContext } from "./ProcessingParser";
import { ResourceSpecificationContext } from "./ProcessingParser";
import { ResourcesContext } from "./ProcessingParser";
import { ResourceContext } from "./ProcessingParser";
import { SwitchBlockStatementGroupContext } from "./ProcessingParser";
import { SwitchLabelContext } from "./ProcessingParser";
import { ForLoopContext } from "./ProcessingParser";
import { ForControlContext } from "./ProcessingParser";
import { ForInitContext } from "./ProcessingParser";
import { EnhancedForControlContext } from "./ProcessingParser";
import { ParExpressionContext } from "./ProcessingParser";
import { ExpressionListContext } from "./ProcessingParser";
import { ExpressionContext } from "./ProcessingParser";
import { LambdaExpressionContext } from "./ProcessingParser";
import { LambdaParametersContext } from "./ProcessingParser";
import { LambdaBodyContext } from "./ProcessingParser";
import { PrimaryContext } from "./ProcessingParser";
import { ClassTypeContext } from "./ProcessingParser";
import { CreatorContext } from "./ProcessingParser";
import { CreatedNameContext } from "./ProcessingParser";
import { InnerCreatorContext } from "./ProcessingParser";
import { ArrayCreatorRestContext } from "./ProcessingParser";
import { ClassCreatorRestContext } from "./ProcessingParser";
import { ExplicitGenericInvocationContext } from "./ProcessingParser";
import { TypeArgumentsOrDiamondContext } from "./ProcessingParser";
import { NonWildcardTypeArgumentsOrDiamondContext } from "./ProcessingParser";
import { NonWildcardTypeArgumentsContext } from "./ProcessingParser";
import { TypeListContext } from "./ProcessingParser";
import { TypeTypeContext } from "./ProcessingParser";
import { TypeArgumentsContext } from "./ProcessingParser";
import { SuperSuffixContext } from "./ProcessingParser";
import { ExplicitGenericInvocationSuffixContext } from "./ProcessingParser";
import { ArgumentsContext } from "./ProcessingParser";
import { JavaProcessingSketchContext } from "./ProcessingParser";
import { StaticProcessingSketchContext } from "./ProcessingParser";
import { ActiveProcessingSketchContext } from "./ProcessingParser";
import { WarnMixedModesContext } from "./ProcessingParser";
import { VariableDeclaratorIdContext } from "./ProcessingParser";
import { WarnTypeAsVariableNameContext } from "./ProcessingParser";
import { MethodCallContext } from "./ProcessingParser";
import { FunctionWithPrimitiveTypeNameContext } from "./ProcessingParser";
import { PrimitiveTypeContext } from "./ProcessingParser";
import { ColorPrimitiveTypeContext } from "./ProcessingParser";
import { QualifiedNameContext } from "./ProcessingParser";
import { LiteralContext } from "./ProcessingParser";
import { HexColorLiteralContext } from "./ProcessingParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ProcessingParser`.
 */
export interface ProcessingParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ProcessingParser.processingSketch`.
	 * @param ctx the parse tree
	 */
	enterProcessingSketch?: (ctx: ProcessingSketchContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.processingSketch`.
	 * @param ctx the parse tree
	 */
	exitProcessingSketch?: (ctx: ProcessingSketchContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	exitCompilationUnit?: (ctx: CompilationUnitContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.packageDeclaration`.
	 * @param ctx the parse tree
	 */
	enterPackageDeclaration?: (ctx: PackageDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.packageDeclaration`.
	 * @param ctx the parse tree
	 */
	exitPackageDeclaration?: (ctx: PackageDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.importDeclaration`.
	 * @param ctx the parse tree
	 */
	enterImportDeclaration?: (ctx: ImportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.importDeclaration`.
	 * @param ctx the parse tree
	 */
	exitImportDeclaration?: (ctx: ImportDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeDeclaration`.
	 * @param ctx the parse tree
	 */
	enterTypeDeclaration?: (ctx: TypeDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeDeclaration`.
	 * @param ctx the parse tree
	 */
	exitTypeDeclaration?: (ctx: TypeDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.modifier`.
	 * @param ctx the parse tree
	 */
	enterModifier?: (ctx: ModifierContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.modifier`.
	 * @param ctx the parse tree
	 */
	exitModifier?: (ctx: ModifierContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classOrInterfaceModifier`.
	 * @param ctx the parse tree
	 */
	enterClassOrInterfaceModifier?: (ctx: ClassOrInterfaceModifierContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classOrInterfaceModifier`.
	 * @param ctx the parse tree
	 */
	exitClassOrInterfaceModifier?: (ctx: ClassOrInterfaceModifierContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.variableModifier`.
	 * @param ctx the parse tree
	 */
	enterVariableModifier?: (ctx: VariableModifierContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.variableModifier`.
	 * @param ctx the parse tree
	 */
	exitVariableModifier?: (ctx: VariableModifierContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classDeclaration`.
	 * @param ctx the parse tree
	 */
	enterClassDeclaration?: (ctx: ClassDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classDeclaration`.
	 * @param ctx the parse tree
	 */
	exitClassDeclaration?: (ctx: ClassDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeParameters`.
	 * @param ctx the parse tree
	 */
	enterTypeParameters?: (ctx: TypeParametersContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeParameters`.
	 * @param ctx the parse tree
	 */
	exitTypeParameters?: (ctx: TypeParametersContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeParameter`.
	 * @param ctx the parse tree
	 */
	enterTypeParameter?: (ctx: TypeParameterContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeParameter`.
	 * @param ctx the parse tree
	 */
	exitTypeParameter?: (ctx: TypeParameterContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeBound`.
	 * @param ctx the parse tree
	 */
	enterTypeBound?: (ctx: TypeBoundContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeBound`.
	 * @param ctx the parse tree
	 */
	exitTypeBound?: (ctx: TypeBoundContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	enterEnumDeclaration?: (ctx: EnumDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.enumDeclaration`.
	 * @param ctx the parse tree
	 */
	exitEnumDeclaration?: (ctx: EnumDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.enumConstants`.
	 * @param ctx the parse tree
	 */
	enterEnumConstants?: (ctx: EnumConstantsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.enumConstants`.
	 * @param ctx the parse tree
	 */
	exitEnumConstants?: (ctx: EnumConstantsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.enumConstant`.
	 * @param ctx the parse tree
	 */
	enterEnumConstant?: (ctx: EnumConstantContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.enumConstant`.
	 * @param ctx the parse tree
	 */
	exitEnumConstant?: (ctx: EnumConstantContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.enumBodyDeclarations`.
	 * @param ctx the parse tree
	 */
	enterEnumBodyDeclarations?: (ctx: EnumBodyDeclarationsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.enumBodyDeclarations`.
	 * @param ctx the parse tree
	 */
	exitEnumBodyDeclarations?: (ctx: EnumBodyDeclarationsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.interfaceDeclaration`.
	 * @param ctx the parse tree
	 */
	enterInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.interfaceDeclaration`.
	 * @param ctx the parse tree
	 */
	exitInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classBody`.
	 * @param ctx the parse tree
	 */
	enterClassBody?: (ctx: ClassBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classBody`.
	 * @param ctx the parse tree
	 */
	exitClassBody?: (ctx: ClassBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.interfaceBody`.
	 * @param ctx the parse tree
	 */
	enterInterfaceBody?: (ctx: InterfaceBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.interfaceBody`.
	 * @param ctx the parse tree
	 */
	exitInterfaceBody?: (ctx: InterfaceBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classBodyDeclaration`.
	 * @param ctx the parse tree
	 */
	enterClassBodyDeclaration?: (ctx: ClassBodyDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classBodyDeclaration`.
	 * @param ctx the parse tree
	 */
	exitClassBodyDeclaration?: (ctx: ClassBodyDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.memberDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMemberDeclaration?: (ctx: MemberDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.memberDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMemberDeclaration?: (ctx: MemberDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.methodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMethodDeclaration?: (ctx: MethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.methodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMethodDeclaration?: (ctx: MethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.methodBody`.
	 * @param ctx the parse tree
	 */
	enterMethodBody?: (ctx: MethodBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.methodBody`.
	 * @param ctx the parse tree
	 */
	exitMethodBody?: (ctx: MethodBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeTypeOrVoid`.
	 * @param ctx the parse tree
	 */
	enterTypeTypeOrVoid?: (ctx: TypeTypeOrVoidContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeTypeOrVoid`.
	 * @param ctx the parse tree
	 */
	exitTypeTypeOrVoid?: (ctx: TypeTypeOrVoidContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.genericMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGenericMethodDeclaration?: (ctx: GenericMethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.genericMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGenericMethodDeclaration?: (ctx: GenericMethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.genericConstructorDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGenericConstructorDeclaration?: (ctx: GenericConstructorDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.genericConstructorDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGenericConstructorDeclaration?: (ctx: GenericConstructorDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.constructorDeclaration`.
	 * @param ctx the parse tree
	 */
	enterConstructorDeclaration?: (ctx: ConstructorDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.constructorDeclaration`.
	 * @param ctx the parse tree
	 */
	exitConstructorDeclaration?: (ctx: ConstructorDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.fieldDeclaration`.
	 * @param ctx the parse tree
	 */
	enterFieldDeclaration?: (ctx: FieldDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.fieldDeclaration`.
	 * @param ctx the parse tree
	 */
	exitFieldDeclaration?: (ctx: FieldDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.interfaceBodyDeclaration`.
	 * @param ctx the parse tree
	 */
	enterInterfaceBodyDeclaration?: (ctx: InterfaceBodyDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.interfaceBodyDeclaration`.
	 * @param ctx the parse tree
	 */
	exitInterfaceBodyDeclaration?: (ctx: InterfaceBodyDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.interfaceMemberDeclaration`.
	 * @param ctx the parse tree
	 */
	enterInterfaceMemberDeclaration?: (ctx: InterfaceMemberDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.interfaceMemberDeclaration`.
	 * @param ctx the parse tree
	 */
	exitInterfaceMemberDeclaration?: (ctx: InterfaceMemberDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.constDeclaration`.
	 * @param ctx the parse tree
	 */
	enterConstDeclaration?: (ctx: ConstDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.constDeclaration`.
	 * @param ctx the parse tree
	 */
	exitConstDeclaration?: (ctx: ConstDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.constantDeclarator`.
	 * @param ctx the parse tree
	 */
	enterConstantDeclarator?: (ctx: ConstantDeclaratorContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.constantDeclarator`.
	 * @param ctx the parse tree
	 */
	exitConstantDeclarator?: (ctx: ConstantDeclaratorContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.interfaceMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterInterfaceMethodDeclaration?: (ctx: InterfaceMethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.interfaceMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitInterfaceMethodDeclaration?: (ctx: InterfaceMethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.interfaceMethodModifier`.
	 * @param ctx the parse tree
	 */
	enterInterfaceMethodModifier?: (ctx: InterfaceMethodModifierContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.interfaceMethodModifier`.
	 * @param ctx the parse tree
	 */
	exitInterfaceMethodModifier?: (ctx: InterfaceMethodModifierContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.genericInterfaceMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGenericInterfaceMethodDeclaration?: (ctx: GenericInterfaceMethodDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.genericInterfaceMethodDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGenericInterfaceMethodDeclaration?: (ctx: GenericInterfaceMethodDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.variableDeclarators`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclarators?: (ctx: VariableDeclaratorsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.variableDeclarators`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclarators?: (ctx: VariableDeclaratorsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.variableDeclarator`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.variableDeclarator`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclarator?: (ctx: VariableDeclaratorContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.variableInitializer`.
	 * @param ctx the parse tree
	 */
	enterVariableInitializer?: (ctx: VariableInitializerContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.variableInitializer`.
	 * @param ctx the parse tree
	 */
	exitVariableInitializer?: (ctx: VariableInitializerContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.arrayInitializer`.
	 * @param ctx the parse tree
	 */
	enterArrayInitializer?: (ctx: ArrayInitializerContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.arrayInitializer`.
	 * @param ctx the parse tree
	 */
	exitArrayInitializer?: (ctx: ArrayInitializerContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classOrInterfaceType`.
	 * @param ctx the parse tree
	 */
	enterClassOrInterfaceType?: (ctx: ClassOrInterfaceTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classOrInterfaceType`.
	 * @param ctx the parse tree
	 */
	exitClassOrInterfaceType?: (ctx: ClassOrInterfaceTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classOrInterfaceIdentifier`.
	 * @param ctx the parse tree
	 */
	enterClassOrInterfaceIdentifier?: (ctx: ClassOrInterfaceIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classOrInterfaceIdentifier`.
	 * @param ctx the parse tree
	 */
	exitClassOrInterfaceIdentifier?: (ctx: ClassOrInterfaceIdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeArgument`.
	 * @param ctx the parse tree
	 */
	enterTypeArgument?: (ctx: TypeArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeArgument`.
	 * @param ctx the parse tree
	 */
	exitTypeArgument?: (ctx: TypeArgumentContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.qualifiedNameList`.
	 * @param ctx the parse tree
	 */
	enterQualifiedNameList?: (ctx: QualifiedNameListContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.qualifiedNameList`.
	 * @param ctx the parse tree
	 */
	exitQualifiedNameList?: (ctx: QualifiedNameListContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.formalParameters`.
	 * @param ctx the parse tree
	 */
	enterFormalParameters?: (ctx: FormalParametersContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.formalParameters`.
	 * @param ctx the parse tree
	 */
	exitFormalParameters?: (ctx: FormalParametersContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.formalParameterList`.
	 * @param ctx the parse tree
	 */
	enterFormalParameterList?: (ctx: FormalParameterListContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.formalParameterList`.
	 * @param ctx the parse tree
	 */
	exitFormalParameterList?: (ctx: FormalParameterListContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.formalParameter`.
	 * @param ctx the parse tree
	 */
	enterFormalParameter?: (ctx: FormalParameterContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.formalParameter`.
	 * @param ctx the parse tree
	 */
	exitFormalParameter?: (ctx: FormalParameterContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.lastFormalParameter`.
	 * @param ctx the parse tree
	 */
	enterLastFormalParameter?: (ctx: LastFormalParameterContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.lastFormalParameter`.
	 * @param ctx the parse tree
	 */
	exitLastFormalParameter?: (ctx: LastFormalParameterContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.baseStringLiteral`.
	 * @param ctx the parse tree
	 */
	enterBaseStringLiteral?: (ctx: BaseStringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.baseStringLiteral`.
	 * @param ctx the parse tree
	 */
	exitBaseStringLiteral?: (ctx: BaseStringLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.multilineStringLiteral`.
	 * @param ctx the parse tree
	 */
	enterMultilineStringLiteral?: (ctx: MultilineStringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.multilineStringLiteral`.
	 * @param ctx the parse tree
	 */
	exitMultilineStringLiteral?: (ctx: MultilineStringLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.stringLiteral`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.stringLiteral`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.integerLiteral`.
	 * @param ctx the parse tree
	 */
	enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.integerLiteral`.
	 * @param ctx the parse tree
	 */
	exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.floatLiteral`.
	 * @param ctx the parse tree
	 */
	enterFloatLiteral?: (ctx: FloatLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.floatLiteral`.
	 * @param ctx the parse tree
	 */
	exitFloatLiteral?: (ctx: FloatLiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotation`.
	 * @param ctx the parse tree
	 */
	enterAnnotation?: (ctx: AnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotation`.
	 * @param ctx the parse tree
	 */
	exitAnnotation?: (ctx: AnnotationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.elementValuePairs`.
	 * @param ctx the parse tree
	 */
	enterElementValuePairs?: (ctx: ElementValuePairsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.elementValuePairs`.
	 * @param ctx the parse tree
	 */
	exitElementValuePairs?: (ctx: ElementValuePairsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.elementValuePair`.
	 * @param ctx the parse tree
	 */
	enterElementValuePair?: (ctx: ElementValuePairContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.elementValuePair`.
	 * @param ctx the parse tree
	 */
	exitElementValuePair?: (ctx: ElementValuePairContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.elementValue`.
	 * @param ctx the parse tree
	 */
	enterElementValue?: (ctx: ElementValueContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.elementValue`.
	 * @param ctx the parse tree
	 */
	exitElementValue?: (ctx: ElementValueContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.elementValueArrayInitializer`.
	 * @param ctx the parse tree
	 */
	enterElementValueArrayInitializer?: (ctx: ElementValueArrayInitializerContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.elementValueArrayInitializer`.
	 * @param ctx the parse tree
	 */
	exitElementValueArrayInitializer?: (ctx: ElementValueArrayInitializerContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationTypeDeclaration`.
	 * @param ctx the parse tree
	 */
	enterAnnotationTypeDeclaration?: (ctx: AnnotationTypeDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationTypeDeclaration`.
	 * @param ctx the parse tree
	 */
	exitAnnotationTypeDeclaration?: (ctx: AnnotationTypeDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationTypeBody`.
	 * @param ctx the parse tree
	 */
	enterAnnotationTypeBody?: (ctx: AnnotationTypeBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationTypeBody`.
	 * @param ctx the parse tree
	 */
	exitAnnotationTypeBody?: (ctx: AnnotationTypeBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationTypeElementDeclaration`.
	 * @param ctx the parse tree
	 */
	enterAnnotationTypeElementDeclaration?: (ctx: AnnotationTypeElementDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationTypeElementDeclaration`.
	 * @param ctx the parse tree
	 */
	exitAnnotationTypeElementDeclaration?: (ctx: AnnotationTypeElementDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationTypeElementRest`.
	 * @param ctx the parse tree
	 */
	enterAnnotationTypeElementRest?: (ctx: AnnotationTypeElementRestContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationTypeElementRest`.
	 * @param ctx the parse tree
	 */
	exitAnnotationTypeElementRest?: (ctx: AnnotationTypeElementRestContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationMethodOrConstantRest`.
	 * @param ctx the parse tree
	 */
	enterAnnotationMethodOrConstantRest?: (ctx: AnnotationMethodOrConstantRestContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationMethodOrConstantRest`.
	 * @param ctx the parse tree
	 */
	exitAnnotationMethodOrConstantRest?: (ctx: AnnotationMethodOrConstantRestContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationMethodRest`.
	 * @param ctx the parse tree
	 */
	enterAnnotationMethodRest?: (ctx: AnnotationMethodRestContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationMethodRest`.
	 * @param ctx the parse tree
	 */
	exitAnnotationMethodRest?: (ctx: AnnotationMethodRestContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.annotationConstantRest`.
	 * @param ctx the parse tree
	 */
	enterAnnotationConstantRest?: (ctx: AnnotationConstantRestContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.annotationConstantRest`.
	 * @param ctx the parse tree
	 */
	exitAnnotationConstantRest?: (ctx: AnnotationConstantRestContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.defaultValue`.
	 * @param ctx the parse tree
	 */
	enterDefaultValue?: (ctx: DefaultValueContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.defaultValue`.
	 * @param ctx the parse tree
	 */
	exitDefaultValue?: (ctx: DefaultValueContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.blockStatement`.
	 * @param ctx the parse tree
	 */
	enterBlockStatement?: (ctx: BlockStatementContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.blockStatement`.
	 * @param ctx the parse tree
	 */
	exitBlockStatement?: (ctx: BlockStatementContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.localVariableDeclaration`.
	 * @param ctx the parse tree
	 */
	enterLocalVariableDeclaration?: (ctx: LocalVariableDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.localVariableDeclaration`.
	 * @param ctx the parse tree
	 */
	exitLocalVariableDeclaration?: (ctx: LocalVariableDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.localTypeDeclaration`.
	 * @param ctx the parse tree
	 */
	enterLocalTypeDeclaration?: (ctx: LocalTypeDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.localTypeDeclaration`.
	 * @param ctx the parse tree
	 */
	exitLocalTypeDeclaration?: (ctx: LocalTypeDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.catchClause`.
	 * @param ctx the parse tree
	 */
	enterCatchClause?: (ctx: CatchClauseContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.catchClause`.
	 * @param ctx the parse tree
	 */
	exitCatchClause?: (ctx: CatchClauseContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.catchType`.
	 * @param ctx the parse tree
	 */
	enterCatchType?: (ctx: CatchTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.catchType`.
	 * @param ctx the parse tree
	 */
	exitCatchType?: (ctx: CatchTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.finallyBlock`.
	 * @param ctx the parse tree
	 */
	enterFinallyBlock?: (ctx: FinallyBlockContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.finallyBlock`.
	 * @param ctx the parse tree
	 */
	exitFinallyBlock?: (ctx: FinallyBlockContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.resourceSpecification`.
	 * @param ctx the parse tree
	 */
	enterResourceSpecification?: (ctx: ResourceSpecificationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.resourceSpecification`.
	 * @param ctx the parse tree
	 */
	exitResourceSpecification?: (ctx: ResourceSpecificationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.resources`.
	 * @param ctx the parse tree
	 */
	enterResources?: (ctx: ResourcesContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.resources`.
	 * @param ctx the parse tree
	 */
	exitResources?: (ctx: ResourcesContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.resource`.
	 * @param ctx the parse tree
	 */
	enterResource?: (ctx: ResourceContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.resource`.
	 * @param ctx the parse tree
	 */
	exitResource?: (ctx: ResourceContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.switchBlockStatementGroup`.
	 * @param ctx the parse tree
	 */
	enterSwitchBlockStatementGroup?: (ctx: SwitchBlockStatementGroupContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.switchBlockStatementGroup`.
	 * @param ctx the parse tree
	 */
	exitSwitchBlockStatementGroup?: (ctx: SwitchBlockStatementGroupContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.switchLabel`.
	 * @param ctx the parse tree
	 */
	enterSwitchLabel?: (ctx: SwitchLabelContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.switchLabel`.
	 * @param ctx the parse tree
	 */
	exitSwitchLabel?: (ctx: SwitchLabelContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.forLoop`.
	 * @param ctx the parse tree
	 */
	enterForLoop?: (ctx: ForLoopContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.forLoop`.
	 * @param ctx the parse tree
	 */
	exitForLoop?: (ctx: ForLoopContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.forControl`.
	 * @param ctx the parse tree
	 */
	enterForControl?: (ctx: ForControlContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.forControl`.
	 * @param ctx the parse tree
	 */
	exitForControl?: (ctx: ForControlContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.forInit`.
	 * @param ctx the parse tree
	 */
	enterForInit?: (ctx: ForInitContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.forInit`.
	 * @param ctx the parse tree
	 */
	exitForInit?: (ctx: ForInitContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.enhancedForControl`.
	 * @param ctx the parse tree
	 */
	enterEnhancedForControl?: (ctx: EnhancedForControlContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.enhancedForControl`.
	 * @param ctx the parse tree
	 */
	exitEnhancedForControl?: (ctx: EnhancedForControlContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.parExpression`.
	 * @param ctx the parse tree
	 */
	enterParExpression?: (ctx: ParExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.parExpression`.
	 * @param ctx the parse tree
	 */
	exitParExpression?: (ctx: ParExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.expressionList`.
	 * @param ctx the parse tree
	 */
	enterExpressionList?: (ctx: ExpressionListContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.expressionList`.
	 * @param ctx the parse tree
	 */
	exitExpressionList?: (ctx: ExpressionListContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.lambdaExpression`.
	 * @param ctx the parse tree
	 */
	enterLambdaExpression?: (ctx: LambdaExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.lambdaExpression`.
	 * @param ctx the parse tree
	 */
	exitLambdaExpression?: (ctx: LambdaExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.lambdaParameters`.
	 * @param ctx the parse tree
	 */
	enterLambdaParameters?: (ctx: LambdaParametersContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.lambdaParameters`.
	 * @param ctx the parse tree
	 */
	exitLambdaParameters?: (ctx: LambdaParametersContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.lambdaBody`.
	 * @param ctx the parse tree
	 */
	enterLambdaBody?: (ctx: LambdaBodyContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.lambdaBody`.
	 * @param ctx the parse tree
	 */
	exitLambdaBody?: (ctx: LambdaBodyContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.primary`.
	 * @param ctx the parse tree
	 */
	enterPrimary?: (ctx: PrimaryContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.primary`.
	 * @param ctx the parse tree
	 */
	exitPrimary?: (ctx: PrimaryContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classType`.
	 * @param ctx the parse tree
	 */
	enterClassType?: (ctx: ClassTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classType`.
	 * @param ctx the parse tree
	 */
	exitClassType?: (ctx: ClassTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.creator`.
	 * @param ctx the parse tree
	 */
	enterCreator?: (ctx: CreatorContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.creator`.
	 * @param ctx the parse tree
	 */
	exitCreator?: (ctx: CreatorContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.createdName`.
	 * @param ctx the parse tree
	 */
	enterCreatedName?: (ctx: CreatedNameContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.createdName`.
	 * @param ctx the parse tree
	 */
	exitCreatedName?: (ctx: CreatedNameContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.innerCreator`.
	 * @param ctx the parse tree
	 */
	enterInnerCreator?: (ctx: InnerCreatorContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.innerCreator`.
	 * @param ctx the parse tree
	 */
	exitInnerCreator?: (ctx: InnerCreatorContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.arrayCreatorRest`.
	 * @param ctx the parse tree
	 */
	enterArrayCreatorRest?: (ctx: ArrayCreatorRestContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.arrayCreatorRest`.
	 * @param ctx the parse tree
	 */
	exitArrayCreatorRest?: (ctx: ArrayCreatorRestContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.classCreatorRest`.
	 * @param ctx the parse tree
	 */
	enterClassCreatorRest?: (ctx: ClassCreatorRestContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.classCreatorRest`.
	 * @param ctx the parse tree
	 */
	exitClassCreatorRest?: (ctx: ClassCreatorRestContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.explicitGenericInvocation`.
	 * @param ctx the parse tree
	 */
	enterExplicitGenericInvocation?: (ctx: ExplicitGenericInvocationContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.explicitGenericInvocation`.
	 * @param ctx the parse tree
	 */
	exitExplicitGenericInvocation?: (ctx: ExplicitGenericInvocationContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeArgumentsOrDiamond`.
	 * @param ctx the parse tree
	 */
	enterTypeArgumentsOrDiamond?: (ctx: TypeArgumentsOrDiamondContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeArgumentsOrDiamond`.
	 * @param ctx the parse tree
	 */
	exitTypeArgumentsOrDiamond?: (ctx: TypeArgumentsOrDiamondContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.nonWildcardTypeArgumentsOrDiamond`.
	 * @param ctx the parse tree
	 */
	enterNonWildcardTypeArgumentsOrDiamond?: (ctx: NonWildcardTypeArgumentsOrDiamondContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.nonWildcardTypeArgumentsOrDiamond`.
	 * @param ctx the parse tree
	 */
	exitNonWildcardTypeArgumentsOrDiamond?: (ctx: NonWildcardTypeArgumentsOrDiamondContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.nonWildcardTypeArguments`.
	 * @param ctx the parse tree
	 */
	enterNonWildcardTypeArguments?: (ctx: NonWildcardTypeArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.nonWildcardTypeArguments`.
	 * @param ctx the parse tree
	 */
	exitNonWildcardTypeArguments?: (ctx: NonWildcardTypeArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeList`.
	 * @param ctx the parse tree
	 */
	enterTypeList?: (ctx: TypeListContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeList`.
	 * @param ctx the parse tree
	 */
	exitTypeList?: (ctx: TypeListContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeType`.
	 * @param ctx the parse tree
	 */
	enterTypeType?: (ctx: TypeTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeType`.
	 * @param ctx the parse tree
	 */
	exitTypeType?: (ctx: TypeTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.typeArguments`.
	 * @param ctx the parse tree
	 */
	enterTypeArguments?: (ctx: TypeArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.typeArguments`.
	 * @param ctx the parse tree
	 */
	exitTypeArguments?: (ctx: TypeArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.superSuffix`.
	 * @param ctx the parse tree
	 */
	enterSuperSuffix?: (ctx: SuperSuffixContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.superSuffix`.
	 * @param ctx the parse tree
	 */
	exitSuperSuffix?: (ctx: SuperSuffixContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.explicitGenericInvocationSuffix`.
	 * @param ctx the parse tree
	 */
	enterExplicitGenericInvocationSuffix?: (ctx: ExplicitGenericInvocationSuffixContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.explicitGenericInvocationSuffix`.
	 * @param ctx the parse tree
	 */
	exitExplicitGenericInvocationSuffix?: (ctx: ExplicitGenericInvocationSuffixContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.arguments`.
	 * @param ctx the parse tree
	 */
	enterArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.arguments`.
	 * @param ctx the parse tree
	 */
	exitArguments?: (ctx: ArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.javaProcessingSketch`.
	 * @param ctx the parse tree
	 */
	enterJavaProcessingSketch?: (ctx: JavaProcessingSketchContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.javaProcessingSketch`.
	 * @param ctx the parse tree
	 */
	exitJavaProcessingSketch?: (ctx: JavaProcessingSketchContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.staticProcessingSketch`.
	 * @param ctx the parse tree
	 */
	enterStaticProcessingSketch?: (ctx: StaticProcessingSketchContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.staticProcessingSketch`.
	 * @param ctx the parse tree
	 */
	exitStaticProcessingSketch?: (ctx: StaticProcessingSketchContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.activeProcessingSketch`.
	 * @param ctx the parse tree
	 */
	enterActiveProcessingSketch?: (ctx: ActiveProcessingSketchContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.activeProcessingSketch`.
	 * @param ctx the parse tree
	 */
	exitActiveProcessingSketch?: (ctx: ActiveProcessingSketchContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.warnMixedModes`.
	 * @param ctx the parse tree
	 */
	enterWarnMixedModes?: (ctx: WarnMixedModesContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.warnMixedModes`.
	 * @param ctx the parse tree
	 */
	exitWarnMixedModes?: (ctx: WarnMixedModesContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.variableDeclaratorId`.
	 * @param ctx the parse tree
	 */
	enterVariableDeclaratorId?: (ctx: VariableDeclaratorIdContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.variableDeclaratorId`.
	 * @param ctx the parse tree
	 */
	exitVariableDeclaratorId?: (ctx: VariableDeclaratorIdContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.warnTypeAsVariableName`.
	 * @param ctx the parse tree
	 */
	enterWarnTypeAsVariableName?: (ctx: WarnTypeAsVariableNameContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.warnTypeAsVariableName`.
	 * @param ctx the parse tree
	 */
	exitWarnTypeAsVariableName?: (ctx: WarnTypeAsVariableNameContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.methodCall`.
	 * @param ctx the parse tree
	 */
	enterMethodCall?: (ctx: MethodCallContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.methodCall`.
	 * @param ctx the parse tree
	 */
	exitMethodCall?: (ctx: MethodCallContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.functionWithPrimitiveTypeName`.
	 * @param ctx the parse tree
	 */
	enterFunctionWithPrimitiveTypeName?: (ctx: FunctionWithPrimitiveTypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.functionWithPrimitiveTypeName`.
	 * @param ctx the parse tree
	 */
	exitFunctionWithPrimitiveTypeName?: (ctx: FunctionWithPrimitiveTypeNameContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	enterPrimitiveType?: (ctx: PrimitiveTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.primitiveType`.
	 * @param ctx the parse tree
	 */
	exitPrimitiveType?: (ctx: PrimitiveTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.colorPrimitiveType`.
	 * @param ctx the parse tree
	 */
	enterColorPrimitiveType?: (ctx: ColorPrimitiveTypeContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.colorPrimitiveType`.
	 * @param ctx the parse tree
	 */
	exitColorPrimitiveType?: (ctx: ColorPrimitiveTypeContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	enterQualifiedName?: (ctx: QualifiedNameContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.qualifiedName`.
	 * @param ctx the parse tree
	 */
	exitQualifiedName?: (ctx: QualifiedNameContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `ProcessingParser.hexColorLiteral`.
	 * @param ctx the parse tree
	 */
	enterHexColorLiteral?: (ctx: HexColorLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `ProcessingParser.hexColorLiteral`.
	 * @param ctx the parse tree
	 */
	exitHexColorLiteral?: (ctx: HexColorLiteralContext) => void;
}

