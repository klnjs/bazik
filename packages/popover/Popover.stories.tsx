import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import * as classes from './Popover.stories.css'

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
					onClick={({ target }) =>
						setAnchor((prev) =>
							prev ? undefined : (target as HTMLElement)
						)
					}
				>
					Open
				</button>

				<Popover
					open={Boolean(anchor)}
					anchor={anchor}
					className={classes.popover}
					{...args}
				>
					Hello
				</Popover>
			</div>
		)
	}
}
