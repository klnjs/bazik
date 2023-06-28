import { useRef, useState, useEffect } from 'react'

type SetValue<T> = (value: T | ((prevState: T) => T)) => void

export const useControlledState = <T>(
	defaultValue: T,
	value?: T
): [T, SetValue<T>] => {
	const [state, setState] = useState<T>(defaultValue)
	const isControlled = value !== undefined
	const isControlledRef = useRef(isControlled)

	const handleChange: SetValue<T> = (newValue) => {
		if (!isControlled) {
			setState(newValue)
		}
	}

	useEffect(() => {
		if (isControlledRef.current !== isControlled) {
			// eslint-disable-next-line no-console
			console.warn(
				'Warning: A component is changing from being uncontrolled to controlled or vice versa.'
			)
		}

		isControlledRef.current = isControlled
	}, [isControlled])

	return [isControlled ? value : state, handleChange]
}
