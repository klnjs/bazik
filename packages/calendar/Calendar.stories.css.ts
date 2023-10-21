import { style } from '@vanilla-extract/css'

export const calendar = style({
	display: 'inline-flex',
	flexDirection: 'column',
	gap: 8,
	fontFamily: 'Arial',
	position: 'relative'
})

export const calendarWide = style([
	calendar,
	{
		flexDirection: 'row'
	}
])

export const month = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
	fontFamily: 'Arial'
})

export const title = style({
	margin: 0,
	padding: 0,
	fontSize: 18,
	marginInlineEnd: 'auto'
})

export const titleWide = style([
	title,
	{
		marginInlineEnd: 0
	}
])

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
	gap: 4,
	height: 32
})

export const headerWide = style([
	header,
	{
		justifyContent: 'space-around'
	}
])

export const button = style({
	display: 'inline-flex',
	width: 32,
	height: 32,
	cursor: 'pointer',
	border: 'none',
	borderRadius: 4,
	background: 'none',
	lineHeight: 24,
	alignItems: 'center',
	justifyContent: 'center',
	':hover': {
		background: '#E7E7E7'
	},
	':disabled': {
		pointerEvents: 'none'
	}
})

export const buttonWidePrevious = style([
	button,
	{
		position: 'absolute',
		insetBlockStart: 0,
		insetInlineStart: 0
	}
])

export const buttonWideNext = style([
	button,
	{
		position: 'absolute',
		insetBlockStart: 0,
		insetInlineEnd: 0
	}
])

export const item = style({
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
	cursor: 'pointer',
	background: 'none'
})

export const day = style([
	item,
	{
		selectors: {
			'&:hover': {
				background: '#E7E7E7'
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
				opacity: 0.4,
				pointerEvents: 'none'
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

export const week = style([
	item,
	{
		fontSize: 10,
		fontWeight: 'bold'
	}
])

export const weekday = style([
	item,
	{
		fontWeight: 'bold'
	}
])

export const blank = style([item, { visibility: 'hidden' }])
