import { style } from '@vanilla-extract/css'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const radioBaseRoot = style({
	position: 'relative',
	borderRadius: '50%',
	width: 24,
	height: 24
})

export const radioBaseInput = style({
	position: 'absolute',
	boxSizing: 'border-box',
	inset: 0,
	margin: 0,
	padding: 0,
	outline: '1px solid transparent',
	outlineOffset: -1,
	background: vars.coloring.surface.secondary,
	cursor: 'pointer',
	appearance: 'none',
	transition: helpers.transition('color', 'background', 'outline-color'),
	borderRadius: 'inherit',
	':disabled': {
		background: 'transparent',
		outlineColor: vars.coloring.palette.neutral.main
	},
	':focus-visible': {
		outlineColor: vars.coloring.palette.info.main
	},
	selectors: {
		'&.invalid': {
			outlineColor: vars.coloring.palette.error.main
		}
	}
})

export const radioBaseCircle = style({
	inset: 8,
	borderRadius: 'inherit',
	position: 'absolute',
	pointerEvents: 'none',
	background: vars.coloring.palette.info.main,
	transform: 'scale(0)',
	transition: helpers.transition('background', 'transform'),
	selectors: {
		[`${radioBaseInput}:checked + &`]: {
			transform: 'scale(1)'
		},
		[`${radioBaseInput}:disabled + &`]: {
			background: vars.coloring.surface.secondary
		}
	}
})
