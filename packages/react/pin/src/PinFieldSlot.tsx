import { chain, forwardRef, toData, type CoreProps } from '@klnjs/core'
import { usePinFieldContext } from './PinFieldContext'
import { usePinFieldConceal } from './usePinFieldConceal'

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
			length,
			conceal: { delay, symbol },
			inputRef,
			disabled = false,
			focusWithin: isFocusWithin
		} = usePinFieldContext()

		const value = pin[slot - 1] ?? ''
		const content = usePinFieldConceal({
			delay,
			value,
			symbol,
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
