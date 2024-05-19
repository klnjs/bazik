import { useCallback, type PointerEvent } from 'react'
import { poly, asDataProp, type PolyProps } from '@klnjs/core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldInputProps = PolyProps<'div'>

export const CalendarFieldInput =
	(props: CalendarFieldInputProps) => {
		const { disabled, highlightedSegmentRef } = useCalendarFieldContext()

		const handlePointerDown = useCallback(
			(event: PointerEvent<HTMLDivElement>) => {
				if (!disabled && event.target === event.currentTarget) {
					event.preventDefault()
					highlightedSegmentRef.current?.focus()
				}
			},
			[disabled, highlightedSegmentRef]
		)

		return (
			<poly.div
				onPointerDown={handlePointerDown}
				data-disabled={asDataProp(disabled)}
				{...props}
			/>
		)
	}
