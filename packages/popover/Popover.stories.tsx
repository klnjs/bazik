import type { Meta } from '@storybook/react'
import { Popover as PopoverRoot } from './Popover'
import { PopoverAnchor } from './PopoverAnchor'
import { PopoverTrigger } from './PopoverTrigger'
import { PopoverContent } from './PopoverContent'
import * as classes from './Popover.stories.css'

export default {
	title: 'Popover',
	component: PopoverRoot,
	parameters: {
		layout: 'centered'
	}
} satisfies Meta<typeof PopoverRoot>

export const Popover = () => (
	<PopoverRoot placement='bottom-start'>
		<PopoverTrigger className={classes.trigger}>Open</PopoverTrigger>
		<PopoverContent className={classes.popover}>
			I am a popover
		</PopoverContent>
	</PopoverRoot>
)

export const PopoverRightToLeft = () => (
	<div dir='rtl'>
		<PopoverRoot placement='bottom-start'>
			<PopoverTrigger className={classes.trigger}>Open</PopoverTrigger>
			<PopoverContent className={classes.popover}>
				I am a popover
			</PopoverContent>
		</PopoverRoot>
	</div>
)

export const PopoverWithAnchor = () => (
	<PopoverRoot>
		<div className={classes.layout}>
			<PopoverTrigger className={classes.trigger}>Open</PopoverTrigger>
			<PopoverAnchor className={classes.anchor}>Anchor</PopoverAnchor>
		</div>
		<PopoverContent className={classes.popover}>
			I am a popover
		</PopoverContent>
	</PopoverRoot>
)
