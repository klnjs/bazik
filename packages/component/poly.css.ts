import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	elevationProperties,
	marginProperties,
	paddingProperties,
	radiusProperties
} from '../theme/properties.css'

export const polySprinkles = createSprinkles(
	marginProperties,
	paddingProperties,
	radiusProperties,
	elevationProperties
)

export type PolySprinkles = Parameters<typeof polySprinkles>[0]
