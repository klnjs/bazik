import {
	useRef,
	useState,
	useEffect,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'

export type UseControllableStateOptions<T> = {
	value?: T
	defaultValue?: T | (() => T)
	onChange?: (value: T) => void
}

export const useControllableState = <T>({
	value: valueProp,
	defaultValue,
	onChange
}: UseControllableStateOptions<T>) => {
	const [uncontrolledState, setUncontrolledState] = useState(defaultValue)

	const isControlled = valueProp !== undefined
	const isControlledRef = useRef(isControlled)

	const value = isControlled ? valueProp : uncontrolledState

	const setValue = useCallback(
		(newValue: SetStateAction<T>) => {
			const nextSetter = newValue as (prevState?: T) => T
			const nextValue =
				typeof newValue === 'function' ? nextSetter(value) : newValue

			if (!isControlled) {
				setUncontrolledState(nextValue)
			}

			if (onChange) {
				onChange(nextValue)
			}
		},
		[value, isControlled, onChange]
	)

	useEffect(() => {
		if (isControlledRef.current !== isControlled) {
			isControlledRef.current = isControlled

			// eslint-disable-next-line no-console
			console.warn(
				'Warning: A component is changing from being uncontrolled to controlled or vice versa.'
			)
		}
	}, [isControlled])

	return [value, setValue] as [T, Dispatch<SetStateAction<T>>]
}
