import { Temporal } from 'temporal-polyfill'

export type CalendarFieldDateTime = Temporal.PlainDateTime

export const getNow = () => Temporal.Now.plainDateTimeISO()

export const isAfter = (
	datetime: CalendarFieldDateTime,
	subject: CalendarFieldDateTime
) => Temporal.PlainDateTime.compare(datetime, subject) === 1

export const isBefore = (
	datetime: CalendarFieldDateTime,
	subject: CalendarFieldDateTime
) => Temporal.PlainDateTime.compare(datetime, subject) === -1
