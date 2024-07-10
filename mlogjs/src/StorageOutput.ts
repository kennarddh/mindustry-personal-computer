/**
 * StorageOutput
 *
 * All memory has to be memory bank. Memory cell is not supported
 *
 * 0: Lock (Make sure to set this to -1 after done using)
 * 1: Status (Will be -2 when ready. Will be -1 when done processing. Client should set this to be -3 when before trigger. Will be set to Lock when processing.)
 * 2: Address
 * 3: Value
 * 4: Trigger
 *
 * 63: Total addresses (Read only)
 */

export {}

const cellBuilding = getLink(0)
const cell = new Memory(cellBuilding, 64)

let totalAddresses = 0

for (let i = 1; i < Vars.links; i++) {
	const memoryBankBuilding = getLink(i)
	const memoryBank = new Memory(memoryBankBuilding, 512)

	totalAddresses += memoryBank.length
}

cell[63] = totalAddresses

const getAtAddress = (address: number): number => {
	const bankIndex = Math.idiv(address, 512)
	const inBankIndex = address - bankIndex * 512

	const memoryBankBuilding = getLink(bankIndex + 1)
	const memoryBank = new Memory(memoryBankBuilding, 512)

	return memoryBank[inBankIndex]!
}

cell[0] = -1
cell[1] = -2

while (true) {
	const trigger = cell[4]!

	const lock = cell[0]!
	const address = cell[2]!

	if (lock === -1) continue

	if (address < 0) continue
	if (address >= totalAddresses) continue

	if (trigger === 1) {
		cell[4] = 0

		cell[1] = lock

		cell[3] = getAtAddress(address)

		cell[1] = -1
	}
}
