import { Snippet } from '../snippet'

export type InstallationManager = 'bun' | 'npm' | 'pnpm' | 'yarn'

export type InstallationProps = {
	name: string
	manager?: InstallationManager
	dependencies?: string[]
}

export const Installation = ({
	name,
	manager = 'bun',
	dependencies: dependenciesProp
}: InstallationProps) => {
	const script = `${manager} install @klnjs/${name}`
	const dependencies = dependenciesProp ?? []

	return (
		<Snippet language="bash">{[script, ...dependencies].join(' ')}</Snippet>
	)
}
