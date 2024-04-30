import { poly, useIdAndCallback, type PolyProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconDescriptionProps = PolyProps<'desc'>

export const IconDescription = (({ id: idProp, ...otherProps }: IconDescriptionProps) => {
		const { setDescriptionId } = useIconContext()
		const id = useIdAndCallback(idProp, setDescriptionId)

		return <poly.desc id={id} {...otherProps} />
	}
)
