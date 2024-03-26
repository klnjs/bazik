import { useMemo } from 'react'
import { chain, forwardRef, toData, type CoreProps, isBoolean } from '../core'
import { usePinFieldContext } from './PinFieldContext'

export type PinFieldSlotProps = CoreProps<
	'div',
	{
		slot: number
		disabled?: boolean
		placeholder?: string
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

		const value = pin[slot - 1] ?? ''
		const content = useMemo(() => {
			if (!value) {
				return placeholder
			}

			if (secret) {
				return isBoolean(secret) ? '·' : secret
			}

			return value
		}, [value, secret, placeholder])

		const isEnd = slot === length
		const isStart = slot === 1
		const isActive = slot === Math.min(length, pin.length + 1)
		const isDisabled = disabled
		const isPlaceholder = value === ''
		const isHighlighted = isFocusWithin && isActive
		const isCaret = isHighlighted && pin.length < length

		const handlePointerDown = chain(onPointerDown, (event) => {
			event.preventDefault()
			inputRef.current?.focus()
		})

		return (
			<div
				ref={forwardedRef}
				data-end={toData(isEnd)}
				data-start={toData(isStart)}
				data-caret={toData(isCaret)}
				data-disabled={toData(isDisabled)}
				data-placeholder={toData(isPlaceholder)}
				data-highlighted={toData(isHighlighted)}
				onPointerDown={handlePointerDown}
				{...otherProps}
			>
				{content}
			</div>
		)
	}
)
