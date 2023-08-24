import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import {
	CalendarDate,
	type CalendarDateLiteral,
	type CalendarDateSegment
} from './CalendarDate'

export type CalendarFieldSegmentItem<L extends boolean = false> = {
	role: 'date' | 'start' | 'end'
	segment: L extends false
		? CalendarDateSegment
		: CalendarDateSegment | CalendarDateLiteral
}

export type CalendarFieldSegmentsProps<L extends boolean = false> = {
	literals?: L
	children: (segment: CalendarFieldSegmentItem<L>, index: number) => ReactNode
}

export const CalendarFieldSegments = <L extends boolean = false>({
	literals,
	children
}: CalendarFieldSegmentsProps<L>) => {
	const { locale, range, value } = useCalendarFieldContext()

	const segments = useMemo(() => {
		if (range) {
			value.map((v) => new CalendarDate(v).getSegments(locale, literals))
		}

		return new CalendarDate(value).getSegments(locale, literals)
	}, [range, value, locale, literals])

	// @ts-expect-error unsure why this doesn't work
	return segments.map(children)
}
