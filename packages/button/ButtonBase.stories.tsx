import type { Meta, StoryObj } from '@storybook/react'
import { ButtonBase as Component } from './ButtonBase'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const ButtonBase: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
