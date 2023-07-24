import { useState } from 'react'
import { freya, forwardRef, chain, type CoreProps } from '../core'
import { usePopover, PopoverProvider, type UsePopoverOptions } from '../popover'
import { CalendarFieldProvider } from './CalendarFieldContext'
import {
	useCalendarField,
	type UseCalendarFieldOptions
} from './useCalendarField'

export type CalendarFieldProps = CoreProps<
	'div',
	UseCalendarFieldOptions &
		Pick<UsePopoverOptions, 'offset' | 'placement' | 'onOpenChange'>
>

export const CalendarField = forwardRef<'div', CalendarFieldProps>(
	(
		{
			autoFocus,
			min,
			max,
			value,
			offset,
			locale,
			disabled,
			placement = 'bottom-start',
			defaultValue,
			onChange,
			onOpenChange,
			...otherProps
		},
		forwardedRef
	) => {
		const [open, setOpen] = useState(false)

		const field = useCalendarField({
			autoFocus,
			min,
			max,
			value,
			locale,
			disabled,
			defaultValue,
			onChange: chain(() => setOpen(false), onChange)
		})

		const popover = usePopover({
			open,
			offset,
			placement,
			onOpenChange: chain(field.setAutoFocus, setOpen, onOpenChange)
		})

		return (
			<CalendarFieldProvider value={field}>
				<PopoverProvider value={popover}>
					<freya.div
						ref={forwardedRef}
						role='group'
						{...otherProps}
					/>
				</PopoverProvider>
			</CalendarFieldProvider>
		)
	}
)
