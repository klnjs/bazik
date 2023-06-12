import { vars } from './contract.css'

export const createTransition = (...input: string[]) =>
	input
		.map(
			(value) =>
				`${value} ${vars.transition.duration} ${vars.transition.easing}`
		)
		.join(', ')
