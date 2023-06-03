import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Textfield as Component, type TextfieldProps } from './Textfield'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const Textfield: StoryObj<typeof Component> = {
	args: { label: 'Label', placeholder: 'Placeholder' },
	render: (args) => <Template {...args} />
}

const Template = (args: TextfieldProps) => {
	const [value, setValue] = useState('')

	return (
		<Component
			value={value}
			onChange={(event) => {
				setValue(event.target.value)
			}}
			{...args}
		/>
	)
}
