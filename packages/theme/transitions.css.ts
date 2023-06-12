import type { CSSProperties } from '@vanilla-extract/css'
import { vars } from './contract.css'

export type TransitionDefinition = {
	property: keyof CSSProperties
	delay?: CSSProperties['transitionDelay']
	timing?: CSSProperties['transitionTimingFunction']
	duration?: CSSProperties['transitionDuration']
}

export const createTransition = (
	...props: Array<TransitionDefinition | keyof CSSProperties>
) =>
	props
		.map((def) => {
			if (typeof def === 'string') {
				return `${def} ${vars.transition.timing} ${vars.transition.duration}`
			}

			const {
				property,
				delay = 0,
				timing = vars.transition.timing,
				duration = vars.transition.duration
			} = def

			return `${property} ${duration} ${timing} ${delay}`
		})
		.join(', ')
