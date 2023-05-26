import { Meta, StoryObj } from '@storybook/react'
import { Avatar as Component } from './Avatar'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Avatar: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
