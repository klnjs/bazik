import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar'
import { CalendarFieldSegment } from './CalendarFieldSegment'
import { CalendarGrid } from './CalendarGrid'
import { CalendarGridDay } from './CalendarGridDay'
import { CalendarField } from './CalendarField'
import { CalendarContent } from './CalendarContent'
import { CalendarContentTrigger } from './CalendarContentTrigger'
import { CalendarContentTitle } from './CalendarContentTitle'

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
						<CalendarFieldSegment segment='day' />
						<CalendarFieldSegment segment='month' />
						<CalendarFieldSegment segment='year' />
					</CalendarField>

					<CalendarContent>
						<CalendarContentTitle />

						<CalendarContentTrigger direction='dec'>
							Back
						</CalendarContentTrigger>

						<CalendarContentTrigger direction='inc'>
							Next
						</CalendarContentTrigger>

						<CalendarGrid
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(7, 1fr)'
							}}
						>
							{(date) => (
								<CalendarGridDay
									key={date.toLocaleString()}
									date={date}
								>
									{date.day}
								</CalendarGridDay>
							)}
						</CalendarGrid>
					</CalendarContent>
				</Calendar>
			</>
		)
	}
}
