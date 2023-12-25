var readline = require('readline');
var Parser = require("../Parser/parser").Parser;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var parser = new Parser();
function readUserInput() {
    rl.question('', function (input) {
        parser.GenerateAst(input);
        readUserInput();
    });
}
readUserInput();
