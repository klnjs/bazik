#!/usr/bin/env bun

import type { BunPlugin } from 'bun'
import { transformAsync } from '@babel/core'
import babelPluginTransformTypescript from '@babel/plugin-transform-typescript'
import babelPlugingTransformReactJsx from '@babel/plugin-transform-react-jsx'
import babelPluginReactCompiler from 'babel-plugin-react-compiler'

export default (): BunPlugin => ({
	name: 'bun-plugin-react-compiler',
	setup(build) {
		build.onLoad({ filter: /\.(ts|tsx)$/ }, async (args) => {
			try {
				const source = await Bun.file(args.path).text()
				const result = await transformAsync(source, {
					filename: args.path,
					plugins: [
						[babelPlugingTransformReactJsx],
						[babelPluginTransformTypescript]
					]
				})

				console.log(result?.code)

				return {
					contents: result?.code,
					loader: 'js'
				}
			} catch (e) {
				console.log(e)
			}
		})
	}
})
