import { useRef, useState } from 'react'
import { useId } from '../core'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type { CalendarDateSegmentTypeEditable } from './CalendarDate'

export type UseCalendarFieldOptions = UseCalendarOptions

export const useCalendarField = (options: UseCalendarFieldOptions) => {
	const labelId = useId()

	const calendar = useCalendar({ ...options })

	const focusedSegmentRef = useRef<HTMLDivElement>(null)

	const [focusedSegment, setFocusedSegment] =
		useState<CalendarDateSegmentTypeEditable>()

	return {
		...calendar,
		labelId,
		focusedSegmentRef,
		focusedSegment,
		setFocusedSegment
	}
}
