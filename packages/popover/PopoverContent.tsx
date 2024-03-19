import { useMemo } from 'react'
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react'
import { freya, forwardRef, useMergeRefs, isSet, type CoreProps } from '../core'
import { usePopoverContext } from './PopoverContext'

export type PopoverContentProps = CoreProps<'div'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>(
	({ style, ...otherProps }, forwardedRef) => {
		const {
			refs,
			modal = false,
			status,
			dismiss,
			mounted,
			placement,
			context,
			labelId,
			descriptionId,
			getFloatingProps
		} = usePopoverContext()

		const ref = useMergeRefs(refs.setFloating, forwardedRef)
		const closeOnFocusOut = dismiss?.onFocusOut
		const closeOnPressHidden = dismiss?.onPressHidden
		const visuallyHiddenDismiss = useMemo(() => {
			if (isSet(closeOnPressHidden)) {
				return closeOnPressHidden
			}

			return modal
		}, [modal, closeOnPressHidden])

		if (!mounted) {
			return null
		}

		return (
			<FloatingPortal>
				<FloatingFocusManager
					modal={modal}
					guards={!modal}
					context={context}
					closeOnFocusOut={closeOnFocusOut}
					visuallyHiddenDismiss={visuallyHiddenDismiss}
				>
					<freya.div
						ref={ref}
						style={{ ...context.floatingStyles, ...style }}
						aria-labelledby={labelId}
						aria-describedby={descriptionId}
						data-status={status}
						data-placement={placement}
						{...getFloatingProps(otherProps)}
					/>
				</FloatingFocusManager>
			</FloatingPortal>
		)
	}
)
