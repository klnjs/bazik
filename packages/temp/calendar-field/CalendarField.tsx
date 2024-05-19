import { poly, useChainHandler, type PolyProps } from '@klnjs/core'
import { usePopover, PopoverProvider, type UsePopoverOptions } from '@klnjs/popover'
import { CalendarFieldProvider } from './CalendarFieldContext'
import {
	useCalendarField,
	type UseCalendarFieldOptions
} from './useCalendarField'

export type CalendarFieldProps = PolyProps<
	'div',
	UseCalendarFieldOptions & Pick<UsePopoverOptions, 'onOpenChange'>
>

export const CalendarField = 
	(
		{
			autoFocus,
			min,
			max,
			value,
			locale,
			disabled,
			defaultValue,
			onChange,
			onOpenChange,
			...otherProps
		}: CalendarFieldProps
	) => {
		const field = useCalendarField({
			autoFocus,
			min,
			max,
			value,
			locale,
			disabled,
			defaultValue,
			onChange: useChainHandler(() => field.setOpen(false), onChange)
		})

		const popover = usePopover({
			open: field.open,
			onOpenChange: useChainHandler(field.setOpen, onOpenChange)
		})

		return (
			<CalendarFieldProvider value={field}>
				<PopoverProvider value={popover}>
					<poly.div
						role="group"
						{...otherProps}
					/>
				</PopoverProvider>
			</CalendarFieldProvider>
		)
	}

