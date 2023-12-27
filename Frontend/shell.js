"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interpreter_1 = require("../Interpreter/interpreter");
var readline = require('readline');
var Parser = require("../Parser/parser").Parser;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var parser = new Parser();
function readUserInput() {
    rl.question('> ', function (input) {
        var program = parser.GenerateAst(input);
        console.log(program.body[0]);
        var interpreted = (0, interpreter_1.Interpreter)(program.body[0]);
        console.log(interpreted);
        readUserInput();
    });
}
readUserInput();
