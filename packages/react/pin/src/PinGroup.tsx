import { poly, forwardRef, type CoreProps } from '@klnjs/core'

export type PinGroupProps = CoreProps<'div'>

export const PinGroup = forwardRef<'div', PinGroupProps>(
	(props, forwardedRef) => <poly.div ref={forwardedRef} {...props} />
)
