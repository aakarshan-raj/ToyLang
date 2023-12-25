const readline = require('readline');
const { Parser } = require("../Parser/parser");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const parser = new Parser();

function readUserInput() {
  rl.question('> ', (input) => {
    parser.GenerateAst(input);
    readUserInput();
  });
}

readUserInput(); 