import Compiler from 'Compiler'
import fs from 'fs/promises'
import path from 'path'
import PrettyTime from 'PrettyTime'

const start = process.hrtime.bigint()

const codeBuffer = await fs.readFile(path.join(import.meta.dirname, '../temp/Benchmark.masm'))
const code = codeBuffer.toString()

const compiler = new Compiler()

const compileDurations: bigint[] = []

for (let i = 0; i < 100; i++) {
	console.log(`Processing ${i}`)

	const start = process.hrtime.bigint()

	compiler.compile(code)

	const end = process.hrtime.bigint()

	const duration = end - start

	compileDurations.push(duration)
}

const end = process.hrtime.bigint()

const duration = end - start

const length = compileDurations.length

for (let i = 0; i < length; i++) {
	const compileDuration = compileDurations[i]!

	console.log(`Done compile ${i} in ${PrettyTime(compileDuration)}`)
}

const sumNS = compileDurations.reduce((duration, acc) => acc + duration, 0n)

const averageNS = sumNS / BigInt(compileDurations.length)

console.log(`Done in ${PrettyTime(duration)}.`)
console.log(`Total compile duration: ${PrettyTime(sumNS)}.`)
console.log(`Average compile duration: ${PrettyTime(averageNS)}.`)
