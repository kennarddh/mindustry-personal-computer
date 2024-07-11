// @mlog-skip

export const StoragePortGenerateRandomLock = (): number => Math.floor(Math.rand(9999))

export const StoragePortAcquireLock = (building: BasicBuilding, lock: number): boolean => {
	const memory = new Memory(building)

	while (memory[1] !== -2) {
		// Wait 1 instruction
		print()
	}

	memory[0] = lock
	memory[1] = -1

	if (memory[0] === lock) return true

	return false
}

export const StoragePortAcquireLockReliable = (
	building: BasicBuilding,
	lock = StoragePortGenerateRandomLock(),
): number => {
	while (true) {
		const result = StoragePortAcquireLock(building, lock)

		if (result) return lock
	}
}

const StoragePortReleaseLock = (building: BasicBuilding, currentLock: number): boolean => {
	const memory = new Memory(building)

	if (memory[0] !== currentLock) return true

	// Should not release lock when still processing
	if (memory[1]! > 0) return false

	memory[0] = -1
	memory[1] = -2

	return true
}

export const StoragePortReleaseLockReliable = (
	building: BasicBuilding,
	currentLock: number,
): void => {
	while (true) {
		if (StoragePortReleaseLock(building, currentLock)) break
	}
}

export const StoragePortWrite = (
	building: BasicBuilding,
	lock: number,
	address: number,
	value: number,
): boolean => {
	const memory = new Memory(building)

	if (memory[1] === -1) {
		memory[2] = address
		memory[3] = value
		memory[1] = -3
		memory[4] = 1

		while (memory[1] === lock) {
			// Wait 1 instruction
			print()
		}

		return true
	}

	return false
}

export const StoragePortWriteReliable = (
	building: BasicBuilding,

	lock: number,
	address: number,
	value: number,
): void => {
	while (true) {
		if (StoragePortWrite(building, lock, address, value)) break
	}
}

export const StoragePortRead = (
	building: BasicBuilding,
	lock: number,
	address: number,
): number | false => {
	const memory = new Memory(building)

	if (memory[1] === -1) {
		memory[2] = address
		memory[1] = -3
		memory[4] = 1

		while (memory[1] === lock) {
			// Wait 1 instruction
			print()
		}

		return memory[3]!
	}

	return false
}

export const StoragePortReadReliable = (
	building: BasicBuilding,
	lock: number,
	address: number,
): number => {
	while (true) {
		const result = StoragePortRead(building, lock, address)

		if (result !== false) return result
	}
}
