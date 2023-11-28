import { useState, type SetStateAction } from 'react'
import {
	offset as offsetMiddleware,
	autoUpdate,
	useRole,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	type Placement
} from '@floating-ui/react'
import { useStateControllable } from '../core'

export type UsePopoverOptions = {
	open?: boolean
	modal?: boolean
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

export const usePopover = ({
	open: openProp,
	modal,
	defaultOpen,
	onOpenChange
}: UsePopoverOptions) => {
	const [open, setOpen] = useStateControllable({
		value: openProp,
		defaultValue: defaultOpen,
		onChange: onOpenChange as (value: SetStateAction<boolean>) => void
	})

	const [offset, setOffset] = useState<number>()

	const [placement, setPlacement] = useState<Placement>()

	const { refs, context, floatingStyles } = useFloating({
		open,
		placement,
		whileElementsMounted: autoUpdate,
		onOpenChange: setOpen,
		middleware: [offsetMiddleware(offset)]
	})

	const { getFloatingProps, getReferenceProps } = useInteractions([
		useRole(context),
		useClick(context),
		useDismiss(context)
	])

	return {
		refs,
		modal,
		context,
		floatingStyles,
		open,
		setOpen,
		offset,
		setOffset,
		placement,
		setPlacement,
		getFloatingProps,
		getReferenceProps
	}
}
