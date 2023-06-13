import type { Meta, StoryObj } from '@storybook/react'
import { Flex as Component } from './Flex'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Flex: StoryObj<typeof Component> = {
	render: (args) => (
		<Component
			sx={{ padding: 2, radius: 2 }}
			style={{
				border: '1px dotted black'
			}}
			{...args}
		>
			<FlexChild size={40} color='red' />
			<FlexChild size={80} color='green' />
			<FlexChild size={60} color='blue' />
		</Component>
	)
}

const FlexChild = ({ size, color }: { size: number; color: string }) => (
	<div
		style={{
			minWidth: size,
			minHeight: size,
			background: color
		}}
	/>
)
