import {
	PinField,
	PinFieldLabel,
	PinFieldInput,
	PinFieldGroup,
	PinFieldSlots,
	PinFieldSlot,
	PinFieldProps
} from '@klnjs/pin'
import classes from './PinFieldShowcase.module.css'

export const PinFieldShowcase = (props: PinFieldProps) => {
	return (
		<PinField {...props} className={classes.pin}>
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
	)
}
