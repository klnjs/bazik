import { useRef, useState } from 'react'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type { CalendarDateSegmentType } from './CalendarDate'

export type UseCalendarFieldOptions = UseCalendarOptions

export const useCalendarField = (options: UseCalendarFieldOptions) => {
	const [labelId, setLabelId] = useState<string>()

	const calendar = useCalendar({ ...options })

	const highlightedSegmentRef = useRef<HTMLDivElement>(null)

	const [highlightedSegment, setHighlightedSegment] =
		useState<CalendarDateSegmentType>()

	return {
		...calendar,
		labelId,
		setLabelId,
		highlightedSegmentRef,
		highlightedSegment,
		setHighlightedSegment
	}
}
