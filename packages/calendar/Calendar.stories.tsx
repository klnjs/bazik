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
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 2fr',
					gap: 32
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 8
					}}
				>
					<h2>Controls</h2>

					<button onClick={() => setSelectedDate(new Date())}>
						Set Controlled
					</button>

					<button onClick={() => setSelectedDate(undefined)}>
						Set Uncontrolled
					</button>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 8
					}}
				>
					<h2 style={{ margin: 0 }}>Calendar</h2>
					<Calendar
						min={new Date()}
						value={selectedDate}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8
						}}
						onChange={handleChange}
						{...args}
					>
						<CalendarField
							style={{ display: 'inline-flex', gap: 8 }}
						>
							<CalendarSegment segment='day' placeholder='dd' />
							<span>/</span>
							<CalendarSegment segment='month' placeholder='mm' />
							<span>/</span>
							<CalendarSegment
								segment='year'
								placeholder='yyyy'
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
							<CalendarGrid
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(7, 1fr)'
								}}
							>
								{(date) => (
									<CalendarDay
										key={date.format()}
										date={date}
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
