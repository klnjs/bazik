import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarDateSegment } from './CalendarDate'

export type CalendarFieldSegmentsProps = {
	children: (segment: CalendarDateSegment, index: number) => ReactNode
}

export const CalendarFieldSegments = ({
	children
}: CalendarFieldSegmentsProps) => {
	const { focusedDate } = useCalendarFieldContext()

	const segments = useMemo(() => focusedDate.getSegments(), [focusedDate])

	return segments.map(children)
}
