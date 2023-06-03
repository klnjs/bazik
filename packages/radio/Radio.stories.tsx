import type { Meta, StoryObj } from '@storybook/react'
import { Radio as Component } from './Radio'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Radio: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
