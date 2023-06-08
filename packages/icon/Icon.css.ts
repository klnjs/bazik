import { style } from '@vanilla-extract/css'
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const iconRoot = style({
	display: 'block',
	fill: 'currentColor',
	pointerEvents: 'none',
	width: '1em',
	height: '1em',
	flexShrink: 0,
	userSelect: 'none',
	transition: helpers.transition('fill', 'transform')
})

export const iconSprinkles = createSprinkles(
	defineProperties({
		properties: {
			color: {
				inherit: 'inherit',
				primary: vars.coloring.palette.primary.main,
				secondary: vars.coloring.palette.secondary.main,
				info: vars.coloring.palette.info.main,
				error: vars.coloring.palette.error.main,
				warning: vars.coloring.palette.warning.main,
				success: vars.coloring.palette.success.main,
				neutral: vars.coloring.palette.neutral.main
			},
			size: {
				1: {
					width: vars.spacing[3],
					height: vars.spacing[3]
				},
				2: {
					width: vars.spacing[5],
					height: vars.spacing[5]
				},
				3: {
					width: vars.spacing[7],
					height: vars.spacing[7]
				}
			},
			rotate: {
				0: { transform: `rotate(0)` },
				90: { transform: `rotate(90)` },
				180: { transform: `rotate(180)` },
				270: { transform: `rotate(270)` },
				360: { transform: `rotate(360)` }
			}
		}
	})
)
