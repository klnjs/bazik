import { Snippet } from '../snippet'

export type InstallationManager = 'bun' | 'npm' | 'pnpm' | 'yarn'

export type InstallationProps = {
	name: string
	manager: InstallationManager
}

export const Installation = ({ name, manager = 'pnpm' }: InstallationProps) => (
	<Snippet language="bash">{`${manager} install @klnjs/${name}`}</Snippet>
)
