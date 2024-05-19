import { poly, asDataProp, useRefComposed, type PolyProps } from '@klnjs/core'
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
			data-open={asDataProp(open)}
			data-status={asDataProp(status)}
			// @ts-expect-error floating not on 19
			{...getReferenceProps(otherProps)}
		/>
	)
}
