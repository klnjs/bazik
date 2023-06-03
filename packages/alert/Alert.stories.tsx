import type { Meta, StoryObj } from '@storybook/react'
import { Alert as Component } from './Alert'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Alert: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
