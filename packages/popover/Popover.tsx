import { useRef, useState, useLayoutEffect, type CSSProperties } from 'react'
import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { Portal } from '../portal/Portal'
import {
	getLogicalProp,
	getLogicalOffset,
	getLogicalPosition,
	getLogicalProperties,
	type Placement
} from './usePopoverPosition'

export type PopoverProps = AsChildComponentProps<
	'div',
	{
		anchor?: HTMLElement
		anchorOrigin?: Placement
		anchorAlignment?: Placement
		open?: boolean
		// portal?: boolean
	}
>

export const Popover = forwardRef<'div', PopoverProps>(
	(
		{
			anchor,
			anchorOrigin = 'end start',
			anchorAlignment = 'start start',
			open = false,
			style,
			...otherProps
		},
		forwardedRef
	) => {
		// const viewport = useViewport()
		const ref = useRef<HTMLDivElement>(null)
		const [position, setPosition] = useState<CSSProperties>()

		// useHotkey('escape', onClose, { enabled: open })
		// useOutside(childRef, onClose, { enabled: open, exclude: anchor })
		// useBodyLock(childRef, { enabled: open && lock })
		// useFocusTrap(childRef, { enabled: open && trap })

		useForwardedRef(ref, forwardedRef)

		useLayoutEffect(() => {
			if (open && anchor && ref.current) {
				setPosition(
					getPosition(
						ref.current,
						anchor,
						anchorOrigin,
						anchorAlignment
					)
				)
			}
		}, [open, anchor, anchorOrigin, anchorAlignment])

		if (!open) {
			return null
		}

		return (
			<Portal>
				<freya.div
					ref={ref}
					role='dialog'
					style={{ ...position, ...style }}
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
	const insetBlockProp = getLogicalProp(originBlock)
	const insetInlineProp = getLogicalProp(originInline)
	const anchorBlock = getLogicalPosition(anchor, originBlock)
	const anchorBlockOffset = getLogicalOffset(popover, originBlock, alignBlock)
	const anchorInline = getLogicalPosition(anchor, originInline)
	const anchorInlineOffset = getLogicalOffset(
		popover,
		originInline,
		alignInline
	)

	return {
		position: 'fixed',
		[insetBlockProp]: anchorBlock - anchorBlockOffset,
		[insetInlineProp]: anchorInline - anchorInlineOffset
	} as CSSProperties
}
