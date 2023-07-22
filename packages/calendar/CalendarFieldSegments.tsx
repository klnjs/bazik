import { useMemo, type ReactNode, useEffect } from 'react'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type {
	CalendarDateSegmentType,
	CalendarDateSegmentExclude,
	CalendarDateSegmentTypeEditable
} from './CalendarDate'

export type CalendarFieldSegmentsProps<
	T extends readonly CalendarDateSegmentType[]
> = {
	exclude?: T
	children: (
		segment: CalendarDateSegmentExclude<T[number]>,
		index: number
	) => ReactNode
}

export const CalendarFieldSegments = <
	const T extends readonly CalendarDateSegmentType[] = []
>({
	exclude,
	children
}: CalendarFieldSegmentsProps<T>) => {
	const { focusedDate, setFocusedSegment } = useCalendarFieldContext()

	const segments = useMemo(
		() => focusedDate.getSegments('numeric', exclude),
		[exclude, focusedDate]
	)

	useEffect(() => {
		// First segment can never be literal, therefore
		// this cast is safe
		setFocusedSegment(segments[0].type as CalendarDateSegmentTypeEditable)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return segments.map(children)
}
