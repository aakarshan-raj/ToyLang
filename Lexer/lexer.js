"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNum = exports.isAlpha = exports.range = void 0;
var fs = require("fs");
var Type;
(function (Type) {
    Type[Type["Equal"] = 0] = "Equal";
    Type[Type["Colon"] = 1] = "Colon";
    Type[Type["BinaryOperator"] = 2] = "BinaryOperator";
    Type[Type["CloseParen"] = 3] = "CloseParen";
    Type[Type["OpenParen"] = 4] = "OpenParen";
    Type[Type["Number"] = 5] = "Number";
    Type[Type["Let"] = 6] = "Let";
    Type[Type["Identifier"] = 7] = "Identifier";
    Type[Type["WhiteSpace"] = 8] = "WhiteSpace";
})(Type || (Type = {}));
function Fill(value, type) {
    var t = { value: value, type: type };
    return t;
}
function range(a, b, c) {
    var bound = [a.charCodeAt(0), b.charCodeAt(0)];
    var target = c.charCodeAt(0);
    if (target >= bound[0] && target <= bound[1]) {
        return true;
    }
    return false;
}
exports.range = range;
function isAlpha(c) {
    return range("A", "z", c);
}
exports.isAlpha = isAlpha;
function isNum(c) {
    return range("0", "9", c);
}
exports.isNum = isNum;
function Lexer(src) {
    var token = Array();
    var source = src.split("");
    while (source.length > 0) {
        if (source[0] == "=") {
            token.push(Fill(source.shift(), Type.Equal));
        }
        else if (source[0] == "(") {
            token.push(Fill(source.shift(), Type.OpenParen));
        }
        else if (source[0] == ")") {
            token.push(Fill(source.shift(), Type.CloseParen));
        }
        else if (source[0] == "*" || source[0] == "/" || source[0] == "+" || source[0] == "-") {
            token.push(Fill(source.shift(), Type.BinaryOperator));
        }
        else {
            console.log("This is not yet covered:" + source.shift());
        }
    }
    return token;
}
// const code = fs.readFileSync("code.tl","utf-8");
// const data = Lexer(code);
// for (const x of data){
//     console.log(x);
// }
var a = '1';
console.log(isNum(a));
