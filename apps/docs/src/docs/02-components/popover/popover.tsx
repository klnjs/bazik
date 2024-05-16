import {
	Popover,
	PopoverTrigger,
	PopoverPortal,
	PopoverContent
} from '@klnjs/popover'
import classes from './popover.module.css'

export default () => (
	<Popover>
		<PopoverTrigger className={classes.trigger}>Open</PopoverTrigger>
		<PopoverPortal>
			<PopoverContent className={classes.popover}>Popover</PopoverContent>
		</PopoverPortal>
	</Popover>
)
