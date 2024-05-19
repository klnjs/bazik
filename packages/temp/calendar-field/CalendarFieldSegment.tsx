import {
	useRef,
	useMemo,
	useEffect,
	useCallback,
	type KeyboardEvent
} from 'react'
import type { Temporal } from 'temporal-polyfill'
import { useCalendarLocalisation } from '../calendar/useCalendarLocalisation'
import {
	poly,
	forwardRef,
	useMergeRefs,
	asDataProp,
	type CoreProps
} from '@klnjs/core'
import {
	isRTL
} from '@klnjs/assertion'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { getNow, isAfter, isBefore } from './CalendarFieldDateTime'

export const calendarFieldSegmentTypes = [
	'year',
	'month',
	'day',
	'hour',
	'minute'
] as const

export type CalendarFieldSegmentType =
	(typeof calendarFieldSegmentTypes)[number]

export type CalendarFieldSegmentProps = CoreProps<
	'div',
	{
		type: CalendarFieldSegmentType
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
			style,
			disabled: disabledProp = false,
			placeholder = '-',
			...otherProps
		},
		forwardedRef
	) => {
		const {
			min,
			max,
			locale,
			disabled: disabledContext,
			labelId,
			autoFocus,
			setAutoFocus,
			selection,
			setSelection,
			highlightedSegment,
			highlightedSegmentRef,
			setHighlightedSegment
		} = useCalendarFieldContext()
		const { names } = useCalendarLocalisation(locale)

		const isDisabled = disabledProp || disabledContext
		const isHighlighted = type === highlightedSegment
		const isInvalid =
			Boolean(min && selection && isBefore(selection, min)) ||
			Boolean(max && selection && isAfter(selection, max))

		const ref = useRef<HTMLDivElement>(null)
		const refComposed = useMergeRefs(
			ref,
			isHighlighted ? highlightedSegmentRef : undefined,
			forwardedRef
		)

		const now = selection?.[type]

		const low = useMemo(() => {
			if (type === 'hour' || type === 'minute') {
				return 0
			}

			return 1
		}, [type])

		const high = useMemo(() => {
			switch (type) {
				case 'year':
					return 9999
				case 'month':
					return 12
				case 'day':
					return selection?.daysInMonth ?? 31
				case 'hour':
					return 23
				case 'minute':
					return 59
				default:
					throw new Error('Invalid segment type')
			}
		}, [type, selection])

		const text = useMemo(
			() =>
				selection?.toLocaleString(locale, {
					year: 'numeric',
					month: 'long',
					weekday: 'long',
					day: 'numeric'
				}),
			[locale, selection]
		)

		const length = useMemo(() => Math.floor(Math.log10(high)) + 1, [high])

		const content = useMemo(() => {
			const padding = now === undefined ? placeholder : '0'
			const current = now === undefined ? '' : now.toString()

			return current.padStart(length, padding)
		}, [now, length, placeholder])

		const changeSegment = useCallback(
			(
				action: (
					prev: Temporal.PlainDateTime
				) => Temporal.PlainDateTime | null
			) => {
				if (!isDisabled) {
					setSelection((prev) => action(prev ?? getNow()))
				}
			},
			[isDisabled, setSelection]
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
					changeSegment((prev) =>
						prev.add({ [typeToPlural(type)]: 1 })
					)
				}

				if (event.code === 'ArrowRight') {
					changeFocusedSegment('next')
				}

				if (event.code === 'ArrowDown') {
					changeSegment((prev) =>
						prev.subtract({ [typeToPlural(type)]: 1 })
					)
				}

				if (event.code === 'ArrowLeft') {
					changeFocusedSegment('previous')
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					changeSegment(() => null)
				}

				if (/[0-9]/.test(event.key)) {
					const pressed = Number(event.key)
					const intent = Number(`${now}${pressed}`)
					const next = high && intent <= high ? intent : pressed

					changeSegment((prev) => prev.with({ [type]: next }))

					if (String(next).length === length) {
						changeFocusedSegment('next')
					}
				}
			},
			[type, now, high, length, changeSegment, changeFocusedSegment]
		)

		useEffect(() => {
			if (isHighlighted && autoFocus) {
				setAutoFocus(false)
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [isHighlighted, autoFocus, setAutoFocus])

		return (
			<poly.div
				ref={refComposed}
				role="spinbutton"
				inputMode="numeric"
				autoCorrect="off"
				autoCapitalize="off"
				style={{
					width: `${content.length}ch`,
					caretColor: 'transparent',
					...style
				}}
				spellCheck={false}
				contentEditable={!isDisabled}
				tabIndex={isDisabled ? undefined : isHighlighted ? 0 : -1}
				suppressContentEditableWarning={true}
				data-length={asDataProp(length)}
				data-segment={asDataProp(type)}
				data-disabled={asDataProp(isDisabled)}
				data-placeholder={asDataProp(now === undefined)}
				data-highlighted={asDataProp(isHighlighted)}
				aria-label={names.of(type)}
				aria-labelledby={labelId}
				aria-valuenow={now}
				aria-valuemin={low}
				aria-valuemax={high}
				aria-valuetext={text ?? 'Empty'}
				aria-invalid={isInvalid}
				aria-disabled={isDisabled}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{content}
			</poly.div>
		)
	}
)

const findSegment = (element: HTMLElement, action: 'next' | 'previous') => {
	const direction = isRTL(element)
		? action === 'next'
			? 'previous'
			: 'next'
		: action

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

const typeToPlural = (type: CalendarFieldSegmentType): `${typeof type}s` =>
	`${type}s`
