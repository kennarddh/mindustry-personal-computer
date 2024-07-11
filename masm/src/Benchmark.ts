import Compiler from 'Compiler'
import fs from 'fs/promises'
import path from 'path'
import PrettyTime from 'PrettyTime'

const BigIntMax = (arr: bigint[]) => arr.reduce((value, acc) => (acc > value ? acc : value))
const BigIntMin = (arr: bigint[]) => arr.reduce((value, acc) => (acc < value ? acc : value))

const start = process.hrtime.bigint()

const codeBuffer = await fs.readFile(path.join(import.meta.dirname, '../temp/Benchmark.masm'))
const code = codeBuffer.toString()

const compiler = new Compiler()

const compileDurations: bigint[] = []

const total = 1000

for (let i = 0; i < total; i++) {
	if (i % 100 === 0) console.log(`Processing ${i}/${total}`)

	const start = process.hrtime.bigint()

	compiler.compile(code)

	const end = process.hrtime.bigint()

	const duration = end - start

	compileDurations.push(duration)
}

const end = process.hrtime.bigint()

const duration = end - start

// const length = compileDurations.length

// for (let i = 0; i < length; i++) {
// 	const compileDuration = compileDurations[i]!

// 	console.log(`Done compile ${i} in ${PrettyTime(compileDuration)}`)
// }

const sumNS = compileDurations.reduce((duration, acc) => acc + duration, 0n)

const averageNS = sumNS / BigInt(compileDurations.length)
const minNS = BigIntMin(compileDurations)
const maxNS = BigIntMax(compileDurations)

console.log(`Done in ${PrettyTime(duration)}.`)
console.log(`Total compile duration: ${PrettyTime(sumNS)}.`)
console.log(`Average compile duration: ${PrettyTime(averageNS)}.`)
console.log(`Min compile duration: ${PrettyTime(minNS)}.`)
console.log(`Max compile duration: ${PrettyTime(maxNS)}.`)
