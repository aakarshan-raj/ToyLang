"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
function evaluate_binary_expression(x) {
    var a = x.left.value;
    var b = x.right.value;
    var answer = 0;
    if (x.operator == "+") {
        answer = a + b;
    }
    if (x.operator == "-") {
        answer = a - b;
    }
    return { type: 'number', value: answer };
}
function Interpreter(astNode) {
    switch (astNode.kind) {
        case "NUMERICAL_LITERAL":
            return { type: 'number', value: astNode.value };
        case "NULL":
            return { type: 'null', value: "null" };
        case "BINARY_EXPRESSION":
            return evaluate_binary_expression(astNode);
        default:
            console.log("Not yet interpreting: " + astNode.kind);
    }
}
exports.Interpreter = Interpreter;
