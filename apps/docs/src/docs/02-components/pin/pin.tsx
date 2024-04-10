import {
	Pin,
	PinLabel,
	PinInput,
	PinGroup,
	PinSlots,
	PinSlot
} from '@klnjs/pin'
import classes from './pin.module.css'

export default () => {
	return (
		<Pin className={classes.pin}>
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
