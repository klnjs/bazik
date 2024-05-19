import { createContext } from '@klnjs/core'
import type { UseCalendarGridOptions } from './useCalendarGrid'

export type UseCalendarGridContext = Omit<
	UseCalendarGridOptions,
	'calendar' | 'locale'
>

export const [CalendarGridProvider, useCalendarGridContext] =
	createContext<UseCalendarGridContext>({
		name: 'CalendarGridContext'
	})
