import { useMemo, useCallback, type KeyboardEvent } from 'react'
import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import { CalendarDate, type CalendarDateSegment } from './CalendarDate'

export type CalendarSegmentProps = AsChildComponentProps<
	'div',
	{
		step?: number
		mode?: 'numeric' | 'digit'
		label?: string
		segment: CalendarDateSegment
		placeholder?: string
	}
>

export const CalendarSegment = forwardRef<'div', CalendarSegmentProps>(
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()
		const [{ step = 1, mode, label, segment, placeholder }, otherProps] =
			splitProps(props, [
				'step',
				'mode',
				'label',
				'segment',
				'placeholder'
			])

		const min = CalendarDate[`${segment}Min`]
		const max = CalendarDate[`${segment}Max`]
		const value = state.date.get(segment)

		const content = useMemo(() => {
			if (value === undefined) {
				return placeholder ?? ''.padStart(String(max).length, '-')
			}

			if (mode === 'digit') {
				return String(value).padStart(String(max).length, '0')
			}

			return String(value)
		}, [max, mode, value, placeholder])

		const isHighlighted = state.dateSegment === segment

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.key !== 'Tab') {
					event.preventDefault()
				}

				if (event.key === 'ArrowUp') {
					state.setDate((prev) =>
						prev.clone({
							[segment]:
								value !== undefined
									? value + step
									: config.today.get(segment)
						})
					)
				}

				if (event.key === 'ArrowRight') {
					const element = findSegment(event.currentTarget, 'next')

					if (element !== undefined) {
						element.focus()
						state.setDateSegment(
							element.dataset.segment as CalendarDateSegment
						)
					}
				}

				if (event.key === 'ArrowDown') {
					state.setDate((prev) =>
						prev.clone({
							[segment]:
								value !== undefined
									? value - step
									: config.today.get(segment)
						})
					)
				}

				if (event.key === 'ArrowLeft') {
					const element = findSegment(event.currentTarget, 'previous')

					if (element !== undefined) {
						element.focus()
						state.setDateSegment(
							element.dataset.segment as CalendarDateSegment
						)
					}
				}

				if (event.key === 'Backspace' || event.key === 'Delete') {
					state.setDate((prev) =>
						prev.clone({
							[segment]: undefined
						})
					)
				}

				if (/[0-9]/.test(event.key)) {
					const valueString = String(value ?? '')
					const valueIntent = Number(valueString + event.key)
					const valueMutation =
						valueIntent <= max ? valueIntent : Number(event.key)

					state.setDate((prev) =>
						prev.clone({
							[segment]: valueMutation
						})
					)

					if (String(valueMutation).length === String(max).length) {
						const element = findSegment(event.currentTarget, 'next')

						if (element !== undefined) {
							element.focus()
							state.setDateSegment(
								element.dataset.segment as CalendarDateSegment
							)
						}
					}
				}
			},
			[max, step, value, state, config, segment]
		)

		return (
			<freya.div
				ref={forwardedRef}
				role='spinbutton'
				inputMode='numeric'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck={false}
				contentEditable={true}
				tabIndex={isHighlighted ? 0 : -1}
				suppressContentEditableWarning={true}
				style={{ caretColor: 'transparent' }}
				data-segment={segment}
				aria-label={label}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				onKeyDown={handleKeyDown}
				//'aria-invalid': invalid ? true : undefined,
				{...otherProps}
			>
				{content}
			</freya.div>
		)
	}
)

const findSegment = (element: Element, direction: 'next' | 'previous') => {
	let sibling = element[`${direction}ElementSibling`]

	while (sibling) {
		if (sibling.matches('[data-segment]')) {
			return sibling as HTMLElement
		}

		sibling = sibling[`${direction}ElementSibling`]
	}
}
