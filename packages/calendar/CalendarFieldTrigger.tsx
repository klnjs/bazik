import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { CalendarDate } from './CalendarDate'

export type CalendarFieldTriggerProps = AsChildComponentProps<'button'>

export const CalendarFieldTrigger = forwardRef<
	'button',
	CalendarFieldTriggerProps
>((props, forwardedRef) => {
	const { open, selectedDate, setOpen, setFocusedDate } =
		useCalendarFieldContext()

	const handleClick = () => {
		setOpen((prev) => !prev)
		setFocusedDate(selectedDate ?? new CalendarDate(), true)
	}

	return (
		<freya.button
			ref={forwardedRef}
			type='button'
			aria-haspopup='dialog'
			aria-expanded={open}
			onClick={handleClick}
			{...props}
		/>
	)
})
