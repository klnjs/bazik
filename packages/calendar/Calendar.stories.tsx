import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarGrid } from './CalendarGrid'
import { CalendarDays } from './CalendarDays'
import { CalendarDay } from './CalendarDay'
import { CalendarTitle } from './CalendarTitle'
import { CalendarHeader } from './CalendarHeader'
import { CalendarButton } from './CalendarButton'
import { CalendarWeek } from './CalendarWeek'
import { CalendarWeekday } from './CalendarWeekday'
import {
	getToday,
	toEndOfMonth,
	toStartOfMonth,
	type CalendarDate
} from './CalendarDate'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Basic = () => (
	<Calendar autoFocus className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toString()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Range = () => (
	<Calendar range className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toString()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Disabled = () => (
	<Calendar disabled className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay date={date} className={classes.day} />
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Weekinfo = () => (
	<Calendar className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.gridWithWeekInfo}>
			<CalendarDays weekday={true} weeknumber={true}>
				{({ role, date }) => {
					if (role === 'blank') {
						return <span />
					}

					if (role === 'weekday') {
						return (
							<CalendarWeekday
								date={date}
								className={classes.cell}
							/>
						)
					}

					if (role === 'week') {
						return (
							<CalendarWeek
								date={date}
								className={classes.cell}
							/>
						)
					}

					return <CalendarDay date={date} className={classes.day} />
				}}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Overflow = () => (
	<Calendar className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						date={date}
						className={classes.dayWithOverflowVisible}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Readonly = () => (
	<Calendar readOnly className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toString()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Autofocus = () => (
	<Calendar autoFocus className={classes.calendar} aria-label="Event Date">
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toString()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Controlled = () => {
	const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(() =>
		getToday()
	)

	return (
		<Calendar
			value={selectedDate}
			onChange={setSelectedDate}
			className={classes.calendar}
			aria-label="Event Date"
		>
			<CalendarTitle className={classes.title} />
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ date }) => (
						<CalendarDay
							key={date.toString()}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</Calendar>
	)
}

export const Navigation = () => (
	<Calendar className={classes.calendar} aria-label="Event Date">
		<CalendarHeader className={classes.header}>
			<CalendarButton action="month-1" className={classes.button}>
				‹
			</CalendarButton>
			<CalendarTitle className={classes.title} />
			<CalendarButton action="month+1" className={classes.button}>
				›
			</CalendarButton>
		</CalendarHeader>

		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay date={date} className={classes.day} />
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Boundaries = () => {
	const today = getToday()
	const min = toStartOfMonth(today).add({ days: 1 })
	const max = toEndOfMonth(today).subtract({ days: 1 })

	return (
		<Calendar
			min={min}
			max={max}
			className={classes.calendar}
			aria-label="Event Date"
		>
			<CalendarTitle className={classes.title} />
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ date }) => (
						<CalendarDay date={date} className={classes.day} />
					)}
				</CalendarDays>
			</CalendarGrid>
		</Calendar>
	)
}

export const Localization = () => (
	<Calendar
		locale="en-US"
		className={classes.calendar}
		aria-label="Event Date"
	>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays weekday={true}>
				{({ role, date }) => {
					if (role === 'weekday') {
						return (
							<CalendarWeekday
								date={date}
								className={classes.cell}
							/>
						)
					}

					return <CalendarDay date={date} className={classes.day} />
				}}
			</CalendarDays>
		</CalendarGrid>
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
			<CalendarTitle className={classes.title} />
			<CalendarGrid className={classes.grid} style={{ gap: 0 }}>
				<CalendarDays>
					{({ date }) => (
						<div
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
				</CalendarDays>
			</CalendarGrid>
		</Calendar>
	)
}
