import {
	Pin,
	PinLabel,
	PinInput,
	PinGroup,
	PinSlots,
	PinSlot
} from '@klnjs/pin'
import classes from './index.module.css'

export default () => {
	return (
		<Pin conceal={{ symbol: '·', delay: 250 }} className={classes.pin}>
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
	)
}
