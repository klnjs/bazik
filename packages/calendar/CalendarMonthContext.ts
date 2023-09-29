import { createContext } from '../core'

export type UseCalendarMonthContext = { year: number; month: number }

export const [CalendarMonthProvider, useCalendarMonthContext] =
	createContext<UseCalendarMonthContext>({
		name: 'CalendarMonthContext',
		nameOfHook: 'useCalendarMonthContext',
		nameOfProvider: '<CalendarMonthProvider />'
	})
