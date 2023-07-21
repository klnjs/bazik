import type { Meta } from '@storybook/react'
import { Calendar as CalendarRoot } from './Calendar'
import { CalendarField as CalendarFieldRoot } from './CalendarField'
import { CalendarDay } from './CalendarDay'
import { CalendarDays } from './CalendarDays'
import { CalendarButton } from './CalendarButton'
import { CalendarTitle } from './CalendarTitle'
import { CalendarFieldLabel } from './CalendarFieldLabel'
import { CalendarFieldSegments } from './CalendarFieldSegments'
import { CalendarFieldSegment } from './CalendarFieldSegment'
import { CalendarFieldLiteral } from './CalendarFieldLiteral'
import { CalendarFieldTrigger } from './CalendarFieldTrigger'
import { CalendarFieldPopover } from './CalendarFieldPopover'
import { CalendarFieldAnchor } from './CalendarFieldAnchor'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: CalendarRoot
} satisfies Meta<typeof Calendar>

export const Calendar = () => (
	<CalendarRoot autoFocus={true} className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />
		</div>

		<div className={classes.grid}>
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
		</div>
	</CalendarRoot>
)

export const CalendarWithNavigation = () => (
	<CalendarRoot className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action='year-1' className={classes.button}>
					«
				</CalendarButton>
				<CalendarButton action='month-1' className={classes.button}>
					‹
				</CalendarButton>
				<CalendarButton action='today' className={classes.button}>
					·
				</CalendarButton>
				<CalendarButton action='month+1' className={classes.button}>
					›
				</CalendarButton>
				<CalendarButton action='year+1' className={classes.button}>
					»
				</CalendarButton>
			</div>
		</div>

		<div className={classes.grid}>
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
		</div>
	</CalendarRoot>
)

export const CalendarWithWeekdays = () => (
	<CalendarRoot className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action='month-1' className={classes.button}>
					‹
				</CalendarButton>
				<CalendarButton action='month+1' className={classes.button}>
					›
				</CalendarButton>
			</div>
		</div>

		<div className={classes.grid}>
			<CalendarDays rows={1}>
				{(date) => (
					<div key={date.getTime()} className={classes.weekday}>
						{date.format({ weekday: 'short' })}
					</div>
				)}
			</CalendarDays>
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
		</div>
	</CalendarRoot>
)

export const CalendarWithBoundaries = () => {
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
		<CalendarRoot min={min} max={max} className={classes.calendar}>
			<div className={classes.header}>
				<CalendarTitle className={classes.title} />

				<div className={classes.nav}>
					<CalendarButton action='month-1' className={classes.button}>
						‹
					</CalendarButton>
					<CalendarButton action='month+1' className={classes.button}>
						›
					</CalendarButton>
				</div>
			</div>

			<div className={classes.grid}>
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
			</div>
		</CalendarRoot>
	)
}

export const CalendarWithDisabled = () => (
	<CalendarRoot className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action='month-1' className={classes.button}>
					‹
				</CalendarButton>

				<CalendarButton action='month+1' className={classes.button}>
					›
				</CalendarButton>
			</div>
		</div>

		<div className={classes.grid}>
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
		</div>
	</CalendarRoot>
)

export const CalendarWithOverflow = () => (
	<CalendarRoot className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action='month-1' className={classes.button}>
					‹
				</CalendarButton>
				<CalendarButton action='month+1' className={classes.button}>
					›
				</CalendarButton>
			</div>
		</div>

		<div className={classes.grid}>
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
		</div>
	</CalendarRoot>
)

export const CalendarWithoutWeekend = () => (
	<CalendarRoot className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action='month-1' className={classes.button}>
					‹
				</CalendarButton>
				<CalendarButton action='month+1' className={classes.button}>
					›
				</CalendarButton>
			</div>
		</div>

		<div className={classes.gridWithoutWeekend}>
			<CalendarDays exclude={(date) => !date.isWeekend()}>
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
		</div>
	</CalendarRoot>
)

export const CalendarField = () => (
	<CalendarFieldRoot className={classes.field}>
		<CalendarFieldLabel>Date</CalendarFieldLabel>
		<div className={classes.input}>
			<CalendarFieldSegments>
				{(segment, index) =>
					segment.type === 'literal' ? (
						<CalendarFieldLiteral key={index}>
							{segment.value}
						</CalendarFieldLiteral>
					) : (
						<CalendarFieldSegment
							key={segment.type}
							type={segment.type}
							className={classes.segment}
						/>
					)
				}
			</CalendarFieldSegments>
		</div>
	</CalendarFieldRoot>
)

export const CalendarFieldWithPopover = () => (
	<CalendarFieldRoot className={classes.field}>
		<CalendarFieldLabel>Date</CalendarFieldLabel>
		<CalendarFieldAnchor className={classes.anchor}>
			<div className={classes.input}>
				<CalendarFieldSegments>
					{(segment, index) =>
						segment.type === 'literal' ? (
							<CalendarFieldLiteral key={index}>
								{segment.value}
							</CalendarFieldLiteral>
						) : (
							<CalendarFieldSegment
								key={segment.type}
								type={segment.type}
								className={classes.segment}
							/>
						)
					}
				</CalendarFieldSegments>
				<CalendarFieldTrigger className={classes.button}>
					🗓
				</CalendarFieldTrigger>
			</div>
		</CalendarFieldAnchor>
		<CalendarFieldPopover className={classes.popover}>
			<CalendarRoot className={classes.calendar}>
				<div className={classes.header}>
					<CalendarTitle className={classes.title} />

					<div className={classes.nav}>
						<CalendarButton
							action='month-1'
							className={classes.button}
						>
							‹
						</CalendarButton>
						<CalendarButton
							action='month+1'
							className={classes.button}
						>
							›
						</CalendarButton>
					</div>
				</div>

				<div className={classes.grid}>
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
				</div>
			</CalendarRoot>
		</CalendarFieldPopover>
	</CalendarFieldRoot>
)

export const CalendarFieldWithoutYear = () => (
	<CalendarFieldRoot className={classes.field}>
		<CalendarFieldLabel>Date</CalendarFieldLabel>
		<div className={classes.input}>
			<CalendarFieldSegments exclude={['year']}>
				{(segment, index) =>
					segment.type === 'literal' ? (
						<CalendarFieldLiteral key={index}>
							{segment.value}
						</CalendarFieldLiteral>
					) : (
						<CalendarFieldSegment
							key={segment.type}
							type={segment.type}
							className={classes.segment}
						/>
					)
				}
			</CalendarFieldSegments>
		</div>
	</CalendarFieldRoot>
)

export const CalendarFieldWithoutLiterals = () => (
	<CalendarFieldRoot className={classes.field}>
		<CalendarFieldLabel>Date</CalendarFieldLabel>
		<div className={classes.input}>
			<CalendarFieldSegments exclude={['literal']}>
				{(segment) => (
					<CalendarFieldSegment
						key={segment.type}
						type={segment.type}
						className={classes.segment}
					/>
				)}
			</CalendarFieldSegments>
		</div>
	</CalendarFieldRoot>
)
