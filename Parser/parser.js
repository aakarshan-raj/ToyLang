"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var lexer_1 = require("../Lexer/lexer");
var Parser = /** @class */ (function () {
    function Parser() {
        this.TOKEN = [];
    }
    Parser.prototype.GenerateAst = function (source_code) {
        var tokens = (0, lexer_1.Lexer)(source_code);
        var program = {
            kind: "PROGRAM",
            body: []
        };
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var x = tokens_1[_i];
            console.log(x);
        }
        console.log(program);
    };
    return Parser;
}());
;
var code = fs.readFileSync("../Lexer/code.tl", "utf-8");
var parser = new Parser();
parser.GenerateAst(code);
