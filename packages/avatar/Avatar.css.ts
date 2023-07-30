import { style } from '@vanilla-extract/css'

export const avatar = style({
	width: 50,
	height: 50,
	display: 'flex',
	overflow: 'hidden',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative'
})

export const image = style({
	width: '100%',
	height: '100%',
	position: 'absolute',
	objectFit: 'cover'
})

export const fallback = style({})
