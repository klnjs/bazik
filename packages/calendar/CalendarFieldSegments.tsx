import { useMemo, type ReactNode } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarDateSegmentType } from './CalendarDate'

export type CalendarFieldSegmentWithout<T> = {
	type: T extends CalendarDateSegmentType
		? Exclude<CalendarDateSegmentType, T>
		: CalendarDateSegmentType
	value: string
}

export type CalendarFieldSegmentsProps<T> = {
	exclude?: T[]
	children: (
		segment: CalendarFieldSegmentWithout<T>,
		index: number
	) => ReactNode
}

export const CalendarFieldSegments = <const T extends CalendarDateSegmentType>({
	exclude = [],
	children
}: CalendarFieldSegmentsProps<T>) => {
	const { focusedDate } = useCalendarFieldContext()

	const segments = useMemo(
		() =>
			focusedDate
				.getSegments()
				.filter(
					(segment) => !exclude.includes(segment.type as T)
				) as CalendarFieldSegmentWithout<T>[],

		[exclude, focusedDate]
	)

	return segments.map(children)
}
