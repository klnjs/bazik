import { forwardRef } from '../core'
import { Popover, type PopoverProps } from '../popover/Popover'
import { useCalendarContext } from './CalendarContext'

export type CalendarPopoverProps = PopoverProps

export const CalendarPopover = forwardRef<'div', CalendarPopoverProps>(
	(props, forwardedRef) => {
		const { state } = useCalendarContext()

		return (
			<Popover
				ref={forwardedRef}
				open={Boolean(state.anchor)}
				anchor={state.anchor}
				{...props}
			/>
		)
	}
)
