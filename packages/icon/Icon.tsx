import { forwardRef, type ComponentProps } from '../core'

export type IconProps = ComponentProps<'svg'>

export const Icon = forwardRef<'svg', IconProps>((props, forwardedRef) => (
	<svg ref={forwardedRef} aria-hidden={true} {...props} />
))
