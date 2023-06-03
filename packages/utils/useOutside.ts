import { useEffect, type RefObject } from 'react'

export type UseOutsideOptions = {
	event?: 'click' | 'mousedown' | 'pointerdown' | 'touchstart'
	enabled?: boolean
	capture?: boolean
}

export const useOutside = (
	ref: RefObject<HTMLElement>,
	handler: (event: Event) => void,
	{
		event: type = 'click',
		enabled = true,
		capture = true
	}: UseOutsideOptions = {}
) => {
	useEffect(() => {
		if (!enabled) {
			return
		}

		const listener = (event: Event) => {
			const outside = !ref.current?.contains(event.target as HTMLElement)

			if (outside) {
				handler(event)
			}
		}

		document.addEventListener(type, listener, { capture })

		return () => {
			document.removeEventListener(type, listener, { capture })
		}
	}, [ref, type, enabled, capture, handler])
}
