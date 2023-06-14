import { style } from '@vanilla-extract/css'
import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	elevationProperties,
	marginProperties,
	paddingProperties,
	radiusProperties
} from '../theme/properties.css'

export const factoryHidden = style({
	display: 'none !important'
})

export const factorySprinkles = createSprinkles(
	marginProperties,
	paddingProperties,
	radiusProperties,
	elevationProperties
)

export type FactorySprinkles = Parameters<typeof factorySprinkles>[0]
