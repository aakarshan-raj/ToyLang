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
            program.body.push(this.parseToken());
        }
        console.log(program.body);
    };
    Parser.prototype.getNextToken = function () {
        var t = this.TOKEN[0];
        this.TOKEN.shift();
        return t;
    };
    Parser.prototype.parseToken = function () {
        var single_token = this.getNextToken();
        if (single_token.type == lexer_1.Type.Number) {
            return { kind: "NUMERICAL_LITERAL", value: parseInt(single_token.value) };
        }
        else if (single_token.type == lexer_1.Type.Identifier) {
            return { kind: "IDENTIFIER", symbol: single_token.value };
        }
        else if (single_token.type == lexer_1.Type.Let) {
            return { kind: "IDENTIFIER", symbol: single_token.value };
        }
        else if (single_token.type == lexer_1.Type.BinaryOperator) {
            return { kind: "BINARY_EXPRESSION", operator: single_token.value };
        }
        else {
            console.log("UNKNOWN TOKEN:" + single_token.value);
            process.exit(1);
        }
    };
    return Parser;
}());
;
var code = fs.readFileSync("../Lexer/code.tl", "utf-8");
var parser = new Parser();
parser.GenerateAst(code);
