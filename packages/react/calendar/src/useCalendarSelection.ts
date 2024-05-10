import { useMemo, useState, useCallback, type SetStateAction } from 'react'
import { useEffectOnUpdate, useStateControllable } from '@klnjs/core'
import { isDefined, isArray } from '@klnjs/assertion'
import { plainDate } from '@klnjs/temporal'
import type { PlainDate, PlainDateRange } from './CalendarTypes'

export type CalendarSelect = 'one' | 'many' | 'range'

export type CalendarSelectValue<S extends CalendarSelect> =
	| null
	| (S extends 'range'
			? PlainDateRange
			: S extends 'many'
				? PlainDate[]
				: PlainDate)

export type UseCalendarSelectionOptions<S extends CalendarSelect> = {
	defaultValue?: CalendarSelectValue<S>
	highlighted: PlainDate
	behaviour?: S
	value?: CalendarSelectValue<S>
	onChange?: (value: CalendarSelectValue<S>) => void
}

export type UseCalendarSelectionReturn<S extends CalendarSelect> = {
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	selectionVisible: CalendarSelectValue<S>
	setSelection: (date: PlainDate) => void
}

export const useCalendarSelection = <S extends CalendarSelect = 'one'>({
	defaultValue = null,
	highlighted,
	behaviour,
	value,
	onChange
}: UseCalendarSelectionOptions<S>) => {
	const [transient, setTransient] = useState<PlainDate>()

	const [selection, setSelectionRaw] = useStateControllable<
		CalendarSelectValue<CalendarSelect>
	>({
		value,
		defaultValue,
		onChange: onChange as (
			value: SetStateAction<CalendarSelectValue<CalendarSelect>>
		) => void
	})

	const [selectionMode, setSelectionMode] = useState<CalendarSelect>(
		() => behaviour ?? 'one'
	)

	const [selectionVisible, selectionIsTransient] = useMemo(() => {
		const isRange = selectionMode === 'range'
		const isTransient = isDefined(transient)

		return [
			isRange && isTransient
				? [transient, highlighted].toSorted(plainDate.compare)
				: selection,
			isTransient
		]
	}, [selectionMode, selection, transient, highlighted])

	const setSelection = useCallback(
		(date: PlainDate) => {
			if (selectionMode === 'one') {
				setSelectionRaw(date)
			}

			if (selectionMode === 'many') {
				setSelectionRaw((prev) => {
					if (isArray(prev)) {
						const filtered = prev.filter((p) => !p.equals(date))

						return filtered.length === 0
							? null
							: filtered.length < prev.length
								? filtered
								: [...prev, date]
					}

					return [date]
				})
			}

			if (selectionMode === 'range') {
				setTransient((prev) => {
					if (isDefined(prev)) {
						setSelectionRaw(
							[prev, date].toSorted(plainDate.compare)
						)
						return undefined
					}

					return date
				})
			}
		},
		[selectionMode, setSelectionRaw]
	)

	useEffectOnUpdate(() => {
		setSelectionRaw(null)
		setSelectionMode(behaviour ?? 'one')
	}, [behaviour])

	return {
		selection,
		selectionIsTransient,
		selectionMode,
		selectionVisible,
		setSelection
	} as
		| UseCalendarSelectionReturn<'one'>
		| UseCalendarSelectionReturn<'many'>
		| UseCalendarSelectionReturn<'range'>
}
