import { exec } from 'child_process'
import { Compiler } from 'mlogjs'
import path from 'node:path'
import fs from 'fs/promises'

const inputDir = process.argv[2]
const outputDir = process.argv[3]

if (inputDir === undefined) throw new Error('No inputDir')

if (outputDir === undefined) throw new Error('No outputDir')

const inputPath = path.resolve(process.cwd(), inputDir)
const outputPath = path.resolve(process.cwd(), outputDir)

const cleanCommand = 'npm run clean'

const execPromise = (command: string) =>
	new Promise((resolvePromise, reject) => {
		// eslint-disable-next-line security/detect-child-process
		exec(command, (error, stdout) => {
			if (error) {
				reject(error)

				return
			}

			resolvePromise(stdout)
		})
	})

const changeExtension = (filePath: string, newExtension: string) => {
	const basename = path.basename(filePath, path.extname(filePath))

	return path.join(path.dirname(filePath), basename + newExtension)
}

await execPromise(cleanCommand)

const compiler = new Compiler({ compactNames: true })

const files = await fs.readdir(inputPath, { recursive: true })

for (const file of files) {
	const filePath = path.join(inputPath, file)
	const toPath = path.join(outputPath, changeExtension(file, '.mlog'))

	await fs.mkdir(path.dirname(toPath), { recursive: true })

	const stat = await fs.stat(filePath)

	if (!stat.isFile()) continue

	const contentBuffer = await fs.readFile(filePath)

	const content = contentBuffer.toString()

	const [compiled, error] = compiler.compile(content)

	if (error !== null) {
		console.error(`Error occured while compiling ${filePath}.`, error)

		continue
	}

	await fs.writeFile(toPath, compiled)
}
