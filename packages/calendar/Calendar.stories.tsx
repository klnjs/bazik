import type { Meta } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarDay } from './CalendarDay'
import { CalendarCell } from './CalendarCell'
import { CalendarGrid } from './CalendarGrid'
import { CalendarTitle } from './CalendarTitle'
import { CalendarHeader } from './CalendarHeader'
import { CalendarShift } from './CalendarShift'
import { getToday, toEndOfMonth, toStartOfMonth } from './useCalendarDateUtils'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Basic = () => (
	<Calendar select="one" aria-label="Event" className={classes.calendar}>
		<CalendarHeader className={classes.header}>
			<CalendarShift action="sub" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarShift action="add" months={2} className={classes.button} />
		</CalendarHeader>
		<CalendarGrid className={classes.grid}>
			{({ key, date }) => (
				<CalendarDay key={key} date={date} className={classes.day} />
			)}
		</CalendarGrid>
	</Calendar>
)

export const Multiple = () => (
	<Calendar select="many" aria-label="Event" className={classes.calendar}>
		<CalendarHeader className={classes.header}>
			<CalendarShift action="sub" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarShift action="add" className={classes.button} />
		</CalendarHeader>
		<CalendarGrid className={classes.grid}>
			{({ key, date }) => (
				<CalendarDay key={key} date={date} className={classes.day} />
			)}
		</CalendarGrid>
	</Calendar>
)

export const Range = () => (
	<Calendar select="range" aria-label="Event" className={classes.calendar}>
		<CalendarHeader className={classes.header}>
			<CalendarShift action="sub" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarShift action="add" className={classes.button} />
		</CalendarHeader>
		<CalendarGrid className={classes.grid}>
			{({ key, date }) => (
				<CalendarDay key={key} date={date} className={classes.day} />
			)}
		</CalendarGrid>
	</Calendar>
)

export const Weekinfo = () => (
	<Calendar aria-label="Event" className={classes.calendar}>
		<CalendarHeader className={classes.header}>
			<CalendarShift action="sub" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarShift action="add" className={classes.button} />
		</CalendarHeader>
		<CalendarGrid
			weeks={true}
			weekdays={true}
			className={classes.gridWithWeekInfo}
		>
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
)

export const Overflow = () => (
	<Calendar aria-label="Event" className={classes.calendar}>
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
					className={classes.dayWithOverflowVisible}
				/>
			)}
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

export const Localization = () => (
	<Calendar locale="en-US" aria-label="Event" className={classes.calendar}>
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
)

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
