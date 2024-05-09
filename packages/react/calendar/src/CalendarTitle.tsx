import { Intl } from 'temporal-polyfill'
import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = CoreProps<'h2'>

export const CalendarTitle = forwardRef<'h2', CalendarTitleProps>(
	({ children, ...otherProps }, forwardedRef) => {
		const { locale, calendar, visibleRange } = useCalendarContext()

		return (
			<poly.h2 ref={forwardedRef} aria-live="polite" {...otherProps}>
				{children ??
					new Intl.DateTimeFormat(locale, {
						calendar,
						year: 'numeric',
						month: 'long'
					}).formatRange(...visibleRange)}
			</poly.h2>
		)
	}
)
