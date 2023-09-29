import { createContext } from '../core'
import type { useCalendar } from './useCalendar'

export type UseCalendarContext = ReturnType<typeof useCalendar>

export const [CalendarProvider, useCalendarContext] =
	createContext<UseCalendarContext>({
		name: 'CalendarContext',
		nameOfHook: 'useCalendarContext',
		nameOfProvider: '<CalendarProvider />'
	})
