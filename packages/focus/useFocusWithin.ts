import type { FocusEvent } from 'react'

export type UseFocusWithinOptions = {
	onFocusEnter?: (event: FocusEvent) => void
	onFocusLeave?: (event: FocusEvent) => void
}

export const useFocusWithin = ({
	onFocusEnter,
	onFocusLeave
}: UseFocusWithinOptions = {}) => {
	const onFocus = onFocusEnter
		? (event: FocusEvent) => {
				if (event.currentTarget.contains(event.target)) {
					onFocusEnter(event)
				}
		  }
		: undefined

	const onBlur = onFocusLeave
		? (event: FocusEvent) => {
				if (!event.currentTarget.contains(event.relatedTarget)) {
					onFocusLeave(event)
				}
		  }
		: undefined

	return { onFocus, onBlur }
}

export const isFocusWithin = (element: Element | EventTarget) =>
	(element as Element).contains(document.activeElement)
