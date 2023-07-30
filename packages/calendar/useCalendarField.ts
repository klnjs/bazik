import { useRef, useState } from 'react'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type { CalendarDateSegmentTypeWithoutLiteral } from './CalendarDate'

export type UseCalendarFieldOptions = UseCalendarOptions

export const useCalendarField = (options: UseCalendarFieldOptions) => {
	const [labelId, setLabelId] = useState<string>()

	const calendar = useCalendar({ ...options })

	const focusedSegmentRef = useRef<HTMLDivElement>(null)

	const [focusedSegment, setFocusedSegment] =
		useState<CalendarDateSegmentTypeWithoutLiteral>()

	return {
		...calendar,
		labelId,
		setLabelId,
		focusedSegment,
		focusedSegmentRef,
		setFocusedSegment
	}
}
