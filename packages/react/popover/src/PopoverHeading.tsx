import { poly, forwardRef, useIdAndCallback, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverHeadingProps = CoreProps<'h2'>

export const PopoverHeading = forwardRef<'h2', PopoverHeadingProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { setLabelId } = usePopoverContext()
		const id = useIdAndCallback(idProp, setLabelId)

		return <poly.h2 id={id} ref={forwardedRef} {...otherProps} />
	}
)
