import { NullLiteral, NumericalLiteral, Statement } from "../AST/ast";
import { NullValue, NumercialValue, RunTime } from "./values";

export function Interpreter(astNode: Statement): RunTime {
    switch (astNode.kind) {
        case "NUMERICAL_LITERAL":
            return { type: 'number', value: (astNode as NumericalLiteral).value } as NumercialValue;
        case "NULL":
            return {type:'null', value:"null"} as NullValue;
        default:
            console.log("Not yet interpreting: "+astNode.kind);
    }
}