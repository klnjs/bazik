import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarSegment } from './CalendarSegment'
import { CalendarGrid } from './CalendarGrid'
import { CalendarDay } from './CalendarDay'
import { CalendarField } from './CalendarField'
import { CalendarContent } from './CalendarContent'
import { CalendarButton } from './CalendarButton'
import { CalendarTitle } from './CalendarTitle'
import * as classes from './Calendar.stories.css'

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Default: StoryObj<typeof Calendar> = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedDate, setSelectedDate] = useState<Date>()
		const handleChange = (date: Date | undefined) => {
			if (selectedDate !== undefined) {
				setSelectedDate(date)
			}
		}

		const min = new Date()
		min.setMonth(min.getMonth() - 1)

		const max = new Date()
		max.setMonth(max.getMonth() + 1)

		return (
			<div className={classes.story}>
				<div className={classes.controls}>
					<h2>Controls</h2>

					<button onClick={() => setSelectedDate(new Date())}>
						Set Controlled
					</button>

					<button onClick={() => setSelectedDate(undefined)}>
						Set Uncontrolled
					</button>
				</div>

				<div className={classes.section}>
					<Calendar
						min={min}
						max={max}
						value={selectedDate}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8
						}}
						onChange={handleChange}
						{...args}
					>
						<CalendarField className={classes.field}>
							<CalendarSegment
								segment='day'
								className={classes.segment}
							/>
							<span className={classes.segment}>/</span>
							<CalendarSegment
								segment='month'
								className={classes.segment}
							/>
							<span className={classes.segment}>/</span>
							<CalendarSegment
								segment='year'
								className={classes.segment}
							/>
						</CalendarField>
						<CalendarContent
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 8
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 8
								}}
							>
								<CalendarTitle />

								<div style={{ display: 'inline-flex', gap: 8 }}>
									<CalendarButton action='prevYear'>
										{'<<'}
									</CalendarButton>
									<CalendarButton action='prevMonth'>
										{'<'}
									</CalendarButton>
									<CalendarButton action='nextMonth'>
										{'>'}
									</CalendarButton>
									<CalendarButton action='nextYear'>
										{'>>'}
									</CalendarButton>
								</div>
							</div>
							<CalendarGrid className={classes.grid}>
								{(date) => (
									<CalendarDay
										key={date.format()}
										date={date}
										className={classes.day}
									>
										{date.day}
									</CalendarDay>
								)}
							</CalendarGrid>
						</CalendarContent>
					</Calendar>
				</div>
			</div>
		)
	}
}
