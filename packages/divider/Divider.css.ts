import { style } from '@vanilla-extract/css'

import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const dividerRoot = style({
	width: '100%',
	height: 1,
	border: 0,
	margin: 0,
	padding: 0,
	background: vars.palette.surface.secondary.main,
	transition: helpers.transition('background')
})
