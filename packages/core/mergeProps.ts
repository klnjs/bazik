/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { clsx } from './clsx'
import { chain } from './chain'

export function mergeProps(...args: Record<string, any>[]) {
	const mergedProps: Record<string, any> = {}

	for (const props of args) {
		for (const key in props) {
			if (Object.hasOwn(props, key)) {
				const mergedValue = mergedProps[key]
				const currentValue = props[key]

				if (key === 'style') {
					mergedProps[key] = { ...mergedValue, ...currentValue }
				} else if (key === 'className') {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					mergedProps[key] = clsx(currentValue, mergedValue)
				} else if (
					/^on[A-Z]/.test(key) &&
					typeof mergedValue === 'function' &&
					typeof currentValue === 'function'
				) {
					mergedProps[key] = chain(currentValue, mergedValue)
				} else {
					mergedProps[key] = currentValue
				}
			}
		}
	}

	return mergedProps
}
