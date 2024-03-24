import { useMemo, type KeyboardEvent } from 'react'
import { chain, forwardRef, toData, type CoreProps, isBoolean } from '../core'
import { usePinFieldContext } from './PinFieldContext'

export type PinFieldSlotProps = CoreProps<
	'div',
	{
		slot: number
		disabled?: boolean
		placeholder?: string
		onKeyDown?: (event: KeyboardEvent) => void
	}
>

export const PinFieldSlot = forwardRef<'div', PinFieldSlotProps>(
	({ slot, placeholder, onPointerDown, ...otherProps }, forwardedRef) => {
		const {
			pin,
			secret,
			length,
			inputRef,
			disabled = false,
			focusWithin: isFocusWithin
		} = usePinFieldContext()

		const isEnd = slot === length - 1
		const isStart = slot === 0
		const isActive = slot === Math.min(length - 1, pin.length)
		const isDisabled = disabled
		const isHighlighted = isFocusWithin && isActive

		const value = pin[slot] ?? ''
		const content = useMemo(() => {
			if (!value) {
				return placeholder
			}

			if (secret) {
				return isBoolean(secret) ? '·' : secret
			}

			return value
		}, [value, secret, placeholder])

		const handlePointerDown = chain(onPointerDown, (event) => {
			event.preventDefault()
			inputRef.current?.focus()
		})

		return (
			<div
				ref={forwardedRef}
				data-end={toData(isEnd)}
				data-start={toData(isStart)}
				data-disabled={toData(isDisabled)}
				data-highlighted={toData(isHighlighted)}
				onPointerDown={handlePointerDown}
				{...otherProps}
			>
				{content}
			</div>
		)
	}
)
