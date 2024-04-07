import { useMemo, type ReactNode } from 'react'
import { Temporal, Intl } from 'temporal-polyfill'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarFieldSegmentType } from './CalendarFieldSegment'

export type CalendarFieldSegmentsItem<L extends boolean> = {
	type: L extends false
		? CalendarFieldSegmentType
		: CalendarFieldSegmentType | 'literal'
	value: string
}

export type CalendarFieldSegmentsProps<L extends boolean = false> = {
	literals?: L
	children: (type: CalendarFieldSegmentsItem<L>, index: number) => ReactNode
}

export const CalendarFieldSegments = <L extends boolean = false>({
	literals,
	children
}: CalendarFieldSegmentsProps<L>) => {
	const { locale } = useCalendarFieldContext()

	const segments = useMemo(() => {
		const now = Temporal.Now.plainDateTimeISO()
		const form = new Intl.DateTimeFormat(locale, {
			second: undefined
		})
		const parts = form.formatToParts(now)

		return literals
			? parts
			: parts.filter((part) => part.type !== 'literal')
	}, [locale, literals])

	// @ts-expect-error unsure why this doesn't work
	return segments.map(children)
}
