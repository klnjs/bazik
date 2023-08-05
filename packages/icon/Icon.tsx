import { forwardRef, type CoreProps } from '../core'

export type IconProps = CoreProps<'svg'>

export const Icon = forwardRef<'svg', IconProps>((props, forwardedRef) => (
	<svg ref={forwardedRef} aria-hidden={true} {...props} />
))
