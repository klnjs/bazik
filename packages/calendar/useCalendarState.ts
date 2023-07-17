import { useMemo, useState } from 'react'
import { useControllableState } from '../core'
import {
	CalendarDate,
	type CalendarDateSegmentTypeEditable
} from './CalendarDate'

export type UseCalendarStateOptions = {
	locale?: string
	value?: Date | null
	defaultValue?: Date
	defaultFocused?: Date
	onChange?: (value: Date | null) => void
}

export const useCalendarState = ({
	locale = navigator.language,
	value,
	defaultValue,
	defaultFocused,
	onChange
}: UseCalendarStateOptions) => {
	const [open, setOpen] = useState(false)

	const [date, setDate] = useControllableState<CalendarDate | null>({
		value: value instanceof Date ? new CalendarDate(value) : value,
		defaultValue:
			defaultValue instanceof Date
				? new CalendarDate(defaultValue)
				: defaultValue,
		onChange: (newValue) => onChange?.(newValue?.getDate() ?? null)
	})

	const [focusedDate, setFocusedDate] = useState(
		new CalendarDate(defaultFocused ?? value ?? undefined)
	)

	const [focusedSegment, setFocusedSegment] = useState(
		focusedDate.getSegmentByIndex(locale, 0)
			.type as CalendarDateSegmentTypeEditable
	)

	return useMemo(
		() => ({
			date,
			open,
			focusedDate,
			focusedSegment,
			setDate,
			setOpen,
			setFocusedDate,
			setFocusedSegment
		}),
		[
			date,
			open,
			focusedDate,
			focusedSegment,
			setDate,
			setOpen,
			setFocusedDate,
			setFocusedSegment
		]
	)
}
