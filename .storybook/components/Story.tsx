import type { ReactNode } from 'react'

export type StoryProps = { children: ReactNode }

export const Story = ({ children }: StoryProps) => (
	<div
		style={{
			display: 'flex',
			gap: 16,
			alignItems: 'center',
			fontFamily: 'Arial'
		}}
	>
		{children}
	</div>
)
