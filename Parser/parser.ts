const fs = require('fs');
import { Lexer, Token, Type } from "../Lexer/lexer";
import {
   Program, Statement, BinaryExpression,
   NumericalLiteral, Identifier, NodeType,
   Expression,
   NullLiteral
} from "../AST/ast";

// First objective: read the tokens as AST types in body of program.

export class Parser {

   public TOKEN: Token[] = [];

   public NotTheEnd(): boolean {
      return this.TOKEN[0].type != Type.EOF;
   }

   public GenerateAst(source_code: string):Program {
      this.TOKEN = Lexer(source_code);
      let program: Program = {
         kind: "PROGRAM",
         body: []
      }
      while (this.NotTheEnd()) {
         program.body.push(this.parseToken());

      }
      return program;
   }


   private getNextToken(): Token {
      const t = this.TOKEN[0];
      this.TOKEN.shift();
      return t;
   }

   private parseToken(): Statement {
      return this.parse_statement();
   }

   private parse_statement(): Expression {
      return this.parse_expression();
   }

   private parse_expression(): Expression {
      return this.parse_additive_expression()
   }

   private parse_additive_expression(): Expression {
      let left = this.parse_multiplicative_expression();
      while (this.TOKEN[0].value == "+" || this.TOKEN[0].value == "-") {
         let operator = this.getNextToken().value;
         let right = this.parse_multiplicative_expression();
         left = {
            kind: "BINARY_EXPRESSION",
            left,
            right,
            operator
         } as BinaryExpression;
      }
      return left;
   }

   private parse_multiplicative_expression(): Expression {
      let left = this.parse_primiary_expression();
      while (this.TOKEN[0].value == "*" || this.TOKEN[0].value == "/") {
         let operator = this.getNextToken().value;
         let right = this.parse_primiary_expression();
         left = {
            kind: "BINARY_EXPRESSION",
            left,
            right,
            operator
         } as BinaryExpression;
      }
      return left;
   }


   private parse_primiary_expression():Expression {
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
      else if (single_token.type == Type.Null) {
         return { kind: "NULL", symbol: single_token.value } as NullLiteral;
      }
      else if(single_token.type == Type.OpenParen){
         const exp = this.parse_expression();
         if(this.TOKEN[0].type != Type.CloseParen ){
            console.log("Expected closing paranthesis");
            process.exit(1);
         }
         this.getNextToken();
         return exp;
      }
      else {
         console.log("UNKNOWN TOKEN:" + single_token.value);
         process.exit(1);
      }
   }


};

