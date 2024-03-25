import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Story, TextField, ButtonGroup, Switch } from '../../.storybook/src/lib'
import { PinField } from './PinField'
import { PinFieldLabel } from './PinFieldLabel'
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
	const types = ['alphanumeric', 'alphabetic', 'numeric'] as const

	const [type, setType] = useState<(typeof types)[number]>(types[0])
	const [secret, setSecret] = useState('')
	const [length, setLength] = useState('4')
	const [disabled, setDisabled] = useState(false)

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
				<TextField
					label="Secret"
					value={secret}
					onChange={setSecret}
				/>,
				<Switch
					label="Disabled"
					checked={disabled}
					onChange={setDisabled}
				/>
			]}
		>
			<PinField
				type={type}
				length={Number(length)}
				secret={secret}
				className={classes.pin}
			>
				<PinFieldLabel className={classes.label}>Pincode</PinFieldLabel>
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

export const Layout = () => (
	<Story>
		<PinField length={6} className={classes.pin}>
			<PinFieldInput autoComplete="one-time-code" />
			<PinFieldLabel className={classes.label}>Pincode</PinFieldLabel>
			<PinFieldGroup className={classes.group}>
				<PinFieldSlots>
					{({ slot }) => (
						<>
							<PinFieldSlot
								slot={slot}
								className={classes.slot}
							/>

							{slot === 3 && <div className={classes.dash} />}
						</>
					)}
				</PinFieldSlots>
			</PinFieldGroup>
		</PinField>
	</Story>
)
