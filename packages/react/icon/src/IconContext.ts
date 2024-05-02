import { createContext } from '@klnjs/core'
import type { useIcon } from './useIcon'

export type UseIconContext = ReturnType<typeof useIcon>

export const [IconContext, useIconContext] = createContext<UseIconContext>({
	name: 'IconContext'
})
