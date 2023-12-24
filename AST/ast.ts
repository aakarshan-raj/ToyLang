type NodeType = 'PROGRAM' | 'BINARY_EXPRESSION' | 'NUMERICAL_LITERAL' | 'IDENTIFIER'


interface Statement {
    kind: NodeType
}
interface Program extends Statement {
    kind: 'PROGRAM',
    body: Statement[]
}
interface Expression extends Statement { }
interface BinaryExpression extends Expression {
    kind: 'BINARY_EXPRESSION',
    left: number,
    right: number,
    operator: string
}
interface NumericalLiteral extends Expression {
    kind: 'NUMERICAL_LITERAL',
    value: number
}
interface Identifier {
    kind: 'IDENTIFIER',
    symbol: string
}
