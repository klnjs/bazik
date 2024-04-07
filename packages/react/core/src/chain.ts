/* eslint-disable @typescript-eslint/no-explicit-any */

export const chain =
	<T extends (...a: any[]) => void>(...fns: (T | undefined)[]) =>
	(...args: Parameters<T>) => {
		for (const fn of fns) {
			if (typeof fn === 'function') {
				fn(...args)
			}
		}
	}
