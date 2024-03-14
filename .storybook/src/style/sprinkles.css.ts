import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from './theme.css'

const flexProps = defineProperties({
	properties: {
		display: ['none', 'flex', 'block', 'inline'],
		gap: vars.spacing,
		flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
		alignItems: {
			stretch: {
				alignItems: 'stretch'
			},
			start: {
				alignItems: 'flex-start'
			},
			center: {
				alignItems: 'center'
			},
			end: {
				alignItems: 'flex-end'
			}
		},
		justifyContent: {
			stretch: {
				alignItems: 'stretch'
			},
			start: {
				alignItems: 'flex-start'
			},
			center: {
				alignItems: 'center'
			},
			end: {
				alignItems: 'flex-end'
			},
			'space-around': {
				alignItems: 'space-around'
			},
			'space-between': {
				alignItems: 'space-between'
			}
		}
	},
	shorthands: {
		placeItems: ['alignItems', 'justifyContent']
	}
})

const paddingProps = defineProperties({
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

const marginProps = defineProperties({
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

const radiusProps = defineProperties({
	properties: {
		borderStartStartRadius: vars.radius,
		borderStartEndRadius: vars.spacing,
		borderEndEndRadius: vars.spacing,
		borderEndStartRadius: vars.spacing
	},
	shorthands: {
		borderRadius: [
			'borderStartStartRadius',
			'borderStartEndRadius',
			'borderEndEndRadius',
			'borderEndStartRadius'
		]
	}
})

const colorProps = defineProperties({
	properties: {
		color: vars.colors,
		background: vars.colors
	}
})

export const sprinkles = createSprinkles(
	flexProps,
	colorProps,
	radiusProps,
	marginProps,
	paddingProps
)
