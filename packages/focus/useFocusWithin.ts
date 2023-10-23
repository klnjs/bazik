import { useCallback, type FocusEvent, useRef } from 'react'

export type UseFocusWithinOptions<E extends FocusEvent> = {
	onFocusEnter?: (event: E) => void
	onFocusLeave?: (event: E) => void
	onFocusChange?: (isFocusWithin: boolean) => void
}

export const useFocusWithin = <E extends FocusEvent>({
	onFocusEnter,
	onFocusLeave,
	onFocusChange
}: UseFocusWithinOptions<E> = {}) => {
	const state = useRef(false)

	const onFocus = useCallback(
		(event: E) => {
			if (!state.current && document.activeElement === event.target) {
				onFocusEnter?.(event)
				onFocusChange?.(true)
				state.current = true
			}
		},
		[onFocusEnter, onFocusChange]
	)

	const onBlur = useCallback(
		(event: E) => {
			if (
				state.current &&
				!event.currentTarget.contains(event.relatedTarget)
			) {
				onFocusLeave?.(event)
				onFocusChange?.(false)
				state.current = false
			}
		},
		[onFocusLeave, onFocusChange]
	)

	return { onFocus, onBlur }
}
