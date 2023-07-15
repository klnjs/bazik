import {
	useRef,
	useState,
	useCallback,
	useLayoutEffect,
	type SyntheticEvent,
	type CSSProperties
} from 'react'
import {
	freya,
	forwardRef,
	useId,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { Portal } from '../portal/Portal'
import {
	getLogicalOffset,
	getLogicalPosition,
	getLogicalProperties,
	type Placement
} from './usePopoverPosition'

export type PopoverProps = AsChildComponentProps<
	'dialog',
	{
		anchor?: HTMLElement | null
		anchorOrigin?: Placement
		anchorAlignment?: Placement
		open?: boolean
		modal?: boolean
		onClose: () => void
		// portal?: boolean
	}
>

export const Popover = forwardRef<'dialog', PopoverProps>(
	(
		{
			id: idProp,
			anchor,
			anchorOrigin = 'end start',
			anchorAlignment = 'start start',
			open = false,
			modal = false,
			style,
			onClose,
			...otherProps
		},
		forwardedRef
	) => {
		const id = useId(idProp)
		const ref = useRef<HTMLDialogElement>(null)
		const [position, setPosition] = useState<CSSProperties>()

		const handleClose = useCallback(
			(event: SyntheticEvent<HTMLDialogElement>) => {
				event.preventDefault()
				onClose()
			},
			[onClose]
		)

		useForwardedRef(ref, forwardedRef)

		useLayoutEffect(() => {
			const dialog = ref.current

			if (dialog) {
				if (open && anchor) {
					if (modal) {
						dialog.showModal()
					} else {
						dialog.show()
					}

					setPosition(
						getPosition(
							ref.current,
							anchor,
							anchorOrigin,
							anchorAlignment
						)
					)

					return () => dialog.close()
				}
			}
		}, [open, modal, anchor, anchorOrigin, anchorAlignment])

		if (!open) {
			return null
		}

		return (
			<Portal>
				<freya.dialog
					id={id}
					ref={ref}
					style={{ ...position, ...style }}
					onClose={handleClose}
					onCancel={handleClose}
					{...otherProps}
				/>
			</Portal>
		)
	}
)

const getPosition = (
	popover: HTMLElement,
	anchor: HTMLElement,
	anchorOrigin: Placement,
	anchorAlignment: Placement
): CSSProperties => {
	const [originBlock, originInline] = getLogicalProperties(anchorOrigin)
	const [alignBlock, alignInline] = getLogicalProperties(anchorAlignment)

	const anchorDir = getComputedStyle(anchor).direction
	const anchorBlock = getLogicalPosition(anchor, anchorDir, originBlock)
	const anchorBlockOffset = getLogicalOffset(popover, alignBlock)
	const anchorInline = getLogicalPosition(anchor, anchorDir, originInline)
	const anchorInlineOffset = getLogicalOffset(popover, alignInline)

	return {
		margin: 0,
		position: 'fixed',
		direction: anchorDir,
		insetBlockStart: anchorBlock - anchorBlockOffset,
		insetBlockEnd: 'auto',
		insetInlineStart: anchorInline - anchorInlineOffset,
		insetInlineEnd: 'auto'
	} as CSSProperties
}
