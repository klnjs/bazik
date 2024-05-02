import { poly, useRefComposed, type PolyProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverAnchorProps = PolyProps<'div'>

export const PopoverAnchor = ({
	ref: refProp,
	...otherProps
}: PopoverAnchorProps) => {
	const { refs, status } = usePopoverContext()
	const refComposed = useRefComposed(refs.setPositionReference, refProp)

	return <poly.div ref={refComposed} data-status={status} {...otherProps} />
}
