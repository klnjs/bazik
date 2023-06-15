import { createElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'
import { AvatarImage } from './AvatarImage'
import { AvatarFallback } from './AvatarFallback'
import { useAvatarStyles } from './useAvatarStyles'

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
			<AvatarImage alt='Rune Klein' src='https://nothing-here.com' />
			<AvatarFallback>RK</AvatarFallback>
		</Avatar>
	)
}

export const Styled: StoryObj<typeof Avatar> = {
	render: (args) =>
		createElement(() => {
			const classes = useAvatarStyles({
				palette: 'primary',
				variant: 'round'
			})

			return (
				<Avatar className={classes.root} {...args}>
					<AvatarImage
						alt='Rune Klein'
						src='https://nothing-here.com'
						className={classes.image}
					/>
					<AvatarFallback className={classes.fallback}>
						RK
					</AvatarFallback>
				</Avatar>
			)
		})
}
