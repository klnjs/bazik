import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react'
import { freya, forwardRef, useMergeRefs, type CoreProps } from '../core'
import { usePopoverContext } from './PopoverContext'

export type PopoverContentProps = CoreProps<'div'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>(
	({ style, ...otherProps }, forwardedRef) => {
		const { refs, modal, context, getFloatingProps } = usePopoverContext()
		const ref = useMergeRefs(refs.setFloating, forwardedRef)

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
