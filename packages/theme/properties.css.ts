import { defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from './contract.css'
import { mapObject } from './helpers.css'

export const marginProperties = defineProperties({
	properties: {
		marginBlockStart: vars.spacing,
		marginBlockEnd: vars.spacing,
		marginInlineStart: vars.spacing,
		marginInlineEnd: vars.spacing
	},
	shorthands: {
		margin: [
			'marginBlockStart',
			'marginBlockEnd',
			'marginInlineStart',
			'marginInlineEnd'
		],
		marginBlock: ['marginBlockStart', 'marginBlockEnd'],
		marginInline: ['marginInlineStart', 'marginInlineEnd']
	}
})

export const paddingProperties = defineProperties({
	properties: {
		paddingBlockStart: vars.spacing,
		paddingBlockEnd: vars.spacing,
		paddingInlineStart: vars.spacing,
		paddingInlineEnd: vars.spacing
	},
	shorthands: {
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

export const paletteProperties = defineProperties({
	properties: {
		palette: mapObject(vars.coloring.palette, (value) => ({
			color: value.contrast,
			background: value.main
		}))
	}
})

export const radiusProperties = defineProperties({
	properties: {
		radius: mapObject(vars.radius, (value) => ({
			borderRadius: value
		}))
	}
})

export const elevationProperties = defineProperties({
	properties: {
		elevation: mapObject(vars.elevation, (value) => ({
			boxShadow: value
		}))
	}
})
