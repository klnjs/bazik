import { useRef } from 'react'
import { useId } from '../core'
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

	const elements = {
		label: { id: useId() },
		field: { ref: useRef<HTMLDivElement>(null) }
	}

	return {
		state,
		config,
		elements
	}
}
