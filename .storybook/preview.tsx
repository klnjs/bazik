import React from 'react'
import type { Preview } from '@storybook/react'
import { theme } from './theme.css'

export default {
	argTypes: {
		asChild: { table: { disable: true } },
		sx: { table: { disable: true } },
		className: { table: { disable: true } }
	},
	decorators: [
		(Story) => (
			<div className={theme}>
				<Story />
			</div>
		)
	]
} satisfies Preview
