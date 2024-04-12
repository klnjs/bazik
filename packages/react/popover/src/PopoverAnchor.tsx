import { poly, forwardRef, useRefComposed, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverAnchorProps = CoreProps<'div'>

export const PopoverAnchor = forwardRef<'div'>((props, forwardedRef) => {
	const { refs, status } = usePopoverContext()
	const refComposed = useRefComposed(refs.setPositionReference, forwardedRef)

	return <poly.div ref={refComposed} data-status={status} {...props} />
})
