import { defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from './contract.css'

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

export const radiusProperties = defineProperties({
	properties: {
		radius: {
			0: { borderRadius: vars.radius[0] },
			1: { borderRadius: vars.radius[1] },
			2: { borderRadius: vars.radius[2] },
			3: { borderRadius: vars.radius[3] },
			4: { borderRadius: vars.radius[4] }
		}
	}
})

export const elevationProperties = defineProperties({
	properties: {
		elevation: {
			0: { boxShadow: vars.elevation[0] },
			1: { boxShadow: vars.elevation[1] },
			2: { boxShadow: vars.elevation[2] },
			3: { boxShadow: vars.elevation[3] },
			4: { boxShadow: vars.elevation[4] }
		}
	}
})
