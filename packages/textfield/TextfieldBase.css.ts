import { style } from '@vanilla-extract/css'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const textfieldBaseRoot = style({
	display: 'flex',
	alignItems: 'center',
	height: 58,
	overflow: 'hidden',
	outline: '1px solid transparent',
	outlineOffset: -1,
	borderRadius: helpers.radius(3),
	background: vars.coloring.surface.secondary,
	transition: helpers.transition(
		'color',
		'background',
		'border-radius',
		'outline-color'
	),
	':disabled': {
		background: 'transparent',
		outlineColor: vars.coloring.palette.neutral.main
	},
	':focus-within': {
		outlineColor: vars.coloring.palette.info.main
	},
	selectors: {
		'&.invalid': {
			outlineColor: vars.coloring.palette.error.main
		}
	}
})

export const textfieldBaseInput = style({
	width: '100%',
	height: '100%',
	border: 0,
	margin: 0,
	color: 'inherit',
	padding: helpers.spacing(0, 2),
	outline: 0,
	fontSize: 14,
	fontWeight: vars.font.weight.normal,
	fontFamily: 'inherit',
	boxSizing: 'border-box',
	background: 'transparent',
	backgroundClip: 'text',
	'::placeholder': {
		opacity: 1,
		color: vars.coloring.palette.neutral.main
	}
})
