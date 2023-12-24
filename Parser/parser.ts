const fs = require('fs');
import { Lexer,Token, Type } from "../Lexer/lexer";
import {
    Program, Statement, BinaryExpression,
    NumericalLiteral, Identifier, NodeType,
    Expression
} from "../AST/ast";

// First objective: read the tokens as AST types in body of program.

class Parser{

 private TOKEN:Token[] = [];

 public NotTheEnd():boolean{
    return this.TOKEN[0].type != Type.EOF;
 }

 public GenerateAst(source_code:string){
    this.TOKEN = Lexer(source_code);
    const program:Program = {
        kind:"PROGRAM",
        body:[]
    }
    while(this.NotTheEnd()){
       console.log(this.TOKEN[0]);
    }

 }


};

const code = fs.readFileSync("../Lexer/code.tl", "utf-8");

const parser:Parser = new Parser();
parser.GenerateAst(code);