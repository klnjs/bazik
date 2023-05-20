import { style, styleVariants } from '@vanilla-extract/css'

import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const buttonRoot = style({
	height: 40,
	padding: helpers.spacing(0, 4),
	borderRadius: helpers.radius(3),
	fontSize: 14,
	fontWeight: vars.font.weight.medium,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: helpers.transition(
		'color',
		'background',
		'opacity',
		'border-radius'
	),
	':focus-visible': {
		opacity: 0.5
	},
	'@media': {
		'(hover: hover)': {
			':hover': {
				opacity: 0.5
			}
		}
	}
})

export const buttonVariants = styleVariants(vars.palette.surface, (color) => ({
	color: color.contrast,
	background: color.main,
	selectors: {
		'&.disabled': {
			background: vars.palette.surface.secondary.main,
			color: vars.palette.surface.secondary.contrast
		}
	}
}))
