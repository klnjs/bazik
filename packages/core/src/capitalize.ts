export const capitalize = <T extends string>(string: T) => {
	const head = string.charAt(0).toUpperCase()
	const tail = string.slice(1)

	return (head + tail) as Capitalize<T>
}
