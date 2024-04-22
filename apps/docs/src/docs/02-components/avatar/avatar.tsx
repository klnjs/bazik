import { Avatar, AvatarImage, AvatarFallback } from '@klnjs/avatar'
import src from './avatar.png'
import classes from './avatar.module.css'

export default () => (
	<Avatar className={classes.avatar}>
		<AvatarImage src={src} className={classes.image} />
		<AvatarFallback delay={5000} className={classes.fallback}>
			RK
		</AvatarFallback>
	</Avatar>
)
