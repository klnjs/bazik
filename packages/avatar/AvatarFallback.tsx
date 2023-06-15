import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { useAvatarContext } from './AvatarContext'

export type AvatarFallbackProps = AsChildComponentProps<'span'>

export const AvatarFallback = forwardRef<'span', AvatarFallbackProps>(
	(props, forwardedRef) => {
		const { fallbackProps } = useAvatarContext()
		const mergedProps = mergeProps(props, fallbackProps)

		return <freya.span ref={forwardedRef} {...mergedProps} />
	}
)
