import { useLayoutEffect } from 'react'
import { forwardRef, type CoreProps, useId } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconTitleProps = CoreProps<'title'>

export const IconTitle = forwardRef<'title', IconTitleProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { setLabelId } = useIconContext()

		useLayoutEffect(() => {
			setLabelId(id)

			return () => {
				setLabelId(undefined)
			}
		}, [id, setLabelId])

		return <title id={id} ref={forwardedRef} {...otherProps} />
	}
)
