import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react'
import { poly, forwardRef, useMergeRefs, type CoreProps } from '@klnjs/core'
import { usePopoverContext } from './PopoverContext'

export type PopoverContentProps = CoreProps<'div'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>(
	({ style, ...otherProps }, forwardedRef) => {
		const {
			root,
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

		if (!mounted) {
			return null
		}

		return (
			<FloatingPortal id={root}>
				<FloatingFocusManager
					modal={modal}
					guards={!modal}
					context={context}
					closeOnFocusOut={closeOnFocusOut}
					visuallyHiddenDismiss={modal}
				>
					<poly.div
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
