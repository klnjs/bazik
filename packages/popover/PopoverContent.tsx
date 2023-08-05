import { useLayoutEffect } from 'react'
import {
	FloatingPortal,
	FloatingFocusManager,
	type Placement
} from '@floating-ui/react'
import { freya, forwardRef, useMergeRefs, type CoreProps } from '../core'
import { usePopoverContext } from './PopoverContext'

export type PopoverContentProps = CoreProps<
	'div',
	{
		offset?: number
		placement?: Placement
	}
>

export const PopoverContent = forwardRef<'div', PopoverContentProps>(
	({ style, offset, placement, ...otherProps }, forwardedRef) => {
		const {
			refs,
			modal,
			context,
			setOffset,
			setPlacement,
			getFloatingProps
		} = usePopoverContext()
		const ref = useMergeRefs(refs.setFloating, forwardedRef)

		useLayoutEffect(() => {
			setOffset(offset)
		}, [offset, setOffset])

		useLayoutEffect(() => {
			setPlacement(placement)
		}, [placement, setPlacement])

		if (!context.open) {
			return null
		}

		return (
			<FloatingPortal>
				<FloatingFocusManager
					modal={modal}
					guards={!modal}
					context={context}
				>
					<freya.div
						ref={ref}
						style={{ ...context.floatingStyles, ...style }}
						// aria-labelledby={context.labelId}
						// aria-describedby={context.descriptionId}
						{...getFloatingProps(otherProps)}
					/>
				</FloatingFocusManager>
			</FloatingPortal>
		)
	}
)
