import { poly, useIdAndCallback, type PolyProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconTitleProps = PolyProps<'title'>

export const IconTitle = ({ id: idProp, ...otherProps }: IconTitleProps) => {
	const { setLabelId } = useIconContext()
	const id = useIdAndCallback(idProp, setLabelId)

	return <poly.title id={id} {...otherProps} />
}
