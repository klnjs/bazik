import { defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from './contract.css'

export const box = defineProperties({
	properties: {
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

export const radius = defineProperties({
	properties: {
		radius: Object.entries(vars.radius).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: {
					borderRadius: value
				}
			}),
			{}
		) as { [P in keyof typeof vars.radius]: { borderRadius: string } }
	}
})

export const palette = defineProperties({
	properties: {
		palette: Object.entries(vars.coloring.palette).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: {
					color: value.contrast,
					background: value.main
				}
			}),
			{}
		) as {
			[P in keyof typeof vars.coloring.palette]: {
				color: string
				background: string
			}
		}
	}
})

export const elevation = defineProperties({
	properties: {
		elevation: Object.entries(vars.elevation).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: {
					boxShadow: value
				}
			}),
			{}
		) as { [P in keyof typeof vars.elevation]: { boxShadow: string } }
	}
})
