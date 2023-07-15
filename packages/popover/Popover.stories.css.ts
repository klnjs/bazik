import { style } from '@vanilla-extract/css'

export const anchor = style({
	padding: 4,
	border: '1px solid black',
	borderRadius: 0,
	aspectRatio: '1 / 1'
})

export const popover = style({
	background: 'white',
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	fontSize: 12,
	justifyContent: 'center',
	width: 24,
	height: 24,
	padding: 0
})

export const story = style({
	display: 'grid',
	gridTemplateColumns: '1fr 2fr',
	gap: 32,
	placeItems: 'center'
})

export const section = style({
	display: 'flex',
	flexDirection: 'column',
	gap: 8
})

export const controls = style([
	section,
	{
		background: '#F2F2F2',
		padding: 16
	}
])
