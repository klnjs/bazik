import { cloneElement, type ReactElement, type ReactNode } from 'react'

export type StoryProps = { controls: ReactElement[]; children: ReactNode }

export const Story = ({ children, controls }: StoryProps) => (
	<div
		style={{
			display: 'flex',
			border: '1px solid black',
			fontFamily: 'Arial'
		}}
	>
		<div
			style={{
				display: 'flex',
				gap: 16,
				padding: 16,
				minWidth: '180px',
				boxSizing: 'border-box',
				boxShadow: '2px 0 4px gray',
				flexDirection: 'column',
				background: '#F7F7F7',
				justifyContent: 'center'
			}}
		>
			{controls.map((control, index) =>
				// eslint-disable-next-line react/no-array-index-key
				cloneElement(control, { key: index })
			)}
		</div>
		<div
			style={{
				display: 'flex',
				flex: 1,
				padding: 16,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{children}
		</div>
	</div>
)
