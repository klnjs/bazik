import { style } from '@vanilla-extract/css'
import { sprinkles } from '../style/sprinkles.css'

export const icon = style([
	sprinkles({
		color: 'teal11'
	}),
	{
		width: 200,
		height: 200
	}
])
