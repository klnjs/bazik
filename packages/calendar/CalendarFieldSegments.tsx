import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import {
	CalendarDate,
	type CalendarDateLiteral,
	type CalendarDateSegment
} from './CalendarDate'

export type CalendarFieldSegmentsProps<L extends boolean = false> = {
	literals?: L
	children: L extends false
		? (segment: CalendarDateSegment, index: number) => ReactNode
		: (
				segment: CalendarDateSegment | CalendarDateLiteral,
				index: number
		  ) => ReactNode
}

export const CalendarFieldSegments = <L extends boolean = false>({
	literals,
	children
}: CalendarFieldSegmentsProps<L>) => {
	const { locale } = useCalendarFieldContext()

	const segments = useMemo(
		() => new CalendarDate().getSegments(locale, literals),
		[locale, literals]
	)

	// @ts-expect-error unsure why this doesn't work
	return segments.map(children)
}
