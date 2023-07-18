import type { Meta } from '@storybook/react'
import { Calendar as CalendarComponent } from './Calendar'
import { CalendarField as CalendarFieldComponent } from './CalendarField'
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
	component: CalendarComponent
} satisfies Meta<typeof Calendar>

export const Calendar = () => (
	<CalendarComponent className={classes.calendar}>
		<div className={classes.header}>
			<CalendarTitle className={classes.title} />

			<div className={classes.nav}>
				<CalendarButton action='year-1' className={classes.button}>
					«
				</CalendarButton>
				<CalendarButton action='month-1' className={classes.button}>
					{'<'}
				</CalendarButton>
				<CalendarButton action='month+1' className={classes.button}>
					{'>'}
				</CalendarButton>
				<CalendarButton action='year+1' className={classes.button}>
					≫
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
	</CalendarComponent>
)

export const CalendarField = () => (
	<CalendarFieldComponent className={classes.field}>
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
	</CalendarFieldComponent>
)

export const CalendarFieldWithPopover = () => (
	<CalendarFieldComponent className={classes.field}>
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
				<CalendarFieldTrigger>🗓</CalendarFieldTrigger>
			</div>
		</CalendarFieldAnchor>
		<CalendarFieldPopover className={classes.popover}>
			<CalendarComponent className={classes.calendar}>
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
			</CalendarComponent>
		</CalendarFieldPopover>
	</CalendarFieldComponent>
)
