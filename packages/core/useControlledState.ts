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
				'Warning: A component is changing an uncontrolled component to be controlled.' +
					' This is likely caused by the value changing from undefined to a defined value, which should not happen.' +
					' Decide between using a controlled or uncontrolled element for the lifetime of the component'
			)
		}

		isControlledRef.current = isControlled
	}, [isControlled])

	return [isControlled ? value : state, handleChange]
}
