import { useId as useIdReact } from 'react'

export const useId = (override?: string): string => {
	const id = useIdReact()

	return override ?? id
}
