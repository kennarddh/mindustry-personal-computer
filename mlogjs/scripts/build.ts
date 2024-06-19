import { exec } from 'child_process'
import { Compiler } from 'mlogjs'
import path from 'node:path'
import fs from 'fs/promises'
import { OutputChunk, rollup } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const inputDir = process.argv[2]
const outputDir = process.argv[3]

const generatePreCompile = true

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
	// Only parse ts and js files
	if (!['.js', '.ts'].includes(path.extname(file))) continue

	console.log(`Processing ${file}`)

	const filePath = path.join(inputPath, file)
	const toPath = path.join(outputPath, changeExtension(file, '.mlog'))
	const preCompileToPath = path.join(outputPath, changeExtension(file, '.pre.js'))

	await fs.mkdir(path.dirname(toPath), { recursive: true })

	const stat = await fs.stat(filePath)

	if (!stat.isFile()) continue

	const contentBuffer = await fs.readFile(filePath)
	const content = contentBuffer.toString()

	// Skip mlog compiling for file with @mlog-skip as first line comment
	if (content.match(/^\/\/\s*@mlog-skip/)) {
		console.log(`Skipped mlog compiling for ${file}`)

		continue
	}

	const bundle = await rollup({
		input: filePath,
		plugins: [typescript()],
	})

	const { output } = await bundle.generate({
		format: 'cjs',
	})

	let outputChunk: OutputChunk | null = null

	for (const chunkOrAsset of output) {
		if (chunkOrAsset.type === 'asset') {
			console.error(chunkOrAsset)

			throw new Error('One of output is an asset')
		} else {
			if (outputChunk === null) {
				outputChunk = chunkOrAsset
			} else {
				throw new Error('Multiple chunk output. Should only output 1 chunk')
			}
		}
	}

	if (outputChunk === null) throw new Error('No output chunk')

	if (generatePreCompile) await fs.writeFile(preCompileToPath, outputChunk.code)

	if (outputChunk.exports.length > 0) {
		throw new Error(
			`Mlog file cannot export anything. It currently exports ${outputChunk.exports.map(name => `"${name}"`).join(', ')}`,
		)
	}

	const [compiled, error] = compiler.compile(outputChunk.code)

	if (error !== null) {
		console.error(`Error occured while compiling ${filePath}.`, error)

		continue
	}

	await fs.writeFile(toPath, compiled)
}
