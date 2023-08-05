import { useRef, useState } from 'react'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type { CalendarDateSegmentType } from './CalendarDate'

export type UseCalendarFieldOptions = UseCalendarOptions

export const useCalendarField = (options: UseCalendarFieldOptions) => {
	const [labelId, setLabelId] = useState<string>()

	const calendar = useCalendar({ ...options })

	const focusedSegmentRef = useRef<HTMLDivElement>(null)

	const [focusedSegment, setFocusedSegment] =
		useState<CalendarDateSegmentType>()

	return {
		...calendar,
		labelId,
		setLabelId,
		focusedSegment,
		focusedSegmentRef,
		setFocusedSegment
	}
}
