import { style } from '@vanilla-extract/css'
import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const accordionPanelRoot = style({
	transition: helpers.transition('border-color'),
	borderBlockEnd: `1px solid ${vars.coloring.palette.neutral.main}`,
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
			outlineColor: vars.coloring.palette.info.main
		}
	}
})

export const accordionPanelInner = style({
	padding: 4,
	paddingBlockEnd: helpers.spacing(2.5),
	selectors: {
		[`${accordionPanelRoot}:last-child &`]: {
			margin: 0
		}
	}
})
