import { useState } from 'react'
import type { Meta } from '@storybook/react'
import {
	PinField,
	PinFieldLabel,
	PinFieldInput,
	PinFieldGroup,
	PinFieldSlots,
	PinFieldSlot
} from '@klnjs/pin'
import * as classes from './PinField.stories.css'
import { Story, TextField, ButtonGroup } from '../components'

export default {
	title: 'Pin'
} satisfies Meta<typeof PinField>

export const Structure = () => {
	const types = ['alphanumeric', 'alphabetic', 'numeric'] as const

	const [type, setType] = useState<(typeof types)[number]>(types[0])
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
				<TextField label="Length" value={length} onChange={setLength} />
			]}
		>
			<PinField
				type={type}
				length={Number(length)}
				className={classes.pin}
			>
				<PinFieldInput />
				<PinFieldLabel className={classes.label}>Pincode</PinFieldLabel>
				<PinFieldGroup className={classes.group}>
					<PinFieldSlots>
						{({ slot }) => (
							<PinFieldSlot
								key={slot}
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

export const Concealing = () => {
	const [delay, setDelay] = useState('250')
	const [symbol, setSymbol] = useState('·')

	return (
		<Story
			controls={[
				<TextField label="Delay" value={delay} onChange={setDelay} />,
				<TextField label="Symbol" value={symbol} onChange={setSymbol} />
			]}
		>
			<PinField
				conceal={{ symbol, delay: Number(delay) }}
				className={classes.pin}
			>
				<PinFieldInput />
				<PinFieldLabel className={classes.label}>Pincode</PinFieldLabel>
				<PinFieldGroup className={classes.group}>
					<PinFieldSlots>
						{({ slot }) => (
							<PinFieldSlot
								key={slot}
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
