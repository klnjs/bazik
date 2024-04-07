import { poly, forwardRef, useMergeRefs, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverAnchorProps = CoreProps<'div'>

export const PopoverAnchor = forwardRef<'div'>((props, forwardedRef) => {
	const { refs, status } = usePopoverContext()
	const ref = useMergeRefs(refs.setPositionReference, forwardedRef)

	return <poly.div ref={ref} data-status={status} {...props} />
})
