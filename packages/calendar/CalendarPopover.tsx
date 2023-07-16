import { chain, forwardRef } from '../core'
import { Popover, type PopoverProps } from '../popover/Popover'
import { useCalendarContext } from './CalendarContext'

export type CalendarPopoverProps = Partial<PopoverProps>

export const CalendarPopover = forwardRef<'div', CalendarPopoverProps>(
	({ onClose, ...otherProps }, forwardedRef) => {
		const { refs, state } = useCalendarContext()

		const handleClose = chain(onClose, () => {
			state.setOpen(false)
		})

		return (
			<Popover
				ref={forwardedRef}
				open={state.open}
				trap={true}
				anchor={refs.field.current}
				onClose={handleClose}
				{...otherProps}
			/>
		)
	}
)
