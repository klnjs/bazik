import { useState, useLayoutEffect } from 'react'
import { useCallbackRef } from '@klnjs/core'
import type { AvatarStatus } from './AvatarTypes'

export type UseAvatarOptions = {
	onStatusChange?: (status: AvatarStatus) => void
}

export const useAvatar = ({ onStatusChange }: UseAvatarOptions) => {
	const [status, setStatus] = useState<AvatarStatus>('idle')

	const onStatusChangeRef = useCallbackRef(onStatusChange)

	useLayoutEffect(() => {
		if (status !== 'idle') {
			onStatusChangeRef(status)
		}
	}, [status])

	return {
		status,
		setStatus
	}
}
