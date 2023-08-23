// Generated from c:\Users\User\Documents\LS4Pv3\server\grammar\ProcessingParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ProcessingParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ProcessingParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ProcessingParser.processingSketch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProcessingSketch?: (ctx: ProcessingSketchContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.compilationUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompilationUnit?: (ctx: CompilationUnitContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.packageDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackageDeclaration?: (ctx: PackageDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.importDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDeclaration?: (ctx: ImportDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeDeclaration?: (ctx: TypeDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.modifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModifier?: (ctx: ModifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classOrInterfaceModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassOrInterfaceModifier?: (ctx: ClassOrInterfaceModifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.variableModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableModifier?: (ctx: VariableModifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassDeclaration?: (ctx: ClassDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeParameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeParameters?: (ctx: TypeParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeParameter?: (ctx: TypeParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeBound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeBound?: (ctx: TypeBoundContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.enumDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumDeclaration?: (ctx: EnumDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.enumConstants`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumConstants?: (ctx: EnumConstantsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.enumConstant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumConstant?: (ctx: EnumConstantContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.enumBodyDeclarations`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnumBodyDeclarations?: (ctx: EnumBodyDeclarationsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.interfaceDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceDeclaration?: (ctx: InterfaceDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassBody?: (ctx: ClassBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.interfaceBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceBody?: (ctx: InterfaceBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classBodyDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassBodyDeclaration?: (ctx: ClassBodyDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.memberDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberDeclaration?: (ctx: MemberDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.methodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodDeclaration?: (ctx: MethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.methodBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodBody?: (ctx: MethodBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeTypeOrVoid`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeTypeOrVoid?: (ctx: TypeTypeOrVoidContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.genericMethodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericMethodDeclaration?: (ctx: GenericMethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.genericConstructorDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericConstructorDeclaration?: (ctx: GenericConstructorDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.constructorDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstructorDeclaration?: (ctx: ConstructorDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.fieldDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldDeclaration?: (ctx: FieldDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.interfaceBodyDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceBodyDeclaration?: (ctx: InterfaceBodyDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.interfaceMemberDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceMemberDeclaration?: (ctx: InterfaceMemberDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.constDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstDeclaration?: (ctx: ConstDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.constantDeclarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstantDeclarator?: (ctx: ConstantDeclaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.interfaceMethodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceMethodDeclaration?: (ctx: InterfaceMethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.interfaceMethodModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInterfaceMethodModifier?: (ctx: InterfaceMethodModifierContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.genericInterfaceMethodDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericInterfaceMethodDeclaration?: (ctx: GenericInterfaceMethodDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.variableDeclarators`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableDeclarators?: (ctx: VariableDeclaratorsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.variableDeclarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableDeclarator?: (ctx: VariableDeclaratorContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.variableInitializer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableInitializer?: (ctx: VariableInitializerContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.arrayInitializer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayInitializer?: (ctx: ArrayInitializerContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classOrInterfaceType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassOrInterfaceType?: (ctx: ClassOrInterfaceTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeArgument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeArgument?: (ctx: TypeArgumentContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.qualifiedNameList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedNameList?: (ctx: QualifiedNameListContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.formalParameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParameters?: (ctx: FormalParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.formalParameterList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParameterList?: (ctx: FormalParameterListContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.formalParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormalParameter?: (ctx: FormalParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.lastFormalParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLastFormalParameter?: (ctx: LastFormalParameterContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.baseStringLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBaseStringLiteral?: (ctx: BaseStringLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.multilineStringLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultilineStringLiteral?: (ctx: MultilineStringLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.stringLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.integerLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntegerLiteral?: (ctx: IntegerLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.floatLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFloatLiteral?: (ctx: FloatLiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation?: (ctx: AnnotationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.elementValuePairs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementValuePairs?: (ctx: ElementValuePairsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.elementValuePair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementValuePair?: (ctx: ElementValuePairContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.elementValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementValue?: (ctx: ElementValueContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.elementValueArrayInitializer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementValueArrayInitializer?: (ctx: ElementValueArrayInitializerContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationTypeDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationTypeDeclaration?: (ctx: AnnotationTypeDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationTypeBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationTypeBody?: (ctx: AnnotationTypeBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationTypeElementDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationTypeElementDeclaration?: (ctx: AnnotationTypeElementDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationTypeElementRest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationTypeElementRest?: (ctx: AnnotationTypeElementRestContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationMethodOrConstantRest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationMethodOrConstantRest?: (ctx: AnnotationMethodOrConstantRestContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationMethodRest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationMethodRest?: (ctx: AnnotationMethodRestContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.annotationConstantRest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotationConstantRest?: (ctx: AnnotationConstantRestContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.defaultValue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefaultValue?: (ctx: DefaultValueContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.blockStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockStatement?: (ctx: BlockStatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.localVariableDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalVariableDeclaration?: (ctx: LocalVariableDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.localTypeDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalTypeDeclaration?: (ctx: LocalTypeDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.catchClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCatchClause?: (ctx: CatchClauseContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.catchType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCatchType?: (ctx: CatchTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.finallyBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFinallyBlock?: (ctx: FinallyBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.resourceSpecification`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResourceSpecification?: (ctx: ResourceSpecificationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.resources`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResources?: (ctx: ResourcesContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.resource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitResource?: (ctx: ResourceContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.switchBlockStatementGroup`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchBlockStatementGroup?: (ctx: SwitchBlockStatementGroupContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.switchLabel`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwitchLabel?: (ctx: SwitchLabelContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.forLoop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForLoop?: (ctx: ForLoopContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.forControl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForControl?: (ctx: ForControlContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.forInit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForInit?: (ctx: ForInitContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.enhancedForControl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEnhancedForControl?: (ctx: EnhancedForControlContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.parExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParExpression?: (ctx: ParExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.lambdaExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdaExpression?: (ctx: LambdaExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.lambdaParameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdaParameters?: (ctx: LambdaParametersContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.lambdaBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdaBody?: (ctx: LambdaBodyContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.primary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimary?: (ctx: PrimaryContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassType?: (ctx: ClassTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.creator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreator?: (ctx: CreatorContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.createdName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCreatedName?: (ctx: CreatedNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.innerCreator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInnerCreator?: (ctx: InnerCreatorContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.arrayCreatorRest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayCreatorRest?: (ctx: ArrayCreatorRestContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.classCreatorRest`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitClassCreatorRest?: (ctx: ClassCreatorRestContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.explicitGenericInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplicitGenericInvocation?: (ctx: ExplicitGenericInvocationContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeArgumentsOrDiamond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeArgumentsOrDiamond?: (ctx: TypeArgumentsOrDiamondContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.nonWildcardTypeArgumentsOrDiamond`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonWildcardTypeArgumentsOrDiamond?: (ctx: NonWildcardTypeArgumentsOrDiamondContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.nonWildcardTypeArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNonWildcardTypeArguments?: (ctx: NonWildcardTypeArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeList?: (ctx: TypeListContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeType?: (ctx: TypeTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.typeArguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeArguments?: (ctx: TypeArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.superSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuperSuffix?: (ctx: SuperSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.explicitGenericInvocationSuffix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplicitGenericInvocationSuffix?: (ctx: ExplicitGenericInvocationSuffixContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArguments?: (ctx: ArgumentsContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.javaProcessingSketch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJavaProcessingSketch?: (ctx: JavaProcessingSketchContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.staticProcessingSketch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStaticProcessingSketch?: (ctx: StaticProcessingSketchContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.activeProcessingSketch`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActiveProcessingSketch?: (ctx: ActiveProcessingSketchContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.warnMixedModes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWarnMixedModes?: (ctx: WarnMixedModesContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.variableDeclaratorId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableDeclaratorId?: (ctx: VariableDeclaratorIdContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.warnTypeAsVariableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWarnTypeAsVariableName?: (ctx: WarnTypeAsVariableNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.methodCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethodCall?: (ctx: MethodCallContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.functionWithPrimitiveTypeName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionWithPrimitiveTypeName?: (ctx: FunctionWithPrimitiveTypeNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.primitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimitiveType?: (ctx: PrimitiveTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.colorPrimitiveType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColorPrimitiveType?: (ctx: ColorPrimitiveTypeContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.qualifiedName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedName?: (ctx: QualifiedNameContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;

	/**
	 * Visit a parse tree produced by `ProcessingParser.hexColorLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitHexColorLiteral?: (ctx: HexColorLiteralContext) => Result;
}

