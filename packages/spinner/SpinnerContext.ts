import { createContext } from '../core'
import type { useSpinner } from './useSpinner'

export type UseSpinnerContext = ReturnType<typeof useSpinner>

export const [SpinnerProvider, useSpinnerContext] =
	createContext<UseSpinnerContext>({
		name: 'SpinnerContext',
		nameOfHook: 'useSpinnerContext',
		nameOfProvider: '<SpinnerProvider />'
	})
