import { forwardRef } from '../core'
import { PopoverContent, type PopoverContentProps } from '../popover'

export type CalendarFieldPopoverProps = PopoverContentProps

export const CalendarFieldPopover = forwardRef<
	'div',
	CalendarFieldPopoverProps
>((props, forwardedRef) => <PopoverContent ref={forwardedRef} {...props} />)
