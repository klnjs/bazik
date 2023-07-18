import { style } from '@vanilla-extract/css'

export const title = style({
	margin: 0,
	padding: 0,
	fontSize: 18
})

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	gap: 4
})

export const calendar = style({
	width: 300,
	display: 'flex',
	flexDirection: 'column',
	gap: 8
})

export const header = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 8
})

export const nav = style({
	display: 'inline-flex',
	gap: 8
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
	display: 'flex',
	gap: 6,
	flexDirection: 'column'
})

export const anchor = style({
	display: 'inline-flex',
	gap: 2,
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
	padding: 8,
	background: 'white',
	border: '1px solid black',
	borderRadius: 4
})
