import type { Meta, StoryObj } from '@storybook/react'
import { Avatar as AvatarRoot } from './Avatar'
import { AvatarImage } from './AvatarImage'
import { AvatarFallback } from './AvatarFallback'

export default {
	component: AvatarRoot
} satisfies Meta<typeof AvatarRoot>

export const Avatar: StoryObj<typeof AvatarRoot> = {
	render: (args) => (
		<AvatarRoot {...args}>
			<AvatarImage src='https://placehold.com/50' />
			<AvatarFallback>RK</AvatarFallback>
		</AvatarRoot>
	)
}
