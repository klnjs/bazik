import { useId as useIdFromReact } from 'react'

export const useId = (override?: string) => {
	const id = useIdFromReact()

	return override ?? id
}
