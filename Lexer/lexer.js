// let x = 4 + (4*5)
var Type;
(function (Type) {
    Type[Type["Number"] = 0] = "Number";
    Type[Type["Let"] = 1] = "Let";
    Type[Type["Identifier"] = 2] = "Identifier";
    Type[Type["CloseParen"] = 3] = "CloseParen";
    Type[Type["OpenParen"] = 4] = "OpenParen";
    Type[Type["BinaryOperator"] = 5] = "BinaryOperator";
    Type[Type["WhiteSpace"] = 6] = "WhiteSpace";
    Type[Type["Colon"] = 7] = "Colon";
})(Type || (Type = {}));
function Lexer(src) {
    console.log(src);
}
Lexer("hi");
