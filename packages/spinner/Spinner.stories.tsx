import type { Meta } from '@storybook/react'
import { Story, TextField } from '../../.storybook/src/lib'
import { Spinner } from './Spinner'
import { SpinnerThumb } from './SpinnerThumb'
import { SpinnerTrack } from './SpinnerTrack'
import * as classes from './Spinner.stories.css'
import { useState } from 'react'

export default {
	title: 'Spinner',
	component: Spinner
} satisfies Meta<typeof Spinner>

export const Display = () => {
	const [arc, setArc] = useState('75')
	const [radius, setRadius] = useState('100')
	const [duration, setDuration] = useState('1')
	const [thickness, setThickness] = useState('20')

	return (
		<Story
			controls={[
				<TextField label="Arc" value={arc} onChange={setArc} />,
				<TextField
					label="Radius"
					value={radius}
					onChange={setRadius}
				/>,
				<TextField
					label="Thickness"
					value={thickness}
					onChange={setThickness}
				/>,
				<TextField
					label="Duration"
					value={duration}
					onChange={setDuration}
				/>
			]}
		>
			<Spinner
				arc={Number(arc)}
				radius={Number(radius)}
				duration={Number(duration)}
				thickness={Number(thickness)}
				className={classes.spinner}
			>
				<SpinnerTrack className={classes.track} />
				<SpinnerThumb className={classes.thumb} />
			</Spinner>
		</Story>
	)
}
