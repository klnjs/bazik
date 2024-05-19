import { poly, useId, type PolyProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = PolyProps<'p'>

export const PopoverDescription = ({
	id: idProp,
	...otherProps
}: PopoverDescriptionProps) => {
	const { setDescriptionId } = usePopoverContext()
	const id = useId(idProp, setDescriptionId)

	return <poly.p id={id} {...otherProps} />
}
