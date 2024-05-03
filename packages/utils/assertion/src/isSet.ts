/* eslint-disable @typescript-eslint/no-explicit-any */

export const isSet = (variable: unknown): variable is Set<any> =>
	variable instanceof Set
