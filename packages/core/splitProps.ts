import type { Props } from './types'

export const splitProps = <T extends Props, K extends keyof T>(
	props: T,
	keys: K[]
): [Pick<T, K>, Omit<T, K>] => {
	const pickObject: Props = {}
	const omitObject: Props = {}

	for (const key in props) {
		if (keys.includes(key as unknown as K)) {
			pickObject[key] = props[key]
		} else {
			omitObject[key] = props[key]
		}
	}

	return [pickObject as Pick<T, K>, omitObject as Omit<T, K>]
}
