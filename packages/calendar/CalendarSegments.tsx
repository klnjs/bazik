import type { ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'

export type CalendarSegmentsProps = {
	children: (
		segment: keyof Intl.DateTimeFormatPartTypesRegistry,
		index: number
	) => ReactNode
}

export const CalendarSegments = ({ children }: CalendarSegmentsProps) => {
	const { state, config } = useCalendarContext()
	const segments = state.dateVisible.getSegments(config.locale)

	return segments.map(children)
}
