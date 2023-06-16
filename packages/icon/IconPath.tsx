import { forwardRef, type AsChildComponentProps } from '../core'

export type IconPathProps = Omit<
	AsChildComponentProps<'path'>,
	'asChild' | 'children'
>

export const IconPath = forwardRef<'path', IconPathProps>(
	(props, forwardedRef) => <path ref={forwardedRef} {...props} />
)
