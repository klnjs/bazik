import { useRef, useState, useLayoutEffect, type CSSProperties } from 'react'
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
	type Direction,
	type Placement
} from './usePopoverPosition'
import { useFocusTrap } from './useFocusTrap'
import { useInteractionOutside } from './useInteractionOutside'

export type PopoverProps = AsChildComponentProps<
	'div',
	{
		anchor?: HTMLElement | null
		anchorOrigin?: Placement
		anchorAlignment?: Placement
		open?: boolean
		trap?: boolean
		closeOnEscape?: boolean
		closeOnClickOutside?: boolean
		onClose: () => void
		// portal?: boolean
	}
>

export const Popover = forwardRef<'div', PopoverProps>(
	(
		{
			id: idProp,
			anchor,
			anchorOrigin = 'end start',
			anchorAlignment = 'start start',
			open = false,
			trap = false,
			style,
			closeOnEscape = true,
			closeOnClickOutside = true,
			onClose,
			...otherProps
		},
		forwardedRef
	) => {
		const id = useId(idProp)
		const ref = useRef<HTMLDivElement>(null)
		const [position, setPosition] = useState<CSSProperties>({
			position: 'fixed',
			insetBlockStart: 0,
			insetInlineStart: 0
		})

		useFocusTrap(ref, {
			enabled: open && trap
		})

		useInteractionOutside(ref, onClose, {
			enabled: open && closeOnClickOutside
		})

		useForwardedRef(ref, forwardedRef)

		useLayoutEffect(() => {
			const popover = ref.current

			if (popover && open && anchor) {
				setPosition(
					getPosition(popover, anchor, anchorOrigin, anchorAlignment)
				)
			}
		}, [open, anchor, anchorOrigin, anchorAlignment])

		if (!open) {
			return null
		}

		return (
			<Portal>
				<freya.div
					id={id}
					ref={ref}
					role='dialog'
					style={{ ...position, ...style }}
					tabIndex={trap ? -1 : undefined}
					data-open=''
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

	const anchorDir = getComputedStyle(anchor).direction as Direction
	const anchorBlock = getLogicalPosition(anchor, anchorDir, originBlock)
	const anchorBlockOffset = getLogicalOffset(popover, alignBlock)
	const anchorInline = getLogicalPosition(anchor, anchorDir, originInline)
	const anchorInlineOffset = getLogicalOffset(popover, alignInline)

	return {
		position: 'fixed',
		direction: anchorDir,
		insetBlockStart: anchorBlock - anchorBlockOffset,
		insetInlineStart: anchorInline - anchorInlineOffset
	}
}
