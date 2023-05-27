import { type Meta, type StoryObj } from '@storybook/react'
import { Button as Component } from './Button'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Button: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
