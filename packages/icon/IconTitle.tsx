import { forwardRef, type ComponentProps } from '../core'

export type IconTitleProps = ComponentProps<'title'>

export const IconTitle = forwardRef<'title', IconTitleProps>(
	(props, forwardedRef) => <title ref={forwardedRef} {...props} />
)
