import { forwardRef } from '../core'
import { Popover, type PopoverProps } from '../popover/Popover'
import { useCalendarContext } from './CalendarContext'

export type CalendarPopoverProps = PopoverProps

export const CalendarPopover = forwardRef<'dialog', CalendarPopoverProps>(
	(props, forwardedRef) => {
		const { refs, state } = useCalendarContext()

		return (
			<Popover
				ref={forwardedRef}
				open={Boolean(state.anchor)}
				anchor={refs.fieldRef.current}
				{...props}
			/>
		)
	}
)