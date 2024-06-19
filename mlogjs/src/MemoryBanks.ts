/**
 * All memory has to be memory bank. Memory cell is not supported
 *
 * Overflowed data will be discarded
 *
 * ControlCell
 *
 * 0: Lock (Mutex, never modified by this script. Made for consumer to check if other processor is using it.)
 * 1: Offset
 * 2: Limit
 * 3: Fetch Signal (Fetch selected data to DataIOCell)
 * 4: Set Signal (Set selected data from DataIOCell)
 * 5: Clear Signal (Clear selected data)
 */

const controlCellBuilding = getLink(0)
const controlCell = new Memory(controlCellBuilding, 64)

const dataIOCellBuilding = getLink(1)
const dataIOCell = new Memory(dataIOCellBuilding, 512)

let totalAddress = 0

for (let i = 0; i < Vars.links - 2; i++) {
	const memoryBankBuilding = getLink(i)
	const memoryBank = new Memory(memoryBankBuilding, 512)

	totalAddress += memoryBank.length
}

const getAtAddress = (address: number): number => {
	const bankIndex = Math.floor(address / 512)
	const inBankIndex = address - bankIndex * 512

	const memoryBankBuilding = getLink(bankIndex + 2)
	const memoryBank = new Memory(memoryBankBuilding, 512)

	return memoryBank[inBankIndex]!
}

const setAtAddress = (address: number, data: number) => {
	const bankIndex = Math.floor(address / 512)
	const inBankIndex = address - bankIndex * 512

	const memoryBankBuilding = getLink(bankIndex + 2)
	const memoryBank = new Memory(memoryBankBuilding, 512)

	memoryBank[inBankIndex] = data
}

mainLoop: while (true) {
	const fetchSignal = controlCell[3]
	const setSignal = controlCell[4]
	const clearSignal = controlCell[5]

	const offset = controlCell[1]
	const limit = controlCell[2]

	if (limit! >= 512) continue mainLoop
	if (offset! < 0) continue mainLoop
	if (limit! + offset! >= totalAddress) continue mainLoop

	if (fetchSignal === 1) {
		for (let i = 0; i < limit!; i++) {
			const address = offset! + i

			dataIOCell[i] = getAtAddress(address)
		}

		controlCell[3] = 0

		continue mainLoop
	}

	if (setSignal === 1) {
		for (let i = 0; i < limit!; i++) {
			const address = offset! + i

			setAtAddress(address, dataIOCell[i]!)
		}

		controlCell[4] = 0

		continue mainLoop
	}

	if (clearSignal === 1) {
		for (let i = 0; i < limit!; i++) {
			const address = offset! + i

			setAtAddress(address, 0)
		}

		controlCell[5] = 0

		continue mainLoop
	}
}
