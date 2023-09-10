import type { Temporal } from 'temporal-polyfill'
import type { Range } from '../core'

export type CalendarDate = Temporal.PlainDate

export type CalendarDateRange = Range<Temporal.PlainDate>
