import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarSegment } from './CalendarSegment'
import { CalendarSegments } from './CalendarSegments'
import { CalendarDay } from './CalendarDay'
import { CalendarDays } from './CalendarDays'
import { CalendarField } from './CalendarField'
import { CalendarPortal } from './CalendarPortal'
import { CalendarContent } from './CalendarContent'
import { CalendarButton } from './CalendarButton'
import { CalendarTitle } from './CalendarTitle'
import * as classes from './Calendar.stories.css'
import { CalendarPopover } from './CalendarPopover'
import { CalendarTrigger } from './CalendarTrigger'

export default {
	title: 'Calendar',
	component: Calendar,
	args: { locale: 'da' }
} satisfies Meta<typeof Calendar>

export const Default: StoryObj<typeof Calendar> = {
	render: ({ locale, ...args }) => {
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
						locale={locale}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8
						}}
						onChange={handleChange}
						{...args}
					>
						<CalendarField className={classes.field}>
							<CalendarSegments>
								{(segment) => (
									<CalendarSegment
										key={segment}
										segment={segment}
										className={classes.segment}
									/>
								)}
							</CalendarSegments>
							<CalendarTrigger>Open</CalendarTrigger>
						</CalendarField>
						<CalendarPortal>
							<CalendarPopover className={classes.popover}>
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
										<CalendarTitle
											className={classes.title}
										/>

										<div
											style={{
												display: 'inline-flex',
												gap: 8
											}}
										>
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
													{date.day}
												</CalendarDay>
											)}
										</CalendarDays>
									</div>
								</CalendarContent>
							</CalendarPopover>
						</CalendarPortal>
					</Calendar>
				</div>
			</div>
		)
	}
}
