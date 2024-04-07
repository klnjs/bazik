import {
	useContext as useContextFromReact,
	createContext as createContextFromReact,
	type Provider
} from 'react'

export type CreateContextOptions<T> = {
	name: string
	nameOfHook: string
	nameOfProvider: string
	defaultValue?: T
}

export type UseContextOptions<S extends boolean> = {
	strict?: S
}

export type UseContextReturn<T, S extends boolean> = S extends true
	? T
	: T | undefined

export const createContextError = (
	name: string,
	nameOfHook: string,
	nameOfProvider: string
) => {
	const error = new Error(
		`${nameOfHook} returned \`undefined\`. Did you forget to wrap component within ${nameOfProvider}`
	)
	error.name = `${name}Error`
	return error
}

export const createContext = <T extends object>({
	name = 'Context',
	nameOfHook = 'useContext',
	nameOfProvider = 'Provider',
	defaultValue
}: CreateContextOptions<T>) => {
	const Context = createContextFromReact(defaultValue)

	Context.displayName = name

	const useContext = <S extends boolean = true>({
		strict: strictOption
	}: UseContextOptions<S> = {}) => {
		const strict = strictOption ?? true
		const context = useContextFromReact(Context)

		if (!context && strict) {
			const error = createContextError(name, nameOfHook, nameOfProvider)

			// This is a V8 engine specific API
			// See: https://v8.dev/docs/stack-trace-api#stack-trace-collection-for-custom-exceptions
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (Error.captureStackTrace !== undefined) {
				Error.captureStackTrace(error, useContext)
			}

			throw error
		}

		return context as UseContextReturn<T, S>
	}

	return [Context.Provider, useContext] as [Provider<T>, typeof useContext]
}
