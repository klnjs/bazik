import {
	useMemo,
	useState,
	useCallback,
	useLayoutEffect,
	type SetStateAction
} from 'react'
import { useStateControllable, useMounted } from '@klnjs/core'
import { isSet, isArray } from '@klnjs/assertion'
import { compare } from './calendar-functions'
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
	select: (date: PlainDate) => void
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	selectionVisible: CalendarSelectValue<S>
}

export const useCalendarSelection = <S extends CalendarSelect = 'one'>({
	defaultValue = null,
	highlighted,
	behaviour,
	value,
	onChange
}: UseCalendarSelectionOptions<S>) => {
	const isMounted = useMounted()

	const [transient, setTransient] = useState<PlainDate>()

	const [selection, setSelection] = useStateControllable<
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
		const isTransient = isSet(transient)

		return [
			isRange && isTransient
				? [transient, highlighted].toSorted(compare)
				: selection,
			isTransient
		]
	}, [selectionMode, selection, transient, highlighted])

	const select = useCallback(
		(date: PlainDate) => {
			if (selectionMode === 'one') {
				setSelection(date)
			}

			if (selectionMode === 'many') {
				setSelection((prev) => {
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
					if (isSet(prev)) {
						setSelection([prev, date].toSorted(compare))
						return undefined
					}

					return date
				})
			}
		},
		[selectionMode, setSelection]
	)

	useLayoutEffect(() => {
		if (isMounted) {
			setSelectionMode(behaviour ?? 'one')
			setSelection(null)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [behaviour, setSelection])

	return {
		select,
		selection,
		selectionIsTransient,
		selectionMode,
		selectionVisible
	} as
		| UseCalendarSelectionReturn<'one'>
		| UseCalendarSelectionReturn<'many'>
		| UseCalendarSelectionReturn<'range'>
}
