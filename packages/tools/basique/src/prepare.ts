#!/usr/bin/env bun

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { findUp } from 'find-up'

export const prepare = async () => {
	const pathToPackage = await findUp('package.json')
	const pathToLicense = await findUp('LICENSE')

	const json = await Bun.file(pathToPackage!).json()
	const license = await Bun.file(pathToLicense!).text()

	if (json.publishConfig.exports) {
		json.exports = json.publishConfig.exports
		delete json.publishConfig.exports
	}

	if (Object.keys(json.publishConfig).length === 0) {
		delete json.publishConfig
	}

	await Bun.write('./LICENSE', license)
	await Bun.write('./package.json', JSON.stringify(json, null, 2))
}
