import {
	useRef,
	useMemo,
	useEffect,
	useCallback,
	type KeyboardEvent
} from 'react'
import {
	freya,
	forwardRef,
	useMergeRefs,
	toData,
	isRTL,
	type CoreProps
} from '../core'
import {
	CalendarDate,
	type CalendarDateSegment,
	type CalendarDateSegmentStyle
} from './CalendarDate'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'

export type CalendarFieldSegmentProps = CoreProps<
	'div',
	{
		segment: CalendarDateSegment
		mode?: CalendarDateSegmentStyle
		disabled?: boolean
		placeholder?: string
	}
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>(
	(
		{
			mode = '2-digit',
			style,
			segment,
			disabled: disabledProp = false,
			placeholder = '-',
			...otherProps
		},
		forwardedRef
	) => {
		const {
			locale,
			disabled: disabledContext,
			labelId,
			minDate,
			maxDate,
			autoFocus,
			setAutoFocus,
			selected,
			setSelected,
			highlightedSegment,
			highlightedSegmentRef,
			setHighlightedSegment
		} = useCalendarFieldContext()
		const { names } = useCalendarLocalisation(locale)

		const isDisabled = disabledProp || disabledContext
		const isHighlighted = segment.type === highlightedSegment
		const isInvalid =
			Boolean(maxDate && selected && selected.isAfter(maxDate)) ||
			Boolean(minDate && selected && selected.isBefore(minDate))

		const ref = useRef<HTMLDivElement>(null)
		const refCallback = useMergeRefs(
			ref,
			isHighlighted ? highlightedSegmentRef : undefined,
			forwardedRef
		)

		const value = selected?.getSegment(type, mode).value ?? ''
		const valueText = selected?.format({
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		const max = useMemo(() => {
			switch (type) {
				case 'year':
					return 9999
				case 'month':
					return 12
				case 'day':
					return selected?.getDaysInMonth() ?? 31
				default:
					throw new Error('Invalid segment type')
			}
		}, [type, selectedDate])

		const length = useMemo(
			() => new CalendarDate(locale).getSegment(type, mode).value.length,
			[type, mode, locale]
		)

		const children = useMemo(
			() => (!value ? value.padStart(length, placeholder) : value),
			[value, length, placeholder]
		)

		const changeSegment = useCallback(
			(action: (prev: CalendarDate) => CalendarDate | null) => {
				if (!isDisabled) {
					setSelected((prev) =>
						action(prev ?? new CalendarDate(locale))
					)
				}
			},
			[locale, isDisabled, setSelected]
		)

		const changeFocusedSegment = useCallback(
			(action: 'next' | 'previous') => {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const found = findSegment(ref.current!, action)

				if (found !== undefined) {
					found.focus()
				}
			},
			[]
		)

		const handleFocus = useCallback(() => {
			setHighlightedSegment(type)
		}, [type, setHighlightedSegment])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'ArrowUp') {
					changeSegment((prev) => prev.add({ [type]: 1 }))
				}

				if (event.code === 'ArrowRight') {
					changeFocusedSegment('next')
				}

				if (event.code === 'ArrowDown') {
					changeSegment((prev) => prev.sub({ [type]: 1 }))
				}

				if (event.code === 'ArrowLeft') {
					changeFocusedSegment('previous')
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					changeSegment(() => null)
				}

				if (/[0-9]/.test(event.key)) {
					const pressed = Number(event.key)
					const intent = Number(`${value}${pressed}`)
					const next = max && intent <= max ? intent : pressed

					changeSegment((prev) => prev.set({ [type]: next }))

					if (String(next).length === length) {
						changeFocusedSegment('next')
					}
				}
			},
			[max, type, value, length, changeSegment, changeFocusedSegment]
		)

		useEffect(() => {
			if (isFocused && autoFocus) {
				setAutoFocus(false)
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [isFocused, autoFocus, setAutoFocus])

		return (
			<freya.div
				ref={refCallback}
				role="spinbutton"
				inputMode="numeric"
				autoCorrect="off"
				autoCapitalize="off"
				style={{
					width: `${length}ch`,
					caretColor: 'transparent',
					...style
				}}
				spellCheck={false}
				contentEditable={!isDisabled}
				tabIndex={isDisabled ? undefined : isFocused ? 0 : -1}
				suppressContentEditableWarning={true}
				data-length={toData(length)}
				data-segment={toData(type)}
				data-focused={toData(isFocused)}
				data-disabled={toData(isDisabled)}
				data-placeholder={toData(!value)}
				aria-label={names.of(type)}
				aria-labelledby={labelId}
				aria-valuemin={1}
				aria-valuemax={max}
				aria-valuenow={Number(value)}
				aria-valuetext={valueText ?? 'Empty'}
				aria-invalid={isInvalid}
				aria-disabled={isDisabled}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{children}
			</freya.div>
		)
	}
)

const findSegment = (element: HTMLElement, action: 'next' | 'previous') => {
	const direction = findDirection(element, action)

	// @ts-expect-error element not allowed to be null
	// eslint-disable-next-line no-param-reassign
	while ((element = element[`${direction}ElementSibling`]) !== null) {
		const data = element.dataset

		if (
			data.segment !== undefined &&
			data.segment !== 'literal' &&
			data.disabled === undefined
		) {
			return element
		}
	}
}

const findDirection = (element: HTMLElement, direction: 'next' | 'previous') =>
	isRTL(element) ? (direction === 'next' ? 'previous' : 'next') : direction
