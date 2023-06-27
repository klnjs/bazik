import { useMemo } from 'react'
import { useControlledState } from '../core/useControlledState'

export type UseCalendarFieldStateOptions = {
	value?: Date
	defaultValue?: Date
}

export const useCalendarFieldState = ({
	value,
	defaultValue
}: UseCalendarFieldStateOptions) => {
	// const [visibleYear, setVisibleYear] = useState(0)
	// const [visibleMonth, setVisibleMonth] = useState(0)

	const [yearSegment, setYearSegment] = useControlledState(
		defaultValue?.getFullYear(),
		value?.getFullYear()
	)

	const [monthSegment, setMonthSegment] = useControlledState(
		defaultValue ? defaultValue.getMonth() + 1 : undefined,
		value ? value.getMonth() + 1 : undefined
	)

	const [daySegment, setDaySegment] = useControlledState(
		defaultValue?.getDate(),
		value?.getDate()
	)

	return useMemo(
		() => ({
			yearSegment,
			monthSegment,
			daySegment,
			setYearSegment,
			setMonthSegment,
			setDaySegment
		}),
		[
			yearSegment,
			monthSegment,
			daySegment,
			setYearSegment,
			setMonthSegment,
			setDaySegment
		]
	)
}
