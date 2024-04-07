import { createVar, style } from '@vanilla-extract/css'
import { vars } from '../style/theme.css'
import { sprinkles } from '../style/sprinkles.css'

export const anchor = style([
	sprinkles({
		paddingBlock: 'medium',
		paddingInline: 'large',
		borderRadius: 'medium',
		color: 'teal11',
		background: 'teal3'
	}),
	{
		border: 'none',
		fontSize: 14,
		marginInline: 64
	}
])

export const trigger = style([
	anchor,
	{
		cursor: 'pointer',
		selectors: {
			'&:hover': {
				background: vars.colors.teal5
			}
		}
	}
])

export const popover = style([
	sprinkles({
		padding: 'large',
		background: 'teal12',
		borderRadius: 'medium'
	}),
	{
		background: 'white',
		border: '1px solid black',
		fontSize: 12
	}
])

export const popoverEnterDuration = createVar()

export const popoverLeaveDuration = createVar()

export const popoverWithTransition = style([
	popover,
	{
		transitionProperty: 'opacity',
		selectors: {
			'&[data-status="mount"]': {
				opacity: 0
			},
			'&[data-status="enter"]': {
				opacity: 1,
				transitionDuration: popoverEnterDuration
			},
			'&[data-status="leave"]': {
				opacity: 0,
				transitionDuration: popoverLeaveDuration
			}
		}
	}
])
