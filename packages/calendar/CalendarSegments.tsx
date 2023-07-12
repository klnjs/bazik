import type { ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegment } from './CalendarDate'

export type CalendarSegmentsProps = {
	children: (segment: CalendarDateSegment, index: number) => ReactNode
}

export const CalendarSegments = ({ children }: CalendarSegmentsProps) => {
	const { state, config } = useCalendarContext()
	const segments = state.dateVisible.getSegments(config.locale)

	return segments.map(children)
}
