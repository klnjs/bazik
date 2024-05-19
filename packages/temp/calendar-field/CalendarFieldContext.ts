import { createContext } from '@klnjs/core'
import type { useCalendarField } from './useCalendarField'

export type UseCalendarFieldContext = ReturnType<typeof useCalendarField>

export const [CalendarFieldProvider, useCalendarFieldContext] =
	createContext<UseCalendarFieldContext>({
		name: 'CalendarFieldContext'
	})
