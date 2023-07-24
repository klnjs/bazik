import {
	offset,
	autoUpdate,
	useRole,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	type Placement
} from '@floating-ui/react'
import { useControllableState } from '../core'

export type UsePopoverOptions = {
	open?: boolean
	modal?: boolean
	offset?: number
	placement?: Placement
	defaultOpen?: boolean
	onOpenChange?: (open: boolean) => void
}

export const usePopover = ({
	open: openProp,
	modal,
	offset: offsetProp = 0,
	placement,
	defaultOpen,
	onOpenChange
}: UsePopoverOptions) => {
	const [open, setOpen] = useControllableState({
		value: openProp,
		defaultValue: defaultOpen,
		onChange: onOpenChange
	})

	const { refs, context, floatingStyles } = useFloating({
		open,
		placement,
		whileElementsMounted: autoUpdate,
		onOpenChange: setOpen,
		middleware: [offset(offsetProp)]
	})

	const { getFloatingProps, getReferenceProps } = useInteractions([
		useRole(context),
		useClick(context),
		useDismiss(context)
	])

	return {
		refs,
		open,
		modal,
		offset,
		setOpen,
		context,
		floatingStyles,
		getFloatingProps,
		getReferenceProps
	}
}
