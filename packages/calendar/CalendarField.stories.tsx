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
		const [date, setDate] = useState<Date>()
		const handleChange = (date: Date | undefined) => {
			console.log(date)

			if (date !== undefined) {
				setDate(date)
			}
		}

		return (
			<>
				<button onClick={() => setDate(new Date())}>Controlled</button>
				<button onClick={() => setDate(undefined)}>Uncontrolled</button>

				<CalendarField
					value={date}
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
