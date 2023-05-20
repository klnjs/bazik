import { vars } from './contract.css'

export const helpers = {
	radius: (...input: Array<number>) =>
		input.map((value) => `calc(${vars.radius[1]} * ${value})`).join(' '),
	spacing: (...input: Array<number>) =>
		input.map((value) => `calc(${vars.spacing[1]} * ${value})`).join(' '),
	transition: (...input: Array<string>) =>
		input
			.map(
				(value) =>
					`${value} ${vars.transition.duration} ${vars.transition.easing}`
			)
			.join(', ')
}

export const toCSSUnit = (
	value: string | number,
	unit: 'px' | 'pt' | 'vw' | 'vh' | 'em' | 'rem' = 'px'
) => {
	if (typeof value === 'string') {
		return value
	}

	if (value === 0) {
		return '0'
	}

	return `${value}${unit}`
}
