import { isNumber } from '@klnjs/assertion'
import { useTransitionStatus, type FloatingContext } from '@floating-ui/react'
import type { PopoverDuration, PopoverStatus } from './PopoverTypes'

export const usePopoverStatus = (
	context: FloatingContext,
	duration: PopoverDuration
): PopoverStatus => {
	const { isMounted, status } = useTransitionStatus(context, {
		duration: {
			open: isNumber(duration) ? duration : duration.enter,
			close: isNumber(duration) ? duration : duration.leave
		}
	})

	return {
		mounted: isMounted,
		status:
			status === 'open' ? 'enter' : status === 'close' ? 'leave' : 'mount'
	}
}
