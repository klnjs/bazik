import { isNumber, isString } from './assertion'

export const toData = (value: string | number | boolean | undefined) => {
	if (value === true) {
		return ''
	}

	if (isNumber(value)) {
		return value.toString()
	}

	if (isString(value)) {
		return value
	}

	return undefined
}
