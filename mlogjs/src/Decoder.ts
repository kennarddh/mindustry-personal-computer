const inputMemoryBuilding = getBuilding('cell1')
const inputMemory = new Memory(inputMemoryBuilding, 64)

const outputMemoryBuilding = getBuilding('cell2')
const outputMemory = new Memory(outputMemoryBuilding, 64)

inputMemory[0] = 3819052505518571520
inputMemory[1] = 20

const encoded1 = inputMemory[0]
const encoded2 = inputMemory[1]

const opcodeMask = 0b1111111100000000000000000000000000000000000000000000000000000000
const opcodeRightShift = 56

const value1InKindMask = 0b0000000011111111000000000000000000000000000000000000000000000000
const value1InKindRightShift = 48

const value1Mask = 0b0000000000000000111111111111111100000000000000000000000000000000
const value1RightShift = 32

const value2InKindMask = 0b0000000000000000000000000000000011111111000000000000000000000000
const value2InKindRightShift = 24

const opcode = (encoded1 & opcodeMask) >> opcodeRightShift
const value1InKind = (encoded1 & value1InKindMask) >> value1InKindRightShift
const value1 = (encoded1 & value1Mask) >> value1RightShift
const value2InKind = (encoded1 & value2InKindMask) >> value2InKindRightShift
const value2 = encoded2

outputMemory[0] = opcode
outputMemory[1] = value1InKind
outputMemory[2] = value1
outputMemory[3] = value2InKind
outputMemory[4] = value2
