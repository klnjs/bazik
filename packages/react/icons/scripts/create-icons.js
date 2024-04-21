import p from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'
import prettier from 'prettier'

const template = ({ title, viewBox, path }) => `
	import { createIcon } from '@klnjs/icon'

	export default createIcon({
		title: '${title}',
		path: '${path}',
		viewBox: '${viewBox}',
	})
`

const readCache = async (root) => {
	const path = p.resolve(root, '.iconscache')

	try {
		const file = await fs.readFile(path, { encoding: 'utf-8' })

		return JSON.parse(file)
	} catch {
		return []
	}
}

const writeCache = async (root, { icons }) => {
	const path = p.resolve(root, '.iconscache')
	const content = JSON.stringify(icons, (key, value) =>
		key === 'cached' || key === 'source' ? undefined : value
	)

	await fs.writeFile(path, content, 'utf8')
}

const createIcon = async ({ name, path, cache }) => {
	const hash = crypto.createHash('sha256').update(path).digest('base64')
	const cached = hash === cache.find((c) => c.name === name)?.hash
	const source = template({
		title: name,
		viewBox: '0 0 24 24',
		path
	})

	return { name, source, hash, cached }
}

const createIcons = async ({ cache }) => {
	const mdijs = await import('@mdi/js')
	const entries = Object.entries(mdijs.default)
	const icons = []

	for await (const entry of entries) {
		const icon = await createIcon({
			name: entry[0].slice(3),
			path: entry[1],
			cache
		})

		icons.push(icon)
	}

	return icons
}

const writeIcons = async (root, { icons }) => {
	await fs.mkdir(root, { recursive: true })

	const prettierConfig = await prettier.resolveConfig(import.meta.dirname)

	for await (const icon of icons) {
		if (!icon.cached) {
			const path = p.resolve(root, 'src', `${icon.name}.ts`)
			const content = await prettier.format(icon.source, {
				parser: 'typescript',
				...prettierConfig
			})

			await fs.writeFile(path, content, 'utf8')
		}
	}
}

const writeIndex = async (root, { icons }) => {
	const path = p.resolve(root, 'index.ts')
	const content = icons
		.map(
			(icon) =>
				`export { default as ${icon.name} } from './src/${icon.name}'`
		)
		.join('\n')

	await fs.writeFile(path, content + '\n', 'utf8')
}

try {
	const root = p.resolve(import.meta.dirname, '..')
	const cache = await readCache(root)
	const icons = await createIcons({ cache })

	await writeIcons(root, { icons })
	await writeIndex(root, { icons })
	await writeCache(root, { icons })
} catch (err) {
	console.log(err)
	process.exit(1)
}
