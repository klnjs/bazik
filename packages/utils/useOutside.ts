import { useEffect, type RefObject } from 'react'

export type UseOutsideOptions = {
	event?: keyof DocumentEventMap
	enabled?: boolean
	capture?: boolean
}

export const useOutside = (
	ref: RefObject<HTMLElement>,
	handler: (event: Event) => void,
	{ event = 'click', enabled = true, capture = true }: UseOutsideOptions = {}
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

		document.addEventListener(event, listener, { capture })

		return () => {
			document.removeEventListener(event, listener, { capture })
		}
	}, [ref, event, enabled, capture, handler])
}
