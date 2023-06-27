import { useMemo } from 'react'
import { useCalendarFieldSegment } from './useCalendarFieldSegment'
import { getDaysInMonth } from './calendarUtils'

export type UseCalendarFieldOptions = {
	value?: Date
	defaultValue?: Date
}

export const useCalendarField = ({
	value,
	defaultValue
}: UseCalendarFieldOptions) => {
	const yearProps = useCalendarFieldSegment({
		min: 1,
		max: 9999,
		value: value?.getFullYear(),
		label: 'Year',
		placeholder: 'yyyy',
		defaultValue: defaultValue?.getFullYear()
	})

	const monthProps = useCalendarFieldSegment({
		min: 1,
		max: 12,
		value: value ? value.getMonth() + 1 : undefined,
		label: 'Month',
		placeholder: 'mm',
		defaultValue: defaultValue ? defaultValue.getMonth() + 1 : undefined
	})

	const dayProps = useCalendarFieldSegment({
		min: 1,
		max:
			yearProps['aria-valuenow'] !== undefined &&
			monthProps['aria-valuenow'] !== undefined
				? getDaysInMonth(
						yearProps['aria-valuenow'],
						monthProps['aria-valuenow']
				  )
				: 31,
		value: value?.getDate(),
		label: 'Day',
		placeholder: 'dd',
		defaultValue: defaultValue?.getDate()
	})

	return useMemo(
		() => ({
			rootProps: { role: 'group' },
			yearProps,
			monthProps,
			dayProps
		}),
		[yearProps, monthProps, dayProps]
	)
}
