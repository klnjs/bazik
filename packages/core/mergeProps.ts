const mergeStyle = <T extends object | undefined>(...props: T[]): T =>
	Object.assign({}, ...props)

const mergeClassName = (...classNames: (string | undefined)[]) =>
	classNames.filter((str) => str !== undefined && str.trim() !== '').join(' ')

const mergeHandler =
	<T extends (...a: any[]) => void>(...fns: (T | undefined)[]) =>
	(...args: Parameters<T>) => {
		fns.forEach(function (fn) {
			fn?.(...args)
		})
	}

export function mergeProps(...args: Record<string, any>[]) {
	const mergedProps: Record<string, any> = {}

	for (const props of args) {
		for (const key in props) {
			const mergedValue = mergedProps[key]
			const currentValue = props[key]

			if (key === 'style') {
				mergedProps[key] = mergeStyle(mergedValue, currentValue)
			} else if (key === 'className') {
				mergedProps[key] = mergeClassName(mergedValue, currentValue)
			} else if (
				/^on[A-Z]/.test(key) &&
				typeof mergedValue === 'function' &&
				typeof currentValue === 'function'
			) {
				mergedProps[key] = mergeHandler(currentValue, mergedValue)
			} else {
				mergedProps[key] = currentValue
			}
		}
	}

	return mergedProps
}
