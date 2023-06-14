import React from 'react'
import type { Preview } from '@storybook/react'
import { app } from './storybook.css'

export default {
	argTypes: {
		asChild: { table: { disable: true } },
		sx: { table: { disable: true } },
		hidden: { table: { disable: true } },
		className: { table: { disable: true } }
	},
	decorators: [
		(Story) => (
			<div className={app}>
				<Story />
			</div>
		)
	]
} satisfies Preview
