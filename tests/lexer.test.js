const { isAlpha, isNum } = require("../Lexer/lexer.js")

test("Alpha test", () => {
    let a_z = [];
    let i = 65;
    while (i <= 122) {
        if(i >= 91 && i <= 96){
            i = i + 1;
        }
        else{
        a_z.push(String.fromCharCode(i));
        i = i + 1;
        }
    }
    for (x of a_z) {
        let value = isAlpha(x);
        expect(value).toBe(true);
    }
})

test("Num test", () => {
    let a_z = ['0','1','2','3','4','5','6','7','8','9',];
  
    for (x of a_z) {
        let value = isNum(x);
        expect(value).toBe(true);
    }
})