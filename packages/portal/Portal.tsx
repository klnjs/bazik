import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { freya, forwardRef, type ComponentProps } from '../core'

export type PortalProps = ComponentProps<
	'div',
	{
		target?: HTMLElement | string
	}
>

export const Portal = forwardRef<'div', PortalProps>(
	({ target, ...otherProps }, forwardedRef) => {
		const container = useMemo(() => {
			if (typeof target === 'string') {
				const element = window.document.querySelector(target)

				if (!element) {
					throw new Error(
						`Could not find element with selector ${target}`
					)
				}

				return element as HTMLElement
			}

			return window.document.body
		}, [target])

		return createPortal(
			<freya.div ref={forwardedRef} {...otherProps} />,
			container
		)
	}
)
