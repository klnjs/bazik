import {
	useRef,
	useState,
	useLayoutEffect,
	useImperativeHandle,
	type CSSProperties
} from 'react'
import { freya, type AsChildComponentProps, forwardRef } from '../core'
import { Portal } from '../portal/Portal'

type PlacementAxis = 'x' | 'y'

type PlacementAlign = 'start' | 'center' | 'end'

type Placement = PlacementAlign | `${PlacementAlign} ${PlacementAlign}`

const axisToSize = (axis: PlacementAxis) => (axis === 'y' ? 'height' : 'width')

const getOrigin = (
	rect: DOMRect,
	axis: PlacementAxis,
	placement: PlacementAlign
) => {
	switch (placement) {
		case 'center':
			return rect[axis] + rect[axisToSize(axis)] / 2
		case 'end':
			return rect[axis === 'y' ? 'bottom' : 'right']
		default:
			return rect[axis === 'y' ? 'top' : 'left']
	}
}

const getOffset = (
	rect: DOMRect,
	axis: PlacementAxis,
	placement: PlacementAlign
) => {
	switch (placement) {
		case 'center':
			return rect[axisToSize(axis)] / 2
		case 'end':
			return rect[axisToSize(axis)]
		default:
			return 0
	}
}

const splitPlacement = (placement: Placement) =>
	placement.split(' ') as [PlacementAlign, PlacementAlign]

const getPosition = (
	anchor: HTMLElement,
	anchorOrigin: Placement,
	element: HTMLElement,
	elementPlacement: Placement,
	viewport: HTMLElement = document.body
): CSSProperties => {
	const arect = anchor.getBoundingClientRect()
	const erect = element.getBoundingClientRect()
	const vrect = viewport.getBoundingClientRect()

	const [alignY, alignX] = splitPlacement(elementPlacement)
	const [originY, originX] = splitPlacement(anchorOrigin)

	const offsetTop = getOffset(erect, 'y', alignY)
	const offsetLeft = getOffset(erect, 'x', alignX)
	const originTop = getOrigin(arect, 'y', originY)
	const originLeft = getOrigin(arect, 'x', originX)

	console.log(originX, originLeft, originY, offsetLeft)

	const top = Math.min(vrect.height - erect.height, originTop - offsetTop)
	const left = Math.min(vrect.width - erect.width, originLeft - offsetLeft)

	return {
		position: 'fixed',
		top,
		left
	}
}

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
				console.log(
					'calc',
					anchor,
					anchorOrigin,
					ref.current,
					placement
				)
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

		console.log(position)

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
