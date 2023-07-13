import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { freya, forwardRef, type ComponentProps } from '../core'

export type PortalProps = ComponentProps<
	'div',
	{
		target?: HTMLElement | string
		disabled?: boolean
	}
>

export const Portal = forwardRef<'div', PortalProps>(
	({ target, disabled, children, ...otherProps }, forwardedRef) => {
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

		return disabled
			? children
			: createPortal(
					<freya.div ref={forwardedRef} {...otherProps}>
						{children}
					</freya.div>,
					container
			  )
	}
)
