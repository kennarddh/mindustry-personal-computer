import { exec } from 'child_process'
import { Compiler } from 'mlogjs'
import path from 'node:path'
import fs from 'fs/promises'
import { OutputChunk, rollup } from 'rollup'
import typescript from '@rollup/plugin-typescript'

import { program } from 'commander'

interface IBuildProgramOptions {
	outDir: string
	generatePreCompile: boolean
	compactNames: boolean
}

program
	.name('mindustry-personal-computer-mlogjs-compiler')
	.description('Better MlogJS build tools. Has import/export support.')
	.version('1.0.0')
	.argument('<input-directory>', 'Input directory')
	.option('-o, --out-dir', 'Output directory for mlog and other generated files.', './dist/')
	.option('-p, --generate-pre-compile', 'Whether to output pre-mlog compiled js code.', false)
	.option(
		'-n, --compact-names',
		'Whether to compact variables name in compiled mlog output',
		false,
	)
	.parse()

const options = program.opts<IBuildProgramOptions>()

const inputDir = program.args[0]

if (inputDir === undefined) throw new Error('No inputDir')

if (options.outDir === undefined) throw new Error('No outputDir')

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

const processFile = async (file: string) => {
	console.log(`Processing ${file}`)

	const filePath = path.join(inputDir, file)
	const toPath = path.join(options.outDir, changeExtension(file, '.mlog'))
	const preCompileToPath = path.join(options.outDir, changeExtension(file, '.pre.js'))

	await fs.mkdir(path.dirname(toPath), { recursive: true })

	const stat = await fs.stat(filePath)

	if (!stat.isFile()) return

	const contentBuffer = await fs.readFile(filePath)
	const content = contentBuffer.toString()

	// Skip mlog compiling for file with @mlog-skip as first line comment
	if (content.match(/^\/\/\s*@mlog-skip/)) {
		console.log(`Skipped mlog compiling for ${file}`)

		return
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

	if (options.generatePreCompile) await fs.writeFile(preCompileToPath, outputChunk.code)

	if (outputChunk.exports.length > 0) {
		throw new Error(
			`Mlog file cannot export anything. It currently exports ${outputChunk.exports.map(name => `"${name}"`).join(', ')}`,
		)
	}

	const [compiled, error] = compiler.compile(outputChunk.code)

	if (error !== null) throw error

	await fs.writeFile(toPath, compiled)
}

await execPromise(cleanCommand)

const compiler = new Compiler({ compactNames: options.compactNames })

const files = await fs.readdir(inputDir, { recursive: true })

const promises: Promise<void>[] = []

for (const file of files) {
	// Only parse ts and js files
	if (!['.js', '.ts'].includes(path.extname(file))) continue

	const promise = processFile(file).catch(error => {
		console.error(`Error occured while compiling ${file}`, error)
	})

	promises.push(promise)
}

await Promise.all(promises)
