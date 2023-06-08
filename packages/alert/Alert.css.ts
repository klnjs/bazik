import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const alertRoot = style({
	padding: helpers.spacing(4),
	borderRadius: helpers.radius(3),
	transition: helpers.transition(
		'color',
		'background',
		'border-color',
		'border-radius'
	)
})

export const alertVariants = styleVariants(vars.coloring.palette, (color) => ({
	color: color.contrast,
	background: color.main
}))
