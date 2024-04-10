import { Spinner, SpinnerTrack, SpinnerThumb } from '@klnjs/spinner'
import classes from './spinner.module.css'

export default () => {
	return (
		<Spinner className={classes.spinner}>
			<SpinnerTrack className={classes.track} />
			<SpinnerThumb className={classes.thumb} />
		</Spinner>
	)
}
