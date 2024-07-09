import Compiler from 'Compiler'
import fs from 'fs/promises'
import path from 'path'
import prettyTime from 'pretty-time'

const start = process.hrtime()

const codeBuffer = await fs.readFile(path.join(import.meta.dirname, '../temp/Benchmark.masm'))
const code = codeBuffer.toString()

const compiler = new Compiler()

compiler.compile(code)

const duration = process.hrtime(start)

console.log(`Done in ${prettyTime(duration, 'ns')}`)
