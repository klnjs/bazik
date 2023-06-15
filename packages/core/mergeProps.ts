import { clsx } from './clsx'
import { chain } from './chain'

export type MergeProps<T extends object[]> = T extends [
	infer First,
	...infer Rest
]
	? First extends object
		? Rest extends object[]
			? MergeProps<Rest> & First
			: never
		: never
	: {}

export const mergeProps = <T extends object[]>(...args: T) => {
	const mergedProps: Record<string, any> = {}

	for (const props of args) {
		for (const key in props) {
			if (Object.hasOwn(props, key)) {
				const mergedValue = mergedProps[key]
				const currentValue = props[key as keyof typeof props]

				if (key === 'style') {
					mergedProps[key] = {
						...(mergedValue as object),
						...(currentValue as object)
					}
				} else if (key === 'className') {
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

	return mergedProps as MergeProps<T>
}

const a = mergeProps({ a: 'string' }, { b: 'string' })
