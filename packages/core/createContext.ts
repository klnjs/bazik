import {
	useContext as useContextFromReact,
	createContext as createContextFromReact,
	type Provider
} from 'react'

export type CreateContextOptions<T> = {
	strict?: boolean
	name?: string
	nameOfHook?: string
	nameOfProvider?: string
	defaultValue?: T
}

export type UseContextOptions = {
	strict?: boolean
}

export type CreateContextReturn<T> = [
	Provider<T>,
	(options?: UseContextOptions) => T
]

const createContextError = (
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
	strict: strictOption = true,
	name = 'Context',
	nameOfHook = 'useContext',
	nameOfProvider = 'Provider',
	defaultValue
}: CreateContextOptions<T>) => {
	const Context = createContextFromReact<T | undefined>(defaultValue)

	Context.displayName = name

	const useContext = ({ strict = strictOption }: UseContextOptions = {}) => {
		const context = useContextFromReact(Context)

		if (!context && strict) {
			const error = createContextError(name, nameOfHook, nameOfProvider)

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (Error.captureStackTrace !== undefined) {
				Error.captureStackTrace(error, useContext)
			}

			throw error
		}

		return context
	}

	return [Context.Provider, useContext] as CreateContextReturn<T>
}
