import { PopoverContent, type PopoverContentProps } from '@klnjs/popover'

export type CalendarFieldPopoverProps = PopoverContentProps

export const CalendarFieldPopover = ({ placement = 'bottom-start', ...otherProps }: CalendarFieldPopoverProps) => (
	<PopoverContent placement={placement} {...otherProps} />
)
