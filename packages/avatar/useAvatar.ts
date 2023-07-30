import { useState } from 'react'

export type UseAvatarOptions = NonNullable<unknown>

export const useAvatar = () => {
	const [ready, setReady] = useState(false)

	return {
		ready,
		setReady
	}
}
