import type { Meta, StoryObj } from '@storybook/react'
import { Spinner as Component } from './Spinner'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Spinner: StoryObj<typeof Component> = {
	render: (args) => <Component {...args} />
}
