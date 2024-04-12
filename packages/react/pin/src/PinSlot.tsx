import {
	forwardRef,
	toData,
	useChainHandler,
	type CoreProps
} from '@klnjs/core'
import { usePinContext } from './PinContext'
import { usePinConceal } from './usePinConceal'

export type PinSlotProps = CoreProps<
	'div',
	{
		slot: number
		placeholder?: string
	}
>

export const PinSlot = forwardRef<'div', PinSlotProps>(
	({ slot, placeholder, onPointerDown, ...otherProps }, forwardedRef) => {
		const {
			pin,
			length,
			conceal: { delay, symbol, enabled },
			inputRef,
			disabled = false,
			direction,
			focusWithin: isFocusWithin
		} = usePinContext()

		const value = pin[slot - 1] ?? ''
		const content = usePinConceal({
			enabled,
			delay,
			value,
			symbol,
			direction,
			placeholder
		})

		const isEnd = slot === length
		const isStart = slot === 1
		const isActive = slot === Math.min(length, pin.length + 1)
		const isFocused = isFocusWithin && isActive
		const isDisabled = disabled
		const isConcealed = content === symbol
		const isPlaceholder = content === placeholder && placeholder !== ''
		const isCaret = isFocused && pin.length < length

		const handlePointerDown = useChainHandler(onPointerDown, (event) => {
			event.preventDefault()
			inputRef.current?.focus()
		})

		return (
			<div
				ref={forwardedRef}
				data-end={toData(isEnd)}
				data-start={toData(isStart)}
				data-caret={toData(isCaret)}
				data-focused={toData(isFocused)}
				data-disabled={toData(isDisabled)}
				data-concealed={toData(isConcealed)}
				data-placeholder={toData(isPlaceholder)}
				onPointerDown={handlePointerDown}
				{...otherProps}
			>
				{content}
			</div>
		)
	}
)
