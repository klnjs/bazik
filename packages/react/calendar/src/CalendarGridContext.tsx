import { createContext } from '@klnjs/core'
import type { UseCalendarGridOptions } from './useCalendarGrid'

export type UseCalendarGridContext = Omit<UseCalendarGridOptions, 'locale'>

export const [CalendarGridProvider, useCalendarGridContext] =
	createContext<UseCalendarGridContext>({
		name: 'CalendarGridContext',
		nameOfHook: 'useCalendarGridContext',
		nameOfProvider: '<CalendarGridProvider />'
	})
