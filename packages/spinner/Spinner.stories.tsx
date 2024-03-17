import { useState } from 'react'
import type { Meta } from '@storybook/react'
import { Story, TextField } from '../../.storybook/src/lib'
import { Spinner } from './Spinner'
import { SpinnerThumb } from './SpinnerThumb'
import { SpinnerTrack } from './SpinnerTrack'
import * as classes from './Spinner.stories.css'

export default {
	title: 'Spinner',
	component: Spinner
} satisfies Meta<typeof Spinner>

export const Display = () => {
	const [arc, setArc] = useState('25')
	const [size, setSize] = useState('100')
	const [width, setWidth] = useState('20')
	const [speed, setSpeed] = useState('1')

	return (
		<Story
			controls={[
				<TextField label="Arc" value={arc} onChange={setArc} />,
				<TextField label="size" value={size} onChange={setSize} />,
				<TextField label="Width" value={width} onChange={setWidth} />,
				<TextField label="Speed" value={speed} onChange={setSpeed} />
			]}
		>
			<Spinner
				size={Number(size)}
				width={Number(width)}
				speed={Number(speed)}
				className={classes.spinner}
			>
				<SpinnerTrack className={classes.track} />
				<SpinnerThumb arc={Number(arc)} className={classes.thumb} />
			</Spinner>
		</Story>
	)
}
