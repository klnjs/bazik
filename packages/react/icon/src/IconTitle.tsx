import { forwardRef, useIdAndCallback, type CoreProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconTitleProps = CoreProps<'title'>

export const IconTitle = forwardRef<'title', IconTitleProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { setLabelId } = useIconContext()
		const id = useIdAndCallback(idProp, setLabelId)

		return <title id={id} ref={forwardedRef} {...otherProps} />
	}
)
