import { useMemo, useState } from 'react'
import { useControllableState } from '../core'
import { CalendarDate } from './CalendarDate'

export type UseCalendarStateOptions = {
	locale: string
	value?: Date
	valueVisible?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarState = ({
	locale,
	value,
	valueVisible = value,
	defaultValue,
	onChange
}: UseCalendarStateOptions) => {
	const [anchor, setAnchor] = useState<HTMLElement>()

	const [date, setDate] = useControllableState({
		value: value ? CalendarDate.fromDate(value) : undefined,
		defaultValue: CalendarDate.fromDate(defaultValue),
		onChange: (newValue: CalendarDate) => onChange?.(newValue.asDate())
	})

	const [focusedDate, setFocusedDate] = useState(
		valueVisible
			? CalendarDate.fromDate(valueVisible)
			: CalendarDate.fromToday()
	)

	const [focusedSegment, setFocusedSegment] = useState(
		focusedDate.getSegmentByIndex(locale, 0)
	)

	return useMemo(
		() => ({
			date,
			anchor,
			focusedDate,
			focusedSegment,
			setDate,
			setAnchor,
			setFocusedDate,
			setFocusedSegment
		}),
		[
			date,
			anchor,
			focusedDate,
			focusedSegment,
			setDate,
			setAnchor,
			setFocusedDate,
			setFocusedSegment
		]
	)
}
