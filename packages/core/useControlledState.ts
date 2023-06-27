import { useRef, useState, useEffect } from 'react'

type SetValue<T> = (value: T | ((prevState: T) => T)) => void

export const useControlledState = <T>(
	defaultValue: T,
	value?: T
): [T, SetValue<T>] => {
	const [state, setState] = useState<T>(defaultValue)
	const [isControlled, setIsControlled] = useState(value !== undefined)
	const isControlledRef = useRef(isControlled)

	const handleChange: SetValue<T> = (newValue) => {
		if (value === undefined) {
			setState(newValue)
		}
	}

	useEffect(() => {
		if (value !== undefined) {
			setIsControlled(true)
			setState(value)
		} else {
			setIsControlled(false)
		}
	}, [value])

	useEffect(() => {
		if (isControlledRef.current !== isControlled) {
			// eslint-disable-next-line no-console
			console.log(
				'Warning: A component is changing an uncontrolled input to be controlled.' +
					'This is likely caused by the value changing from undefined to a defined value, which should not happen.' +
					'Decide between using a controlled or uncontrolled input element for the lifetime of the component'
			)
		}

		isControlledRef.current = isControlled
	}, [isControlled])

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return [isControlled ? value! : state, handleChange]
}
