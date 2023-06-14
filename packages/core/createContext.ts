import { createContext as cc, useContext as uc } from 'react'

export type CreateContextOptions<T> = {
	strict?: boolean
	name?: string
	nameOfHook?: string
	nameOfProvider?: string
	defaultValue?: T
}

export type CreateContextReturn<T> = [
	React.Provider<T>,
	() => T,
	React.Context<T>
]

const createContextError = (
	name: string,
	nameOfHook: string,
	nameOfProvider: string
) => {
	const error = new Error(
		`${nameOfHook} returned \`undefined\`. Did you forget to wrap component within ${nameOfProvider}`
	)
	error.name = `ContextError`
	return error
}

export const createContext = <T extends object>({
	strict = true,
	name = 'Context',
	nameOfHook = 'useContext',
	nameOfProvider = 'Provider',
	defaultValue
}: CreateContextOptions<T>) => {
	const Context = cc<T | undefined>(defaultValue)

	Context.displayName = name

	const useContext = () => {
		const context = uc(Context)

		if (!context && strict) {
			const error = createContextError(name, nameOfHook, nameOfProvider)
			Error.captureStackTrace(error, useContext)
			throw error
		}

		return context
	}

	return [Context.Provider, useContext, Context] as CreateContextReturn<T>
}
