import { useMemo } from 'react'
import { isRange } from '../core'
import {
	CalendarDate,
	type CalendarDateRange,
	type DateRange
} from './CalendarDate'

export function toCalendarDate(value: Date): CalendarDate
export function toCalendarDate(
	value: Date | undefined
): CalendarDate | undefined
export function toCalendarDate(value: DateRange): CalendarDateRange
export function toCalendarDate(
	value: DateRange | undefined
): CalendarDateRange | undefined
export function toCalendarDate(
	value: Date | DateRange | null | undefined
): CalendarDate | CalendarDateRange | null | undefined
export function toCalendarDate(value: Date | DateRange | null | undefined) {
	if (value instanceof Date) {
		return new CalendarDate(value)
	}

	if (isRange(value)) {
		return value.map((v) => new CalendarDate(v))
	}

	return value
}

export function toDate(value: CalendarDate): Date
export function toDate(value: CalendarDate | undefined): Date | null
export function toDate(value: CalendarDateRange): DateRange
export function toDate(value: CalendarDateRange | undefined): DateRange | null
export function toDate(
	value: CalendarDate | CalendarDateRange | null | undefined
): Date | DateRange | null
export function toDate(
	value: CalendarDate | CalendarDateRange | null | undefined
) {
	if (value instanceof CalendarDate) {
		return value.toDate()
	}

	if (isRange(value)) {
		return value.map((v) => v.toDate())
	}

	return null
}

export function useCalendarValue(value: null): null
export function useCalendarValue(value: undefined): undefined
export function useCalendarValue(value: Date): CalendarDate
export function useCalendarValue(
	value: Date | undefined
): CalendarDate | undefined
export function useCalendarValue(value: DateRange): CalendarDateRange
export function useCalendarValue(
	value: DateRange | undefined
): CalendarDateRange | undefined
export function useCalendarValue(
	value: Date | DateRange | null | undefined
): CalendarDate | CalendarDateRange | null | undefined
export function useCalendarValue(value: Date | DateRange | null | undefined) {
	return useMemo(() => toCalendarDate(value), [value])
}
