import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: 'nextYear' | 'nextMonth' | 'prevYear' | 'prevMonth' }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	(props, forwardedRef) => {
		const [{ action }, otherProps] = splitProps(props, ['action'])
		const { state } = useCalendarContext()
		const onClick = () =>
			state.setDateVisible((date) => {
				if (action === 'nextMonth') {
					return date.calc({ month: 1 })
				}

				if (action === 'prevMonth') {
					return date.calc({ month: -1 })
				}

				if (action === 'nextYear') {
					return date.calc({ year: 1 })
				}

				return date.calc({ year: -1 })
			})

		return (
			<freya.button
				ref={forwardedRef}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
