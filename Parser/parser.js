"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var lexer_1 = require("../Lexer/lexer");
// First objective: read the tokens as AST types in body of program.
var Parser = /** @class */ (function () {
    function Parser() {
        this.TOKEN = [];
    }
    Parser.prototype.NotTheEnd = function () {
        return this.TOKEN[0].type != lexer_1.Type.EOF;
    };
    Parser.prototype.GenerateAst = function (source_code) {
        this.TOKEN = (0, lexer_1.Lexer)(source_code);
        var program = {
            kind: "PROGRAM",
            body: []
        };
        while (this.NotTheEnd()) {
            console.log(this.TOKEN[0]);
        }
    };
    return Parser;
}());
;
var code = fs.readFileSync("../Lexer/code.tl", "utf-8");
var parser = new Parser();
parser.GenerateAst(code);
