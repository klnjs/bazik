import { style, styleVariants } from '@vanilla-extract/css'
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

const cardProperties = defineProperties({
	properties: {
		boxShadow: vars.elevation,
		marginBlockStart: vars.spacing,
		marginBlockEnd: vars.spacing,
		marginInlineStart: vars.spacing,
		marginInlineEnd: vars.spacing,
		paddingBlockStart: vars.spacing,
		paddingBlockEnd: vars.spacing,
		paddingInlineStart: vars.spacing,
		paddingInlineEnd: vars.spacing
	},
	shorthands: {
		margin: [
			'marginBlockStart',
			'marginBlockEnd',
			'marginInlineStart',
			'marginInlineEnd'
		],
		marginBlock: ['marginBlockStart', 'marginBlockEnd'],
		marginInline: ['marginInlineStart', 'marginInlineEnd'],
		padding: [
			'paddingBlockStart',
			'paddingBlockEnd',
			'paddingInlineStart',
			'paddingInlineEnd'
		],
		paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
		paddingInline: ['paddingInlineStart', 'paddingInlineEnd']
	}
})

export const cardSprinkels = createSprinkles(cardProperties)

export const cardRoot = style({
	boxSizing: 'border-box',
	borderRadius: helpers.radius(4)
})

export const cardVariants = styleVariants(vars.coloring.surface, (color) => ({
	background: color
}))
