import React from 'react'
import type { Preview } from '@storybook/react'
import { theme } from './theme.css'

export default {
	decorators: [
		(Story) => (
			<div className={theme}>
				<Story />
			</div>
		)
	]
} satisfies Preview
