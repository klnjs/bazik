import { createContext } from '../core/createContext'
import type { useAlert } from './useAlert'

export type UseAlertContext = ReturnType<typeof useAlert>

export const [AlertProvider, useAlertContext] = createContext<UseAlertContext>({
	name: 'AlertContext',
	nameOfHook: 'useAlertContext',
	nameOfProvider: '<AlertProvider />'
})
