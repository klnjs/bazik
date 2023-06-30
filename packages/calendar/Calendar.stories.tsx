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

export default {
	title: 'Calendar',
	component: Calendar
} satisfies Meta<typeof Calendar>

export const Default: StoryObj<typeof Calendar> = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [selectedDate, setSelectedDate] = useState<Date>()
		const handleChange = (date: Date | undefined) => {
			console.log(date)

			if (selectedDate !== undefined) {
				setSelectedDate(date)
			}
		}

		return (
			<>
				<button onClick={() => setSelectedDate(new Date())}>
					Controlled
				</button>

				<button onClick={() => setSelectedDate(undefined)}>
					Uncontrolled
				</button>

				<Calendar
					value={selectedDate}
					min={new Date()}
					onChange={handleChange}
					{...args}
				>
					<CalendarField>
						<CalendarSegment segment='day' />
						<CalendarSegment segment='month' />
						<CalendarSegment segment='year' />
					</CalendarField>

					<CalendarContent>
						<CalendarTitle />
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
						<CalendarGrid>
							{(date) => (
								<CalendarDay
									key={date.toLocaleString()}
									date={date}
								>
									{date.day}
								</CalendarDay>
							)}
						</CalendarGrid>
					</CalendarContent>
				</Calendar>
			</>
		)
	}
}
