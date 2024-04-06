import { isNumber, isString } from '@klnjs/assertion'

export function toData(value: string | number | boolean | undefined) {
	if (value === true) {
		return ''
	}

	if (isNumber(value) || isString(value)) {
		return value.toString()
	}

	return undefined
}
