import p from 'path'
import fs from 'fs'
import url from 'url'
import mdi from '@mdi/js'
import prettier from 'prettier'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = p.dirname(__filename)

const template = ({ title, viewBox, path }) => `
	import { createIcon } from '../createIcon'

	export default createIcon({
		title: '${title}',
		path: '${path}',
		viewBox: '${viewBox}',
	})
`

const generate = async () => {
	try {
		const icons = Object.entries(mdi)
		const config = await prettier.resolveConfig(__filename)
		const output = p.resolve(__dirname, '..', 'packages', 'icon', 'icons')
		const exports = []

		for (const icon of icons) {
			const [name, path] = icon

			if (name !== '__esModule') {
				const nameWithoutPrefix = name.slice(3)
				const target = p.resolve(output, `${nameWithoutPrefix}.ts`)
				const source = prettier.format(
					template({
						title: nameWithoutPrefix,
						viewBox: '0 0 24 24',
						path
					}),
					{ ...config, parser: 'typescript' }
				)

				exports.push(
					`export ${nameWithoutPrefix} from './${nameWithoutPrefix}'`
				)

				fs.writeFileSync(target, source, 'utf8')
			}
		}

		const target = p.resolve(output, 'index.ts')
		const source = prettier.format(exports.join('\n'), {
			...config,
			parser: 'typescript'
		})

		fs.writeFileSync(target, source, 'utf8')
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}

generate()
