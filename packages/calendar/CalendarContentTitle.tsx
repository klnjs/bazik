import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarContentTitleProps = AsChildComponentProps<'h2'>

export const CalendarContentTitle = forwardRef<'h2', CalendarContentTitleProps>(
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()

		return (
			<freya.h2 ref={forwardedRef} {...props}>
				{state.dateVisible.toLocaleString(config.locale, {
					year: 'numeric',
					month: 'long'
				})}
			</freya.h2>
		)
	}
)
