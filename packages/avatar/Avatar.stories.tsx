import type { Meta } from '@storybook/react'
import { Avatar as AvatarRoot } from './Avatar'
import { AvatarImage } from './AvatarImage'
import { AvatarFallback } from './AvatarFallback'

export default {
	title: 'Avatar',
	component: AvatarRoot
} satisfies Meta<typeof AvatarRoot>

export const Avatar = (
	<AvatarRoot>
		<AvatarImage alt="placeholder" src="https://placehold.co/50" />
	</AvatarRoot>
)

export const AvatarWithFallback = (
	<AvatarRoot>
		<AvatarImage alt="Rune Klein" src="https://giberrish.com" />
		<AvatarFallback>RK</AvatarFallback>
	</AvatarRoot>
)

export const AvatarAsLink = (
	<AvatarRoot asChild>
		<a href="a">
			<AvatarImage alt="Rune Klein" src="https://placehold.co/50" />
			<AvatarFallback>RK</AvatarFallback>
		</a>
	</AvatarRoot>
)
