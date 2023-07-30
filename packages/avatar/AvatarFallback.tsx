import { freya, forwardRef, type CoreProps } from '../core'
import { useAvatarContext } from './AvatarContext'

export type AvatarFallbackProps = CoreProps<'span'>

export const AvatarFallback = forwardRef<'span', AvatarFallbackProps>(
	(props, forwardedRef) => {
		const { ready } = useAvatarContext()

		return <freya.span ref={forwardedRef} hidden={ready} {...props} />
	}
)
