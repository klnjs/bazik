export const globals = {
	inherit: 'inherit'
} as const

export const extendWithGlobals = <T extends object>(object: T) => ({
	...globals,
	...object
})
