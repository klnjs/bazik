import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const avatarRoot = style({
	display: 'flex',
	overflow: 'clip',
	flexShrink: 0,
	width: 40,
	height: 40,
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	boxSizing: 'border-box',
	transition: helpers.transition('color', 'background')
})

export const avatarVariants = styleVariants(vars.coloring.palette, (color) => ({
	color: color.contrast,
	background: color.main
}))

export const avatarImage = style({
	width: '100%',
	height: '100%',
	objectFit: 'contain'
})
