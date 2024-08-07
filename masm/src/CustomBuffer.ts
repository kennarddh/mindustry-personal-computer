class CustomBuffer {
	#offset: number = 0
	#length: number = 0
	#buffer: Buffer = Buffer.alloc(0)
	#capacity: number = 0

	read(): number {
		this.checkCanRead(1)

		const data = this.#buffer.readInt8(this.#offset)

		this.#offset += 1

		return data
	}

	readShort(): number {
		this.checkCanRead(2)

		const data = this.#buffer.readInt16BE(this.#offset)

		this.#offset += 2

		return data
	}

	readInt(): number {
		this.checkCanRead(4)

		const data = this.#buffer.readInt32BE(this.#offset)

		this.#offset += 4

		return data
	}

	readLong(): bigint {
		this.checkCanRead(8)

		const data = this.#buffer.readBigInt64BE(this.#offset)

		this.#offset += 8

		return data
	}

	readFloat(): number {
		this.checkCanRead(4)

		const data = this.#buffer.readFloatBE(this.#offset)

		this.#offset += 4

		return data
	}

	readDouble(): number {
		this.checkCanRead(8)

		const data = this.#buffer.readDoubleBE(this.#offset)

		this.#offset += 8

		return data
	}

	readUByte(): number {
		this.checkCanRead(1)

		const data = this.#buffer.readUint8(this.#offset)

		this.#offset += 1

		return data
	}

	readUShort(): number {
		this.checkCanRead(2)

		const data = this.#buffer.readUint16BE(this.#offset)

		this.#offset += 2

		return data
	}

	readBoolean(): boolean {
		const data = this.read()

		return data != 0
	}

	readString(): string {
		const length = this.read() & 0xff

		const stringBuffer = CustomBuffer.alloc(length)

		for (let i = 0; i < length; i++) {
			const data = this.read()

			stringBuffer.write(data)
		}

		return stringBuffer.toString('utf-8')
	}

	write(value: number): void {
		this.checkExpand(1)

		this.#buffer.writeInt8(value, this.#offset)

		this.#offset += 1
		this.#length += 1
	}

	writeShort(value: number): void {
		this.checkExpand(2)

		this.#buffer.writeInt16BE(value, this.#offset)

		this.#offset += 2
		this.#length += 2
	}

	writeInt(value: number): void {
		this.checkExpand(4)

		this.#buffer.writeInt32BE(value, this.#offset)

		this.#offset += 4
		this.#length += 4
	}

	writeLong(value: bigint): void {
		this.checkExpand(8)

		this.#buffer.writeBigInt64BE(value, this.#offset)

		this.#offset += 8
		this.#length += 8
	}

	writeFloat(value: number): void {
		this.checkExpand(4)

		this.#buffer.writeFloatBE(value, this.#offset)

		this.#offset += 4
		this.#length += 4
	}

	writeDouble(value: number): void {
		this.checkExpand(8)

		this.#buffer.writeDoubleBE(value, this.#offset)

		this.#offset += 8
		this.#length += 8
	}

	writeUByte(value: number): void {
		this.checkExpand(1)

		this.#buffer.writeUInt8(value, this.#offset)

		this.#offset += 1
		this.#length += 1
	}

	writeUShort(value: number): void {
		this.checkExpand(2)

		this.#buffer.writeUInt16BE(value, this.#offset)

		this.#offset += 2
		this.#length += 2
	}

	writeBoolean(value: boolean): void {
		this.write(value ? 1 : 0)
	}

	writeFromIterable(iterable: Iterable<number>): void {
		for (const byte of iterable) {
			this.#buffer.writeInt8(byte)
		}
	}

	clear(newCapacity: number): void
	clear(preserveCapacity: true): void
	clear(preserveCapacityOrNewCapacity: number | true): void {
		if (preserveCapacityOrNewCapacity === true) {
			this.#buffer.fill(0)
			this.#length = 0
			this.#offset = 0
		} else {
			this.#buffer = Buffer.alloc(preserveCapacityOrNewCapacity)
			this.#capacity = preserveCapacityOrNewCapacity
			this.#length = 0
			this.#offset = 0
		}
	}

	static fromBuffer(buffer: Buffer): CustomBuffer {
		const newBuffer = CustomBuffer.alloc(buffer.length)

		newBuffer.#length = buffer.length

		newBuffer.copy(buffer)

		return newBuffer
	}

	static fromUint8Array(data: Uint8Array): CustomBuffer {
		return this.fromBuffer(Buffer.from(data))
	}

	static alloc(length: number): CustomBuffer {
		if (length < 0) throw Error('Cannot allocate buffer with less than 0 length')

		const newBuffer = new CustomBuffer()

		newBuffer.#buffer = Buffer.alloc(length)

		newBuffer.#capacity = length

		return newBuffer
	}

	expand(requiredEmptyLength: number) {
		if (this.#capacity == 0) this.#capacity = 1

		while (this.#capacity - this.#offset < requiredEmptyLength) this.#capacity *= 2

		const newBuffer = Buffer.alloc(this.#capacity)

		this.#buffer.copy(newBuffer)

		this.#buffer = newBuffer
	}

	checkExpand(requiredEmptyLength: number) {
		if (this.#offset + requiredEmptyLength >= this.#capacity) this.expand(requiredEmptyLength)
	}

	checkCanRead(byteLength: number) {
		if (this.#offset + byteLength > this.#length)
			throw new Error("Can't read attempting to access memory outside capacity bounds")
	}

	copy(originalBuffer: Buffer): void {
		originalBuffer.copy(this.#buffer, 0)

		this.resetOffset()
	}

	toString(encoding: BufferEncoding = 'utf-8'): string {
		return this.#buffer.toString(encoding)
	}

	get offset(): number {
		return this.#offset
	}

	get bufferLeft(): Buffer {
		return this.#buffer.subarray(this.#offset, this.#length)
	}

	get buffer(): Buffer {
		return this.#buffer.subarray(0, this.#length)
	}

	get capacity(): number {
		return this.#capacity
	}

	get length(): number {
		return this.#length
	}

	resetOffset(): void {
		this.#offset = 0
	}

	*[Symbol.iterator](): IterableIterator<number> {
		for (const byte of this.buffer) {
			yield byte
		}
	}

	static concat(...buffers: CustomBuffer[]): CustomBuffer {
		return CustomBuffer.fromBuffer(
			Buffer.concat(buffers.map(customBuffer => customBuffer.buffer)),
		)
	}
}

export default CustomBuffer
