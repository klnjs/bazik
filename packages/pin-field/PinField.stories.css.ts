import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../.storybook/src/style/sprinkles.css'
import { vars } from '../../.storybook/src/style/theme.css'

export const group = sprinkles({
	display: 'flex',
	gap: 'medium'
})

export const slot = style([
	sprinkles({
		display: 'flex',
		placeItems: 'center',
		borderRadius: 'medium'
	}),
	{
		height: 56,
		width: 56,
		cursor: 'text',
		border: '1px solid rgb(54, 58, 63)',
		selectors: {
			'&[data-highlighted]': {
				outlineOffset: -1,
				outlineStyle: 'solid',
				outlineWidth: 1,
				outlineColor: vars.colors.teal11
			}
		}
	}
])
