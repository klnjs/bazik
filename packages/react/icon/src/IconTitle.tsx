import { forwardRef, type CoreProps } from '@klnjs/core'

export type IconTitleProps = CoreProps<'title'>

export const IconTitle = forwardRef<'title', IconTitleProps>(
	(props, forwardedRef) => <title ref={forwardedRef} {...props} />
)
