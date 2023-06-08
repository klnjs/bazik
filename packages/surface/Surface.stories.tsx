import type { Meta, StoryObj } from '@storybook/react'
import { Surface as Component } from './Surface'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Surface: StoryObj<typeof Component> = {
	render: (args) => (
		<Component {...args}>Surface content goes here!</Component>
	)
}
