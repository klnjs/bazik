import { style, styleVariants } from '@vanilla-extract/css'

import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const alertRoot = style({
	padding: helpers.spacing(2),
	borderRadius: helpers.radius(3),
	background: vars.palette.background.secondary.main,
	color: vars.palette.surface.secondary.contrast,
	transition: helpers.transition(
		'color',
		'background',
		'box-shadow',
		'border-color',
		'border-radius'
	)
})

export const alertVariants = styleVariants(vars.palette.indicator, (color) => ({
	border: `1px solid ${color.main}`,
	boxShadow: `0 0 0 4px ${color.alpha50}`
}))
