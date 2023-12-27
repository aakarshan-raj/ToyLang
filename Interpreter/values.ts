export type ValueType = 'null' | 'number'

export interface RunTime{
    type:ValueType
}

export interface NumercialValue extends RunTime{
    type:'number',
    value:number
}

export interface NullValue extends RunTime{
    type:'null',
    value:string
}