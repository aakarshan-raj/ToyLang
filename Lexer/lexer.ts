// let x = 4 + (4*5)



enum Type{
   Number,
   Let,
   Identifier,
   CloseParen,
   OpenParen,
   BinaryOperator,
   WhiteSpace,
   Colon,
}
interface Token{
    value:String,
    type:Type
}

function Lexer(src:string){
    console.log(src);
}

Lexer("hi");