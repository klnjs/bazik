import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTriggerProps = AsChildComponentProps<'button'>

export const CalendarTrigger = forwardRef<'button', CalendarTriggerProps>(
	(props, forwardedRef) => {
		const { state } = useCalendarContext()

		const handleClick = () => {
			state.setOpen((prev) => !prev)
		}

		return (
			<freya.button
				ref={forwardedRef}
				type='button'
				aria-haspopup='dialog'
				aria-expanded={state.open}
				// aria-controls={context.contentId}
				onClick={handleClick}
				{...props}
			/>
		)
	}
)
