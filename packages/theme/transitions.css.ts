import type { CSSProperties } from '@vanilla-extract/css'
import { vars } from './contract.css'

export type TransitionDefinition = {
	property: keyof CSSProperties
	delay?: CSSProperties['transitionDelay']
	timing?: CSSProperties['transitionTimingFunction']
	duration?: CSSProperties['transitionDuration']
}

function toKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const createTransition = (
	...props: (TransitionDefinition | keyof CSSProperties)[]
) =>
	props
		.map((def) => {
			if (typeof def === 'string') {
				return `${toKebabCase(def)} ${vars.transition.timing} ${
					vars.transition.duration
				}`
			}

			const {
				property,
				delay = 0,
				timing = vars.transition.timing,
				duration = vars.transition.duration
			} = def

			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			return `${toKebabCase(property)} ${duration} ${timing} ${delay}`
		})
		.join(', ')
