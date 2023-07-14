import { useRef, useState, useLayoutEffect, type CSSProperties } from 'react'
import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import {
	getLogicalOffset,
	getLogicalPosition,
	getLogicalProperties,
	type Placement
} from './usePopoverPosition'

export type PopoverProps = AsChildComponentProps<
	'dialog',
	{
		anchor?: HTMLElement
		anchorOrigin?: Placement
		anchorAlignment?: Placement
		open?: boolean
		// portal?: boolean
	}
>

export const Popover = forwardRef<'dialog', PopoverProps>(
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
		const ref = useRef<HTMLDialogElement>(null)
		const [position, setPosition] = useState<CSSProperties>()

		// useHotkey('escape', onClose, { enabled: open })
		// useOutside(childRef, onClose, { enabled: open, exclude: anchor })
		// useBodyLock(childRef, { enabled: open && lock })
		// useFocusTrap(childRef, { enabled: open && trap })

		useForwardedRef(ref, forwardedRef)

		useLayoutEffect(() => {
			if (open && anchor && ref.current) {
				ref.current.show()
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
			<freya.dialog
				ref={ref}
				style={{ ...position, ...style }}
				data-open=''
				{...otherProps}
			/>
		)
	}
)

const getPosition = (
	element: HTMLElement,
	anchor: HTMLElement,
	anchorOrigin: Placement,
	anchorAlignment: Placement
): CSSProperties => {
	const [aBlockProp, aInlineProp] = getLogicalProperties(anchorOrigin)
	const [eBlockProp, eInlineProp] = getLogicalProperties(anchorAlignment)
	const anchorBlock = getLogicalPosition(anchor, aBlockProp)
	//const anchorBlockOffset = getLogicalOffset(element, 'block', eBlockProp)
	const anchorInline = getLogicalPosition(anchor, aInlineProp)
	//const anchorInlineOffset = getLogicalOffset(element, 'inline', eInlineProp)

	console.log(anchor.getBoundingClientRect())
	console.log(anchorBlock)

	return {
		border: 0,
		margin: 0,
		position: 'fixed',
		[`inset-${eBlockProp}`]: anchorBlock, //- anchorBlockOffset,
		[`inset-${eInlineProp}`]: anchorInline //- anchorInlineOffset
	} as CSSProperties
}
