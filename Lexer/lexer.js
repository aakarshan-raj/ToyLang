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
    Type[Type["SemiColon"] = 9] = "SemiColon";
    Type[Type["NewLine"] = 10] = "NewLine";
})(Type || (Type = {}));
var reserved = {
    let: Type.Let
};
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
    return (range("A", "Z", c) || range("a", "z", c));
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
        else if (source[0] == " ") {
            token.push(Fill(source.shift(), Type.WhiteSpace));
        }
        else if (source[0] == ";") {
            token.push(Fill(source.shift(), Type.SemiColon));
        }
        else if (source[0] == "\n") {
            token.push(Fill(source.shift(), Type.NewLine));
        }
        else {
            // Covering all other cases
            if (isAlpha(source[0])) {
                var iden = "";
                while (source.length > 0 && isAlpha(source[0])) {
                    iden += source.shift();
                }
                var reserved_token = reserved[iden];
                if (reserved_token) {
                    token.push(Fill(iden, reserved_token));
                }
                else {
                    token.push(Fill(iden, Type.Identifier));
                }
            }
            else if (isNum(source[0])) {
                var num = "";
                while (source.length > 0 && isNum(source[0])) {
                    num += source.shift();
                }
                token.push(Fill(num, Type.Number));
            }
            else {
                console.log("UNRECOGNISED CHARACTOR:" + source[0]);
                process.exit(1);
            }
        }
    }
    return token;
}
var code = fs.readFileSync("code.tl", "utf-8");
var data = Lexer(code);
for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
    var x = data_1[_i];
    console.log(x);
}
