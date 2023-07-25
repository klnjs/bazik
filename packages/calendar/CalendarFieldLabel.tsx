import { useLayoutEffect } from 'react'
import { freya, forwardRef, useId, type CoreProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldLabelProps = CoreProps<'label'>

export const CalendarFieldLabel = forwardRef<'label', CalendarFieldLabelProps>(
	(props, forwardedRef) => {
		const { labelId, setLabelId, focusedSegmentRef } =
			useCalendarFieldContext()
		const id = useId()

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
				{...props}
			/>
		)
	}
)
