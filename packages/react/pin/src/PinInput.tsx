import {
	useLayoutEffect,
	type ChangeEvent,
	type KeyboardEvent,
	type ClipboardEvent,
	type CSSProperties
} from 'react'
import {
	poly,
	chain,
	forwardRef,
	useId,
	useMergeRefs,
	type CoreProps
} from '@klnjs/core'
import { usePinContext } from './PinContext'
import { usePinPattern } from './usePinPattern'

export type PinInputProps = CoreProps<'input'>

export const PinInput = forwardRef<'input', PinInputProps>(
	(
		{
			id: idProp,
			hidden = true,
			autoComplete = 'one-time-code',
			style: styleProp,
			onBlur,
			onFocus,
			onPaste,
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
		} = usePinContext()

		const id = useId(idProp)
		const refCallback = useMergeRefs(inputRef, forwardedRef)

		const pattern = usePinPattern(type)
		const style: CSSProperties | undefined = hidden
			? {
					position: 'absolute',
					pointerEvents: 'none',
					opacity: 0,
					...styleProp
				}
			: styleProp

		const handleBlur = chain(() => setFocusWithin(false), onBlur)

		const handleFocus = chain(() => setFocusWithin(true), onFocus)

		const handlePaste = chain((event: ClipboardEvent) => {
			const input = event.clipboardData.getData('text/plain')
			const sanitized = [...input]
				.filter((char) => pattern.test(char))
				.slice(0, length)
				.join('')

			setPin(sanitized)
		}, onPaste)

		const handleChange = chain((event: ChangeEvent<HTMLInputElement>) => {
			if (pattern.test(event.target.value)) {
				setPin(event.target.value)
			}
		}, onChange)

		const handleKeyDown = chain(
			(event: KeyboardEvent<HTMLInputElement>) => {
				if (
					event.code === 'End' ||
					event.code === 'Home' ||
					event.code.startsWith('Arrow')
				) {
					event.preventDefault()
				}
			},
			onKeyDown
		)

		useLayoutEffect(() => {
			setInputId(id)

			return () => {
				setInputId(undefined)
			}
		}, [id, setInputId])

		return (
			<poly.input
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
