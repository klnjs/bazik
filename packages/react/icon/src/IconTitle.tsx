import { poly, useId, type PolyProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconTitleProps = PolyProps<'title'>

export const IconTitle = ({ id: idProp, ...otherProps }: IconTitleProps) => {
	const { setLabelId } = useIconContext()
	const id = useId(idProp, setLabelId)

	return <poly.title id={id} {...otherProps} />
}
