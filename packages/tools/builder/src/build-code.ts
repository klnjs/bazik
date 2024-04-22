/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

export type BuildCodeOptions = {
	root: string
	dist: string
}

export const buildCode = async ({ root, dist }: BuildCodeOptions) => {
	const entrypoints = [Bun.resolveSync('./index.ts', root)]
	const manifest = await import(Bun.resolveSync('./package.json', root))
	const external = [
		'dependencies',
		'devDependencies',
		'peerDependencies'
	].flatMap((section) => Object.keys(manifest[section] ?? {}))

	await Bun.build({
		outdir: dist,
		external,
		entrypoints
	})
}
