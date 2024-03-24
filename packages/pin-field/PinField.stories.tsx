import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Story, TextField, ButtonGroup } from '../../.storybook/src/lib'
import { PinField } from './PinField'
import { PinFieldInput } from './PinFieldInput'
import { PinFieldGroup } from './PinFieldGroup'
import { PinFieldSlots } from './PinFieldSlots'
import { PinFieldSlot } from './PinFieldSlot'
import * as classes from './PinField.stories.css'

export default {
	title: 'PinField',
	component: PinField
} satisfies Meta<typeof PinField>

export const Pin = () => {
	const types = ['alphabetic', 'alphanumeric', 'numeric'] as const
	const [type, setType] = useState<(typeof types)[number]>(types[0])
	const [secret, setSecret] = useState('')
	const [length, setLength] = useState('4')

	return (
		<Story
			controls={[
				<ButtonGroup
					value={type}
					label="Type"
					options={types}
					onChange={setType}
				/>,
				<TextField
					label="Length"
					value={length}
					onChange={setLength}
				/>,
				<TextField label="Secret" value={secret} onChange={setSecret} />
			]}
		>
			<PinField type={type} length={Number(length)} secret={secret}>
				<PinFieldInput />
				<PinFieldGroup className={classes.group}>
					<PinFieldSlots>
						{({ slot }) => (
							<PinFieldSlot
								slot={slot}
								className={classes.slot}
							/>
						)}
					</PinFieldSlots>
				</PinFieldGroup>
			</PinField>
		</Story>
	)
}
