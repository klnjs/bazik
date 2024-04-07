import { useLayoutEffect } from 'react'
import { useId, forwardRef, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = CoreProps<'p'>

export const PopoverDescription = forwardRef<'p', PopoverDescriptionProps>(
	({ id: idProp, ...otherProps }, ref) => {
		const id = useId(idProp)
		const { setDescriptionId } = usePopoverContext()

		useLayoutEffect(() => {
			setDescriptionId(id)

			return () => {
				setDescriptionId(undefined)
			}
		}, [id, setDescriptionId])

		return <p id={id} ref={ref} {...otherProps} />
	}
)
