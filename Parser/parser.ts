const fs = require('fs');
import { Lexer,Type } from "../Lexer/lexer";
import {
    Program, Statement, BinaryExpression,
    NumericalLiteral, Identifier, NodeType,
    Expression
} from "../AST/ast";

// First objective: read the tokens as AST types in body of program.

class Parser{

 private TOKEN:Type[] = [];

 public GenerateAst(source_code:string){
    const tokens = Lexer(source_code);
    const program:Program = {
        kind:"PROGRAM",
        body:[]
    }
 

 }


};

const code = fs.readFileSync("../Lexer/code.tl", "utf-8");

const parser:Parser = new Parser();
parser.GenerateAst(code);