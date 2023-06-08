import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'

const color = Object.entries(vars.coloring.surface).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: {
			backgroundColor: value
		}
	}),
	{}
) as { [P in keyof typeof vars.coloring.surface]: { backgroundColor: string } }

const radius = Object.entries(vars.radius).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: {
			borderRadius: value
		}
	}),
	{}
) as { [P in keyof typeof vars.radius]: { borderRadius: string } }

const elevation = Object.entries(vars.elevation).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: {
			boxShadow: value
		}
	}),
	{}
) as { [P in keyof typeof vars.elevation]: { boxShadow: string } }

const properties = defineProperties({
	properties: {
		color,
		radius,
		elevation,
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

export const surfaceSprinkels = createSprinkles(properties)
