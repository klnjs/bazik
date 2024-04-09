import { useState } from 'react'
import type { Meta } from '@storybook/react'
import {
	Pin,
	PinLabel,
	PinInput,
	PinGroup,
	PinSlots,
	PinSlot
} from '@klnjs/pin'
import * as classes from './Pin.stories.css'
import { Story, TextField, ButtonGroup } from '../components'

export default {
	title: 'Pin'
} satisfies Meta<typeof Pin>

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
			<Pin type={type} length={Number(length)} className={classes.pin}>
				<PinInput />
				<PinLabel className={classes.label}>Pincode</PinLabel>
				<PinGroup className={classes.group}>
					<PinSlots>
						{({ slot }) => (
							<PinSlot
								key={slot}
								slot={slot}
								className={classes.slot}
							/>
						)}
					</PinSlots>
				</PinGroup>
			</Pin>
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
			<Pin
				length={4}
				conceal={{ symbol, delay: Number(delay) }}
				className={classes.pin}
			>
				<PinInput />
				<PinLabel className={classes.label}>Pincode</PinLabel>
				<PinGroup className={classes.group}>
					<PinSlots>
						{({ slot }) => (
							<PinSlot
								key={slot}
								slot={slot}
								className={classes.slot}
							/>
						)}
					</PinSlots>
				</PinGroup>
			</Pin>
		</Story>
	)
}
