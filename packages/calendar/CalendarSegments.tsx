import type { ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegment } from './CalendarDate'

export type CalendarSegmentsProps = {
	children: (segment: CalendarDateSegment, index: number) => ReactNode
}

export const CalendarSegments = ({ children }: CalendarSegmentsProps) => {
	const {
		state,
		config: { locale }
	} = useCalendarContext()
	const segments = state.focusedDate.getSegments(locale)

	return segments.map(children)
}
