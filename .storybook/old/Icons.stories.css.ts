import { style } from '@vanilla-extract/css'
import { vars } from '../src/style/theme.css'
import { sprinkles } from '../src/style/sprinkles.css'

export const grid = style([
	sprinkles({ gap: 'medium' }),
	{
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, 36px)',
		alignItems: 'center',
		justifyItems: 'center',
		justifyContent: 'center',
		boxSizing: 'border-box',
		width: '100%',
		maxHeight: '100%',
		overflowY: 'auto'
	}
])

export const icon = style({
	width: '100%',
	height: '100%'
})

export const button = style([
	sprinkles({
		color: 'teal11',
		background: 'teal3',
		padding: 'small',
		borderRadius: 'medium'
	}),
	{
		width: 36,
		height: 36,
		border: 0,
		cursor: 'pointer',
		selectors: {
			'&:hover': {
				backgroundColor: vars.colors.teal5
			}
		}
	}
])
