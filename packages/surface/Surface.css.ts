import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'
import { box, radius, elevation } from '../theme/sprinkles.css'

const properties = defineProperties({
	properties: {
		color: Object.entries(vars.coloring.surface).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: {
					backgroundColor: value
				}
			}),
			{}
		) as {
			[P in keyof typeof vars.coloring.surface]: {
				backgroundColor: string
			}
		}
	}
})

export const sprinkles = createSprinkles(box, radius, elevation, properties)
