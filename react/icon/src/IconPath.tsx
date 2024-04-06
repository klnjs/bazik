import { forwardRef, type CoreProps } from '@klnjs/core'

export type IconPathProps = CoreProps<'path'>

export const IconPath = forwardRef<'path', IconPathProps>(
	(props, forwardedRef) => <path ref={forwardedRef} {...props} />
)
