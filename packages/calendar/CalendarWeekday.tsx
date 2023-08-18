import { freya, forwardRef, type CoreProps } from '../core'
import type { CalendarDate } from './CalendarDate'

export type CalendarTitleProps = CoreProps<'abbr', { date: CalendarDate }>

export const CalendarWeekday = forwardRef<'abbr', CalendarTitleProps>(
	({ date, children, ...otherProps }, forwardedRef) => (
		<freya.abbr
			ref={forwardedRef}
			title={date.format({ weekday: 'long' })}
			{...otherProps}
		>
			{children ?? date.format({ weekday: 'short' })}
		</freya.abbr>
	)
)
