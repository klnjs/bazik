import {
	poly,
	forwardRef,
	asDataProp,
	useRefComposed,
	type CoreProps
} from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverTriggerProps = CoreProps<'button'>

export const PopoverTrigger = forwardRef<'button'>((props, forwardedRef) => {
	const { open, refs, status, getReferenceProps } = usePopoverContext()
	const ref = useRefComposed(refs.setReference, forwardedRef)

	return (
		<poly.button
			ref={ref}
			type="button"
			data-open={asDataProp(open)}
			data-status={asDataProp(status)}
			{...getReferenceProps(props)}
		/>
	)
})
