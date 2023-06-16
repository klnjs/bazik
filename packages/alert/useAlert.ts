import { useMemo } from 'react'

export type UseAlertOptions = NonNullable<unknown>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAlert = (options: UseAlertOptions) =>
	useMemo(
		() => ({
			rootProps: { role: 'alert' },
			titleProps: {},
			contentProps: {}
		}),
		[]
	)
