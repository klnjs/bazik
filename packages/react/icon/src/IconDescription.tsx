import { forwardRef, useIdAndCallback, type CoreProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconDescriptionProps = CoreProps<'desc'>

export const IconDescription = forwardRef<'desc', IconDescriptionProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { setDescriptionId } = useIconContext()
		const id = useIdAndCallback(idProp, setDescriptionId)

		return <desc id={id} ref={forwardedRef} {...otherProps} />
	}
)
