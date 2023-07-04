import { forwardRef, type ComponentProps } from '../core'

export type IconPathProps = ComponentProps<'path'>

export const IconPath = forwardRef<'path', IconPathProps>(
	(props, forwardedRef) => <path ref={forwardedRef} {...props} />
)
