const inputMemoryBuilding = getBuilding('cell1')
const inputMemory = new Memory(inputMemoryBuilding, 64)

const outputMemoryBuilding = getBuilding('cell2')
const outputMemory = new Memory(outputMemoryBuilding, 64)

inputMemory[0] = 0b0111111111001000010010011010110001011001001010010101000100010000

const encoded = inputMemory[0]

const opcodeMask = 0b0111111110000000000000000000000000000000000000000000000000000000
const opcodeRightShift = 55

const value1DataTypeMask = 0b0000000001000000000000000000000000000000000000000000000000000000
const value1DataTypeRightShift = 54

const value2DataTypeMask = 0b0000000000110000000000000000000000000000000000000000000000000000
const value2DataTypeRightShift = 52

const value1SignMask = 0b0000000000001000000000000000000000000000000000000000000000000000
const value1SignRightShift = 51

const value2SignMask = 0b0000000000000100000000000000000000000000000000000000000000000000
const value2SignRightShift = 50

const value1Mask = 0b0000000000000011111111111111111111111110000000000000000000000000
const value1RightShift = 25

const value2Mask = 0b0000000000000000000000000000000000000001111111111111111111111000
const value2RightShift = 3

const opcode = (encoded & opcodeMask) >> opcodeRightShift
const value1DataType = (encoded & value1DataTypeMask) >> value1DataTypeRightShift
const value2DataType = (encoded & value2DataTypeMask) >> value2DataTypeRightShift
const value1Sign = (encoded & value1SignMask) >> value1SignRightShift
const value2Sign = (encoded & value2SignMask) >> value2SignRightShift
const value1 = (encoded & value1Mask) >> value1RightShift
const value2 = (encoded & value2Mask) >> value2RightShift

outputMemory[0] = opcode
outputMemory[1] = value1DataType
outputMemory[2] = value2DataType
outputMemory[3] = value1Sign
outputMemory[4] = value2Sign
outputMemory[5] = value1
outputMemory[6] = value2
