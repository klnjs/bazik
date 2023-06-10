import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	elevationProperties,
	marginProperties,
	paddingProperties,
	radiusProperties
} from '../theme/properties.css'

export const boxSprinkles = createSprinkles(
	marginProperties,
	paddingProperties,
	radiusProperties,
	elevationProperties
)

export type BoxSprinkles = Parameters<typeof boxSprinkles>[0]
