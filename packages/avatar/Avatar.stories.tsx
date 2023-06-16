import type { Meta, StoryObj } from '@storybook/react'
import { paletteProperties } from '../theme/sprinkles.css'
import { Avatar } from './Avatar'
import { AvatarImage } from './AvatarImage'
import { AvatarFallback } from './AvatarFallback'
import { useAvatarStyles } from './useAvatarStyles'
import { avatarProperties, type AvatarSprinkles } from './Avatar.css'

export default {
	title: 'Avatar',
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
			<AvatarImage alt='Rune Klein' src='https://giberrish.com' />
			<AvatarFallback>RK</AvatarFallback>
		</Avatar>
	)
}

export const Link: StoryObj<AvatarSprinkles> = {
	render: (args) => (
		<Avatar asChild {...args}>
			<a href='a'>
				<AvatarImage alt='Rune Klein' src='https://placehold.co/50' />
				<AvatarFallback>RK</AvatarFallback>
			</a>
		</Avatar>
	)
}

export const Button: StoryObj<AvatarSprinkles> = {
	render: (args) => (
		<Avatar asChild {...args}>
			<button onClick={() => console.log('clicked')}>
				<AvatarImage alt='Rune Klein' src='https://placehold.co/50' />
				<AvatarFallback>RK</AvatarFallback>
			</button>
		</Avatar>
	)
}

export const Styled: StoryObj<AvatarSprinkles> = {
	argTypes: {
		palette: {
			control: 'select',
			options: Object.keys(paletteProperties.styles.palette.values),
			defaultValue: 'primary'
		},
		variant: {
			control: 'select',
			options: Object.keys(avatarProperties.styles.variant.values),
			defaultValue: 'primary'
		}
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const classes = useAvatarStyles(args)

		return (
			<Avatar className={classes.root} {...args}>
				<AvatarImage
					alt='Rune Klein'
					src='https://nothing-here.com'
					className={classes.image}
				/>
				<AvatarFallback className={classes.fallback}>RK</AvatarFallback>
			</Avatar>
		)
	}
}
