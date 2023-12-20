const fs = require("fs");

enum Type {
    Equal,
    Colon,
    BinaryOperator,
    CloseParen,
    OpenParen,
    Number,
    Let,
    Identifier,
    WhiteSpace,
}
interface Token {
    value: string,
    type: Type
}

function Fill(value: string, type: Type) {
    const t: Token = { value: value, type: type };
    return t;
}

export function range(a: string, b: string, c: string): boolean {
    const bound = [a.charCodeAt(0), b.charCodeAt(0)];
    const target = c.charCodeAt(0);
    if (target >= bound[0] && target <= bound[1]) {
        return true;
    }
    return false;
}

export function isAlpha(c: string) {
    return range("A", "z", c);
}


export function isNum(c: string) {
    return range("0", "9", c);
}

function Lexer(src: string): Token[] {
    const token = Array<Token>();
    const source = src.split("");
    while (source.length > 0) {
        if (source[0] == "=") {
            token.push(Fill(source.shift(), Type.Equal));
        }
        else if (source[0] == "(") {
            token.push(Fill(source.shift(), Type.OpenParen));
        }
        else if (source[0] == ")") {
            token.push(Fill(source.shift(), Type.CloseParen));
        }
        else if (source[0] == "*" || source[0] == "/" || source[0] == "+" || source[0] == "-") {
            token.push(Fill(source.shift(), Type.BinaryOperator));
        }
        else {
            console.log("This is not yet covered:" + source.shift());
        }
    }
    return token;
}

// const code = fs.readFileSync("code.tl","utf-8");

// const data = Lexer(code);
// for (const x of data){
//     console.log(x);
// }

const a = '1';
console.log(isNum(a));