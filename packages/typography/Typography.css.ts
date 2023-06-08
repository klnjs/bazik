import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const typographyProperties = defineProperties({
	properties: {
		color: {
			inherit: 'inherit',
			primary: vars.coloring.palette.primary.main,
			secondary: vars.coloring.palette.secondary.main,
			info: vars.coloring.palette.info.main,
			error: vars.coloring.palette.error.main,
			warning: vars.coloring.palette.warning.main,
			success: vars.coloring.palette.success.main
		},
		textAlign: ['start', 'end', 'center', 'justify'],
		textTransform: ['capitalize', 'uppercase', 'lowercase', 'none'],
		textDecoration: ['underline', 'overline', 'line-through', 'none'],
		fontSize: { inherit: 'inherit', ...vars.font.size },
		fontWeight: { inherit: 'inherit', ...vars.font.weight }
	}
})

export const typographyRoot = style({
	margin: 0,
	padding: 0,
	transition: helpers.transition('color')
})

export const typographySprinkles = createSprinkles(typographyProperties)
