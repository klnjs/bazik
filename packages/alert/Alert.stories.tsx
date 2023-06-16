import type { Meta, StoryObj } from '@storybook/react'
import { paletteProperties } from '../theme/sprinkles.css'
import { Alert } from './Alert'
import { AlertTitle } from './AlertTitle'
import { AlertContent } from './AlertContent'
import { useAlertStyles } from './useAlertStyles'
import type { AlertSprinkles } from './Alert.css'

export default {
	title: 'Alert',
	component: Alert
} satisfies Meta<typeof Alert>

export const Default: StoryObj<typeof Alert> = {
	render: (args) => (
		<Alert {...args}>
			<AlertTitle>Alert</AlertTitle>
			<AlertContent>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. At
				varius vel pharetra vel turpis nunc eget lorem.
			</AlertContent>
		</Alert>
	)
}

export const Styled: StoryObj<AlertSprinkles> = {
	argTypes: {
		palette: {
			control: 'select',
			options: Object.keys(paletteProperties.styles.palette.values),
			defaultValue: 'primary'
		}
	},
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const classes = useAlertStyles(args)

		return (
			<Alert className={classes.root} {...args}>
				<AlertTitle className={classes.title}>Alert</AlertTitle>
				<AlertContent className={classes.content}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. At varius vel pharetra vel turpis nunc eget lorem.
				</AlertContent>
			</Alert>
		)
	}
}
