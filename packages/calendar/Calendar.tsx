import type { Ref, ReactElement } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import { CalendarProvider } from './CalendarContext'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import { CalendarDate } from './CalendarDateTime'

export type CalendarProps<R extends boolean = false> = CoreProps<
	'div',
	UseCalendarOptions<R>
>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{
			autoFocus,
			min,
			max,
			range,
			value,
			locale,
			disabled,
			defaultValue,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		const field = useCalendarFieldContext({ strict: false })
		const calendar = useCalendar({
			autoFocus: field ? true : autoFocus,
			min: field?.min?.toDate() ?? min,
			max: field?.max?.toDate() ?? max,
			range: field ? false : range,
			value: field ? field.selection?.toDate() ?? null : value,
			locale: field?.locale ?? locale,
			disabled: field?.disabled ?? disabled,
			defaultValue: field ? undefined : defaultValue,
			onChange: field
				? (next: Date | null) => {
						field.setSelection((prev) =>
							new CalendarDate(prev).set({
								year: next?.getFullYear(),
								month: next ? next.getMonth() + 1 : undefined,
								day: next?.getDate()
							})
						)
				  }
				: onChange
		})

		return (
			<CalendarProvider value={{ ...calendar }}>
				<freya.div
					ref={forwardedRef}
					role="application"
					aria-labelledby={calendar.titleId}
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
) as <M extends boolean = false>(
	props: CalendarProps<M> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
