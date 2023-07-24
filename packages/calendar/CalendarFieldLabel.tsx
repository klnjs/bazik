import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldLabelProps = CoreProps<'label'>

export const CalendarFieldLabel = forwardRef<'label', CalendarFieldLabelProps>(
	(props, forwardedRef) => {
		const { labelId, focusedSegmentRef } = useCalendarFieldContext()

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
