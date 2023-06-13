import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	elevationProperties,
	marginProperties,
	paddingProperties,
	radiusProperties
} from '../theme/properties.css'

export const factorySprinkles = createSprinkles(
	marginProperties,
	paddingProperties,
	radiusProperties,
	elevationProperties
)

export type FactorySprinkles = Parameters<typeof factorySprinkles>[0]
