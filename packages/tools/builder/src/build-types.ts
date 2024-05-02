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
		console.log(
			ts.formatDiagnosticsWithColorAndContext(diagnostics, {
				getCurrentDirectory: ts.sys.getCurrentDirectory,
				getCanonicalFileName: (fileName) => fileName,
				getNewLine: () => ts.sys.newLine
			})
		)
	} else {
		program.emit()
	}
}
