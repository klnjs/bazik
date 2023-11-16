import { Intl } from 'temporal-polyfill'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = CoreProps<'h2'>

export const CalendarTitle = forwardRef<'h2', CalendarTitleProps>(
	({ children, ...otherProps }, forwardedRef) => {
		const { locale, visibleRange } = useCalendarContext()

		return (
			<freya.h2 ref={forwardedRef} aria-live="polite" {...otherProps}>
				{children ??
					new Intl.DateTimeFormat(locale, {
						year: 'numeric',
						month: 'long'
					}).formatRange(...visibleRange)}
			</freya.h2>
		)
	}
)
