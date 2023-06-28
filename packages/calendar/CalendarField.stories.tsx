import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarField } from './CalendarField'
import { CalendarFieldSegment } from './CalendarFieldSegment'
import { CalendarGrid } from './CalendarGrid'
import { CalendarGridDay } from './CalendarGridDay'

export default {
	title: 'Calendar',
	component: CalendarField
} satisfies Meta<typeof CalendarField>

export const Default: StoryObj<typeof CalendarField> = {
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

				<CalendarField
					value={selectedDate}
					min={new Date()}
					onChange={handleChange}
					{...args}
				>
					<CalendarFieldSegment segment='day' />
					<CalendarFieldSegment segment='month' />
					<CalendarFieldSegment segment='year' />

					<CalendarGrid
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(7, 1fr)'
						}}
					>
						{(date) => (
							<CalendarGridDay key={date.day} date={date}>
								{date.day}
							</CalendarGridDay>
						)}
					</CalendarGrid>
				</CalendarField>
			</>
		)
	}
}
