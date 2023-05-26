import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { TextfieldBase as Component } from './TextfieldBase'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const TextfieldBase: StoryObj<typeof Component> = {
	args: { placeholder: 'Placeholder' },
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
