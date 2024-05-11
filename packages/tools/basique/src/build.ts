#!/usr/bin/env bun

import { join } from 'path'
import { mkdir, rm } from 'node:fs/promises'

import { buildCode } from './build-code'
import { buildTypes } from './build-types'

export const build = async () => {
	const cwd = process.cwd()
	const dist = join(cwd, 'dist')

	await rm(dist, { recursive: true, force: true })
	await mkdir(dist, { recursive: true })
	await buildCode({ root: cwd, dist })
	await buildTypes({ root: cwd, dist })
}
