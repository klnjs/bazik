import {
	Calendar,
	CalendarDay,
	CalendarGrid,
	CalendarHeader,
	CalendarShift,
	CalendarTitle
} from '@klnjs/calendar'
import classes from './calendar.module.css'

export default () => (
	<Calendar aria-label="Calendar" className={classes.calendar}>
		<CalendarHeader className={classes.header}>
			<CalendarShift action="sub" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarShift action="add" className={classes.button} />
		</CalendarHeader>
		<CalendarGrid className={classes.grid}>
			{({ key, date }) => (
				<CalendarDay key={key} date={date} className={classes.day} />
			)}
		</CalendarGrid>
	</Calendar>
)
