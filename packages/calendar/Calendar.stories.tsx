import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Calendar } from './Calendar'
import { CalendarSegment } from './CalendarSegment'
import { CalendarSegments } from './CalendarSegments'
import { CalendarDay } from './CalendarDay'
import { CalendarDays } from './CalendarDays'
import { CalendarField } from './CalendarField'
import { CalendarContent } from './CalendarContent'
import { CalendarButton } from './CalendarButton'
import { CalendarTitle } from './CalendarTitle'
import { CalendarPopover } from './CalendarPopover'
import { CalendarTrigger } from './CalendarTrigger'
import { CalendarLiteral } from './CalendarLiteral'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Controlled = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	return (
		<Calendar value={selectedDate} onChange={setSelectedDate}>
			<CalendarField className={classes.field}>
				<CalendarSegments>
					{(segment, index) =>
						segment.type === 'literal' ? (
							<CalendarLiteral key={index}>
								{segment.value}
							</CalendarLiteral>
						) : (
							<CalendarSegment
								key={segment.type}
								type={segment.type}
								className={classes.segment}
							/>
						)
					}
				</CalendarSegments>
				<CalendarTrigger>Open</CalendarTrigger>
			</CalendarField>
			<CalendarPopover className={classes.popover}>
				<CalendarContent className={classes.content}>
					<div className={classes.header}>
						<CalendarTitle className={classes.title} />

						<div className={classes.nav}>
							<CalendarButton action='year-1'>
								{'<<'}
							</CalendarButton>
							<CalendarButton action='month-1'>
								{'<'}
							</CalendarButton>
							<CalendarButton action='month+1'>
								{'>'}
							</CalendarButton>
							<CalendarButton action='year+1'>
								{'>>'}
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
				</CalendarContent>
			</CalendarPopover>
		</Calendar>
	)
}

export const Uncontrolled = () => (
	<Calendar>
		<CalendarField className={classes.field}>
			<CalendarSegments>
				{(segment, index) =>
					segment.type === 'literal' ? (
						<CalendarLiteral key={index}>
							{segment.value}
						</CalendarLiteral>
					) : (
						<CalendarSegment
							key={segment.type}
							type={segment.type}
							className={classes.segment}
						/>
					)
				}
			</CalendarSegments>
			<CalendarTrigger>Open</CalendarTrigger>
		</CalendarField>
		<CalendarPopover className={classes.popover}>
			<CalendarContent className={classes.content}>
				<div className={classes.header}>
					<CalendarTitle className={classes.title} />

					<div className={classes.nav}>
						<CalendarButton action='year-1'>{'<<'}</CalendarButton>
						<CalendarButton action='month-1'>{'<'}</CalendarButton>
						<CalendarButton action='month+1'>{'>'}</CalendarButton>
						<CalendarButton action='year+1'>{'>>'}</CalendarButton>
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
			</CalendarContent>
		</CalendarPopover>
	</Calendar>
)

export const Boundaries = () => {
	const min = new Date(new Date().setMonth(new Date().getMonth() - 1))
	const max = new Date(new Date().setMonth(new Date().getMonth() + 1))

	return (
		<Calendar min={min} max={max}>
			<CalendarField className={classes.field}>
				<CalendarSegments>
					{(segment, index) =>
						segment.type === 'literal' ? (
							<CalendarLiteral key={index}>
								{segment.value}
							</CalendarLiteral>
						) : (
							<CalendarSegment
								key={segment.type}
								type={segment.type}
								className={classes.segment}
							/>
						)
					}
				</CalendarSegments>
				<CalendarTrigger>Open</CalendarTrigger>
			</CalendarField>
			<CalendarPopover className={classes.popover}>
				<CalendarContent className={classes.content}>
					<div className={classes.header}>
						<CalendarTitle className={classes.title} />

						<div className={classes.nav}>
							<CalendarButton action='year-1'>
								{'<<'}
							</CalendarButton>
							<CalendarButton action='month-1'>
								{'<'}
							</CalendarButton>
							<CalendarButton action='month+1'>
								{'>'}
							</CalendarButton>
							<CalendarButton action='year+1'>
								{'>>'}
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
				</CalendarContent>
			</CalendarPopover>
		</Calendar>
	)
}

export const Field = () => (
	<Calendar>
		<CalendarField className={classes.field}>
			<CalendarSegments>
				{(segment, index) =>
					segment.type === 'literal' ? (
						<CalendarLiteral key={index}>
							{segment.value}
						</CalendarLiteral>
					) : (
						<CalendarSegment
							key={segment.type}
							type={segment.type}
							className={classes.segment}
						/>
					)
				}
			</CalendarSegments>
		</CalendarField>
	</Calendar>
)

export const Inline = () => (
	<Calendar>
		<CalendarContent className={classes.content}>
			<div className={classes.header}>
				<CalendarTitle className={classes.title} />

				<div className={classes.nav}>
					<CalendarButton action='year-1'>{'<<'}</CalendarButton>
					<CalendarButton action='month-1'>{'<'}</CalendarButton>
					<CalendarButton action='month+1'>{'>'}</CalendarButton>
					<CalendarButton action='year+1'>{'>>'}</CalendarButton>
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
		</CalendarContent>
	</Calendar>
)
