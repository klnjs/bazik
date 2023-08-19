import type { Meta } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarGrid } from './CalendarGrid'
import { CalendarDays } from './CalendarDays'
import { CalendarDay } from './CalendarDay'
import { CalendarTitle } from './CalendarTitle'
import { CalendarButton } from './CalendarButton'
import { CalendarWeekday } from './CalendarWeekday'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Basic = () => (
	<Calendar className={classes.calendar}>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toUTCString()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Range = () => (
	<Calendar range className={classes.calendar}>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toUTCString()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Disabled = () => (
	<Calendar disabled className={classes.calendar}>
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
	<Calendar className={classes.calendar}>
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
							<span className={classes.cell}>
								{date.getWeek()}
							</span>
						)
					}

					return <CalendarDay date={date} className={classes.day} />
				}}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Navigation = () => (
	<Calendar className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action="month-1" className={classes.button}>
					‹
				</CalendarButton>
				<CalendarButton action="month+1" className={classes.button}>
					›
				</CalendarButton>
			</div>
		</div>

		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay date={date} className={classes.day} />
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Localization = () => (
	<Calendar locale="en-US" className={classes.calendar}>
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

					return (
						<CalendarDay
							key={date.toUTCString()}
							date={date}
							className={classes.day}
						/>
					)
				}}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const MinAndMax = () => {
	const today = new Date()

	const min = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 3
	)

	const max = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		today.getDate()
	)

	return (
		<Calendar min={min} max={max} className={classes.calendar}>
			<CalendarTitle className={classes.title} />
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ date }) => (
						<CalendarDay
							key={date.toUTCString()}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</Calendar>
	)
}

export const OverflowVisible = () => (
	<Calendar className={classes.calendar}>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.toUTCString()}
						date={date}
						className={classes.dayWithOverflowVisible}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const WeekdayHeaders = () => (
	<Calendar className={classes.calendar}>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date }) => (
					<CalendarDay
						key={date.getTime()}
						date={date}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const WeekendDisabled = () => (
	<Calendar className={classes.calendar}>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{({ date, locale }) => (
					<CalendarDay
						key={date.toUTCString()}
						date={date}
						disabled={date.isWeekend(locale)}
						className={classes.day}
					/>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Schedule = () => {
	const createEventInThisMonth = (
		name: string,
		color: string,
		day: number
	) => {
		const today = new Date()

		return {
			name,
			color,
			date: new Date(today.getFullYear(), today.getMonth(), day)
		}
	}

	const events = [
		createEventInThisMonth('Party', 'lime', 1),
		createEventInThisMonth('Doctors', 'aqua', 4),
		createEventInThisMonth('Dentist', 'aqua', 12),
		createEventInThisMonth('Meeting', 'olive', 15),
		createEventInThisMonth('Car Inspection', 'purple', 22),
		createEventInThisMonth('Funeral', 'coral', 22),
		createEventInThisMonth('Birthday', 'crimson', 23)
	] as const

	return (
		<Calendar className={classes.calendar} style={{ width: 700 }}>
			<CalendarTitle className={classes.title} />
			<CalendarGrid className={classes.grid} style={{ gap: 0 }}>
				<CalendarDays>
					{({ date }) => (
						<div
							key={date.toUTCString()}
							style={{
								aspectRatio: '1 / 1',
								padding: 4,
								border: '1px solid grey',
								borderRadius: 4
							}}
						>
							<div style={{ fontSize: 12 }}>{date.getDay()}</div>
							{events
								.filter(
									(event) =>
										date.toDate().getFullYear() ===
											event.date.getFullYear() &&
										date.toDate().getMonth() ===
											event.date.getMonth() &&
										date.toDate().getDate() ===
											event.date.getDate()
								)
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
