import { style } from '@vanilla-extract/css'

export const story = style({
	display: 'grid',
	gridTemplateColumns: '1fr 2fr',
	gap: 32
})

export const section = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 8
})

export const title = style({
	padding: 0,
	margin: 0
})

export const controls = style([
	section,
	{
		background: '#F2F2F2',
		padding: 16
	}
])

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gap: 4
})

export const day = style({
	appearance: 'none',
	aspectRatio: '1 / 1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	userSelect: 'none',
	border: 0,
	borderRadius: 4,
	background: 'none',
	selectors: {
		'&[data-today]': {
			fontWeight: 'bold'
		},
		'&[data-disabled]': {
			cursor: 'default',
			opacity: 0.2
		},
		'&[data-weekend]': {
			color: 'red'
		},
		'&[data-overflow]': {
			visibility: 'hidden'
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

export const field = style({
	display: 'inline-flex',
	gap: 8,
	alignItems: 'center'
})

export const segment = style({
	border: 0,
	borderRadius: 4,
	padding: 8,
	':focus-visible': {
		outline: '1px solid blue',
		outlineOffset: -1
	}
})

export const popover = style({
	width: 300,
	padding: 8,
	background: 'white',
	border: '1px solid black',
	borderRadius: 4
})
