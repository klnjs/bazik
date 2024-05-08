import {
	Calendar,
	CalendarButton,
	CalendarCell,
	CalendarGrid,
	CalendarHeader,
	CalendarTitle
} from '@klnjs/calendar'
import classes from './calendar.module.css'

export default () => (
	<Calendar
		aria-label="Event date"
		locale="en-GB"
		className={classes.calendar}
	>
		<CalendarHeader className={classes.header}>
			<CalendarButton action="dec" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarButton action="inc" className={classes.button} />
		</CalendarHeader>
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<CalendarGrid className={classes.grid}>
				{({ type, date }) => (
					<CalendarCell
						type={type}
						date={date}
						className={classes.cell}
					/>
				)}
			</CalendarGrid>
		</div>
	</Calendar>
)
