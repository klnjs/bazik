import { cloneElement, type ReactNode, type ReactElement } from 'react'

export type StoryProps = {
	controls?: ReactElement[]
	children: ReactNode
	layout?: 'auto' | 'center'
	width?: number
	height?: number
	direction?: 'row' | 'column'
}

export const Story = ({
	id,
	controls,
	children,
	layout = 'center',
	width,
	height,
	direction = 'row'
}: StoryProps) => (
	<div
		style={{
			color: 'white',
			display: 'flex',
			alignItems: layout === 'center' ? 'center' : undefined,
			justifyContent: layout === 'center' ? 'center' : undefined,
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
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					flexShrink: 0,
					overflow: 'auto'
				}}
			>
				<div
					style={{
						padding: 16
					}}
				>
					{children}
				</div>
			</div>
		</div>
	</div>
)
