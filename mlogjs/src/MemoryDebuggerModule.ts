import { DetermineMemoryBlockCapacity } from 'Utils'

const pointerIncrement1 = getLink(0)
const pointerDecrement1 = getLink(1)
const pointerIncrement10 = getLink(2)
const pointerDecrement10 = getLink(3)
const pointerIncrement100 = getLink(4)
const pointerDecrement100 = getLink(5)

const dataIncrement1 = getLink(6)
const dataDecrement1 = getLink(7)
const dataIncrement10 = getLink(8)
const dataDecrement10 = getLink(9)
const dataIncrement100 = getLink(10)
const dataDecrement100 = getLink(11)

// const message = getLink(12)

const memoryBuilding = getLink(13)
const memory = new Memory(memoryBuilding, 64)

const targetMemoryBuilding = getLink(14)
const targetMemory = new Memory(
	targetMemoryBuilding,
	DetermineMemoryBlockCapacity(targetMemoryBuilding),
)

print`Pointer Location: ${memory[0]}
Current Data At Pointer: ${targetMemory[memory[0]!]}

Good, There Is No Null Pointer Exception Here :)

Made by [#00ff00]kennarddh[]`

if (targetMemoryBuilding === undefined) {
	print("\n\n[#ff0000]Not Connected To Target Memory, Make Sure It's linked as 14th link[]")
	printFlush()
	endScript()
} else if (
	!(
		targetMemoryBuilding.type == Blocks.memoryBank ||
		targetMemoryBuilding.type == Blocks.memoryCell
	)
) {
	print`\n\n[#ffff00]Connected To Target Memory But The Linked Building Is Not A Valid Memory[]`
	printFlush()
	endScript()
} else print`\n\n[#00ff00]Connected To Target Memory, Set memory size is ${targetMemory.length}[]`

printFlush()

if (pointerIncrement1.enabled) {
	control.enabled(pointerIncrement1, false)

	memory[0] = Math.min(memory[0]! + 1, targetMemory.length - 1)
} else if (pointerDecrement1.enabled) {
	control.enabled(pointerDecrement1, false)

	memory[0] = Math.max(memory[0]! - 1, 0)
} else if (pointerIncrement10.enabled) {
	control.enabled(pointerIncrement10, false)

	memory[0] = Math.min(memory[0]! + 10, targetMemory.length - 1)
} else if (pointerDecrement10.enabled) {
	control.enabled(pointerDecrement10, false)

	memory[0] = Math.max(memory[0]! - 10, 0)
} else if (pointerIncrement100.enabled) {
	control.enabled(pointerIncrement100, false)

	memory[0] = Math.min(memory[0]! + 100, targetMemory.length - 1)
} else if (pointerDecrement100.enabled) {
	control.enabled(pointerDecrement100, false)

	memory[0] = Math.max(memory[0]! - 100, 0)
} else if (dataIncrement1.enabled) {
	control.enabled(dataIncrement1, false)

	targetMemory[memory[0]!]! += 1
} else if (dataDecrement1.enabled) {
	control.enabled(dataDecrement1, false)

	targetMemory[memory[0]!]! -= 1
} else if (dataIncrement10.enabled) {
	control.enabled(dataIncrement10, false)

	targetMemory[memory[0]!]! += 10
} else if (dataDecrement10.enabled) {
	control.enabled(dataDecrement10, false)

	targetMemory[memory[0]!]! -= 10
} else if (dataIncrement100.enabled) {
	control.enabled(dataIncrement100, false)

	targetMemory[memory[0]!]! += 100
} else if (dataDecrement100.enabled) {
	control.enabled(dataDecrement100, false)

	targetMemory[memory[0]!]! -= 100
}
