lexer grammar JavaClassLexer;


BYTE :           	'B';
CHAR :           	'C';
DOUBLE :			'D';
FLOAT :           	'F';
INT :           	'I';
LONG : 				'J';
SHORT: 				'S';
BOOLEAN:			'Z';


VOID: 				'V';

ARRAY_PREFIX:		'[';

LPAREN:             '(';
RPAREN:             ')';

LT:                 '<';
GT:                 '>';

DOT:                '.';
ASTERIX:        	'*';
ADD:                '+';
SUB:                '-';
CARET:              '^';

COLON:              ':';


WS:                 [ \t\r\n\u000C]+;

IDENTIFIER:         ID;

CLASS_PREFIX: 		'L'  -> pushMode(ClassMode);
GEN_PREFIX:         'T'  -> pushMode(GenericMode);

mode GenericMode;
GEN_ID:             ID;
GEN_SEMI:           ';'  -> popMode; 

mode ClassMode;
CLASSID:            ID;
CLASSDIV:           '/';
CLASSSEMI:          ';'  -> popMode; 

fragment CL:        'L';
fragment DIV:       '/';
fragment ID:        Letter LetterOrDigit*;
fragment SEMI:		';';    

fragment LetterOrDigit
    : Letter
    | [0-9]
    ;
fragment Letter
    : [a-zA-Z$_] // these are the "java letters" below 0x7F
    //| ~[\u0000-\u007F\uD800-\uDBFF] // covers all characters above 0x7F which are not a surrogate
    //| [\uD800-\uDBFF] [\uDC00-\uDFFF] // covers UTF-16 surrogate pairs encodings for U+10000 to U+10FFFF
    ;