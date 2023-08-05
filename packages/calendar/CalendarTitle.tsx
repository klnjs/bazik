import { useLayoutEffect } from 'react'
import { freya, forwardRef, type CoreProps, useId } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = CoreProps<'h2'>

export const CalendarTitle = forwardRef<'h2', CalendarTitleProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { focusedDate, titleId, setTitleId } = useCalendarContext()
		const id = useId(idProp)

		useLayoutEffect(() => {
			setTitleId(id)

			return () => {
				setTitleId(undefined)
			}
		}, [id, setTitleId])

		return (
			<freya.h2
				id={titleId}
				ref={forwardedRef}
				aria-live="polite"
				{...otherProps}
			>
				{focusedDate.format({
					year: 'numeric',
					month: 'long'
				})}
			</freya.h2>
		)
	}
)
