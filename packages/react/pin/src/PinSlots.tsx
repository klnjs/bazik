import { useMemo, type ReactNode } from 'react'
import { usePinContext } from './PinContext'

export type PinSlotsItem = {
	slot: number
	value: string
}

export type PinSlotsProps = {
	children: (type: PinSlotsItem, index: number) => ReactNode
}

export const PinSlots = ({ children }: PinSlotsProps) => {
	const { pin, length } = usePinContext()

	const slots: PinSlotsItem[] = useMemo(
		() =>
			Array.from({ length }, (_x, slot) => ({
				slot: slot + 1,
				value: pin[slot] ?? ''
			})),
		[pin, length]
	)

	return slots.map(children)
}
