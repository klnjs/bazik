import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import * as classes from './Popover.stories.css'
import { Portal } from '../portal/Portal'

export default {
	title: 'Popover',
	component: Popover
} satisfies Meta<typeof Popover>

export const Default: StoryObj<typeof Popover> = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [anchor, setAnchor] = useState<HTMLElement>()

		return (
			<div>
				<button
					style={{ width: 300 }}
					onClick={({ target }) =>
						setAnchor((prev) =>
							prev ? undefined : (target as HTMLElement)
						)
					}
				>
					Open
				</button>

				<Portal>
					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='start start'
						anchorAlignment='end end'
						className={classes.popover}
						{...args}
					/>
					{/*  
					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='start end'
						anchorAlignment='end start'
						className={classes.popover}
						{...args}
					>
						-------
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='end end'
						anchorAlignment='start start'
						className={classes.popover}
						{...args}
					>
						-------
					</Popover>

					<Popover
						open={Boolean(anchor)}
						anchor={anchor}
						anchorOrigin='end start'
						anchorAlignment='start end'
						className={classes.popover}
						{...args}
					>
						-------
					</Popover>
					*/}
				</Portal>
			</div>
		)
	}
}
