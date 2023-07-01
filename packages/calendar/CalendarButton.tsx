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
				// eslint-disable-next-line default-case
				switch (action) {
					case 'prevYear':
						return date.sub({ year: 1 })
					case 'prevMonth':
						return date.sub({ month: 1 })
					case 'nextMonth':
						return date.add({ month: 1 })
					case 'nextYear':
						return date.add({ year: 1 })
				}
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
