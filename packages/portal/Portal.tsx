import { useMemo, Children, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type PortalProps = {
	target?: HTMLElement | string
	disabled?: boolean
	children: ReactNode
}

export const Portal = ({ target, disabled, children }: PortalProps) => {
	const child = Children.only(children)
	const container = useMemo(() => {
		if (target === undefined || disabled) {
			return window.document.body
		}

		if (typeof target === 'string') {
			const element = window.document.querySelector(target)

			if (!element) {
				throw new Error(
					`Could not find element with selector ${target}`
				)
			}

			return element as HTMLElement
		}

		return target
	}, [target, disabled])

	return disabled ? child : createPortal(child, container)
}
