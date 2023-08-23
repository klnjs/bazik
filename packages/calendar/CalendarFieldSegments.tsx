import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { CalendarDate, type CalendarDateSegment } from './CalendarDate'

export type CalendarFieldSegmentsProps<L extends boolean = false> = {
	literals?: L
	children: (segment: CalendarDateSegment<L>, index: number) => ReactNode
}

export const CalendarFieldSegments = <L extends boolean = false>({
	literals,
	children
}: CalendarFieldSegmentsProps<L>) => {
	const { locale } = useCalendarFieldContext()

	const segments = useMemo(
		() => new CalendarDate().getSegments(locale, { literals }),
		[locale, literals]
	)

	return segments.map(children)
}
