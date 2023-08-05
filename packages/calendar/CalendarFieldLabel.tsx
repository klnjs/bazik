import { useLayoutEffect } from 'react'
import { freya, forwardRef, useId, type CoreProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldLabelProps = CoreProps<'label'>

export const CalendarFieldLabel = forwardRef<'label', CalendarFieldLabelProps>(
	({ id: idProp, ...otherProps }, forwardedRef) => {
		const { focusedSegmentRef, labelId, setLabelId } =
			useCalendarFieldContext()
		const id = useId(idProp)

		useLayoutEffect(() => {
			setLabelId(id)

			return () => {
				setLabelId(undefined)
			}
		}, [id, setLabelId])

		return (
			<freya.label
				id={labelId}
				ref={forwardedRef}
				onClick={() => focusedSegmentRef.current?.focus()}
				{...otherProps}
			/>
		)
	}
)
