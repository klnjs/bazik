import { forwardRef, type CoreProps } from '../core'

export type IconDescriptionProps = CoreProps<'desc'>

export const IconDescription = forwardRef<'desc', IconDescriptionProps>(
	(props, forwardedRef) => <desc ref={forwardedRef} {...props} />
)
