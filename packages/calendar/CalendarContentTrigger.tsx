import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarContentTriggerProps = AsChildComponentProps<
	'button',
	{ direction: 'inc' | 'dec' }
>

export const CalendarContentTrigger = forwardRef<
	'button',
	CalendarContentTriggerProps
>((props, forwardedRef) => {
	const [{ direction }, otherProps] = splitProps(props, ['direction'])
	const { state } = useCalendarContext()
	const onClick = () =>
		state.setDateVisible((date) => {
			if (direction === 'inc') {
				return date.add({ month: 1 })
			}

			return date.subtract({ month: 1 })
		})

	return <freya.button ref={forwardedRef} onClick={onClick} {...otherProps} />
})
