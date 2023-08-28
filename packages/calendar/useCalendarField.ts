import { useRef, useMemo, useState, useCallback } from 'react'
import { useControllableState } from '../core'
import { CalendarDate, type CalendarDateSegmentType } from './CalendarDate'

export type UseCalendarFieldOptions = {
	autoFocus?: boolean
	min?: Date
	max?: Date
	locale?: string
	disabled?: boolean
	value?: Date | null
	defaultValue?: Date | null
	onChange?: (value: Date | null) => void
}

export const useCalendarField = ({
	autoFocus: autoFocusProp = false,
	min,
	max,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue: defaultValueProp = null,
	onChange: onChangeProp
}: UseCalendarFieldOptions) => {
	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [labelId, setLabelId] = useState<string>()

	const [selection, setSelection] = useControllableState({
		value: useValue(valueProp),
		defaultValue: useValue(defaultValueProp),
		onChange: (next) => {
			if (onChangeProp) {
				onChangeProp(unuseValue(next))
			}
		}
	})

	const highlightedSegmentRef = useRef<HTMLDivElement>(null)

	const [highlightedSegment, setHighlightedSegment] =
		useState<CalendarDateSegmentType>()

	return {
		min: useValue(min),
		max: useValue(max),
		locale,
		disabled,
		labelId,
		setLabelId,
		autoFocus: autoFocusRef.current,
		setAutoFocus,
		selection,
		setSelection,
		highlightedSegmentRef,
		highlightedSegment,
		setHighlightedSegment
	}
}

function useValue(value?: Date): CalendarDate | undefined
function useValue(value?: Date | null): CalendarDate | null
function useValue(value?: Date | null) {
	return useMemo(() => {
		if (value instanceof Date) {
			return new CalendarDate(value)
		}

		return value
	}, [value])
}

function unuseValue(value?: CalendarDate | null): Date | null {
	if (value instanceof CalendarDate) {
		return value.toDate()
	}

	return null
}
