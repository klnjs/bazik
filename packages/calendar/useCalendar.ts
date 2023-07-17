import { useRef } from 'react'
import {
	useCalendarConfig,
	type UseCalendarConfigOptions
} from './useCalendarConfig'
import {
	useCalendarState,
	type UseCalendarStateOptions
} from './useCalendarState'

export type UseCalendarOptions = UseCalendarStateOptions &
	UseCalendarConfigOptions

export const useCalendar = ({
	min,
	max,
	value,
	locale = navigator.language,
	defaultValue,
	onChange
}: UseCalendarOptions) => {
	const config = useCalendarConfig({ min, max, locale })

	const state = useCalendarState({
		value,
		locale,
		defaultValue,
		defaultFocused: min ?? new Date(),
		onChange
	})

	const refs = {
		field: useRef<HTMLDivElement>(null)
	}

	return {
		refs,
		state,
		config
	}
}
