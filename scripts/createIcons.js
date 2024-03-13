import p from 'path'
import fs from 'fs/promises'
import url from 'url'
import mdi from '@mdi/js'
import prettier from 'prettier'

const pathToThisFile = url.fileURLToPath(import.meta.url)
const pathToThisFileDir = p.dirname(pathToThisFile)

const template = ({ title, viewBox, path }) => `
	import { createIcon } from '../../icon'

	export default createIcon({
		title: '${title}',
		path: '${path}',
		viewBox: '${viewBox}',
	})
`

const writeIconsToDisk = async (icons, { root, exports, prettierConfig }) => {
	for await (const icon of icons) {
		const [name, path] = icon

		if (name !== '__esModule') {
			const nameWithoutPrefix = name.slice(3)
			const target = p.resolve(root, `${nameWithoutPrefix}.ts`)
			const source = await prettier.format(
				template({
					title: nameWithoutPrefix,
					viewBox: '0 0 24 24',
					path
				}),
				prettierConfig
			)

			exports.push(nameWithoutPrefix)
			await fs.writeFile(target, source, 'utf8')
		}
	}
}

const writeIndexToDisk = async (icons, { root }) => {
	const target = p.resolve(root, 'index.ts')
	const source = icons
		.map((name) => `export { default as ${name} } from './src/${name}'`)
		.join('\n')

	await fs.writeFile(target, source, 'utf8')
}

const generate = async () => {
	try {
		const root = p.resolve(pathToThisFileDir, '..', 'packages', 'icons')
		const rootIcons = p.resolve(root, 'src')
		const icons = Object.entries(mdi)
		const exports = []
		const prettierConfig = {
			parser: 'typescript',
			...(await prettier.resolveConfig(pathToThisFile))
		}

		await fs.rm(rootIcons, { recursive: true, force: true })
		await fs.mkdir(rootIcons, { recursive: true })

		await writeIconsToDisk(icons, {
			root: rootIcons,
			exports,
			prettierConfig
		})

		await writeIndexToDisk(exports, { root })
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}

generate()
