import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../.storybook/src/style/sprinkles.css'

export const icon = style([
	sprinkles({
		color: 'teal11'
	}),
	{
		fill: 'currentColor',
		width: 200,
		height: 200
	}
])
