import { useEffect } from 'react'

export const useInteractionOutside = (
	ref,
	handler,
	{ on = 'click', enabled = true, capture = true, exclude } = {}
) => {
	useEffect(() => {
		if (ref.current && handler && enabled) {
			const element = ref.current

			const listener = (event) => {
				const outside =
					element &&
					!element.contains(event.target) &&
					!event.target.contains(element)
				const excluded = exclude && exclude.contains(event.target)

				if (outside && !excluded) {
					handler(event)
				}
			}

			document.addEventListener(on, listener, { capture })

			return () => {
				document.removeEventListener(on, listener, { capture })
			}
		}
	}, [ref, handler, on, enabled, exclude, capture])
}
