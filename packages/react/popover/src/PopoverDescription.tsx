import { poly, useIdAndCallback, type PolyProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = PolyProps<'p'>

export const PopoverDescription = ({
	id: idProp,
	...otherProps
}: PopoverDescriptionProps) => {
	const { setDescriptionId } = usePopoverContext()
	const id = useIdAndCallback(idProp, setDescriptionId)

	return <poly.p id={id} {...otherProps} />
}
