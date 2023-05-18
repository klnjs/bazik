import { style } from '@vanilla-extract/css'

import { vars } from '../theme/contract.css'
import { helpers } from '../theme/helpers.css'

export const textfieldRoot = style({
	height: 58,
	position: 'relative',
	display: 'flex',
	gap: helpers.spacing(1),
	borderRadius: helpers.radius(3),
	flexDirection: 'column'
})

export const textfieldText = style({
	display: 'block',
	position: 'absolute',
	insetBlockStart: '50%',
	insetInlineStart: helpers.spacing(2),
	whiteSpace: 'nowrap',
	pointerEvents: 'none',
	transition: helpers.transition('transform'),
	transformOrigin: 'left top 0px',
	transform: `scale(1.2) translateY(-50%)`,
	selectors: {
		'&.active': {
			transform: `scale(1) translateY(-16px)`
		},
		[`${textfieldRoot}:focus-within &`]: {
			transform: `scale(1) translateY(-16px)`
		}
	}
})

export const textfieldLabel = style({
	color: vars.palette.text.secondary,
	transition: helpers.transition('color', 'transform'),
	selectors: {
		[`${textfieldRoot}:focus-within &`]: {
			color: vars.palette.text.primary
		}
	}
})

export const textfieldInput = style({
	paddingBlockStart: 26,
	paddingBlockEnd: 8
})
