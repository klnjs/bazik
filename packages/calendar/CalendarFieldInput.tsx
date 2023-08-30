import { useCallback, type PointerEvent } from 'react'
import { freya, forwardRef, toData, type CoreProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldInputProps = CoreProps<'div'>

export const CalendarFieldInput = forwardRef<'div', CalendarFieldInputProps>(
	(props, forwardedRef) => {
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
			<freya.div
				ref={forwardedRef}
				onPointerDown={handlePointerDown}
				data-disabled={toData(disabled)}
				{...props}
			/>
		)
	}
)
