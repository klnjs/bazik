import { forwardRef, type ComponentProps } from '../core'

export type IconDescriptionProps = ComponentProps<'desc'>

export const IconDescription = forwardRef<'desc', IconDescriptionProps>(
	(props, forwardedRef) => <desc ref={forwardedRef} {...props} />
)
