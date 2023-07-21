import {
	useMemo,
	useCallback,
	type MouseEvent,
	type KeyboardEvent,
	type FocusEvent
} from 'react'
import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import {
	CalendarDate,
	type CalendarDateSegmentStyle,
	type CalendarDateSegmentTypeEditable
} from './CalendarDate'

export type CalendarFieldSegmentProps = AsChildComponentProps<
	'div',
	{
		type: CalendarDateSegmentTypeEditable
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
			type,
			mode = '2-digit',
			style,
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
			segmentRef,
			selectedDate,
			setSelectedDate,
			focusedSegment,
			setFocusedSegment
		} = useCalendarFieldContext()

		const isDisabled = disabledProp || disabledContext
		const isFocused = focusedSegment === type
		const isInvalid =
			Boolean(maxDate && selectedDate && selectedDate.isAfter(maxDate)) ||
			Boolean(minDate && selectedDate && selectedDate.isBefore(minDate))

		const ref = useForwardedRef(forwardedRef, segmentRef)
		const value = selectedDate?.getSegment(type, mode).value ?? ''
		const valueText = selectedDate?.format({
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		const localisation = useCalendarLocalisation(locale)
		const length = useMemo(
			() => new CalendarDate(locale).getSegment(type, mode).value.length,
			[locale, type, mode]
		)

		const children = useMemo(
			() => value.padStart(length, placeholder),
			[value, length, placeholder]
		)

		const changeSegment = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: (prev: CalendarDate) => CalendarDate | null
			) => {
				event.preventDefault()

				if (!isDisabled) {
					setSelectedDate((prev) =>
						action(prev ?? new CalendarDate(locale))
					)
				}
			},
			[locale, isDisabled, setSelectedDate]
		)

		const changeFocusedSegment = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: 'next' | 'previous'
			) => {
				event.preventDefault()
				const element = findSegment(event.currentTarget, action)

				if (element !== undefined) {
					element.focus()
					setFocusedSegment(
						element.dataset
							.segment as CalendarDateSegmentTypeEditable
					)
				}
			},
			[setFocusedSegment]
		)

		const handleFocus = useCallback(
			(event: FocusEvent<HTMLDivElement>) => {
				event.preventDefault()

				if (!isDisabled) {
					setFocusedSegment(type)
				}
			},
			[type, isDisabled, setFocusedSegment]
		)

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code === 'ArrowUp') {
					changeSegment(event, (prev) => prev.add({ [type]: 1 }))
				}

				if (event.code === 'ArrowRight') {
					changeFocusedSegment(event, 'next')
				}

				if (event.code === 'ArrowDown') {
					changeSegment(event, (prev) => prev.sub({ [type]: 1 }))
				}

				if (event.code === 'ArrowLeft') {
					changeFocusedSegment(event, 'previous')
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					changeSegment(event, () => null)
				}

				if (/[0-9]/.test(event.key)) {
					const press = Number(event.key)
					const intent = Number(`${value}${press}`)
					const next = intent <= 31 ? intent : press

					changeSegment(event, (prev) => prev.set({ [type]: next }))

					if (String(next).length === length) {
						changeFocusedSegment(event, 'next')
					}
				}
			},
			[type, value, length, changeSegment, changeFocusedSegment]
		)

		return (
			<freya.div
				ref={ref}
				role='spinbutton'
				inputMode='numeric'
				autoCorrect='off'
				autoCapitalize='off'
				style={{
					width: `${length}ch`,
					caretColor: 'transparent',
					...style
				}}
				spellCheck={false}
				contentEditable={!isDisabled}
				tabIndex={isDisabled ? undefined : isFocused ? 0 : -1}
				suppressContentEditableWarning={true}
				data-length={length}
				data-segment={type}
				data-focused={isFocused ? '' : undefined}
				data-disabled={isDisabled ? '' : undefined}
				data-placeholder={!value ? '' : undefined}
				aria-label={localisation.of(type)}
				aria-labelledby={labelId}
				// aria-valuemin={min}
				// aria-valuemax={max}
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

const findSegment = (element: HTMLElement, direction: 'next' | 'previous') => {
	// @ts-expect-error element not allowed to be null
	// eslint-disable-next-line no-cond-assign, no-param-reassign
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
