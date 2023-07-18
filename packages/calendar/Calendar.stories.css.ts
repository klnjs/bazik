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
	width: 280,
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

export const button = style({
	display: 'inline-flex',
	width: 24,
	height: 24,
	lineHeight: 24,
	paddingBlockEnd: 2,
	alignItems: 'center',
	justifyContent: 'center'
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
			background: '#96CBFE'
		},
		'&[data-highlighted]:focus-visible': {
			outline: '1px solid #96CBFE',
			outlineOffset: -1
		}
	}
})

export const field = style({
	display: 'inline-flex',
	gap: 6,
	flexDirection: 'column'
})

export const input = style({
	display: 'inline-flex',
	gap: 2,
	padding: 4,
	alignItems: 'center',
	border: '1px solid black',
	borderRadius: 4,
	':focus-within': {
		borderColor: '#96CBFE'
	}
})

export const anchor = style({
	display: 'inline-flex'
})

export const segment = style({
	textAlign: 'center',
	fontSize: 14,
	border: 0,
	borderRadius: 4,
	paddingBlock: 2,
	paddingInline: 4,
	':focus-visible': {
		outline: '1px solid #96CBFE',
		outlineOffset: -1
	},
	selectors: {
		'&[data-placeholder]': {
			textIndent: 2,
			letterSpacing: 2
		}
	}
})

export const popover = style({
	padding: 8,
	background: 'white',
	border: '1px solid black',
	borderRadius: 4,
	boxShadow:
		'rgba(14, 18, 22, 0.35) 0px 10px 38px -10px, rgba(14, 18, 22, 0.2) 0px 10px 20px -15px'
})
