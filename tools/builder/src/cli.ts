#!/usr/bin/env bun
import { join } from 'path'
import { mkdir, rm } from 'node:fs/promises'

const cwd = process.cwd()
const dist = join(cwd, 'dist')
const manifest = await import(Bun.resolveSync('./package.json', cwd))
const externals = [
	'dependencies',
	'devDependencies',
	'peerDependencies'
].flatMap((section) => Object.keys(manifest[section]))

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })
await Bun.build({
	entrypoints: [Bun.resolveSync('./index.ts', cwd)],
	outdir: dist,
	external: externals
})
