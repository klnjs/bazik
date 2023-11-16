import { useState } from 'react'
import type { Meta } from '@storybook/react'
import clsx from 'clsx'
import {
	Story,
	Controls,
	ButtonGroup,
	Switch
} from '../../.storybook/components'
import { Calendar } from './Calendar'
import { CalendarDay } from './CalendarDay'
import { CalendarCell } from './CalendarCell'
import { CalendarGrid } from './CalendarGrid'
import { CalendarTitle } from './CalendarTitle'
import { CalendarHeader } from './CalendarHeader'
import { CalendarShift } from './CalendarShift'
import { getToday, toEndOfMonth, toStartOfMonth } from './calendar-functions'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Display = () => {
	const [weeks, setWeeks] = useState(true)
	const [weekdays, setWeekdays] = useState(true)
	const [overflow, setOverflow] = useState(true)

	return (
		<Story>
			<Controls>
				<Switch
					checked={weekdays}
					label="Weekdays"
					onChange={setWeekdays}
				/>
				<Switch checked={weeks} label="Weeks" onChange={setWeeks} />
				<Switch
					checked={overflow}
					label="Overflow"
					onChange={setOverflow}
				/>
			</Controls>

			<Calendar aria-label="Event" className={classes.calendar}>
				<CalendarHeader className={classes.header}>
					<CalendarShift action="sub" className={classes.button} />
					<CalendarTitle className={classes.title} />
					<CalendarShift action="add" className={classes.button} />
				</CalendarHeader>
				<CalendarGrid
					weeks={weeks}
					weekdays={weekdays}
					className={weeks ? classes.gridWithWeeks : classes.grid}
				>
					{({ key, role, date }) => (
						<CalendarCell
							key={key}
							role={role}
							date={date}
							className={clsx(classes[role], {
								[classes.overflow]: overflow
							})}
						/>
					)}
				</CalendarGrid>
			</Calendar>
		</Story>
	)
}

export const Selection = () => {
	const selects = ['one', 'many', 'range'] as const
	const selectToReadable = (select: string) =>
		select.charAt(0).toUpperCase() + select.slice(1)
	const [select, setSelect] = useState<(typeof selects)[number]>(selects[0])
	const [readOnly, setReadOnly] = useState(false)
	const [disabled, setDisabled] = useState(false)

	return (
		<Story>
			<Controls>
				<ButtonGroup
					value={select}
					options={selects}
					optionToString={selectToReadable}
					onChange={setSelect}
				/>

				<Switch
					checked={disabled}
					label="Disabled"
					onChange={setDisabled}
				/>

				<Switch
					checked={readOnly}
					label="Read Only"
					onChange={setReadOnly}
				/>
			</Controls>

			<Calendar
				select={select}
				readOnly={readOnly}
				disabled={disabled}
				aria-label="Event"
				className={classes.calendar}
			>
				<CalendarHeader className={classes.header}>
					<CalendarShift action="sub" className={classes.button} />
					<CalendarTitle className={classes.title} />
					<CalendarShift
						action="add"
						months={2}
						className={classes.button}
					/>
				</CalendarHeader>
				<CalendarGrid className={classes.grid}>
					{({ key, date }) => (
						<CalendarDay
							key={key}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarGrid>
			</Calendar>
		</Story>
	)
}

export const Localisation = () => {
	const locales = ['en-GB', 'en-US', 'ar-SA', 'th', 'ja'] as const
	const localeToRegion = (locale: string) =>
		new Intl.DisplayNames('en', { type: 'language' })
			.of(locale)
			?.replaceAll(' English', '') ?? locale

	const [locale, setLocale] = useState<(typeof locales)[number]>(locales[0])

	return (
		<Story>
			<Controls>
				<ButtonGroup
					value={locale}
					options={locales}
					optionToString={localeToRegion}
					onChange={setLocale}
				/>
			</Controls>

			<Calendar
				locale={locale}
				aria-label="Event"
				className={classes.calendar}
			>
				<CalendarHeader className={classes.header}>
					<CalendarShift action="sub" className={classes.button} />
					<CalendarTitle className={classes.title} />
					<CalendarShift action="add" className={classes.button} />
				</CalendarHeader>
				<CalendarGrid weekdays={true} className={classes.grid}>
					{({ key, date, role }) => (
						<CalendarCell
							key={key}
							role={role}
							date={date}
							className={classes[role]}
						/>
					)}
				</CalendarGrid>
			</Calendar>
		</Story>
	)
}

export const Calendars = () => {
	const calendars = [
		'gregory',
		'hebrew',
		'islamic',
		'chinese',
		'buddhist'
	] as const
	const calendarToReadable = (calendar: string) =>
		new Intl.DisplayNames('en', { type: 'calendar' })
			.of(calendar)
			?.replaceAll(' Calendar', '') ?? calendar

	const [calendar, setCalendar] = useState<(typeof calendars)[number]>(
		calendars[0]
	)

	return (
		<Story>
			<Controls>
				<ButtonGroup
					value={calendar}
					options={calendars}
					optionToString={calendarToReadable}
					onChange={setCalendar}
				/>
			</Controls>

			<Calendar
				calendar={calendar}
				aria-label="Event"
				className={classes.calendar}
			>
				<CalendarHeader className={classes.header}>
					<CalendarShift action="sub" className={classes.button} />
					<CalendarTitle className={classes.title} />
					<CalendarShift action="add" className={classes.button} />
				</CalendarHeader>
				<CalendarGrid weekdays={true} className={classes.grid}>
					{({ key, date, role }) => (
						<CalendarCell
							key={key}
							role={role}
							date={date}
							className={classes[role]}
						/>
					)}
				</CalendarGrid>
			</Calendar>
		</Story>
	)
}

export const Boundaries = () => {
	const today = getToday()
	const min = toStartOfMonth(today).add({ days: 1 })
	const max = toEndOfMonth(today).subtract({ days: 1 })

	return (
		<Calendar
			min={min}
			max={max}
			aria-label="Event"
			className={classes.calendar}
		>
			<CalendarHeader className={classes.header}>
				<CalendarShift action="sub" className={classes.button} />
				<CalendarTitle className={classes.title} />
				<CalendarShift action="add" className={classes.button} />
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				{({ key, date }) => (
					<CalendarDay
						key={key}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarGrid>
		</Calendar>
	)
}

export const Wide = () => (
	<Calendar
		select="range"
		months={3}
		autoFocus
		aria-label="Event"
		className={classes.calendar}
	>
		<CalendarHeader className={classes.header}>
			<CalendarShift action="sub" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarShift action="add" className={classes.button} />
		</CalendarHeader>
		<div className={classes.wide}>
			{[0, 1, 2].map((monthOffset) => (
				<CalendarGrid
					key={monthOffset}
					monthOffset={monthOffset}
					className={classes.grid}
				>
					{({ key, date }) => (
						<CalendarDay
							key={key}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarGrid>
			))}
		</div>
	</Calendar>
)

export const Schedule = () => {
	const createEventInThisMonth = (
		name: string,
		color: string,
		day: number
	) => ({
		name,
		color,
		date: getToday().with({ day })
	})

	const events = [
		createEventInThisMonth('Party', 'lime', 1),
		createEventInThisMonth('Doctors', 'aqua', 4),
		createEventInThisMonth('Dentist', 'aqua', 12),
		createEventInThisMonth('Meeting', 'olive', 15),
		createEventInThisMonth('Service', 'purple', 22),
		createEventInThisMonth('Funeral', 'coral', 22),
		createEventInThisMonth('Birthday', 'crimson', 23)
	] as const

	return (
		<Calendar
			className={classes.calendar}
			style={{ width: 700 }}
			aria-label="Schedule"
		>
			<CalendarHeader className={classes.header}>
				<CalendarShift action="sub" className={classes.button} />
				<CalendarTitle className={classes.title} />
				<CalendarShift action="add" className={classes.button} />
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				{({ key, date }) => (
					<div
						key={key}
						style={{
							aspectRatio: '1 / 1',
							padding: 4,
							border: '1px solid grey',
							borderRadius: 4
						}}
					>
						<div style={{ fontSize: 12 }}>{date.day}</div>
						{events
							.filter((event) => date.equals(event.date))
							.map((event) => (
								<div
									style={{
										background: event.color,
										borderRadius: 4,
										fontSize: 12,
										padding: 2
									}}
								>
									{event.name}
								</div>
							))}
					</div>
				)}
			</CalendarGrid>
		</Calendar>
	)
}
