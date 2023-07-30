import type { Meta } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarGrid } from './CalendarGrid'
import { CalendarDays } from './CalendarDays'
import { CalendarDay } from './CalendarDay'
import { CalendarTitle } from './CalendarTitle'
import { CalendarButton } from './CalendarButton'
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
				{(date) => (
					<CalendarDay
						key={date.format()}
						date={date}
						className={classes.day}
					>
						{date.getDay()}
					</CalendarDay>
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
				{(date) => (
					<CalendarDay
						key={date.format()}
						date={date}
						className={classes.day}
					>
						{date.getDay()}
					</CalendarDay>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Navigation = () => (
	<Calendar className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action="year-1" className={classes.button}>
					«
				</CalendarButton>
				<CalendarButton action="month-1" className={classes.button}>
					‹
				</CalendarButton>
				<CalendarButton action="today" className={classes.button}>
					•
				</CalendarButton>
				<CalendarButton action="month+1" className={classes.button}>
					›
				</CalendarButton>
				<CalendarButton action="year+1" className={classes.button}>
					»
				</CalendarButton>
			</div>
		</div>

		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{(date) => (
					<CalendarDay
						key={date.format()}
						date={date}
						className={classes.day}
					>
						{date.getDay()}
					</CalendarDay>
				)}
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
					{(date) => (
						<CalendarDay
							key={date.format()}
							date={date}
							className={classes.day}
						>
							{date.getDay()}
						</CalendarDay>
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
				{(date) => (
					<CalendarDay
						key={date.format()}
						date={date}
						className={classes.dayWithOverflowVisible}
					>
						{date.getDay()}
					</CalendarDay>
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
				{(date) => (
					<CalendarDay
						key={date.getTime()}
						date={date}
						className={classes.day}
					>
						{date.getDay()}
					</CalendarDay>
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
				{(date) => (
					<CalendarDay
						key={date.format()}
						date={date}
						disabled={date.isWeekend()}
						className={classes.day}
					>
						{date.getDay()}
					</CalendarDay>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)

export const Localization = () => (
	<Calendar locale="en-US" className={classes.calendar}>
		<CalendarTitle className={classes.title} />
		<CalendarGrid className={classes.grid}>
			<CalendarDays>
				{(date) => (
					<CalendarDay
						key={date.getTime()}
						date={date}
						className={classes.day}
					>
						{date.getDay()}
					</CalendarDay>
				)}
			</CalendarDays>
		</CalendarGrid>
	</Calendar>
)
