import { isNumber, isString } from './assertion'

export function toData(value: string | number): string
export function toData(value: boolean): '' | undefined
export function toData(value: undefined): undefined
export function toData(value: string | number | boolean | undefined) {
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
