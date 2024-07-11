import {
	StoragePortAcquireLockReliable,
	StoragePortReadReliable,
	StoragePortReleaseLockReliable,
	StoragePortWriteReliable,
} from 'StoragePortUtils'

const inputMemoryBuilding = getBuilding('bank1')

const lock = StoragePortAcquireLockReliable(inputMemoryBuilding)

StoragePortWriteReliable(inputMemoryBuilding, lock, 0, 1)
StoragePortWriteReliable(inputMemoryBuilding, lock, 1, 2)
StoragePortWriteReliable(inputMemoryBuilding, lock, 2, 3)
StoragePortWriteReliable(inputMemoryBuilding, lock, 3, 4)
StoragePortWriteReliable(inputMemoryBuilding, lock, 4, 5)
StoragePortWriteReliable(inputMemoryBuilding, lock, 5, 6)

print(StoragePortReadReliable(inputMemoryBuilding, lock, 0))
printFlush()
print(StoragePortReadReliable(inputMemoryBuilding, lock, 1))
printFlush()
print(StoragePortReadReliable(inputMemoryBuilding, lock, 2))
printFlush()
print(StoragePortReadReliable(inputMemoryBuilding, lock, 3))
printFlush()
print(StoragePortReadReliable(inputMemoryBuilding, lock, 4))
printFlush()
print(StoragePortReadReliable(inputMemoryBuilding, lock, 5))
printFlush()

StoragePortReleaseLockReliable(inputMemoryBuilding, lock)
