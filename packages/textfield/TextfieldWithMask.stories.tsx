import { useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import {
	TextfieldWithMask as Component,
	type TextfieldWithMaskProps
} from './TextfieldWithMask'

export default {
	component: Component
} satisfies Meta<typeof Component>

export const TextfieldWithMask: StoryObj<typeof Component> = {
	args: {
		mask: '### / ### / ###',
		label: 'Label',
		placeholder: '123456789'
	},
	render: (args) => <Template {...args} />
}

const Template = (args: TextfieldWithMaskProps) => {
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
