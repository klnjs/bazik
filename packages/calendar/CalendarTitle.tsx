import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = AsChildComponentProps<'h2'>

export const CalendarTitle = forwardRef<'h2', CalendarTitleProps>(
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()

		return (
			<freya.h2 ref={forwardedRef} {...props}>
				{state.dateVisible.format(config.locale, {
					year: 'numeric',
					month: 'long'
				})}
			</freya.h2>
		)
	}
)
