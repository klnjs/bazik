import type { Meta } from '@storybook/react'
import { Calendar } from '../calendar/Calendar'
import { CalendarDay } from '../calendar/CalendarDay'
import { CalendarDays } from '../calendar/CalendarDays'
import { CalendarGrid } from '../calendar/CalendarGrid'
import { CalendarTitle } from '../calendar/CalendarTitle'
import { CalendarButton } from '../calendar/CalendarButton'
import { CalendarField } from './CalendarField'
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
	title: 'Calendar Field',
	component: CalendarField
} satisfies Meta<typeof CalendarField>

export const Basic = () => (
	<CalendarField className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldInput className={classes.input}>
			<CalendarFieldSegments>
				{({ type }) => (
					<CalendarFieldSegment
						type={type}
						className={classes.segment}
					/>
				)}
			</CalendarFieldSegments>
		</CalendarFieldInput>
	</CalendarField>
)

export const Literals = () => (
	<CalendarField className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldInput className={classes.input}>
			<CalendarFieldSegments literals={true}>
				{({ type, value }) => {
					if (type === 'literal') {
						return (
							<CalendarFieldLiteral>{value}</CalendarFieldLiteral>
						)
					}

					return (
						<CalendarFieldSegment
							type={type}
							className={classes.segment}
						/>
					)
				}}
			</CalendarFieldSegments>
		</CalendarFieldInput>
	</CalendarField>
)

export const Disabled = () => (
	<CalendarField disabled className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldInput className={classes.input}>
			<CalendarFieldSegments>
				{({ type }) => (
					<CalendarFieldSegment
						type={type}
						className={classes.segment}
					/>
				)}
			</CalendarFieldSegments>
		</CalendarFieldInput>
	</CalendarField>
)

export const Picker = () => (
	<CalendarField className={classes.field}>
		<CalendarFieldLabel>Event Date</CalendarFieldLabel>
		<CalendarFieldAnchor className={classes.anchor}>
			<CalendarFieldInput className={classes.input}>
				<CalendarFieldSegments literals={true}>
					{({ type, value }) => {
						if (type === 'literal') {
							return (
								<CalendarFieldLiteral>
									{value}
								</CalendarFieldLiteral>
							)
						}

						return (
							<CalendarFieldSegment
								type={type}
								className={classes.segment}
							/>
						)
					}}
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
						{({ date }) => (
							<CalendarDay date={date} className={classes.day} />
						)}
					</CalendarDays>
				</CalendarGrid>
			</Calendar>
		</CalendarFieldPopover>
	</CalendarField>
)
