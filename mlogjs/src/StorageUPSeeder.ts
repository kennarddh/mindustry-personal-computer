export {}

const inputMemoryBuilding = getBuilding('bank1')
const inputMemory = new Memory(inputMemoryBuilding, 64)

const acquireLock = (): number => {
	const lock = Math.floor(Math.rand(9999))

	while (true) {
		while (inputMemory[1] !== -2) {
			// Wait 1 instruction
			print()
		}

		inputMemory[0] = lock
		inputMemory[1] = -1

		if (inputMemory[0] === lock) break
	}

	return lock
}

const releaseLockMightFail = (currentLock: number): boolean => {
	if (inputMemory[0] !== currentLock) return true

	// Should not release lock when still processing
	if (inputMemory[1]! > 0) return false

	inputMemory[0] = -1
	inputMemory[1] = -2

	return true
}

const releaseLock = (currentLock: number) => {
	while (true) {
		if (releaseLockMightFail(currentLock)) break
	}
}

const writeReliableMightFail = (lock: number, address: number, value: number): boolean => {
	if (inputMemory[1] === -1) {
		inputMemory[2] = address
		inputMemory[3] = value
		inputMemory[1] = -3
		inputMemory[4] = 1

		while (inputMemory[1] === lock) {
			// Wait 1 instruction
			print()
		}

		return true
	}

	return false
}

const writeReliable = (lock: number, address: number, value: number) => {
	while (true) {
		if (writeReliableMightFail(lock, address, value)) break
	}
}

const lock = acquireLock()

writeReliable(lock, 0, 1)
writeReliable(lock, 1, 2)
writeReliable(lock, 2, 3)
writeReliable(lock, 3, 4)
writeReliable(lock, 4, 5)
writeReliable(lock, 5, 6)

releaseLock(lock)
