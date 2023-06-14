import { createContext } from '../core/createContext'

export type UseAvatarContext = {
	ready: boolean
	setReady: (ready: boolean) => void
	onLoad?: () => void
	onError?: () => void
}

export const [AvatarProvider, useAvatarContext] =
	createContext<UseAvatarContext>({
		name: 'AvatarContext',
		nameOfHook: 'useAvatarContext',
		nameOfProvider: '<AvatarProvider />'
	})
