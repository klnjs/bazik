import { useLayoutEffect } from 'react'
import { useId, forwardRef, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverHeadingProps = CoreProps<'h2'>

export const PopoverHeading = forwardRef<'h2', PopoverHeadingProps>(
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
