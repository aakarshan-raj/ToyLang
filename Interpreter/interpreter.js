"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
function Interpreter(astNode) {
    switch (astNode.kind) {
        case "NUMERICAL_LITERAL":
            return { type: 'number', value: astNode.value };
        case "NULL":
            return { type: 'null', value: "null" };
        default:
            console.log("Not yet interpreting: " + astNode.kind);
    }
}
exports.Interpreter = Interpreter;
