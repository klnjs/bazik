import { useEffect } from 'react'

export type UseOutsideOptions = {
	type?: keyof DocumentEventMap
	enabled?: boolean
	capture?: boolean
}

export const useOutside = (
	element: HTMLElement | undefined,
	handler: () => void,
	{ type = 'click', enabled = true, capture = true }: UseOutsideOptions = {}
) => {
	useEffect(() => {
		if (enabled && element) {
			const listener = (event: Event) => {
				const outside = !element.contains(event.target as Node)

				if (outside) {
					handler()
				}
			}

			document.addEventListener(type, listener, { capture })

			return () => {
				document.removeEventListener(type, listener, { capture })
			}
		}
	}, [element, type, enabled, capture, handler])
}
