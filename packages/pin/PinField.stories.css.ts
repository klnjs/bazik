import { style, keyframes } from '@vanilla-extract/css'
import { sprinkles } from '../../.storybook/src/style/sprinkles.css'
import { vars } from '../../.storybook/src/style/theme.css'

const blink = keyframes({
	'0%,100%': { opacity: '1' },
	'50%': { opacity: '0' }
})

export const pin = sprinkles({
	display: 'flex',
	gap: 'medium',
	alignItems: 'center',
	flexDirection: 'column'
})

export const group = sprinkles({
	display: 'flex',
	gap: 'medium',
	alignItems: 'center'
})

export const label = style({
	fontSize: 22
})

export const slot = style([
	sprinkles({
		display: 'flex',
		placeItems: 'center',
		borderRadius: 'medium'
	}),
	{
		position: 'relative',
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
			},
			'&[data-caret]::after': {
				display: 'block',
				content: '',
				position: 'absolute',
				width: 1,
				height: 26,
				animation: `${blink} 1.2s ease-out infinite`,
				background: vars.colors.teal11
			}
		}
	}
])

export const dash = style({
	width: 20,
	height: 4,
	background: 'rgb(54, 58, 63)'
})
