import { createContext } from '@klnjs/core'
import type { useAvatar } from './useAvatar'

export type UseAvatarContext = ReturnType<typeof useAvatar>

export const [AvatarContext, useAvatarContext] =
	createContext<UseAvatarContext>({
		name: 'AvatarContext'
	})
