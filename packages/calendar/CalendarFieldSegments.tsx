import { useMemo, useLayoutEffect, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type {
	CalendarDateSegment,
	CalendarDateSegmentWithLiterals
} from './CalendarDate'

export type CalendarFieldSegmentsProps<L extends boolean = false> = {
	literals?: L
	children: L extends true
		? (segment: CalendarDateSegmentWithLiterals, index: number) => ReactNode
		: (segment: CalendarDateSegment, index: number) => ReactNode
}

export const CalendarFieldSegments = <L extends boolean = false>({
	literals,
	children
}: CalendarFieldSegmentsProps<L>) => {
	const { focusedDate, focusedSegment, setFocusedSegment } =
		useCalendarFieldContext()

	const segments = useMemo(
		() => focusedDate.getSegments({ literals }),
		[literals, focusedDate]
	)

	useLayoutEffect(() => {
		if (!focusedSegment) {
			setFocusedSegment(focusedDate.getSegments()[0].type)
		}
	}, [focusedDate, focusedSegment, setFocusedSegment])

	// @ts-expect-error not sure how to handle this
	return segments.map(children)
}
