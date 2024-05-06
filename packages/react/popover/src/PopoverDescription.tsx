import { poly, forwardRef, useId, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = CoreProps<'p'>

export const PopoverDescription = forwardRef<'p', PopoverDescriptionProps>(
	({ id: idProp, ...otherProps }, ref) => {
		const { setDescriptionId } = usePopoverContext()
		const id = useId(idProp, setDescriptionId)

		return <poly.p id={id} ref={ref} {...otherProps} />
	}
)
