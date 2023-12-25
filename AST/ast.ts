export type NodeType = 'PROGRAM' | 'BINARY_EXPRESSION' | 'NUMERICAL_LITERAL' | 'IDENTIFIER'


export interface Statement {
    kind: NodeType
}
export interface Program extends Statement {
    kind: 'PROGRAM',
    body: Statement[]
}
export interface Expression extends Statement { }
export interface BinaryExpression extends Expression {
    kind: 'BINARY_EXPRESSION',
    left: Expression,
    right: Expression,
    operator: string
}
export interface NumericalLiteral extends Expression {
    kind: 'NUMERICAL_LITERAL',
    value: number
}
export interface Identifier {
    kind: 'IDENTIFIER',
    symbol: string
}
