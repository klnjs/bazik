import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { useCalendarMonthContext } from './CalendarMonthContext'

export type CalendarTitleProps = CoreProps<'h2'>

export const CalendarTitle = forwardRef<'h2', CalendarTitleProps>(
	({ id: idProp, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()
		const month = useCalendarMonthContext()

		return (
			<freya.h2 ref={forwardedRef} aria-live="polite" {...otherProps}>
				{children ??
					month.toLocaleString(locale, {
						year: 'numeric',
						month: 'long'
					})}
			</freya.h2>
		)
	}
)
