import { freya, forwardRef, useMergeRefs, type CoreProps } from '../core'
import { usePopoverContext } from './PopoverContext'

export type PopoverAnchorProps = CoreProps<'div'>

export const PopoverAnchor = forwardRef<'div'>((props, forwardedRef) => {
	const { refs, status } = usePopoverContext()
	const ref = useMergeRefs(refs.setPositionReference, forwardedRef)

	return <freya.div ref={ref} data-status={status} {...props} />
})
