import type { Meta } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarField } from './CalendarField'
import { CalendarDay } from './CalendarDay'
import { CalendarDays } from './CalendarDays'
import { CalendarGrid } from './CalendarGrid'
import { CalendarTitle } from './CalendarTitle'
import { CalendarButton } from './CalendarButton'
import { CalendarFieldLabel } from './CalendarFieldLabel'
import { CalendarFieldInput } from './CalendarFieldInput'
import { CalendarFieldAnchor } from './CalendarFieldAnchor'
import { CalendarFieldSegments } from './CalendarFieldSegments'
import { CalendarFieldSegment } from './CalendarFieldSegment'
import { CalendarFieldLiteral } from './CalendarFieldLiteral'
import { CalendarFieldTrigger } from './CalendarFieldTrigger'
import { CalendarFieldPopover } from './CalendarFieldPopover'
import * as classes from './CalendarField.stories.css'

export default {
	title: 'CalendarField',
	component: CalendarField
} satisfies Meta<typeof CalendarField>

export const Basic = () => (
	<CalendarField className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldInput className={classes.input}>
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
		</CalendarFieldInput>
	</CalendarField>
)

export const Disabled = () => (
	<CalendarField disabled className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldInput className={classes.input}>
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
		</CalendarFieldInput>
	</CalendarField>
)

export const Picker = () => (
	<CalendarField className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldAnchor className={classes.anchor}>
			<CalendarFieldInput className={classes.input}>
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
			</CalendarFieldInput>
			<CalendarFieldTrigger className={classes.trigger}>
				🗓
			</CalendarFieldTrigger>
		</CalendarFieldAnchor>
		<CalendarFieldPopover className={classes.popover}>
			<Calendar className={classes.calendar}>
				<div className={classes.header}>
					<CalendarTitle className={classes.title} />

					<div className={classes.nav}>
						<CalendarButton
							action="month-1"
							className={classes.button}
						>
							‹
						</CalendarButton>
						<CalendarButton
							action="month+1"
							className={classes.button}
						>
							›
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
		</CalendarFieldPopover>
	</CalendarField>
)
