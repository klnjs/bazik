import {
	use,
	createContext as createContextFromReact,
	type Context
} from 'react'

export type CreateContextOptions<T> = {
	name: string
	defaultValue?: T
}

export type UseContextOptions<S extends boolean> = {
	strict?: S
}

export type UseContextReturn<T, S extends boolean> = S extends true
	? T
	: T | undefined

export const createContextError = (name: string) => {
	const error = new Error(
		`use${name} returned \`undefined\`. Did you forget to wrap component within ${name}`
	)
	error.name = `${name}Error`
	return error
}

export const createContext = <T extends object>({
	name = 'Context',
	defaultValue
}: CreateContextOptions<T>) => {
	const Context = createContextFromReact(defaultValue)

	Context.displayName = name

	const useContext = <S extends boolean = true>({
		strict: strictOption
	}: UseContextOptions<S> = {}) => {
		const strict = strictOption ?? true
		const context = use(Context)

		if (!context && strict) {
			const error = createContextError(name)

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

	return [Context, useContext] as [Context<T>, typeof useContext]
}
