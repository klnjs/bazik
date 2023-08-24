export const toData = (value: string | boolean | undefined) => {
	if (value === true) {
		return ''
	}

	return value
}
