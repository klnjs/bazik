import { forwardRef } from '../core'
import { PopoverContent, type PopoverContentProps } from '../popover'

export type CalendarFieldPopoverProps = PopoverContentProps

export const CalendarFieldPopover = forwardRef<
	'div',
	CalendarFieldPopoverProps
>(({ placement = 'bottom-start', ...otherProps }, forwardedRef) => (
	<PopoverContent ref={forwardedRef} placement={placement} {...otherProps} />
))
