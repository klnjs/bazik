import { poly, useId, type PolyProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconDescriptionProps = PolyProps<'desc'>

export const IconDescription = ({
	id: idProp,
	...otherProps
}: IconDescriptionProps) => {
	const { setDescriptionId } = useIconContext()
	const id = useId(idProp, setDescriptionId)

	return <poly.desc id={id} {...otherProps} />
}
