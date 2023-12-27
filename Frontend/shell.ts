const readline = require('readline');
const { Parser } = require("../Parser/parser");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const parser = new Parser();

function readUserInput() {
  rl.question('> ', (input) => {
    const program = parser.GenerateAst(input);
    console.log(program);
    readUserInput();
  });
}

readUserInput(); 