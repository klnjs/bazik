import { useMemo, useState } from 'react'
import { Temporal } from 'temporal-polyfill'
import { getCalendars, type LocaleCalendar } from '@klnjs/locale'
import { useCalendarHighlighted } from './useCalendarHighlighted'
import {
	useCalendarSelection,
	type CalendarSelect,
	type CalendarSelectValue
} from './useCalendarSelection'
import { useCalendarVisibleRange } from './useCalendarVisibleRange'
import type {
	PlainDate,
	CalendarPagination,
	CalendarVisibleDuration
} from './CalendarTypes'

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	calendar?: LocaleCalendar
	defaultValue?: CalendarSelectValue<S>
	disabled?: boolean
	locale?: string
	max?: PlainDate
	min?: PlainDate
	pagination?: CalendarPagination
	readOnly?: boolean
	select?: S
	value?: CalendarSelectValue<S>
	visibleDuration?: CalendarVisibleDuration
	onChange?: (value: CalendarSelectValue<S>) => void
}

export const useCalendar = <S extends CalendarSelect = 'one'>({
	autoFocus = false,
	calendar: calendarProp,
	defaultValue = null,
	disabled = false,
	locale = 'en',
	max,
	min,
	pagination = 'visible',
	readOnly = false,
	select: selectProp,
	value,
	visibleDuration: visibleDurationProp,
	onChange
}: UseCalendarOptions<S> = {}) => {
	const calendar = useMemo(
		() => calendarProp ?? getCalendars(locale)[0] ?? 'iso8601',
		[calendarProp, locale]
	)

	const visibleDuration = useMemo(
		() =>
			Temporal.Duration.from(visibleDurationProp ?? { months: 1 }).abs(),
		[visibleDurationProp]
	)

	const paginationDuration = useMemo(
		() =>
			pagination === 'visible'
				? visibleDuration
				: Temporal.Duration.from({ months: 1 }),
		[visibleDuration]
	)

	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [highlighted, setHighlighted] = useCalendarHighlighted({
		value,
		calendar
	})

	const [visibleRange, setVisibleRange] = useCalendarVisibleRange({
		date: highlighted,
		span: visibleDuration,
		min,
		max
	})

	const selection = useCalendarSelection({
		behaviour: selectProp,
		highlighted,
		defaultValue,
		value,
		onChange
	})

	return {
		calendar,
		disabled,
		focusWithin,
		highlighted,
		locale,
		max,
		min,
		pagination,
		paginationDuration,
		readOnly,
		visibleDuration,
		visibleRange,
		setFocusWithin,
		setHighlighted,
		setVisibleRange,
		...selection
	}
}
