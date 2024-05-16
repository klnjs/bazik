import type { ReactNode } from 'react'
import { FloatingPortal } from '@floating-ui/react'
import { usePopoverContext } from './PopoverContext'

export type PopoverPortalProps = {
	container?: HTMLElement
	children: ReactNode
}

export const PopoverPortal = ({ container, children }: PopoverPortalProps) => {
	const { mounted } = usePopoverContext()

	if (!mounted) {
		return null
	}

	return <FloatingPortal root={container}>{children}</FloatingPortal>
}
