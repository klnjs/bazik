import {
	Calendar,
	CalendarGrid,
	CalendarCell,
	CalendarHeader,
	CalendarButton,
	CalendarTitle
} from '@klnjs/calendar'
import classes from './calendar.module.css'

export default () => (
	<Calendar aria-label="Calendar" className={classes.calendar}>
		<CalendarHeader className={classes.header}>
			<CalendarButton action="dec" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarButton action="inc" className={classes.button} />
		</CalendarHeader>
		<CalendarGrid className={classes.grid}>
			{({ type, date }) => (
				<CalendarCell
					type={type}
					date={date}
					className={classes.cell}
				/>
			)}
		</CalendarGrid>
	</Calendar>
)
