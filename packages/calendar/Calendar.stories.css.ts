import { style } from '@vanilla-extract/css'

export const calendar = style({
	display: 'inline-flex',
	flexDirection: 'column',
	gap: 8,
	fontFamily: 'Arial'
})

export const title = style({
	margin: 0,
	padding: 0,
	fontSize: 18
})

export const grid = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, 1fr)',
	rowGap: 2
})

export const gridWithWeekInfo = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(8, 1fr)',
	rowGap: 2
})

export const header = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 8,
	height: 24
})

export const button = style({
	display: 'inline-flex',
	width: 32,
	height: 32,
	cursor: 'pointer',
	border: 'none',
	borderRadius: 4,
	background: 'none',
	lineHeight: 24,
	paddingBlockEnd: 2,
	alignItems: 'center',
	justifyContent: 'center',
	':hover': {
		background: 'lightgrey'
	}
})

export const cell = style({
	width: 32,
	height: 32,
	appearance: 'none',
	aspectRatio: '1 / 1',
	display: 'flex',
	fontFamily: 'inherit',
	fontSize: 12,
	alignItems: 'center',
	justifyContent: 'center',
	userSelect: 'none',
	padding: 0,
	border: 0,
	borderRadius: 4,
	background: 'none'
})

export const day = style([
	cell,
	{
		cursor: 'pointer',
		border: 0,
		outline: 0,
		selectors: {
			'&:hover:not([data-disabled], [data-selected])': {
				background: 'lightgrey'
			},
			'&[data-today]': {
				fontWeight: 'bold'
			},
			'&[data-weekend]': {
				color: 'orange'
			},
			'&[data-overflow]': {
				visibility: 'hidden'
			},
			'&[data-selected]': {
				color: 'white',
				background: '#0080FF'
			},
			'&[data-highlighted]:focus-visible': {
				outline: '1px solid #0080FF',
				outlineOffset: -2
			},
			'&[data-disabled]': {
				cursor: 'default',
				opacity: 0.4
			},
			'&[data-range-start]': {
				borderStartEndRadius: 0,
				borderEndEndRadius: 0
			},
			'&[data-range-end]': {
				borderStartStartRadius: 0,
				borderEndStartRadius: 0
			},
			'&[data-range-between]': {
				background: '#89CCFF',
				borderRadius: 0
			},
			'&[data-week-start]': {
				borderStartStartRadius: 4,
				borderEndStartRadius: 4
			},
			'&[data-week-end]': {
				borderStartEndRadius: 4,
				borderEndEndRadius: 4
			}
		}
	}
])

export const dayWithOverflowVisible = style([
	day,
	{
		selectors: {
			'&[data-overflow]': {
				opacity: 0.4,
				visibility: 'visible'
			}
		}
	}
])
