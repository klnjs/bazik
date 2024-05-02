import { createContext } from '@klnjs/core'
import type { usePin } from './usePin'

export type UsePinContext = ReturnType<typeof usePin>

export const [PinContext, usePinContext] = createContext<UsePinContext>({
	name: 'PinContext'
})
