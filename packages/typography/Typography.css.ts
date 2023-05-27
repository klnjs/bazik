import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'
import { globals } from '../theme/globals.css'
import { helpers } from '../theme/helpers.css'

const typographyColors = {
	primary: vars.palette.text.primary,
	secondary: vars.palette.text.secondary,
	tertiary: vars.palette.surface.tertiary.main,
	quaternary: vars.palette.surface.quaternary.main,
	accent: vars.palette.indicator.accent.main,
	positive: vars.palette.indicator.positive.main,
	negative: vars.palette.indicator.negative.main,
	attention: vars.palette.indicator.attention.main
}

const typographyProperties = defineProperties({
	properties: {
		color: { ...globals, ...typographyColors },
		textAlign: ['start', 'end', 'center', 'justify'],
		textTransform: ['capitalize', 'uppercase', 'lowercase', 'none'],
		textDecoration: ['underline', 'overline', 'line-through', 'none'],
		fontSize: { ...globals, ...vars.font.size },
		fontWeight: { ...globals, ...vars.font.weight }
	} as const
})

export const typographyRoot = style({
	margin: 0,
	padding: 0,
	transition: helpers.transition('color')
})

export const typographySprinkles = createSprinkles(typographyProperties)
