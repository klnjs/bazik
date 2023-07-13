import type { MouseEvent } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTriggerProps = AsChildComponentProps<'button'>

export const CalendarTrigger = forwardRef<'button', CalendarTriggerProps>(
	(props, forwardedRef) => {
		const { state } = useCalendarContext()

		const handleClick = (event: MouseEvent) => {
			state.setAnchor((prev) =>
				prev ? undefined : (event.target as HTMLElement)
			)
		}

		return (
			<freya.button
				ref={forwardedRef}
				type='button'
				aria-haspopup='dialog'
				aria-expanded={Boolean(state.anchor)}
				// aria-controls={context.contentId}
				onClick={handleClick}
				{...props}
			/>
		)
	}
)
