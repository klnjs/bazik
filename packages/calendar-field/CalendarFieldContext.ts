import { createContext } from '../core/createContext'
import type { useCalendarField } from './useCalendarField'

export type UseCalendarFieldContext = ReturnType<typeof useCalendarField>

export const [CalendarFieldProvider, useCalendarFieldContext] =
	createContext<UseCalendarFieldContext>({
		name: 'CalendarFieldContext',
		nameOfHook: 'useCalendarFieldContext',
		nameOfProvider: '<CalendarFieldProvider />'
	})
