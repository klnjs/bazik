import type { Temporal } from 'temporal-polyfill'
import { createContext } from '../core'

export type UseCalendarMonthContext = Temporal.PlainYearMonth

export const [CalendarMonthProvider, useCalendarMonthContext] =
	createContext<UseCalendarMonthContext>({
		name: 'CalendarMonthContext',
		nameOfHook: 'useCalendarMonthContext',
		nameOfProvider: '<CalendarMonthProvider />'
	})
