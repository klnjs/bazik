import { forwardRef, type AsChildComponentProps } from '../core'

export type IconDescriptionProps = Omit<
	AsChildComponentProps<'desc'>,
	'asChild'
>

export const IconDescription = forwardRef<'desc', IconDescriptionProps>(
	(props, forwardedRef) => <desc ref={forwardedRef} {...props} />
)
