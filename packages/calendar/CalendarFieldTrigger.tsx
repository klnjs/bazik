import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldTriggerProps = AsChildComponentProps<'button'>

export const CalendarFieldTrigger = forwardRef<
	'button',
	CalendarFieldTriggerProps
>((props, forwardedRef) => {
	const { open, setOpen } = useCalendarFieldContext()

	const handleClick = () => {
		setOpen((prev) => !prev)
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
