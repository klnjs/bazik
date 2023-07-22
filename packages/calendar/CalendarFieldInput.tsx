import { useCallback, type PointerEvent } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldInputProps = AsChildComponentProps<'div'>

export const CalendarFieldInput = forwardRef<'div', CalendarFieldInputProps>(
	(props, forwardedRef) => {
		const { disabled, segmentRef } = useCalendarFieldContext()

		const handlePointerDown = useCallback(
			(event: PointerEvent<HTMLDivElement>) => {
				if (!disabled && event.target === event.currentTarget) {
					event.preventDefault()
					segmentRef.current?.focus()
				}
			},
			[disabled, segmentRef]
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
