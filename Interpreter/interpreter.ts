import { BinaryExpression, NullLiteral, NumericalLiteral, Statement } from "../AST/ast";
import { NullValue, NumercialValue, RunTime } from "./values";


function evaluate_binary_expression(x: BinaryExpression): RunTime {
    const a = (x.left as NumericalLiteral).value;
    const b = (x.right as NumericalLiteral).value;
    let answer = 0;
    if (x.operator == "+") {
        answer = a + b;
    }
    if (x.operator == "-") {
        answer = a - b;
    }
    return {type:'number', value:answer} as NumercialValue
}


export function Interpreter(astNode: Statement): RunTime {
    switch (astNode.kind) {
        case "NUMERICAL_LITERAL":
            return { type: 'number', value: (astNode as NumericalLiteral).value } as NumercialValue;
        case "NULL":
            return { type: 'null', value: "null" } as NullValue;
        case "BINARY_EXPRESSION":
            return evaluate_binary_expression(astNode as BinaryExpression);
        default:
            console.log("Not yet interpreting: " + astNode.kind);
    }
}