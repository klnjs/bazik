import { style } from '@vanilla-extract/css'
import { createSprinkles } from '@vanilla-extract/sprinkles'
import { paletteProperties } from '../theme/properties.css'
import { createTransition } from '../theme/transitions.css'
import { vars } from '../theme/contract.css'

export const alert = style({
	display: 'flex',
	gap: vars.spacing[2],
	padding: vars.spacing[2],
	borderRadius: vars.radius[2],
	overflow: 'hidden',
	transition: createTransition('color', 'background', 'borderRadius'),
	flexDirection: 'column',
	position: 'relative'
})

export const alertSprinkles = createSprinkles(paletteProperties)

export type AlertSprinkles = Parameters<typeof alertSprinkles>[0]

export const alertTitle = style({})

export const alertContent = style({})
