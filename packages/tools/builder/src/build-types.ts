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

	const result = ts
		.createProgram({
			rootNames: configParsed.fileNames,
			options: {
				...configParsed.options,
				outDir: dist,
				declaration: true,
				emitDeclarationOnly: true
			}
		})
		.emit()

	console.log(result)
}
