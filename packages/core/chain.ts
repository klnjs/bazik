/* eslint-disable @typescript-eslint/no-explicit-any */

export const chain =
	<T extends (...a: any[]) => void>(...fns: (T | undefined)[]) =>
	(...args: Parameters<T>) => {
		fns.forEach(function (fn) {
			fn?.(...args)
		})
	}
