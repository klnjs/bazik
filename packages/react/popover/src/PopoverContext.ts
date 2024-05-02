import { createContext } from '@klnjs/core'
import type { usePopover } from './usePopover'

export type UsePopoverContext = ReturnType<typeof usePopover>

export const [PopoverContext, usePopoverContext] =
	createContext<UsePopoverContext>({
		name: 'PopoverContext'
	})
