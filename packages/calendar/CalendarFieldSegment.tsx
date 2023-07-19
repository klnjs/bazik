import { useMemo, useCallback, type KeyboardEvent } from 'react'
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
		placeholder?: string
	}
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>(
	(
		{ type, mode = '2-digit', style, placeholder = '-', ...otherProps },
		forwardedRef
	) => {
		const {
			locale,
			labelId,
			minDate,
			maxDate,
			segmentRef,
			selectedDate,
			setSelectedDate,
			focusedSegment,
			setFocusedSegment
		} = useCalendarFieldContext()

		const isAfter = Boolean(
			maxDate && selectedDate && selectedDate.isAfter(maxDate)
		)
		const isBefore = Boolean(
			minDate && selectedDate && selectedDate.isBefore(minDate)
		)
		const isInvalid = isAfter || isBefore
		const isHighlighted = focusedSegment === type

		const localisation = useCalendarLocalisation(locale)
		const length = useMemo(
			() => new CalendarDate(locale).getSegment(type, mode).value.length,
			[locale, type, mode]
		)

		const value = selectedDate?.get(type)
		const valueText = selectedDate?.format({
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		const children = useMemo(() => {
			if (selectedDate === null) {
				return ''.padStart(length, placeholder)
			}

			return selectedDate.getSegment(type, mode).value
		}, [mode, type, length, placeholder, selectedDate])

		const changeSegment = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: (prev: CalendarDate) => CalendarDate | null
			) => {
				event.preventDefault()
				setSelectedDate((prev) =>
					action(prev ?? new CalendarDate(locale))
				)
			},
			[locale, setSelectedDate]
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

		const handleClick = useCallback(() => {
			setFocusedSegment(type)
		}, [type, setFocusedSegment])

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
					const now = String(value ?? '')
					const press = Number(event.key)
					const intent = Number(`${now}${press}`)
					const next = intent <= 31 ? intent : press

					changeSegment(event, (prev) => prev.set({ [type]: next }))

					if (String(next).length === length) {
						changeFocusedSegment(event, 'next')
					}
				}
			},
			[type, value, length, changeSegment, changeFocusedSegment]
		)

		useForwardedRef(segmentRef, forwardedRef)

		return (
			<freya.div
				ref={isHighlighted ? segmentRef : forwardedRef}
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
				contentEditable={true}
				tabIndex={isHighlighted ? 0 : -1}
				suppressContentEditableWarning={true}
				// data-length={length} This would be really usefull for CSS width: 'attr(data-length ch)',
				data-segment={type}
				data-placeholder={!value ? '' : undefined}
				aria-label={localisation.of(type)}
				aria-labelledby={labelId}
				// aria-valuemin={min}
				// aria-valuemax={max}
				aria-valuenow={value}
				aria-valuetext={valueText ?? 'Empty'}
				aria-invalid={isInvalid}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{children}
			</freya.div>
		)
	}
)

const findSegment = (element: Element, direction: 'next' | 'previous') => {
	// @ts-expect-error element not allowed to be null
	// eslint-disable-next-line no-cond-assign, no-param-reassign
	while ((element = element[`${direction}ElementSibling`]) !== null) {
		if (element.matches('[data-segment]')) {
			return element as HTMLElement
		}
	}
}
