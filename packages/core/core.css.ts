import { style } from '@vanilla-extract/css'
import { createSprinkles } from '@vanilla-extract/sprinkles'
import {
	radiusProperties,
	marginProperties,
	paletteProperties,
	paddingProperties,
	elevationProperties
} from '../theme/properties.css'

export const coreHidden = style({
	display: 'none !important'
})

export const coreSprinkles = createSprinkles(
	radiusProperties,
	marginProperties,
	paletteProperties,
	paddingProperties,
	elevationProperties
)

export type CoreSprinkles = Parameters<typeof coreSprinkles>[0]
