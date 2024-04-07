import type { Temporal } from 'temporal-polyfill'

export type YearMonth = Temporal.PlainYearMonth

export type Date = Temporal.PlainDate

export type DateRange = [Temporal.PlainDate, Temporal.PlainDate]

export type DurationLike = Temporal.DurationLike
