import { useId as useIdFromReact } from 'react'

export const useId = (id?: string) => {
	const idFromReact = useIdFromReact()

	return id ?? idFromReact
}
