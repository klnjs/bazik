#!/usr/bin/env bun

import ts from 'typescript'

export type BuildTypeOptions = {
	root: string
	dist: string
}

export const buildTypes = async ({ root, dist }: BuildTypeOptions) => {
	const config = Bun.resolveSync('./tsconfig.json', root)
	const configRaw = ts.readConfigFile(config, ts.sys.readFile)
	const configParsed = ts.parseJsonConfigFileContent(
		configRaw.config,
		ts.sys,
		root
	)

	const program = ts.createProgram({
		rootNames: configParsed.fileNames,
		options: {
			...configParsed.options,
			outDir: dist,
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true
		}
	})

	const diagnostics = ts.getPreEmitDiagnostics(program)

	if (diagnostics.length > 0) {
		// eslint-disable-next-line no-console
		console.log(
			ts.formatDiagnosticsWithColorAndContext(diagnostics, {
				getCanonicalFileName: (fileName) => fileName,
				getCurrentDirectory: ts.sys.getCurrentDirectory,
				getNewLine: () => ts.sys.newLine
			})
		)
	} else {
		program.emit()
	}
}
