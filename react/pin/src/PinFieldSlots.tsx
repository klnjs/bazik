import { useMemo, type ReactNode } from 'react'
import { usePinFieldContext } from './PinFieldContext'

export type PinFieldSlotsItem = {
	slot: number
	value: string
}

export type PinFieldSlotsProps = {
	children: (type: PinFieldSlotsItem, index: number) => ReactNode
}

export const PinFieldSlots = ({ children }: PinFieldSlotsProps) => {
	const { pin, length } = usePinFieldContext()

	const slots: PinFieldSlotsItem[] = useMemo(
		() =>
			Array.from({ length }, (_x, slot) => ({
				slot: slot + 1,
				value: pin[slot] ?? ''
			})),
		[pin, length]
	)

	return slots.map(children)
}
