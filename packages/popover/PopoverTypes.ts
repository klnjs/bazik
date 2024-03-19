import type { Placement, UseTransitionStatusProps } from '@floating-ui/react'

export type PopoverPlacement = Placement
export type PopoverDuration = UseTransitionStatusProps['duration']
export type PopoverDismiss = Partial<{
	onEscapeKey: boolean
	onFocusOut: boolean
	onPressHidden: boolean | string
	onPressOutside: boolean | ((event: MouseEvent) => boolean)
	onAncestorScroll: boolean
}>
