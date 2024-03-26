import { createContext } from '../core'
import type { usePopover } from './usePopover'

export type UsePopoverContext = ReturnType<typeof usePopover>

export const [PopoverProvider, usePopoverContext] =
	createContext<UsePopoverContext>({
		name: 'PopoverContext',
		nameOfHook: 'usePopoverContext',
		nameOfProvider: '<PopoverProvider />'
	})
