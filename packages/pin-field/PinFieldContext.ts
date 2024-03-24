import { createContext } from '../core/createContext'
import type { usePinField } from './usePinField'

export type UsePinFieldContext = ReturnType<typeof usePinField>

export const [PinFieldProvider, usePinFieldContext] =
	createContext<UsePinFieldContext>({
		name: 'PinFieldContext',
		nameOfHook: 'usePinFieldContext',
		nameOfProvider: '<PinFieldProvider />'
	})
