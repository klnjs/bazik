import type { Meta, StoryObj } from '@storybook/react'
import { Ellipsis as Component } from './Ellipsis'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Ellipsis: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
