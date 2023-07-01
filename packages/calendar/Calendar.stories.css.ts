import { style } from '@vanilla-extract/css'

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gap: 4
})

export const day = style({
	appearance: 'none',
	aspectRatio: '1 / 1',
	border: 0,
	borderRadius: '4px',
	selectors: {
		'&[data-today]': {
			fontWeight: 'bold'
		},
		'&[data-selected]': {
			color: 'white',
			background: 'blue'
		},
		'&[data-highlighted]:focus-visible': {
			outline: '1px solid blue',
			outlineOffset: -1
		}
	}
})
