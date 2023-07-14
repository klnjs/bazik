import { useRef } from 'react'
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
	const state = useCalendarState({
		locale,
		value,
		valueVisible: min,
		defaultValue,
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
