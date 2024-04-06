import {
	freya,
	forwardRef,
	useMergeRefs,
	toData,
	type CoreProps
} from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverTriggerProps = CoreProps<'button'>

export const PopoverTrigger = forwardRef<'button'>((props, forwardedRef) => {
	const { open, refs, status, getReferenceProps } = usePopoverContext()
	const ref = useMergeRefs(refs.setReference, forwardedRef)

	return (
		<freya.button
			ref={ref}
			type="button"
			data-open={toData(open)}
			data-status={status}
			{...getReferenceProps(props)}
		/>
	)
})
