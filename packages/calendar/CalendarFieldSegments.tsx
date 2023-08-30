import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import {
	DateTime,
	type DateSegment,
	type TimeSegment,
	type LiteralSegment
} from './CalendarDateTime'

export type CalendarFieldSegmentsProps<L extends boolean = false> = {
	time?: T
	literals?: L
	children: L extends false
		? (segment: DateSegment, index: number) => ReactNode
		: (segment: DateSegment | LiteralSegment, index: number) => ReactNode
}

export const CalendarFieldSegments = <L extends boolean = false>({
	time,
	literals,
	children
}: CalendarFieldSegmentsProps<L>) => {
	const { locale } = useCalendarFieldContext()

	const segments = useMemo(
		() => new DateTime().getSegments(locale, literals)[(locale, literals)]
	)

	// @ts-expect-error unsure why this doesn't work
	return segments.map(children)
}
