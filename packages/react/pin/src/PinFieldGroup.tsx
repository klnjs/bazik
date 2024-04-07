import { poly, forwardRef, type CoreProps } from '@klnjs/core'

export type PinFieldGroupProps = CoreProps<'div'>

export const PinFieldGroup = forwardRef<'div', PinFieldGroupProps>(
	(props, forwardedRef) => <poly.div ref={forwardedRef} {...props} />
)
