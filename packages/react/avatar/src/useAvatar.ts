import { useState, useLayoutEffect } from 'react'
import type { AvatarStatus } from './AvatarTypes'

export type UseAvatarOptions = {
	onStatusChange: (status: AvatarStatus) => void
}

export const useAvatar = ({ onStatusChange }: UseAvatarOptions) => {
	const [status, setStatus] = useState<AvatarStatus>('idle')

	useLayoutEffect(() => {
		if (status !== 'idle') {
			onStatusChange(status)
		}
	}, [status])

	return {
		status,
		setStatus
	}
}
