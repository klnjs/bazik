import { forwardRef, type AsChildComponentProps } from '../core'

export type IconProps = Omit<AsChildComponentProps<'svg'>, 'asChild'>

export const Icon = forwardRef<'svg', IconProps>((props, forwardedRef) => (
	<svg ref={forwardedRef} aria-hidden={true} {...props} />
))
