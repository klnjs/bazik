import { cloneElement, type ReactNode, type ReactElement } from 'react'

export type StoryProps = {
	controls?: ReactElement[]
	children: ReactNode
	width?: number
	height?: number
	center?: boolean
	direction?: 'row' | 'column'
}

export const Story = ({
	controls,
	children,
	width,
	height,
	center = true,
	direction = 'row'
}: StoryProps) => (
	<div
		style={{
			color: 'white',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100vw',
			height: '100vh',
			background: '#101618'
		}}
	>
		<div
			style={{
				display: 'flex',
				flexDirection: direction,
				border: '1px solid #363a3f',
				borderRadius: 4,
				background: '#111113',
				fontFamily: 'Arial',
				width: width ? '100vw' : undefined,
				height: height ? '100vh' : undefined,
				maxWidth: width,
				maxHeight: height,
				overflow: 'hidden'
			}}
		>
			{controls !== undefined && (
				<div
					style={{
						display: 'flex',
						gap: 16,
						padding: 16,
						minWidth: '180px',
						boxSizing: 'border-box',
						flexDirection: 'column',
						borderInlineEnd:
							direction === 'row'
								? '1px solid #363a3f'
								: undefined,
						borderBlockEnd:
							direction === 'column'
								? '1px solid #363a3f'
								: undefined,
						justifyContent: 'center',
						zIndex: 1
					}}
				>
					{controls.map((control, index) =>
						// eslint-disable-next-line react/no-array-index-key
						cloneElement(control, { key: index })
					)}
				</div>
			)}

			<div
				style={{
					display: 'flex',
					alignItems: center ? 'center' : undefined,
					justifyContent: center ? 'center' : undefined,
					padding: 16,
					flexShrink: 0,
					overflow: 'auto'
				}}
			>
				{children}
			</div>
		</div>
	</div>
)
