import { useMemo, useLayoutEffect, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type {
	CalendarDateSegment,
	CalendarDateSegmentTypeWithoutLiteral
} from './CalendarDate'

export type CalendarFieldSegmentsProps = {
	children: (segment: CalendarDateSegment, index: number) => ReactNode
}

export const CalendarFieldSegments = ({
	children
}: CalendarFieldSegmentsProps) => {
	const { focusedDate, focusedSegment, setFocusedSegment } =
		useCalendarFieldContext()

	const segments = useMemo(() => focusedDate.getSegments(), [focusedDate])

	useLayoutEffect(() => {
		if (!focusedSegment) {
			setFocusedSegment(
				segments[0].type as CalendarDateSegmentTypeWithoutLiteral
			)
		}
	}, [segments, focusedSegment, setFocusedSegment])

	return segments.map(children)
}
