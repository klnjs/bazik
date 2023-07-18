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
						key={date.format('da')}
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

export const CalendarWithMinMax = () => {
	const today = new Date()

	const min = new Date(
		today.getFullYear(),
		today.getMonth() - 1,
		today.getDate()
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
					<CalendarButton action='year-1' className={classes.button}>
						«
					</CalendarButton>
					<CalendarButton action='month-1' className={classes.button}>
						‹
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
							key={date.format('da')}
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
							action='year-1'
							className={classes.button}
						>
							«
						</CalendarButton>
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
						<CalendarButton
							action='year+1'
							className={classes.button}
						>
							»
						</CalendarButton>
					</div>
				</div>

				<div className={classes.grid}>
					<CalendarDays>
						{(date) => (
							<CalendarDay
								key={date.format('da')}
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
