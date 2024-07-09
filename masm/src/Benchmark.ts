import Compiler from 'Compiler'
import fs from 'fs/promises'
import path from 'path'
import prettyTime from 'pretty-time'

const start = process.hrtime()

const codeBuffer = await fs.readFile(path.join(import.meta.dirname, '../temp/Benchmark.masm'))
const code = codeBuffer.toString()

const compiler = new Compiler()

const compileDurations: [number, number][] = []

for (let i = 0; i < 1000; i++) {
	console.log(`Processing ${i}`)

	const start = process.hrtime()

	compiler.compile(code)

	const duration = process.hrtime(start)

	compileDurations.push(duration)
}

const duration = process.hrtime(start)

const length = compileDurations.length

for (let i = 0; i < length; i++) {
	const compileDuration = compileDurations[i]!

	console.log(`Done compile ${i} in ${prettyTime(compileDuration, 'ns')}`)
}

const averageMS =
	compileDurations
		.map(duration => duration[0] * 1000 + duration[1] / 1000000)
		.reduce((duration, acc) => acc + duration, 0) / compileDurations.length

console.log(`Done in ${prettyTime(duration, 'ns')}.`)
console.log(`Average compile duration: ${averageMS}ms.`)
