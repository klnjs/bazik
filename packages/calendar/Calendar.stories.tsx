import type { Meta } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarButton } from './CalendarButton'
import { CalendarDay } from './CalendarDay'
import { CalendarDays } from './CalendarDays'
import { CalendarDaysItem } from './CalendarDaysItem'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { CalendarMonth } from './CalendarMonth'
import { CalendarTitle } from './CalendarTitle'
import { getToday, toEndOfMonth, toStartOfMonth } from './useCalendarTemporal'
import * as classes from './Calendar.stories.css'
import { CalendarMonths } from './CalendarMonths'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Basic = () => (
	<Calendar aria-label="Event Date" className={classes.calendar}>
		<CalendarMonth className={classes.month}>
			<CalendarHeader className={classes.header}>
				<CalendarTitle className={classes.title} />
				<CalendarButton
					action="previous"
					segment="month"
					className={classes.button}
				>
					‹
				</CalendarButton>
				<CalendarButton
					action="next"
					segment="month"
					className={classes.button}
				>
					›
				</CalendarButton>
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ key, date }) => (
						<CalendarDay
							key={key}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</CalendarMonth>
	</Calendar>
)

export const Multiple = () => (
	<Calendar select="many" aria-label="Span" className={classes.calendar}>
		<CalendarMonth className={classes.month}>
			<CalendarHeader className={classes.header}>
				<CalendarTitle className={classes.title} />
				<CalendarButton
					action="previous"
					segment="month"
					className={classes.button}
				>
					‹
				</CalendarButton>
				<CalendarButton
					action="next"
					segment="month"
					className={classes.button}
				>
					›
				</CalendarButton>
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ key, date }) => (
						<CalendarDay
							key={key}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</CalendarMonth>
	</Calendar>
)

export const Range = () => (
	<Calendar select="range" aria-label="Span" className={classes.calendar}>
		<CalendarMonth className={classes.month}>
			<CalendarHeader className={classes.header}>
				<CalendarTitle className={classes.title} />
				<CalendarButton
					action="previous"
					segment="month"
					className={classes.button}
				>
					‹
				</CalendarButton>
				<CalendarButton
					action="next"
					segment="month"
					className={classes.button}
				>
					›
				</CalendarButton>
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ key, date }) => (
						<CalendarDay
							key={key}
							date={date}
							className={classes.day}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</CalendarMonth>
	</Calendar>
)

export const Weekinfo = () => (
	<Calendar aria-label="Event Date" className={classes.calendar}>
		<CalendarMonth className={classes.month}>
			<CalendarHeader className={classes.header}>
				<CalendarTitle className={classes.titleWide} />
			</CalendarHeader>
			<CalendarGrid className={classes.gridWithWeekInfo}>
				<CalendarDays week={true} weekday={true}>
					{({ key, date, role }) => (
						<CalendarDaysItem
							key={key}
							role={role}
							date={date}
							className={classes[role]}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</CalendarMonth>
	</Calendar>
)

export const Overflow = () => (
	<Calendar aria-label="Event Date" className={classes.calendar}>
		<CalendarMonth className={classes.month}>
			<CalendarHeader className={classes.header}>
				<CalendarTitle className={classes.titleWide} />
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				<CalendarDays>
					{({ key, date }) => (
						<CalendarDay
							key={key}
							date={date}
							className={classes.dayWithOverflowVisible}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</CalendarMonth>
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
			aria-label="Event Date"
			className={classes.calendar}
		>
			<CalendarMonth className={classes.month}>
				<CalendarHeader className={classes.header}>
					<CalendarTitle className={classes.title} />
					<CalendarButton
						action="previous"
						segment="month"
						className={classes.button}
					>
						‹
					</CalendarButton>
					<CalendarButton
						action="next"
						segment="month"
						className={classes.button}
					>
						›
					</CalendarButton>
				</CalendarHeader>
				<CalendarGrid className={classes.grid}>
					<CalendarDays>
						{({ key, date }) => (
							<CalendarDay
								key={key}
								date={date}
								className={classes.day}
							/>
						)}
					</CalendarDays>
				</CalendarGrid>
			</CalendarMonth>
		</Calendar>
	)
}

export const Localization = () => (
	<Calendar
		locale="en-US"
		aria-label="Event Date"
		className={classes.calendar}
	>
		<CalendarMonth className={classes.month}>
			<CalendarHeader className={classes.header}>
				<CalendarTitle className={classes.titleWide} />
			</CalendarHeader>
			<CalendarGrid className={classes.grid}>
				<CalendarDays weekday={true}>
					{({ key, date, role }) => (
						<CalendarDaysItem
							key={key}
							role={role}
							date={date}
							className={classes[role]}
						/>
					)}
				</CalendarDays>
			</CalendarGrid>
		</CalendarMonth>
	</Calendar>
)

export const Wide = () => (
	<Calendar
		select="range"
		months={3}
		autoFocus
		aria-label="Event Date"
		className={classes.calendarWide}
	>
		<CalendarButton
			action="previous"
			segment="month"
			className={classes.buttonWidePrevious}
		>
			‹
		</CalendarButton>
		<CalendarButton
			action="next"
			segment="month"
			className={classes.buttonWideNext}
		>
			›
		</CalendarButton>
		<CalendarMonths>
			{({ key: keyMonth, year, month }) => (
				<CalendarMonth
					key={keyMonth}
					year={year}
					month={month}
					className={classes.month}
				>
					<CalendarHeader className={classes.headerWide}>
						<CalendarTitle className={classes.titleWide} />
					</CalendarHeader>
					<CalendarGrid className={classes.grid}>
						<CalendarDays>
							{({ key: keyDay, date }) => (
								<CalendarDay
									key={keyDay}
									date={date}
									className={classes.day}
								/>
							)}
						</CalendarDays>
					</CalendarGrid>
				</CalendarMonth>
			)}
		</CalendarMonths>
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
			<CalendarMonth style={{ gap: 0 }}>
				<CalendarTitle className={classes.title} />
				<CalendarGrid className={classes.grid}>
					<CalendarDays>
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
					</CalendarDays>
				</CalendarGrid>
			</CalendarMonth>
		</Calendar>
	)
}
