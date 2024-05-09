import type { Temporal } from 'temporal-polyfill'

export type CalendarPagination = 'single' | 'visible'

export type CalendarVisibleDuration = {
	months?: number
}

export type Duration = Temporal.Duration

export type DurationLike = Temporal.DurationLike

export type PlainDate = Temporal.PlainDate

export type PlainDateRange = [Temporal.PlainDate, Temporal.PlainDate]

export type PlainYearMonth = Temporal.PlainYearMonth
