import {
	chain,
	forwardRef,
	toData,
	usePreviousValue,
	type CoreProps
} from '@klnjs/core'
import { usePinContext } from './PinContext'
import { usePinConceal } from './usePinConceal'

export type PinSlotProps = CoreProps<
	'div',
	{
		slot: number
		disabled?: boolean
		placeholder?: string
	}
>

export const PinSlot = forwardRef<'div', PinSlotProps>(
	({ slot, placeholder, onPointerDown, ...otherProps }, forwardedRef) => {
		const {
			pin,
			length,
			conceal: { delay, symbol },
			inputRef,
			disabled = false,
			focusWithin: isFocusWithin
		} = usePinContext()

		const prev = usePreviousValue(pin.length)
		const value = pin[slot - 1] ?? ''
		const forward = prev === null || prev < pin.length
		const content = usePinConceal({
			delay: slot < pin.length ? 0 : delay,
			value,
			symbol,
			direction: forward ? 'forwards' : 'backwards',
			placeholder
		})

		const isEnd = slot === length
		const isStart = slot === 1
		const isActive = slot === Math.min(length, pin.length + 1)
		const isDisabled = disabled
		const isConcealed = content === symbol
		const isPlaceholder = content === placeholder && placeholder !== ''
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
				data-concealed={toData(isConcealed)}
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
