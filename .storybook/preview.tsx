import React from 'react'
import type { Preview } from '@storybook/react'
import './preview.css'

export default {
	argTypes: {
		asChild: { table: { disable: true } },
		sx: { table: { disable: true } },
		hidden: { table: { disable: true } },
		className: { table: { disable: true } }
	}
} satisfies Preview
