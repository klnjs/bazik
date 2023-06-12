import type { Meta, StoryObj } from '@storybook/react'
import { Flex as Component } from './Flex'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Flex: StoryObj<typeof Component> = {
	render: (args) => (
		<Component
			sx={{ padding: 2 }}
			style={{
				maxWidth: 400,
				aspectRatio: '2 / 1',
				border: '1px solid black',
				borderRadius: '4px',
				backgroundClip: 'content-box',
				boxShadow: 'inset 0 0 0 16px lime'
			}}
			{...args}
		>
			<FlexChild size={40} />
			<FlexChild size={80} />
			<FlexChild size={60} />
		</Component>
	)
}

const FlexChild = ({ size }: { size: number }) => (
	<div
		style={{
			minWidth: size,
			minHeight: size,
			border: '1px solid black',
			background: 'black',
			borderRadius: '4px'
		}}
	/>
)
