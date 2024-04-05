import {
	useCallback,
	useLayoutEffect,
	type ChangeEvent,
	type KeyboardEvent,
	type ClipboardEvent,
	type CSSProperties
} from 'react'
import {
	freya,
	chain,
	forwardRef,
	useId,
	useMergeRefs,
	type CoreProps
} from '../core'
import { usePinFieldContext } from './PinFieldContext'

export type PinFieldInputProps = CoreProps<'input'>

export const PinFieldInput = forwardRef<'input', PinFieldInputProps>(
	(
		{
			id: idProp,
			hidden = true,
			autoComplete = 'one-time-code',
			style: styleProp,
			onBlur,
			onFocus,
			onChange,
			onKeyDown,
			...otherProps
		},
		forwardedRef
	) => {
		const {
			pin,
			type,
			length,
			disabled,
			inputRef,
			setPin,
			setInputId,
			setFocusWithin
		} = usePinFieldContext()

		const id = useId(idProp)
		const refCallback = useMergeRefs(inputRef, forwardedRef)

		const pattern = PinFieldInputPatterns[type]
		const style: CSSProperties | undefined = hidden
			? {
					position: 'absolute',
					pointerEvents: 'none',
					opacity: 0,
					...styleProp
				}
			: styleProp

		const handleBlur = chain(onBlur, () => setFocusWithin(false))

		const handleFocus = chain(onFocus, () => setFocusWithin(true))

		const handlePaste = useCallback(
			(event: ClipboardEvent) => {
				const input = event.clipboardData.getData('text/plain')
				const sanitized = [...input]
					.filter((char) => pattern.test(char))
					.slice(0, length)
					.join('')

				setPin(sanitized)
			},
			[length, pattern, setPin]
		)

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				const { value } = event.target

				if (pattern.test(value)) {
					setPin(value)

					if (onChange) {
						onChange(event)
					}
				}
			},
			[pattern, setPin, onChange]
		)

		const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
			if (
				event.code === 'End' ||
				event.code === 'Home' ||
				event.code.startsWith('Arrow')
			) {
				event.preventDefault()
			}

			if (onKeyDown) {
				onKeyDown(event)
			}
		}

		useLayoutEffect(() => {
			setInputId(id)

			return () => {
				setInputId(undefined)
			}
		}, [id, setInputId])

		return (
			<freya.input
				id={id}
				ref={refCallback}
				type="text"
				value={pin}
				style={style}
				pattern={pattern.source}
				disabled={disabled}
				inputMode={type !== 'numeric' ? 'text' : type}
				maxLength={length}
				autoComplete={autoComplete}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onPaste={handlePaste}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...otherProps}
			/>
		)
	}
)

export const PinFieldInputPatterns = {
	alphabetic: /^[a-zA-Z]*$/,
	alphanumeric: /^[a-zA-Z0-9]*$/,
	numeric: /^[0-9]*$/
}
