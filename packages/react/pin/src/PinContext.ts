import { createContext } from '@klnjs/core'
import type { usePin } from './usePin'

export type UsePinContext = ReturnType<typeof usePin>

export const [PinProvider, usePinContext] = createContext<UsePinContext>({
	name: 'PinContext',
	nameOfHook: 'usePinContext',
	nameOfProvider: '<PinProvider />'
})
