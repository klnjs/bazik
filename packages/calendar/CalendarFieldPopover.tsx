import { chain, forwardRef } from '../core'
import { Popover, type PopoverProps } from '../popover/Popover'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldPopoverProps = Partial<PopoverProps>

export const CalendarFieldPopover = forwardRef<
	'div',
	CalendarFieldPopoverProps
>(({ onClose, ...otherProps }, forwardedRef) => {
	const { anchorRef, open, setOpen } = useCalendarFieldContext()

	const handleClose = chain(onClose, () => {
		setOpen(false)
	})

	return (
		<Popover
			ref={forwardedRef}
			open={open}
			trap={true}
			anchor={anchorRef.current}
			onClose={handleClose}
			{...otherProps}
		/>
	)
})
