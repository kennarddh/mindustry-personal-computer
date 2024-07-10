export enum LineState {
	Opcode = 'Opcode',
	Value1 = 'Value1',
	Value2 = 'Value2',
	Done = 'Done',
}

export enum ValueInKind {
	Register,
	Memory,
	ImmediateValue,
}

export const ValueInKindToNameLookup = {
	[ValueInKind.Register]: 'Register',
	[ValueInKind.Memory]: 'Memory',
	[ValueInKind.ImmediateValue]: 'ImmediateValue',
} as const

export interface OpcodeMapValue {
	int: number
	isValue1Required: boolean
	writeToValue1: boolean
	value1AllowedInKinds: ValueInKind[]
	isValue2Required: boolean
	writeToValue2: boolean
	value2AllowedInKinds: ValueInKind[]
}

export const OpcodeToValueMap = new Map<string, OpcodeMapValue>([
	[
		'ADD',
		{
			int: 0,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'SUB',
		{
			int: 1,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'MUL',
		{
			int: 2,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'DIV',
		{
			int: 3,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'IDIV',
		{
			int: 4,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'MOD',
		{
			int: 5,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'EXP',
		{
			int: 6,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'EXPE',
		{
			int: 7,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'LOG',
		{
			int: 8,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'LOGN',
		{
			int: 9,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'SQRT',
		{
			int: 10,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'MAX',
		{
			int: 11,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'MIN',
		{
			int: 12,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'FLR',
		{
			int: 13,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CEIL',
		{
			int: 14,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'ABS',
		{
			int: 15,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'SIN',
		{
			int: 16,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'COS',
		{
			int: 17,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'TAN',
		{
			int: 18,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'ASIN',
		{
			int: 19,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'ACOS',
		{
			int: 20,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'ATAN',
		{
			int: 21,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'RAND',
		{
			int: 22,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'INC',
		{
			int: 23,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'DEC',
		{
			int: 24,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMP',
		{
			int: 25,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'AND',
		{
			int: 26,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'OR',
		{
			int: 27,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'XOR',
		{
			int: 28,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'NOT',
		{
			int: 29,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'SHL',
		{
			int: 30,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'SHR',
		{
			int: 31,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'TEST',
		{
			int: 32,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CALL',
		{
			int: 33,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'RET',
		{
			int: 34,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: false,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [],
		},
	],
	[
		'HLT',
		{
			int: 35,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
	[
		'IRET',
		{
			int: 36,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
	[
		'JMP',
		{
			int: 37,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JP',
		{
			int: 38,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JNP',
		{
			int: 39,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JZ',
		{
			int: 40,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JNZ',
		{
			int: 41,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JS',
		{
			int: 42,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JNS',
		{
			int: 43,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JLE',
		{
			int: 45,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'JGE',
		{
			int: 47,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'LOOP',
		{
			int: 48,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'PUSH',
		{
			int: 49,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [],
		},
	],
	[
		'PUSHF',
		{
			int: 50,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
	[
		'POP',
		{
			int: 51,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [],
		},
	],
	[
		'POPF',
		{
			int: 52,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
	[
		'MOV',
		{
			int: 53,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVP',
		{
			int: 54,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVNP',
		{
			int: 55,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVZ',
		{
			int: 56,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVNZ',
		{
			int: 57,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVS',
		{
			int: 58,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVNS',
		{
			int: 59,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVLE',
		{
			int: 60,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'CMOVGE',
		{
			int: 61,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'SWP',
		{
			int: 62,
			writeToValue1: true,
			writeToValue2: true,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
		},
	],
	[
		'SETISR',
		{
			int: 63,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'INT',
		{
			int: 64,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [],
		},
	],
	[
		'NOP',
		{
			int: 65,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
	[
		'CPUID',
		{
			int: 66,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [],
		},
	],
	[
		'IN',
		{
			int: 67,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'OUT',
		{
			int: 68,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'INR',
		{
			int: 69,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'OUTR',
		{
			int: 70,
			writeToValue1: true,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [ValueInKind.Register, ValueInKind.Memory],
			value2AllowedInKinds: [
				ValueInKind.Register,
				ValueInKind.Memory,
				ValueInKind.ImmediateValue,
			],
		},
	],
	[
		'MOVS',
		{
			int: 71,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
	[
		'CMPS',
		{
			int: 72,
			writeToValue1: false,
			writeToValue2: false,
			isValue1Required: true,
			isValue2Required: true,
			value1AllowedInKinds: [],
			value2AllowedInKinds: [],
		},
	],
])

export const IntegerCharacterSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
export const FloatCharacterSet = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'])

export const RegisterToIntMap = new Map([
	['RAX', 0],
	['RBX', 1],
	['RCX', 2],
	['RDX', 3],
	['RPX', 4],
	['RDX', 5],
	['RSI', 6],
	['RDI', 7],
	['RIP', 8],
	['IR', 9],
	['RSP', 10],
	['RBP', 11],
	['RFLAGS', 12],
])

export const ReadOnlyRegisterIntSet = new Set([8, 9, 12])
