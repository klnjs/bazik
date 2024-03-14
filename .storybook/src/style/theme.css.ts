import { createTheme } from '@vanilla-extract/css'
import { colors } from './colors.css'
import { radius } from './radius.css'
import { spacing } from './spacing.css'
import { palette } from './palette.css'

export const [theme, vars] = createTheme({
	colors,
	radius,
	spacing,
	palette
})
