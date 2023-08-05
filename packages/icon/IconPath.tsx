import { forwardRef, type CoreProps } from '../core'

export type IconPathProps = CoreProps<'path'>

export const IconPath = forwardRef<'path', IconPathProps>(
	(props, forwardedRef) => <path ref={forwardedRef} {...props} />
)
