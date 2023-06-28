import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CalendarField } from './CalendarField'
import { CalendarFieldSegment } from './CalendarFieldSegment'

export default {
	title: 'Calendar',
	component: CalendarField
} satisfies Meta<typeof CalendarField>

export const Default: StoryObj<typeof CalendarField> = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [date, setDate] = useState<Date>()

		return (
			<>
				<button onClick={() => setDate(new Date())}>Controlled</button>
				<button onClick={() => setDate(undefined)}>Uncontrolled</button>

				<CalendarField
					value={date}
					min={new Date()}
					onChange={(value) => console.log(value)}
					{...args}
				>
					<CalendarFieldSegment segment='day' />
					<CalendarFieldSegment segment='month' />
					<CalendarFieldSegment segment='year' />
				</CalendarField>
			</>
		)
	}
}
