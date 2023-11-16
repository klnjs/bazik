import type { ReactNode } from 'react'

export type ControlsProps = { children: ReactNode }

export const Controls = ({ children }: ControlsProps) => (
	<div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
		{children}
	</div>
)
