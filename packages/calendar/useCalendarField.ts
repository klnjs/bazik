import {
	useCalendarFieldConfig,
	type UseCalendarFieldConfigOptions
} from './useCalendarFieldConfig'
import {
	useCalendarFieldState,
	type UseCalendarFieldStateOptions
} from './useCalendarFieldState'

export type UseCalendarFieldOptions = UseCalendarFieldConfigOptions &
	UseCalendarFieldStateOptions

export const useCalendarField = ({
	min,
	max,
	value,
	defaultValue,
	onChange
}: UseCalendarFieldOptions) => {
	const config = useCalendarFieldConfig({ min, max })
	const state = useCalendarFieldState({ value, defaultValue, onChange })

	return {
		state,
		config
	}
}
