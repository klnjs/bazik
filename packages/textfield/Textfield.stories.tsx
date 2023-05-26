import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Textfield as Component } from './Textfield'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Textfield: StoryObj<typeof Component> = {
	args: { label: 'Label', placeholder: 'Placeholder' },
	render: (args) => {
		const [value, setValue] = useState('')

		return (
			<Component
				value={value}
				onChange={(event) => setValue(event.target.value)}
				{...args}
			/>
		)
	}
}
