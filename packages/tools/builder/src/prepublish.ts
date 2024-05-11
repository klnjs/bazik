#!/usr/bin/env bun

import { findUp } from 'find-up'

const pathToPackage = await findUp('package.json')
const pathToLicense = await findUp('LICENSE')

const json = await Bun.file(pathToPackage!).json()
const license = await Bun.file(pathToLicense!).text()

if (json.publishConfig.exports) {
	json.exports = json.publishConfig.exports
	delete json.publishConfig.exports
}

if (Object.keys(json.publishConfig).length > 0) {
	delete json.publishConfig
}

await Bun.write('./LICENSE', license)
await Bun.write('./package.json', JSON.stringify(json, null, 2))
