import { useMemo, useState } from 'react'
import { chain } from '../core'

export type UseAvatarOptions = {
	onLoad?: () => void
	onError?: () => void
}

export const useAvatar = ({ onLoad, onError }: UseAvatarOptions) => {
	const [ready, setReady] = useState(false)
	const handleLoad = chain(onLoad, () => setReady(true))
	const handleError = chain(onError, () => setReady(false))

	return useMemo(
		() => ({
			rootProps: {},
			fallbackProps: {
				hidden: ready
			},
			imageProps: {
				hidden: !ready,
				onLoad: handleLoad,
				onError: handleError
			}
		}),
		[ready, handleLoad, handleError]
	)
}
