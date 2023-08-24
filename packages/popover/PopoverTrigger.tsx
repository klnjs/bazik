import {
	freya,
	forwardRef,
	useMergeRefs,
	toData,
	type CoreProps
} from '../core'
import { usePopoverContext } from './PopoverContext'

export type PopoverTriggerProps = CoreProps<'div'>

export const PopoverTrigger = forwardRef<'div'>((props, forwardedRef) => {
	const { open, refs, getReferenceProps } = usePopoverContext()
	const ref = useMergeRefs(refs.setReference, forwardedRef)

	return (
		<freya.button
			ref={ref}
			data-open={toData(open)}
			{...getReferenceProps(props)}
		/>
	)
})
