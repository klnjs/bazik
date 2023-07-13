import {
	useRef,
	useState,
	useLayoutEffect,
	useImperativeHandle,
	type CSSProperties
} from 'react'
import { freya, type AsChildComponentProps, forwardRef } from '../core'
import { Portal } from '../portal/Portal'
import {
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
			// portal = true,
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

		useImperativeHandle(
			forwardedRef,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			() => ref.current!
		)

		if (!open) {
			return null
		}

		return (
			<Portal>
				<freya.div
					ref={ref}
					style={{ ...position, ...style }}
					data-open=''
					{...otherProps}
				/>
			</Portal>
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
	const anchorBlock = getLogicalPosition(anchor, 'block', aBlockProp)
	const anchorBlockOffset = getLogicalOffset(element, 'block', eBlockProp)
	const anchorInline = getLogicalPosition(anchor, 'inline', aInlineProp)
	const anchorInlineOffset = getLogicalOffset(element, 'inline', eInlineProp)

	return {
		position: 'fixed',
		insetBlockStart: anchorBlock - anchorBlockOffset,
		insetInlineStart: anchorInline - anchorInlineOffset
	}
}
