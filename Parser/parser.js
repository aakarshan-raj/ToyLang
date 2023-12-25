"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
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
        for (var _i = 0, _a = program.body; _i < _a.length; _i++) {
            var x = _a[_i];
            if (x.kind == "BINARY_EXPRESSION") {
            }
        }
    };
    Parser.prototype.getNextToken = function () {
        var t = this.TOKEN[0];
        this.TOKEN.shift();
        return t;
    };
    Parser.prototype.parseToken = function () {
        return this.parse_statement();
    };
    Parser.prototype.parse_statement = function () {
        return this.parse_expression();
    };
    Parser.prototype.parse_expression = function () {
        return this.parse_additive_expression();
    };
    Parser.prototype.parse_additive_expression = function () {
        var x = this.parse_primiary_expression();
        var y = {};
        while (this.TOKEN[0].value == "+" || this.TOKEN[0].value == "-") {
            var operator = this.getNextToken().value;
            y = {
                kind: "BINARY_EXPRESSION",
                left: x,
                right: this.parse_primiary_expression(),
                operator: operator
            };
        }
        return y;
    };
    Parser.prototype.parse_primiary_expression = function () {
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
        else {
            console.log("UNKNOWN TOKEN:" + single_token.value);
            process.exit(1);
        }
    };
    return Parser;
}());
exports.Parser = Parser;
;
