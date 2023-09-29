import type { Ref, ReactElement } from 'react'
import { freya, forwardRef, type CoreProps, type Assign } from '../core'
import { useFocusWithin } from '../focus/useFocusWithin'
// import { useCalendarFieldContext } from './CalendarFieldContext'
import { CalendarProvider } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps = CoreProps<'div', UseCalendarOptions>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{
			autoFocus,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			readOnly,
			select,
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
			select,
			readOnly,
			value,
			onChange
		} as UseCalendarOptions)

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
) as <S extends 'single' | 'multiple' | 'range' = 'single'>(
	props: Assign<
		CalendarProps,
		{
			select?: S
			value?:
				| null
				| (S extends 'single'
						? CalendarDate
						: S extends 'multiple'
						? CalendarDate[]
						: S extends 'range'
						? [CalendarDate, CalendarDate]
						: never)
			defaultValue?:
				| null
				| (S extends 'single'
						? CalendarDate
						: S extends 'multiple'
						? CalendarDate[]
						: S extends 'range'
						? [CalendarDate, CalendarDate]
						: never)
			onChange?: (
				value:
					| null
					| (S extends 'single'
							? CalendarDate
							: S extends 'multiple'
							? CalendarDate[]
							: S extends 'range'
							? [CalendarDate, CalendarDate]
							: never)
			) => void
			ref?: Ref<HTMLDivElement>
		}
	>
) => ReactElement
