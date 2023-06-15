import { style } from '@vanilla-extract/css'
import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	radiusProperties,
	marginProperties,
	paletteProperties,
	paddingProperties,
	elevationProperties
} from '../theme/properties.css'

export const hidden = style({
	display: 'none !important'
})

export const sprinkles = createSprinkles(
	radiusProperties,
	marginProperties,
	paletteProperties,
	paddingProperties,
	elevationProperties
)

export type Sprinkles = Parameters<typeof sprinkles>[0]
