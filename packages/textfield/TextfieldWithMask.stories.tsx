import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { TextfieldWithMask as Component } from './TextfieldWithMask'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const TextfieldWithMask: StoryObj<typeof Component> = {
	args: {
		mask: '### / ### / ###',
		label: 'Label',
		placeholder: '123456789'
	},
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
