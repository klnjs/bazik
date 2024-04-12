import { useLayoutEffect } from 'react'
import { forwardRef, useId, type CoreProps } from '@klnjs/core'
import { useIconContext } from './IconContext'

export type IconDescriptionProps = CoreProps<'desc'>

export const IconDescription = forwardRef<'desc', IconDescriptionProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const id = useId(idProp)
		const { setDescriptionId } = useIconContext()

		useLayoutEffect(() => {
			setDescriptionId(id)

			return () => {
				setDescriptionId(undefined)
			}
		}, [id, setDescriptionId])

		return <desc id={id} ref={forwardedRef} {...otherProps} />
	}
)
