import { Avatar, AvatarImage, AvatarFallback } from '@klnjs/avatar'
import classes from './avatar.module.css'
import src from './avatar.png'

export default () => {
	return (
		<Avatar className={classes.avatar}>
			<AvatarImage src={src} className={classes.image} />
			<AvatarFallback delay={5000} className={classes.fallback}>
				RK
			</AvatarFallback>
		</Avatar>
	)
}
