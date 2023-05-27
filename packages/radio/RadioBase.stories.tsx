import { type Meta, type StoryObj } from '@storybook/react'
import { RadioBase as Component } from './RadioBase'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const RadioBase: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
