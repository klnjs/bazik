import {
	useRef,
	useState,
	useEffect,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useCallbackSaved } from './useCallbackSaved'

export type UseStateControllableOptions<T> = {
	value?: T
	defaultValue?: T | (() => T)
	onChange?: (value: SetStateAction<T>) => void
}

export const useStateControllable = <T>({
	value: valueProp,
	defaultValue,
	onChange
}: UseStateControllableOptions<T>) => {
	const isControlled = valueProp !== undefined
	const isControlledRef = useRef(isControlled)
	const onChangeRef = useCallbackSaved(onChange)

	const [valueState, setValueState] = useState(defaultValue as T)
	const value = isControlled ? (valueProp as T) : valueState

	const setValue = useCallback(
		(action: SetStateAction<T>) => {
			if (!isControlled) {
				setValueState(action)
			}

			onChangeRef(action)
		},
		[isControlled, onChangeRef]
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

	// Would be nice to be able to tell eslint that these values
	// are reference safe, when using this hook.
	// Issue: https://github.com/facebook/react/issues/16873
	return [value, setValue] as [T, Dispatch<SetStateAction<T>>]
}
