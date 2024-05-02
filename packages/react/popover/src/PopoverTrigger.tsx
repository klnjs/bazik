import { poly, toData, useRefComposed, type PolyProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverTriggerProps = PolyProps<'button'>

export const PopoverTrigger = ({
	ref: refProp,
	...otherProps
}: PopoverTriggerProps) => {
	const { open, refs, status, getReferenceProps } = usePopoverContext()
	const ref = useRefComposed(refs.setReference, refProp)

	return (
		<poly.button
			ref={ref}
			type="button"
			data-open={toData(open)}
			data-status={status}
			// @ts-expect-error until floating ui updates to react 19
			{...getReferenceProps(otherProps)}
		/>
	)
}
