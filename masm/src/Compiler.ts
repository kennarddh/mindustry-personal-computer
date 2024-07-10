import {
	LineState,
	NumberCharacterSet,
	OpcodeToValueMap,
	ReadOnlyRegisterIntSet,
	RegisterToIntMap,
	ValueInKind,
	ValueInKindToNameLookup,
} from 'Constants'
import CustomBuffer from 'CustomBuffer'

class Compiler {
	private processLine(
		outputBuffer: CustomBuffer,
		line: number,
		opcode: string,
		value1String: string | null,
		value2String: string | null,
	): void {
		const uppercaseOpcode = opcode.toUpperCase()

		if (!OpcodeToValueMap.has(uppercaseOpcode))
			throw new Error(`Invalid opcode "${opcode}" at line ${line}.`)

		const opcodeValue = OpcodeToValueMap.get(uppercaseOpcode)!

		if (opcodeValue.isValue1Required && value1String === null)
			throw new Error(`At line ${line}, value 1 is required for opcode "${opcode}".`)

		if (opcodeValue.isValue2Required && value2String === null)
			throw new Error(`At line ${line}, value 2 is required for opcode "${opcode}".`)

		const [isValue1Valid, value1, value1InKind] = this.parseValue(value1String!)
		const [isValue2Valid, value2, value2InKind] = this.parseValue(value2String!)

		if (!isValue1Valid) throw new Error(`Invalid value 1 "${value1String}" at line ${line}.`)

		if (!isValue2Valid) throw new Error(`Invalid value 2 "${value2String}" at line ${line}.`)

		if (
			value1InKind === ValueInKind.Register &&
			opcodeValue.writeToValue1 &&
			ReadOnlyRegisterIntSet.has(value1)
		)
			throw new Error(
				`Invalid value 1 "${value1}" at line ${line}. The register "${value1String}" is read only.`,
			)

		if (
			value2InKind === ValueInKind.Register &&
			opcodeValue.writeToValue2 &&
			ReadOnlyRegisterIntSet.has(value2)
		)
			throw new Error(
				`Invalid value 2 "${value2}" at line ${line}. The register "${value1String}" is read only.`,
			)

		if (!opcodeValue.value1AllowedInKinds.includes(value1InKind))
			throw new Error(
				`Invalid value 1 "${value1}" at line ${line}. The opcode "${opcode}" does not allow ${ValueInKindToNameLookup[value1InKind]} as value in kind.`,
			)

		if (!opcodeValue.value2AllowedInKinds.includes(value2InKind))
			throw new Error(
				`Invalid value 2 "${value2}" at line ${line}. The opcode "${opcode}" does not allow ${ValueInKindToNameLookup[value2InKind]} as value in kind.`,
			)

		outputBuffer.writeUByte(opcodeValue.int)
		outputBuffer.writeUByte(value1InKind)
		outputBuffer.writeUShort(value1)
		outputBuffer.writeUByte(value2InKind)

		// Reserved
		outputBuffer.writeUByte(0)
		outputBuffer.writeUByte(0)
		outputBuffer.writeUByte(0)

		outputBuffer.writeDouble(value2)
	}

	private validateNumberString(value: string) {
		const length = value.length

		for (let i = 0; i < length; i++) {
			const character = value[i]!

			if (!NumberCharacterSet.has(character)) return false
		}

		return true
	}

	private parseValue(value: string): [true, number, ValueInKind] | [false, null, null] {
		const uppercaseValue = value.toUpperCase()

		if (RegisterToIntMap.has(uppercaseValue))
			return [true, RegisterToIntMap.get(uppercaseValue)!, ValueInKind.Register]

		if (value[0] === '[' && value.at(-1) === ']') {
			const numberString = value.slice(1, -1)

			if (this.validateNumberString(numberString))
				return [true, parseInt(numberString, 10), ValueInKind.Memory]
		}

		if (this.validateNumberString(value))
			return [true, parseInt(value, 10), ValueInKind.ImmediateValue]

		return [false, null, null]
	}

	compile(code: string): CustomBuffer {
		const outputBuffer = CustomBuffer.alloc(2)

		let tempStringAccumulator = ''
		let opcode = ''
		let value1: string | null = null
		let value2: string | null = null
		let line = 1
		let inComment = false
		let lineState = LineState.Opcode

		const length = code.length

		for (let i = 0; i < length; i++) {
			const character = code[i]

			switch (character) {
				case ' ': {
					if (inComment) continue
					if (tempStringAccumulator === '') continue

					if (lineState === LineState.Opcode) {
						opcode = tempStringAccumulator
						tempStringAccumulator = ''
						lineState = LineState.Value1
					}

					break
				}

				case ',': {
					if (inComment) continue
					if (tempStringAccumulator === '') continue

					switch (lineState) {
						case LineState.Value1: {
							value1 = tempStringAccumulator
							tempStringAccumulator = ''
							lineState = LineState.Value2

							break
						}
						case LineState.Value2: {
							value2 = tempStringAccumulator
							tempStringAccumulator = ''
							lineState = LineState.Done

							break
						}
					}

					break
				}

				case '\n': {
					// Comment only line
					if (tempStringAccumulator === '' && lineState === LineState.Opcode) continue

					if (tempStringAccumulator !== '' && lineState === LineState.Value2) {
						value2 = tempStringAccumulator
						tempStringAccumulator = ''
						lineState = LineState.Done
					}

					console.debug({ line, opcode, value1, value2 })

					this.processLine(outputBuffer, line, opcode, value1, value2)

					line += 1

					lineState = LineState.Opcode
					tempStringAccumulator = ''
					opcode = ''
					value1 = ''
					value2 = ''
					inComment = false

					break
				}

				case ';': {
					if (inComment) continue

					inComment = true

					break
				}

				default: {
					if (inComment) continue

					tempStringAccumulator += character

					break
				}
			}
		}

		return outputBuffer
	}
}

export default Compiler
