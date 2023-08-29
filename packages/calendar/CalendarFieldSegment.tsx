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
		variant?: CalendarDateSegmentStyle
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
			style,
			segment,
			variant: variantProp,
			disabled: disabledProp = false,
			placeholder = '-',
			...otherProps
		},
		forwardedRef
	) => {
		const {
			min: minDate,
			max: maxDate,
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
		const { type } = segment

		const isDisabled = disabledProp || disabledContext
		const isHighlighted = type === highlightedSegment
		const isInvalid =
			Boolean(maxDate && selection && selection.isAfter(maxDate)) ||
			Boolean(minDate && selection && selection.isBefore(minDate))

		const ref = useRef<HTMLDivElement>(null)
		const refCallback = useMergeRefs(
			ref,
			isHighlighted ? highlightedSegmentRef : undefined,
			forwardedRef
		)

		const now = selection?.getSegment(locale, type).value

		const min = useMemo(() => {
			if (type === 'hour' || type === 'minute') {
				return 0
			}

			return 1
		}, [type])

		const max = useMemo(() => {
			switch (type) {
				case 'year':
					return 9999
				case 'month':
					return 12
				case 'day':
					return selection?.getDaysInMonth() ?? 31
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
				selection?.format(locale, {
					year: 'numeric',
					month: 'long',
					weekday: 'long',
					day: 'numeric'
				}),
			[locale, selection]
		)

		const variant = useMemo(() => {
			if (variantProp) {
				return variantProp
			}

			return type === 'year' ? 'numeric' : '2-digit'
		}, [type, variantProp])

		const length = useMemo(
			() => new CalendarDate().getSegmentLength(locale, type, variant),
			[type, variant, locale]
		)

		console.log(type, length, variant)

		const content = useMemo(() => {
			const padding = now === undefined ? placeholder : '0'
			const current = now === undefined ? '' : now.toString()

			return current.padStart(length, padding)
		}, [now, length, placeholder])

		const changeSegment = useCallback(
			(action: (prev: CalendarDate) => CalendarDate | null) => {
				if (!isDisabled) {
					setSelection((prev) => action(prev ?? new CalendarDate()))
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
					const intent = Number(`${now}${pressed}`)
					const next = max && intent <= max ? intent : pressed

					changeSegment((prev) => prev.set({ [type]: next }))

					if (String(next).length === length) {
						changeFocusedSegment('next')
					}
				}
			},
			[now, max, type, length, changeSegment, changeFocusedSegment]
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
			<freya.div
				ref={refCallback}
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
				data-length={toData(length)}
				data-segment={toData(type)}
				data-disabled={toData(isDisabled)}
				data-placeholder={toData(now === undefined)}
				data-highlighted={toData(isHighlighted)}
				aria-label={names.of(type)}
				aria-labelledby={labelId}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={now}
				aria-valuetext={text ?? 'Empty'}
				aria-invalid={isInvalid}
				aria-disabled={isDisabled}
				onFocus={handleFocus}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{content}
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
