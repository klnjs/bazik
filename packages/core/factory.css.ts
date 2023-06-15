import { style } from '@vanilla-extract/css'
import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	radiusProperties,
	marginProperties,
	paletteProperties,
	paddingProperties,
	elevationProperties
} from '../theme/properties.css'

export const factoryHidden = style({
	display: 'none !important'
})

export const factorySprinkles = createSprinkles(
	radiusProperties,
	marginProperties,
	paletteProperties,
	paddingProperties,
	elevationProperties
)

export type FactorySprinkles = Parameters<typeof factorySprinkles>[0]
