import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Story, TextField } from '../src/lib'
import { Spinner } from '../../packages/spinner/src/Spinner'
import { SpinnerThumb } from '../../packages/spinner/src/SpinnerThumb'
import { SpinnerTrack } from '../../packages/spinner/src/SpinnerTrack'
import * as classes from './Spinner.stories.css'

export default {
	title: 'Spinner',
	component: Spinner
} satisfies Meta<typeof Spinner>

export const Display = () => {
	const [arc, setArc] = useState('25')
	const [size, setSize] = useState('100')
	const [width, setWidth] = useState('20')
	const [duration, setDuration] = useState('1')

	return (
		<Story
			controls={[
				<TextField label="Arc" value={arc} onChange={setArc} />,
				<TextField label="Size" value={size} onChange={setSize} />,
				<TextField label="Width" value={width} onChange={setWidth} />,
				<TextField
					label="Duration"
					value={duration}
					onChange={setDuration}
				/>
			]}
		>
			<Spinner
				size={Number(size)}
				width={Number(width)}
				duration={Number(duration)}
				className={classes.spinner}
			>
				<SpinnerTrack className={classes.track} />
				<SpinnerThumb arc={Number(arc)} className={classes.thumb} />
			</Spinner>
		</Story>
	)
}
