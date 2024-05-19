import { asDataProp, poly, useRefComposed, type PolyProps } from '@klnjs/core'
import { FloatingPortal, FloatingFocusManager } from '@floating-ui/react'
import { usePopoverContext } from './PopoverContext'

export type PopoverContentProps = PolyProps<'div'>

export const PopoverContent = ({
	ref: refProp,
	style,
	...otherProps
}: PopoverContentProps) => {
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

	const ref = useRefComposed(refs.setFloating, refProp)
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
					data-status={asDataProp(status)}
					data-placement={asDataProp(placement)}
					// @ts-expect-error floating not on 19
					{...getFloatingProps(otherProps)}
				/>
			</FloatingFocusManager>
		</FloatingPortal>
	)
}
