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
	dependencies
}: InstallationProps) => {
	const script = `${manager} install @klnjs/${name}`
	const scriptWithDependencies = [script, ...(dependencies || [])].join(' ')

	return <Snippet language="bash">{scriptWithDependencies}</Snippet>
}
