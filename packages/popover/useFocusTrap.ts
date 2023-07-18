import { useEffect, type RefObject } from 'react'
import { createFocusTrap } from 'focus-trap'

export type UseFocusTrapOptions = {
	enabled?: boolean
}

export const useFocusTrap = (
	ref: RefObject<HTMLElement>,
	{ enabled = true }: UseFocusTrapOptions = {}
) => {
	useEffect(() => {
		if (ref.current && enabled) {
			const element = ref.current
			const trap = createFocusTrap(element, {
				fallbackFocus: element,
				allowOutsideClick: true
			})

			trap.activate()

			return () => {
				trap.deactivate()
			}
		}
	}, [ref, enabled])
}
