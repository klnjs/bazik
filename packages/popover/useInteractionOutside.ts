import { useRef, useEffect, type RefObject } from 'react'

export type UseInteractionOutsideEvent = 'click' | 'pointerdown'

export type UseInteractionOutsideOptions<T extends UseInteractionOutsideEvent> =
	{
		enabled?: boolean
		capture?: boolean
		interaction?: T
	}

export const useInteractionOutside = <T extends UseInteractionOutsideEvent>(
	ref: RefObject<HTMLElement>,
	callback: (event: DocumentEventMap[T]) => void,
	{
		enabled = true,
		capture = true,
		interaction = 'pointerdown'
	}: UseInteractionOutsideOptions<T>
) => {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		if (ref.current && enabled) {
			const element = ref.current
			const listener = (event: DocumentEventMap[T]) => {
				if (!element.contains(event.target as HTMLElement)) {
					callbackRef.current(event)
				}
			}

			document.addEventListener(interaction, listener, { capture })

			return () => {
				document.removeEventListener(interaction, listener, { capture })
			}
		}
	}, [ref, enabled, capture, interaction])
}
