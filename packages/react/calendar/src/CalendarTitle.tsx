import { Intl } from 'temporal-polyfill'
import { poly, type PolyProps } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = PolyProps<'h2'>

export const CalendarTitle = 
	({ children, ...otherProps }: CalendarTitleProps) => {
		const { locale, calendar, visibleRange } = useCalendarContext()

		const content =
			children ??
			new Intl.DateTimeFormat(locale, {
				calendar,
				year: 'numeric',
				month: 'long'
			}).formatRange(...visibleRange)

		return (
			<poly.h2 aria-live="polite" {...otherProps}>
				{content}
			</poly.h2>
		)
	}

