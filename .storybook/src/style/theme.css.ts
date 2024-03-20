import { createGlobalTheme } from '@vanilla-extract/css'
import { colors } from './colors.css'
import { radius } from './radius.css'
import { spacing } from './spacing.css'
import { palette } from './palette.css'

export const vars = createGlobalTheme(':root', {
	colors,
	radius,
	spacing,
	palette
})
