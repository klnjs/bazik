import { toCSSUnit } from './helpers.css'

export const shapes = {
	squircle: (radius: number) =>
		`polygon(${Array.from({ length: 360 })
			.map((_, deg) => (deg * Math.PI) / 180)
			.map((theta) =>
				(['cos', 'sin'] as const).map(
					(fn) =>
						Math.abs(Math[fn](theta)) ** (2 / (50 - radius)) *
							50 *
							Math.sign(Math[fn](theta)) +
						50
				)
			)
			.map((points) =>
				points.map((p) =>
					radius === 0 ? Math.round(p / 100) * 100 : p
				)
			)
			.map(([x, y]) => `${x}% ${y}%`)
			.join(', ')})`,

	octagon: (...input: (string | number)[]) => {
		const inputWithUnits = input.map((value) => toCSSUnit(value))
		const [
			startStart,
			startEnd = startStart,
			endEnd = startStart,
			endStart = startEnd
		] = inputWithUnits

		const zero = '0'
		const full = '100%'
		const points = [
			[zero, startStart],
			[startStart, zero],
			[`calc(${full} - ${startEnd})`, zero],
			[full, startEnd],
			[full, `calc(${full} - ${endEnd})`],
			[`calc(${full} - ${endEnd})`, full],
			[endStart, full],
			[zero, `calc(${full} - ${endStart})`]
		]

		return `polygon(${points.map(([x, y]) => `${x} ${y}`).join(', ')})`
	}
}
