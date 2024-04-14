import { poly, forwardRef, useIdAndCallback, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = CoreProps<'p'>

export const PopoverDescription = forwardRef<'p', PopoverDescriptionProps>(
	({ id: idProp, ...otherProps }, ref) => {
		const { setDescriptionId } = usePopoverContext()
		const id = useIdAndCallback(idProp, setDescriptionId)

		return <poly.p id={id} ref={ref} {...otherProps} />
	}
)
