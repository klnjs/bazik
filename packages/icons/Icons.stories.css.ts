import { style } from '@vanilla-extract/css'

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, 36px)',
	alignItems: 'center',
	justifyItems: 'center',
	justifyContent: 'center',
	gap: 8,
	boxSizing: 'border-box',
	padding: 16,
	width: '100%',
	height: '100%',
	overflowY: 'auto'
})

export const icon = style({
	fill: 'currentColor',
	width: '100%',
	height: '100%'
})

export const button = style({
	color: '#adf0dd',
	width: 36,
	height: 36,
	padding: 2,
	background: 'none',
	border: 0,
	cursor: 'pointer',
	borderRadius: 4,
	selectors: {
		'&:hover': {
			background: '#0f2d2c'
		}
	}
})
