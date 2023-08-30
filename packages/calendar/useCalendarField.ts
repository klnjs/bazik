import { useRef, useMemo, useState, useCallback } from 'react'
import { useControllableState } from '../core'
import {
	DateTime,
	type DateSegmentType,
	type TimeSegmentType
} from './CalendarDateTime'

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

	const [open, setOpen] = useState(false)

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

	const [highlightedSegment, setHighlightedSegment] = useState<
		DateSegmentType | TimeSegmentType
	>(() => new DateTime().getSegments(locale)[0].type)

	return {
		min: useValue(min),
		max: useValue(max),
		locale,
		disabled,
		open,
		setOpen,
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

function useValue(value?: Date): DateTime | undefined
function useValue(value?: Date | null): DateTime | null
function useValue(value?: Date | null) {
	return useMemo(() => {
		if (value instanceof Date) {
			return new DateTime(value)
		}

		return value
	}, [value])
}

function unuseValue(value?: DateTime | null): Date | null {
	if (value instanceof DateTime) {
		return value.toDate()
	}

	return null
}
