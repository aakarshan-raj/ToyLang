const fs = require("fs");

export enum Type {
    Equal,
    BinaryOperator,
    CloseParen,
    OpenParen,
    Number,
    Let,
    Identifier,
    EOF
}
interface Token {
    value: string,
    type: Type
}

const reserved: Record<string, Type> = {
    let: Type.Let
};

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

export function isAlpha(c: string):boolean{
    return (range("A", "Z", c) || range("a", "z", c));
}


export function isNum(c: string):boolean{
    return range("0", "9", c);
}

export function isIgnoreable(str:string):boolean{
    if (str == " " || str == "\n"){
        return true;
    }
    return false;
}

export function Lexer(src: string): Token[] {
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
        else if(isIgnoreable(source[0])){
            source.shift();
        }
        else {
            // Covering all other cases
            if (isAlpha(source[0])) {
                let iden = "";
                while (source.length > 0 && isAlpha(source[0])) {
                    iden += source.shift();
                }
                const reserved_token:Type = reserved[iden];
                if (reserved_token) {
                    token.push(Fill(iden, reserved_token));

                }
                else {
                    token.push(Fill(iden, Type.Identifier));
                }
            }
            else if (isNum(source[0])) {
                let num = "";
                while (source.length > 0 && isNum(source[0])) {
                    num += source.shift();
                }
                token.push(Fill(num, Type.Number));
            }
            else{
                console.log("UNRECOGNISED CHARACTOR:"+source[0]);
                process.exit(1)
            }
        }
    }
    token.push(Fill("EOF",Type.EOF));
    return token;
}

