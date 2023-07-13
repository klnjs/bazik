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
		open?: boolean
		placement?: Placement
		// portal?: boolean
	}
>

export const Popover = forwardRef<'div', PopoverProps>(
	(
		{
			anchor,
			anchorOrigin = 'end start',
			open = false,
			style,
			placement = 'start start',
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
					getPosition(anchor, anchorOrigin, ref.current, placement)
				)
			}
		}, [anchor, anchorOrigin, open, placement])

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
	anchor: HTMLElement,
	anchorOrigin: Placement,
	element: HTMLElement,
	elementPlacement: Placement
): CSSProperties => {
	const [eBlockProp, eInlineProp] = getLogicalProperties(elementPlacement)
	const [aBlockProp, aInlineProp] = getLogicalProperties(anchorOrigin)
	const elementBlockOffset = getLogicalOffset(element, 'block', eBlockProp)
	const elementInlineOffset = getLogicalOffset(element, 'inline', eInlineProp)
	const anchorBlock = getLogicalPosition(anchor, 'block', aBlockProp)
	const anchorInline = getLogicalPosition(anchor, 'inline', aInlineProp)

	return {
		position: 'fixed',
		insetBlockStart: anchorBlock - elementBlockOffset,
		insetInlineStart: anchorInline - elementInlineOffset
	}
}
