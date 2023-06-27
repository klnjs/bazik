import { useMemo } from 'react'
import { useControlledState } from '../core/useControlledState'
import { isDateValid } from './calendarUtils'

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

	return useMemo(() => {
		const date = new Date(
			yearSegment as unknown as number,
			monthSegment as unknown as number,
			daySegment as unknown as number
		)

		return {
			date,
			dateIsValid: isDateValid(date),
			yearSegment,
			monthSegment,
			daySegment,
			setYearSegment,
			setMonthSegment,
			setDaySegment
		}
	}, [
		yearSegment,
		monthSegment,
		daySegment,
		setYearSegment,
		setMonthSegment,
		setDaySegment
	])
}
