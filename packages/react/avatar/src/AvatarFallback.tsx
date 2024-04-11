import { useState, useEffect } from 'react'
import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { useAvatarContext } from './AvatarContext'

export type AvatarFallbackProps = CoreProps<'div', { delay?: number }>

export const AvatarFallback = forwardRef<'div', AvatarFallbackProps>(
	({ delay, ...otherProps }, forwardedRef) => {
		const [ready, setReady] = useState(delay === undefined)

		const { status } = useAvatarContext()

		// @ts-expect-error ts(7030): Not all code paths return a value.
		useEffect(() => {
			if (delay !== undefined) {
				const timeout = setTimeout(() => setReady(true), delay)

				return () => {
					clearTimeout(timeout)
				}
			}
		}, [delay])

		return ready && status === 'loaded' ? (
			<poly.div ref={forwardedRef} {...otherProps} />
		) : null
	}
)
