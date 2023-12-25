const fs = require('fs');
import { Lexer, Token, Type } from "../Lexer/lexer";
import {
   Program, Statement, BinaryExpression,
   NumericalLiteral, Identifier, NodeType,
   Expression
} from "../AST/ast";

// First objective: read the tokens as AST types in body of program.

class Parser {

   private TOKEN: Token[] = [];

   public NotTheEnd(): boolean {
      return this.TOKEN[0].type != Type.EOF;
   }

   public GenerateAst(source_code: string) {
      this.TOKEN = Lexer(source_code);
      let program: Program = {
         kind: "PROGRAM",
         body: []
      }
      while (this.NotTheEnd()) {
         program.body.push(this.parseToken());

      }
      console.log(program.body);
   }

   private getNextToken(): Token {
      const t = this.TOKEN[0];
      this.TOKEN.shift();
      return t;
   }

   private parseToken(): Statement {
      const single_token = this.getNextToken();
      if (single_token.type == Type.Number) {
         return { kind: "NUMERICAL_LITERAL", value: parseInt(single_token.value) } as NumericalLiteral;
      }
      else if (single_token.type == Type.Identifier) {
         return { kind: "IDENTIFIER", symbol: single_token.value } as Identifier;
      }
      else if (single_token.type == Type.Let) {
         return { kind: "IDENTIFIER", symbol: single_token.value } as Identifier;
      }
      else if (single_token.type == Type.BinaryOperator) {
         return { kind: "BINARY_EXPRESSION", operator: single_token.value } as BinaryExpression;
      }
      else {
         console.log("UNKNOWN TOKEN:" + single_token.value);
         process.exit(1);
      }
   }


};

const code = fs.readFileSync("../Lexer/code.tl", "utf-8");

const parser: Parser = new Parser();
parser.GenerateAst(code);
