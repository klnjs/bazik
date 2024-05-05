import {
	Calendar,
	CalendarGrid,
	CalendarCell,
	CalendarHeader,
	CalendarNavigate,
	CalendarTitle,
	CalendarGroup
} from '@klnjs/calendar'
import classes from './calendar.module.css'

export default () => (
	<Calendar
		aria-label="Calendar"
		months={2}
		select="range"
		className={classes.calendar}
	>
		<CalendarHeader className={classes.header}>
			<CalendarNavigate action="dec" className={classes.button} />
			<CalendarTitle className={classes.title} />
			<CalendarNavigate action="inc" className={classes.button} />
		</CalendarHeader>
		<CalendarGroup style={{ display: 'flex', alignItems: 'flex-start' }}>
			<CalendarGrid className={classes.grid}>
				{({ type, date }) => (
					<CalendarCell
						type={type}
						date={date}
						className={classes.cell}
					/>
				)}
			</CalendarGrid>
			<CalendarGrid monthOffset={1} className={classes.grid}>
				{({ type, date }) => (
					<CalendarCell
						type={type}
						date={date}
						className={classes.cell}
					/>
				)}
			</CalendarGrid>
		</CalendarGroup>
	</Calendar>
)
