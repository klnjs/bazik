import { isProperty } from '../core'

export type WeekInfo = {
	firstDay: number
	minimalDays: number
	weekend: number[]
}

export const getWeekInfo = (tag: string): WeekInfo => {
	const locale = new Intl.Locale(tag)

	if (isProperty(locale, 'getWeekInfo')) {
		// @ts-expect-error getWeekInfo not in typescript yet
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return locale.getWeekInfo() as WeekInfo
	}

	// 001 is the "UN M.49" code for "the world"
	// See: https://unstats.un.org/unsd/methodology/m49/
	const { region = '001' } = locale.maximize()

	return {
		firstDay: getFirstDay(region),
		minimalDays: getMinimalDays(region),
		weekend: getWeekend(region)
	}
}

export function getFirstDay(region: string): number {
	if (region.match(/^(mv)$/i)) {
		return 5
	} else if (
		region.match(/^(ae|af|bh|dj|dz|eg|iq|ir|jo|kw|ly|om|qa|sd|sy)$/i)
	) {
		return 6
	} else if (
		region.match(
			/^(ag|as|bd|br|bs|bt|bw|bz|ca|cn|co|dm|do|et|gt|gu|hk|hn|id|il|in|jm|jp|ke|kh|kr|la|mh|mm|mo|mt|mx|mz|ni|np|pa|pe|ph|pk|pr|pt|py|sa|sg|sv|th|tt|tw|um|us|ve|vi|ws|ye|za|zw)$/i
		)
	) {
		return 7
	}

	return 1
}

export function getMinimalDays(region: string): number {
	if (
		region.match(
			/^(ad|at|ax|be|bg|ch|cz|de|dk|ee|es|fi|fj|fo|fr|gb|gf|gg|gi|gp|gr|hu|ie|im|is|it|je|li|lt|lu|mc|mq|nl|no|pl|pt|re|ru|se|sj|sk|sm|va)$/i
		)
	) {
		return 4
	}

	return 1
}

export function getWeekend(region: string): number[] {
	if (region.match(/^(ir)$/i)) {
		return [5]
	} else if (region.match(/^(af)$/i)) {
		return [4, 5]
	} else if (region.match(/^(in|ug)$/i)) {
		return [7]
	} else if (
		region.match(/^(ae|bh|dz|eg|il|iq|jo|kw|ly|om|qa|sa|sd|sy|ye)$/i)
	) {
		return [5, 6]
	}

	return [6, 7]
}
