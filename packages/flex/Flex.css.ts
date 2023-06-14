import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'

export const flexProperties = defineProperties({
	properties: {
		display: ['flex', 'inline-flex'],
		flexWrap: ['wrap', 'wrap-reverse', 'nowrap'],
		flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
		alignItems: ['stretch', 'center', 'flex-start', 'flex-end'],
		alignContent: [
			'stretch',
			'center',
			'flex-start',
			'flex-end',
			'space-around',
			'space-between'
		],
		justifyContent: [
			'stretch',
			'center',
			'flex-start',
			'flex-end',
			'space-around',
			'space-between'
		],
		gap: vars.spacing
	}
})

export const flexSprinkles = createSprinkles(flexProperties)

export type FlexSprinkles = Parameters<typeof flexSprinkles>[0]
