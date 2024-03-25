import { freya, forwardRef, type CoreProps } from '../core'

export type PinFieldGroupProps = CoreProps<'div'>

export const PinFieldGroup = forwardRef<'div', PinFieldGroupProps>(
	(props, forwardedRef) => <freya.div ref={forwardedRef} {...props} />
)
