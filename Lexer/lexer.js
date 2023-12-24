"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = exports.isIgnoreable = exports.isNum = exports.isAlpha = exports.range = exports.Type = void 0;
var fs = require("fs");
var Type;
(function (Type) {
    Type[Type["Equal"] = 0] = "Equal";
    Type[Type["BinaryOperator"] = 1] = "BinaryOperator";
    Type[Type["CloseParen"] = 2] = "CloseParen";
    Type[Type["OpenParen"] = 3] = "OpenParen";
    Type[Type["Number"] = 4] = "Number";
    Type[Type["Let"] = 5] = "Let";
    Type[Type["Identifier"] = 6] = "Identifier";
    Type[Type["EOF"] = 7] = "EOF";
})(Type || (exports.Type = Type = {}));
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
function isIgnoreable(str) {
    if (str == " " || str == "\n") {
        return true;
    }
    return false;
}
exports.isIgnoreable = isIgnoreable;
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
        else if (isIgnoreable(source[0])) {
            source.shift();
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
    token.push(Fill("EOF", Type.EOF));
    return token;
}
exports.Lexer = Lexer;
