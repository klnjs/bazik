import { useState } from 'react'
import { useEffectOnUpdate } from '@klnjs/core'
import { toEndOfMonth, toStartOfMonth } from '@klnjs/temporal'
import type { Duration, PlainDate, PlainDateRange } from './CalendarTypes'
import { isDefined } from '@klnjs/assertion'
import { Temporal } from 'temporal-polyfill'

const { compare } = Temporal.PlainYearMonth

const expand = (range: PlainDateRange): PlainDateRange => [
	toStartOfMonth(range[0]),
	toEndOfMonth(range[1])
]

export type UseCalendarVisibleOptions = {
	date: PlainDate
	span: Duration
	align?: 'start' | 'end' | -1 | 0 | 1
	min?: PlainDate
	max?: PlainDate
}

export const createVisibleRange = ({
	date,
	span,
	align = 'start',
	min,
	max
}: UseCalendarVisibleOptions): PlainDateRange => {
	const offset = span.with({ months: span.abs().months - 1 })
	const end =
		align === -1 || align === 'end'
			? date.subtract(offset)
			: date.add(offset)

	const range = [date, end].sort(compare) as PlainDateRange

	if (isDefined(min) && compare(range[0], min) === -1) {
		return expand([min, min.add(offset)])
	}

	if (isDefined(max) && compare(range[1], max) === 1) {
		return expand([max.subtract(offset), max])
	}

	return expand(range)
}

export const useCalendarVisibleRange = ({
	date,
	span,
	align,
	min,
	max
}: UseCalendarVisibleOptions) => {
	const [visibleRange, setVisibleRange] = useState(() =>
		createVisibleRange({ date, span, align, min, max })
	)

	useEffectOnUpdate(() => {
		setVisibleRange((prev) =>
			createVisibleRange({ date: prev[0], span, align, min, max })
		)
	}, [span, align, min, max])

	return [visibleRange, setVisibleRange] as [
		typeof visibleRange,
		typeof setVisibleRange
	]
}
