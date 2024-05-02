import { useState, useEffect } from 'react'
import { poly, type PolyProps } from '@klnjs/core'
import { useAvatarContext } from './AvatarContext'

export type AvatarFallbackProps = PolyProps<'div', { delay?: number }>

export const AvatarFallback = ({
	delay,
	...otherProps
}: AvatarFallbackProps) => {
	const { status } = useAvatarContext()

	const [ready, setReady] = useState(delay === undefined)

	// @ts-expect-error ts(7030): Not all code paths return a value.
	useEffect(() => {
		if (delay !== undefined) {
			const timeout = setTimeout(() => setReady(true), delay)

			return () => {
				clearTimeout(timeout)
			}
		}
	}, [delay])

	return ready && status !== 'loaded' ? <poly.div {...otherProps} /> : null
}
