import type { Ref, ReactElement } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import { useFocusWithin } from '../focus/useFocusWithin'
import { CalendarProvider } from './CalendarContext'
// import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
export type CalendarProps<R extends boolean = false> = CoreProps<
	'div',
	UseCalendarOptions<R>
>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{
			autoFocus,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			range,
			readOnly,
			value,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		// const field = useCalendarFieldContext({ strict: false })
		// const calendar = useCalendar({
		// 	autoFocus: field ? true : autoFocus,
		// 	min: field?.min?.toDate() ?? min,
		// 	max: field?.max?.toDate() ?? max,
		// 	range: field ? false : range,
		// 	value: field ? field.selection?.toDate() ?? null : value,
		// 	locale: field?.locale ?? locale,
		// 	disabled: field?.disabled ?? disabled,
		// 	defaultValue: field ? undefined : defaultValue,
		// 	onChange: field
		// 		? (next: Date | null) => {
		// 				field.setSelection((prev) =>
		// 					new DateTime(prev).set({
		// 						year: next?.getFullYear(),
		// 						month: next ? next.getMonth() + 1 : undefined,
		// 						day: next?.getDate()
		// 					})
		// 				)
		// 		  }
		// 		: onChange
		// })

		const calendar = useCalendar({
			autoFocus,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			range,
			readOnly,
			value,
			onChange
		})

		const { onFocus, onBlur } = useFocusWithin({
			onFocusEnter: () => calendar.setFocusWithin(true),
			onFocusLeave: () => calendar.setFocusWithin(false)
		})

		return (
			<CalendarProvider value={{ ...calendar }}>
				<freya.div
					ref={forwardedRef}
					role="application"
					aria-readonly={readOnly}
					onBlur={onBlur}
					onFocus={onFocus}
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
) as <R extends boolean = false>(
	props: CalendarProps<R> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
