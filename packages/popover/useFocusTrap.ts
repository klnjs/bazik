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
		const element = ref.current

		if (element && enabled) {
			const trap = createFocusTrap(element, {
				fallbackFocus: element,
				allowOutsideClick: true,
				returnFocusOnDeactivate: true
			})

			trap.activate()

			return () => {
				trap.deactivate()
			}
		}
	}, [ref, enabled])
}
