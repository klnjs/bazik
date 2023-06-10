import type { Meta, StoryObj } from '@storybook/react'
import { Box as Component } from './Box'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Box: StoryObj<typeof Component> = {
	render: (args) => <Component {...args}>This is an alert!</Component>
}
