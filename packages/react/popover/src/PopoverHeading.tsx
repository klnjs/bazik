import { poly, useId, type PolyProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverHeadingProps = PolyProps<'h2'>

export const PopoverHeading = ({
	id: idProp,
	...otherProps
}: PopoverHeadingProps) => {
	const { setLabelId } = usePopoverContext()
	const id = useId(idProp, setLabelId)

	return <poly.h2 id={id} {...otherProps} />
}
