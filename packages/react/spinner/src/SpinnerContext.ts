import { createContext } from '@klnjs/core'
import type { useSpinner } from './useSpinner'

export type UseSpinnerContext = ReturnType<typeof useSpinner>

export const [SpinnerContext, useSpinnerContext] =
	createContext<UseSpinnerContext>({
		name: 'SpinnerContext'
	})
