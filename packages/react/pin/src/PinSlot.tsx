import {
	toData,
	useChainHandler,
	type PolyProps
} from '@klnjs/core'
import { usePinContext } from './PinContext'
import { usePinConceal } from './usePinConceal'

export type PinSlotProps = PolyProps<
	'div',
	{
		slot: number
		placeholder?: string
	}
>

export const PinSlot = 
	({ slot, placeholder, onPointerDown, ...otherProps }: PinSlotProps) => {
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
