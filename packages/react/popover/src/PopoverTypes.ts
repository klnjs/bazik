import type { Placement } from '@floating-ui/react'

export type PopoverPlacement = Placement

export type PopoverDuration =
	| number
	| Partial<{
			enter: number
			leave: number
	  }>

export type PopoverStatus = {
	mounted: boolean
	status: 'mount' | 'enter' | 'leave'
}

export type PopoverDismiss = Partial<{
	onFocusOut: boolean
	onEscapeKey: boolean
	onPressOutside: boolean | ((event: MouseEvent) => boolean)
	onAncestorScroll: boolean
}>
