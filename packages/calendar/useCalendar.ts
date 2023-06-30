import {
	useCalendarConfig,
	type UseCalendarConfigOptions
} from './useCalendarConfig'
import {
	useCalendarState,
	type UseCalendarStateOptions
} from './useCalendarState'

export type UseCalendarOptions = UseCalendarConfigOptions &
	UseCalendarStateOptions

export const useCalendar = ({
	min,
	max,
	value,
	locale,
	defaultValue,
	onChange
}: UseCalendarOptions) => {
	const config = useCalendarConfig({ min, max, locale })
	const state = useCalendarState({ value, defaultValue, onChange })

	return {
		state,
		config
	}
}
