import { useMemo, type ReactNode } from 'react'
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

	const segments = useMemo(
		() => state.focusedDate.getSegments(locale),
		[state, locale]
	)

	return segments.map(children)
}
