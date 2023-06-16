import { useMemo } from 'react'
import { clsx } from '../core'
import {
	alert,
	alertTitle,
	alertContent,
	alertSprinkles,
	type AlertSprinkles
} from './Alert.css'

export const useAlertStyles = ({ palette = 'primary' }: AlertSprinkles = {}) =>
	useMemo(
		() => ({
			root: clsx(alert, alertSprinkles({ palette })),
			title: alertTitle,
			content: alertContent
		}),
		[palette]
	)
