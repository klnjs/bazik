import { useState, type SetStateAction, type Dispatch } from 'react'
import { Temporal } from 'temporal-polyfill'
import type { Meta } from '@storybook/react'
import {
	Calendar,
	CalendarDay,
	CalendarCell,
	CalendarGrid,
	CalendarTitle,
	CalendarHeader,
	CalendarShift
} from '@klnjs/calendar'
import clsx from 'clsx'
import { Story, ButtonGroup, Switch, TextField } from '../components'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Display = () => {
	const [weeks, setWeeks] = useState(true)
	const [weekdays, setWeekdays] = useState(true)
	const [overflow, setOverflow] = useState(true)
	const [readOnly, setReadOnly] = useState(false)
	const [disabled, setDisabled] = useState(false)

	return (
		<Story
			controls={[
				<Switch
					checked={weekdays}
					label="Weekdays"
					onChange={setWeekdays}
				/>,
				<Switch checked={weeks} label="Weeks" onChange={setWeeks} />,
				<Switch
					checked={overflow}
					label="Overflow"
					onChange={setOverflow}
				/>,
				<Switch
					checked={disabled}
					label="Disabled"
					onChange={setDisabled}
				/>,
				<Switch
					checked={readOnly}
					label="Read Only"
					onChange={setReadOnly}
				/>
			]}
		>
			<Calendar
				aria-label="Event"
				readOnly={readOnly}
				disabled={disabled}
				className={classes.calendar}
			>
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

	const [minS, setMinS] = useState<string>('')
	const [maxS, setMaxS] = useState<string>('')

	const min =
		minS && minS.length === 10 ? Temporal.PlainDate.from(minS) : undefined

	const max =
		maxS && maxS.length === 10 ? Temporal.PlainDate.from(maxS) : undefined

	const setToday = (callback: Dispatch<SetStateAction<string>>) => () =>
		callback(Temporal.Now.plainDateISO().toString())

	return (
		<Story
			controls={[
				<ButtonGroup
					value={select}
					label="Select"
					options={selects}
					optionToString={selectToReadable}
					onChange={setSelect}
				/>,
				<TextField
					value={minS}
					label="Min"
					action="Set"
					placeholder="YYYY-MM-DD"
					onChange={setMinS}
					onAction={setToday(setMinS)}
				/>,
				<TextField
					value={maxS}
					label="Max"
					action="Set"
					placeholder="YYYY-MM-DD"
					onChange={setMaxS}
					onAction={setToday(setMaxS)}
				/>
			]}
		>
			<Calendar
				select={select}
				min={min ? Temporal.PlainDate.from(min) : undefined}
				max={max ? Temporal.PlainDate.from(max) : undefined}
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
		</Story>
	)
}

export const Localisation = () => {
	const calendars = ['gregory', 'hebrew', 'islamic'] as const
	const calendarToReadable = (calendar: string) =>
		new Intl.DisplayNames('en', { type: 'calendar' })
			.of(calendar)
			?.replaceAll(' Calendar', '') ?? calendar

	const [calendar, setCalendar] = useState<(typeof calendars)[number]>(
		calendars[0]
	)

	const locales = ['en-US', 'en-GB', 'ja'] as const
	const localeToReadable = (locale: string) =>
		new Intl.DisplayNames('en', { type: 'language' })
			.of(locale)
			?.replaceAll(' English', '') ?? locale

	const [locale, setLocale] = useState<(typeof locales)[number]>(locales[0])

	return (
		<Story
			controls={[
				<ButtonGroup
					value={locale}
					label="Language"
					options={locales}
					optionToString={localeToReadable}
					onChange={setLocale}
				/>,
				<ButtonGroup
					value={calendar}
					label="Calendar"
					options={calendars}
					optionToString={calendarToReadable}
					onChange={setCalendar}
				/>
			]}
		>
			<Calendar
				locale={locale}
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

export const Wide = () => {
	const [months, setMonths] = useState('2')
	const monthsAsNumber = Number.parseInt(months, 10)
	const monthsAsColumns = Math.min(3, monthsAsNumber)

	return (
		<Story
			direction="column"
			controls={[
				<TextField
					type="number"
					label="Months"
					value={months}
					onChange={setMonths}
				/>
			]}
		>
			<Calendar
				select="range"
				months={monthsAsNumber}
				aria-label="Event"
				className={classes.calendar}
			>
				<CalendarHeader className={classes.header}>
					<CalendarShift action="sub" className={classes.button} />
					<CalendarTitle className={classes.title} />
					<CalendarShift action="add" className={classes.button} />
				</CalendarHeader>
				<div
					className={classes.wide}
					style={{
						gridTemplateColumns: `repeat(${monthsAsColumns}, 1fr)`
					}}
				>
					{[...Array(monthsAsNumber).keys()].map((monthOffset) => (
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
		</Story>
	)
}