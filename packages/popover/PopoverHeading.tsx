import { useLayoutEffect } from 'react'
import { useId, forwardRef, type CoreProps } from '../core'
import { usePopoverContext } from './PopoverContext'

export type PopoverDescriptionProps = CoreProps<'h2'>

export const PopoverHeading = forwardRef<'h2', PopoverDescriptionProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { setLabelId } = usePopoverContext()

		useLayoutEffect(() => {
			setLabelId(id)

			return () => {
				setLabelId(undefined)
			}
		}, [id, setLabelId])

		return <h2 id={id} ref={forwardedRef} {...otherProps} />
	}
)
