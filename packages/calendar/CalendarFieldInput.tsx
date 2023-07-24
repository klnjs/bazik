import { useCallback, type PointerEvent } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldInputProps = CoreProps<'div'>

export const CalendarFieldInput = forwardRef<'div', CalendarFieldInputProps>(
	(props, forwardedRef) => {
		const { disabled, focusedSegmentRef } = useCalendarFieldContext()

		const handlePointerDown = useCallback(
			(event: PointerEvent<HTMLDivElement>) => {
				if (!disabled && event.target === event.currentTarget) {
					event.preventDefault()
					focusedSegmentRef.current?.focus()
				}
			},
			[disabled, focusedSegmentRef]
		)

		return (
			<freya.div
				ref={forwardedRef}
				onPointerDown={handlePointerDown}
				data-disabled={disabled ? '' : undefined}
				{...props}
			/>
		)
	}
)
