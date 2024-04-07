import { useRef, useState, useCallback } from 'react'
import type { Temporal } from 'temporal-polyfill'
import { useControllableState } from '../../packages/core/dist'

export type UseCalendarFieldOptions = {
	autoFocus?: boolean
	min?: Temporal.PlainDateTime
	max?: Temporal.PlainDateTime
	locale?: string
	disabled?: boolean
	value?: Temporal.PlainDateTime | null
	defaultValue?: Temporal.PlainDateTime | null
	onChange?: (value: Temporal.PlainDateTime | null) => void
}

export const useCalendarField = ({
	autoFocus: autoFocusProp = false,
	min,
	max,
	value,
	locale = navigator.language,
	disabled = false,
	defaultValue = null,
	onChange
}: UseCalendarFieldOptions) => {
	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [open, setOpen] = useState(false)

	const [labelId, setLabelId] = useState<string>()

	const [selection, setSelection] = useControllableState({
		value,
		defaultValue,
		onChange
	})

	const highlightedSegmentRef = useRef<HTMLDivElement>(null)

	const [highlightedSegment, setHighlightedSegment] =
		useState<Temporal.DateTimeUnit>(() => 'day')

	return {
		min,
		max,
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
