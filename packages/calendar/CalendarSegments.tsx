import type { ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarFocusedSegment } from './CalendarDate'

export type CalendarSegmentsProps = {
	children: (segment: CalendarFocusedSegment, index: number) => ReactNode
}

export const CalendarSegments = ({ children }: CalendarSegmentsProps) => {
	const { state, config } = useCalendarContext()
	const segments = state.focusedDate.getSegments(config.locale)

	return segments.map(children)
}
