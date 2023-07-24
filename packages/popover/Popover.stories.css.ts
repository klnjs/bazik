import { style } from '@vanilla-extract/css'

export const anchor = style({
	padding: 8,
	border: '1px solid black',
	borderRadius: 4
})

export const trigger = style({
	padding: 8,
	border: '1px solid black',
	borderRadius: 4
})

export const popover = style({
	background: 'white',
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	fontSize: 12,
	justifyContent: 'center',
	padding: 8,
	borderRadius: 4
})

export const layout = style({
	display: 'flex',
	gap: 24
})
