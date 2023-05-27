import { useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import {
	TextfieldBase as Component,
	type TextfieldBaseProps
} from './TextfieldBase'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const TextfieldBase: StoryObj<typeof Component> = {
	args: { placeholder: 'Placeholder' },
	render: (args) => <Template {...args} />
}

const Template = (args: TextfieldBaseProps) => {
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
