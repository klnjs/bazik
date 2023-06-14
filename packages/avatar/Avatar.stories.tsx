import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import { AvatarImage } from './AvatarImage'
import { AvatarFallback } from './AvatarFallback'

export default {
	component: Avatar
} satisfies Meta<typeof Avatar>

export const Default: StoryObj<typeof Avatar> = {
	render: (args) => (
		<Avatar {...args}>
			<AvatarImage alt='placeholder' src='https://placehold.co/50' />
			<AvatarFallback>RK</AvatarFallback>
		</Avatar>
	)
}

export const Fallback: StoryObj<typeof Avatar> = {
	render: (args) => (
		<Avatar {...args}>
			<AvatarImage
				alt='Rune Klein'
				src='https://nothing-to-see-here.com'
			/>
			<AvatarFallback>RK</AvatarFallback>
		</Avatar>
	)
}
