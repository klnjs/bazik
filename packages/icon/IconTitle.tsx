import { forwardRef, type AsChildComponentProps } from '../core'

export type IconTitleProps = Omit<AsChildComponentProps<'title'>, 'asChild'>

export const IconTitle = forwardRef<'title', IconTitleProps>(
	(props, forwardedRef) => <title ref={forwardedRef} {...props} />
)
