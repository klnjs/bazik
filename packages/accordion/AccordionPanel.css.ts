import { style } from '@vanilla-extract/css'

import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const accordionPanelRoot = style({
	transition: helpers.transition('border-color'),
	borderBlockEnd: `1px solid ${vars.palette.surface.secondary.main}`,
	':last-child': {
		border: 'none'
	}
})

export const accordionPanelHeader = style({
	cursor: 'pointer',
	padding: helpers.spacing(2, 0)
})

export const accordionPanelIcon = style({
	outline: '1px solid transparent',
	outlineOffset: -1,
	borderRadius: helpers.radius(2),
	transition: helpers.transition('all'),
	selectors: {
		[`${accordionPanelHeader}:focus-visible &`]: {
			outlineColor: vars.palette.indicator.accent.main,
			boxShadow: `0 0 0 4px ${vars.palette.indicator.accent.alpha50}`
		}
	}
})

export const accordionPanelInner = style({
	padding: 4,
	paddingBlockEnd: `calc(${vars.spacing[2]} + 4px)`,
	selectors: {
		[`${accordionPanelRoot}:last-child &`]: {
			margin: 0
		}
	}
})
